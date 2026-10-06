"""Local preview server for the portfolio. Not part of the site.

Serve the site through this rather than opening index.html directly:
a file:// page has no origin, and YouTube refuses to embed into one.

Run it with "Open Portfolio.bat", or from this folder:  python serve.py
Then visit http://localhost:8778

To open it on a phone on the same wifi, run "Open Portfolio on Phone.bat"
(or: python serve.py --phone) and type the address it prints.
"""

import http.server
import mimetypes
import socket
import sys

PORT = 8778
HOST = "127.0.0.1"          # reachable as http://localhost:8778


def lan_ip():
    """This machine's address on the local network, as a phone sees it."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))   # no packet is sent; this just picks
        return sock.getsockname()[0]    # the interface the router is on
    finally:
        sock.close()

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
    # --phone serves to the whole local network instead of this machine only
    phone = "--phone" in sys.argv or "--lan" in sys.argv
    host = "0.0.0.0" if phone else HOST

    # ThreadingHTTPServer matters: a browser opens several connections at
    # once and holds them open. A single-threaded server blocks on the
    # first one and the whole site stops responding.
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    http.server.ThreadingHTTPServer.daemon_threads = True

    try:
        httpd = http.server.ThreadingHTTPServer((host, PORT), Handler)
    except OSError as err:
        if getattr(err, "errno", None) in (socket.EADDRINUSE if hasattr(socket, "EADDRINUSE") else 0, 48, 98, 10048):
            print(f"Something is already serving on port {PORT}.")
            print(f"Just open http://localhost:{PORT} - it is probably already running.")
            return 0
        raise

    if phone:
        try:
            address = f"http://{lan_ip()}:{PORT}"
        except OSError:
            address = f"http://<this-pc-s-ip>:{PORT}"
        print()
        print("  On your phone, with wifi on the same network, open:")
        print()
        print(f"      {address}")
        print()
        print("  If Windows asks, allow access on private networks.")
        print("  Videos will not play here - YouTube refuses to embed into")
        print("  a numeric address. Everything else is the real thing.")
        print()
    else:
        print(f"Portfolio running at http://localhost:{PORT}")
    print("Leave this window open while you browse. Close it to stop.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
