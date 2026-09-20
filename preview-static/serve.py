#!/usr/bin/env python3
"""Static preview server: no HMR, no keep-alive hang."""
from __future__ import annotations

import http.server
import os
import socket
import socketserver

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PREVIEW_PORT", "43127"))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("Connection", "close")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys_stdout = __import__("sys").stderr
        sys_stdout.write("%s - %s\n" % (self.address_string(), fmt % args))


class ReuseTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def server_bind(self):
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        super().server_bind()


if __name__ == "__main__":
    with ReuseTCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"static preview on http://127.0.0.1:{PORT}/designs/layouts/", flush=True)
        httpd.serve_forever()
