"""Local preview server for the portfolio. Not part of the site.

Serve the site through this rather than opening index.html directly:
a file:// page has no origin, and YouTube refuses to embed into one.

Run it with "Open Portfolio.bat", or from this folder:  python serve.py
Then visit http://localhost:8778
"""

import http.server
import mimetypes
import socket
import sys

PORT = 8778
HOST = "127.0.0.1"          # reachable as http://localhost:8778

# Windows' registry gives Python some wrong types; set the ones we rely on.
for ext, mime in {
    ".webp": "image/webp",
    ".svg":  "image/svg+xml",
    ".mp4":  "video/mp4",
    ".js":   "text/javascript",
    ".css":  "text/css",
    ".woff2": "font/woff2",
}.items():
    mimetypes.add_type(mime, ext)


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # always serve the newest file while editing
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass                # keep the console quiet


def main():
    # ThreadingHTTPServer matters: a browser opens several connections at
    # once and holds them open. A single-threaded server blocks on the
    # first one and the whole site stops responding.
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    http.server.ThreadingHTTPServer.daemon_threads = True

    try:
        httpd = http.server.ThreadingHTTPServer((HOST, PORT), Handler)
    except OSError as err:
        if getattr(err, "errno", None) in (socket.EADDRINUSE if hasattr(socket, "EADDRINUSE") else 0, 48, 98, 10048):
            print(f"Something is already serving on port {PORT}.")
            print(f"Just open http://localhost:{PORT} - it is probably already running.")
            return 0
        raise

    print(f"Portfolio running at http://localhost:{PORT}")
    print("Leave this window open while you browse. Close it to stop.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
