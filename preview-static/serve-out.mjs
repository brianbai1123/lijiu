#!/usr/bin/env node
/** Serves the built static export in out/ so the exported pages can be reviewed. */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = "/workspace/out";
const PORT = Number(process.env.PREVIEW_PORT ?? 47231);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  // The export is built with basePath /lijiu; strip it so local paths resolve.
  if (pathname === "/lijiu" || pathname.startsWith("/lijiu/")) {
    pathname = pathname.slice("/lijiu".length) || "/";
  }
  let file = join(ROOT, pathname);
  if (pathname.endsWith("/")) file = join(file, "index.html");

  try {
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
      "Content-Length": body.byteLength,
      "Cache-Control": "no-store",
    });
    res.end(body);
    console.log(new Date().toISOString().slice(11, 23), req.method, pathname, 200);
  } catch {
    // 204 rather than a connection-closing 404, same reasoning as serve.mjs.
    res.writeHead(204, { "Content-Length": "0" });
    res.end();
    console.log(new Date().toISOString().slice(11, 23), req.method, pathname, 204);
  }
}).listen(PORT, () => {
  console.log(`out/ served on http://127.0.0.1:${PORT}/designs/spreads/`);
});
