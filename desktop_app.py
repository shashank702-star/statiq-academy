import os
import sys
import threading
import http.server
import socketserver

# In compiled exe mode, we must resolve paths relative to the executable directory
if getattr(sys, 'frozen', False):
    # Running in PyInstaller bundle
    BASE_DIR = sys._MEIPASS
    # Fallback to executable location if serving files from execution path
    EXE_DIR = os.path.dirname(sys.executable)
else:
    # Running in normal Python environment
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    EXE_DIR = BASE_DIR

PORT = 8181

def start_server():
    """Starts a lightweight HTTP server serving files from the project directory."""
    # Determine directory to serve. If index.html exists in BASE_DIR, use it (fully self-contained).
    # Otherwise, fall back to EXE_DIR (thin executable running in project root).
    serve_dir = BASE_DIR if os.path.exists(os.path.join(BASE_DIR, "index.html")) else EXE_DIR
    os.chdir(serve_dir)
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Allow port reuse to prevent address-already-in-use errors
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving locally from {serve_dir} at http://localhost:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error or port already in use: {e}")

if __name__ == "__main__":
    # 1. Start the HTTP static server in a background daemon thread
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()
    
    # 2. Load PyWebview and open the desktop window
    try:
         import webview
    except ImportError:
         print("Error: 'pywebview' is not installed. Install it with: pip install pywebview")
         sys.exit(1)
         
    # Create webview window pointing to the localhost server
    webview.create_window(
        title="StatIQ Data Academy",
        url=f"http://localhost:{PORT}",
        width=1280,
        height=800,
        resizable=True,
        min_size=(1024, 768)
    )
    
    # Launch the native desktop view loop
    webview.start()
