#!/usr/bin/env python3
import http.server, os, pathlib, shutil

UPLOAD_DIR = pathlib.Path(__file__).parent.parent / "public"
UPLOAD_PATH = UPLOAD_DIR / "aura-group.jpg"
PLACEHOLDER = UPLOAD_DIR / "aura-group.placeholder.jpg"

if UPLOAD_PATH.exists() and not PLACEHOLDER.exists():
    shutil.copy2(UPLOAD_PATH, PLACEHOLDER)
    print(f"Backup placeholder -> {PLACEHOLDER}")

class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, fmt, *a):
        print(fmt % a)
    def do_GET(self):
        if self.path == "/status":
            self.send_response(200)
            self.send_header("Content-type","text/plain; charset=utf-8")
            self.end_headers()
            try:
                import subprocess
                out = subprocess.check_output(["ls","-lh",str(UPLOAD_PATH)], text=True)
                out += "\n" + subprocess.check_output(["file",str(UPLOAD_PATH)], text=True)
            except Exception as e:
                out = f"no file: {e}"
            self.wfile.write(out.encode())
            return
        self.send_response(200)
        self.send_header("Content-type","text/html; charset=utf-8")
        self.end_headers()
        html = """
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aura Upload</title></head>
<body style="font-family:system-ui,sans-serif; max-width:640px; margin:40px auto; background:#000; color:#fff; text-align:center">
<h2 style="margin-bottom:8px">Upload GTA image - Aura</h2>
<p style="color:#aaa; font-size:14px">Black background, original never edited, centered in middle.</p>
<p style="color:#facc15; font-size:13px">Saves to: public/aura-group.jpg</p>
<form method="POST" enctype="multipart/form-data" style="margin-top:24px; border:1px solid #222; padding:20px; border-radius:16px; background:#0a0a0a">
<input type="file" name="file" accept="image/*,.jpg,.png,.jpeg" required style="width:100%; padding:12px; background:#111; color:#fff; border:1px solid #333; border-radius:8px">
<button type="submit" style="margin-top:16px; width:100%; padding:14px; background:#facc15; color:#000; border:0; border-radius:10px; font-weight:900; font-size:16px; cursor:pointer">Upload & Overwrite</button>
</form>
<p style="margin-top:20px; color:#666; font-size:12px">After upload, reload Remotion Studio (Aura). If old image shows, hard-reload (Ctrl+Shift+R) - cache is auto-cleared.</p>
<div style="margin-top:24px; padding:12px; background:#111; border-radius:8px; text-align:left">
<code style="font-size:12px; color:#aaa">Current: </code><span id="cur" style="font-size:12px">loading...</span>
<script>fetch('/status').then(r=>r.text()).then(t=>document.getElementById('cur').textContent=t)</script>
</div>
</body></html>"""
        self.wfile.write(html.encode('utf-8'))

    def do_POST(self):
        ctype = self.headers.get('Content-Type','')
        if 'multipart' not in ctype or 'boundary=' not in ctype:
            self.send_error(400, "need multipart"); return
        boundary = ctype.split('boundary=')[1].strip().strip('"').encode()
        length = int(self.headers.get('Content-Length',0))
        data = self.rfile.read(length)
        parts = data.split(b'--' + boundary)
        saved = 0
        for p in parts:
            if b'filename=' in p:
                idx = p.find(b'\r\n\r\n')
                if idx == -1: continue
                body = p[idx+4:]
                body = body.rstrip(b'\r\n').rstrip(b'-').rstrip(b'\r\n').strip()
                if body.endswith(b'--'):
                    body = body[:-2]
                body = body.strip(b'\r\n')
                if len(body) < 1024: continue
                UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
                open(UPLOAD_PATH,'wb').write(body)
                saved = len(body)
                cache = pathlib.Path(__file__).parent.parent / "node_modules/.cache/webpack"
                if cache.exists():
                    shutil.rmtree(cache, ignore_errors=True)
                    print(f"Cleared {cache}")
                break
        if saved:
            print(f"Saved {saved} bytes to {UPLOAD_PATH}", flush=True)
            self.send_response(200)
            self.send_header("Content-type","text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(f"<html><body style='background:#000;color:#fff;font-family:sans-serif;text-align:center;padding:40px'><h2 style='color:#22c55e'>Saved {saved} bytes to aura-group.jpg</h2><p>Reload Remotion Studio - Aura</p><p><a href='/' style='color:#facc15'>Back</a></p></body></html>".encode())
        else:
            self.send_error(400, "No image found in upload")

if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv)>1 else 8000
    print(f"Serving Aura upload at http://127.0.0.1:{port} -> {UPLOAD_PATH}")
    http.server.ThreadingHTTPServer(("0.0.0.0", port), H).serve_forever()
