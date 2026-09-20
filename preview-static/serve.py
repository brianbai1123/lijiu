#!/usr/bin/env python3
"""Static preview server: no Next.js HMR, no dev-origin blocking.

HTTP/1.1 with keep-alive (not HTTP/1.0 + Connection: close) because the
Cursor preview tunnel expects persistent connections; forcing a close on
every request made some probes race the socket teardown and surface as
ERR_EMPTY_RESPONSE on the client.
"""
from __future__ import annotations

import http.server
import os
import socket
import socketserver
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PREVIEW_PORT", "43127"))


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"  # enables keep-alive with correct Content-Length framing

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (ConnectionResetError, BrokenPipeError):
            # Client hung up mid-response; don't let it kill the worker thread's loop weirdly.
            self.close_connection = True


class ReuseTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    request_queue_size = 128  # absorb bursts of parallel preview/tunnel probes

    def server_bind(self):
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        super().server_bind()

    def handle_error(self, request, client_address):
        # Default prints a full traceback to stderr; keep it but never let it crash the server.
        exc_type = sys.exc_info()[0]
        if exc_type in (ConnectionResetError, BrokenPipeError):
            return
        super().handle_error(request, client_address)


if __name__ == "__main__":
    with ReuseTCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"static preview on http://127.0.0.1:{PORT}/designs/layouts/", flush=True)
        httpd.serve_forever()
