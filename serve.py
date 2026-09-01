"""Local preview server. Not part of the site - safe to delete.
Python's built-in server mis-serves .webp on Windows; this fixes the MIME types."""
import http.server, mimetypes, socketserver

for ext, mime in {
    ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4",
    ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2",
}.items():
    mimetypes.add_type(mime, ext)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")  # always see latest edits
        super().end_headers()

with socketserver.TCPServer(("127.0.0.1", 8778), Handler) as httpd:
    print("serving on http://127.0.0.1:8778")
    httpd.serve_forever()
