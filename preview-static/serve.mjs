#!/usr/bin/env node
/**
 * Static preview server for the layout lab.
 *
 * Why Node and not python3 -m http.server:
 * Python's http.server is documented as not production-grade, and its
 * send_error() hardcodes `Connection: close` on every error response. The
 * browser always requests /favicon.ico and Chrome's devtools probe at
 * /.well-known/appspecific/com.chrome.devtools.json, so each page view tore
 * down a pooled keep-alive connection. When the browser then reused that
 * connection for its next request, it got a closed socket with zero bytes:
 * ERR_EMPTY_RESPONSE. curl never reproduced it because curl does not keep a
 * connection pool warm across parallel subresource requests.
 *
 * So: never answer a browser housekeeping request with a connection-closing
 * 404, and let Node own connection lifetime (it flushes before FIN rather
 * than shutting the socket down under buffered data).
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PREVIEW_PORT ?? 43127);
const PAGE = join(ROOT, "designs", "layouts", "index.html");

const log = (...parts) => {
  const ts = new Date().toISOString().slice(11, 23);
  console.log(`[${ts}]`, ...parts);
};

/** Requests a browser makes on its own that must not cost us a connection. */
const HOUSEKEEPING = new Set([
  "/favicon.ico",
  "/.well-known/appspecific/com.chrome.devtools.json",
  "/robots.txt",
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png",
]);

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "127.0.0.1"}`);
  const pathname = decodeURIComponent(url.pathname);

  if (HOUSEKEEPING.has(pathname)) {
    // 204 keeps the pooled connection usable; a 404 here is what used to kill it.
    res.writeHead(204, { "Content-Length": "0" });
    res.end();
    log(req.method, pathname, "204");
    return;
  }

  // The lab is a single page; serve it for the canonical path and anything
  // that looks like a stray navigation, so a typo never yields a closing 404.
  const wantsPage =
    pathname === "/" ||
    normalize(pathname).replace(/\/+$/, "") === "/designs/layouts" ||
    !pathname.includes(".");

  if (!wantsPage) {
    const body = "not found";
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
    });
    res.end(body);
    log(req.method, pathname, "404");
    return;
  }

  try {
    const html = await readFile(resolve(PAGE));
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": html.byteLength,
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : html);
    log(req.method, pathname, "200");
  } catch (err) {
    const body = `cannot read page: ${err.message}`;
    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
    });
    res.end(body);
    log(req.method, pathname, "500", err.message);
  }
});

// Outlive the browser's idle socket reuse window. If the server closed an idle
// connection first, an in-flight reused request would race the FIN and surface
// as ERR_EMPTY_RESPONSE — the exact failure we are eliminating.
server.keepAliveTimeout = 120_000;
server.headersTimeout = 125_000;
server.requestTimeout = 0;

server.on("clientError", (err, socket) => {
  // Never leave a half-open socket; respond then close so the browser retries cleanly.
  if (err.code === "ECONNRESET" || !socket.writable) {
    socket.destroy();
    return;
  }
  socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
});

server.listen(PORT, "0.0.0.0", () => {
  log(`static preview (node) on http://127.0.0.1:${PORT}/designs/layouts/`);
});
