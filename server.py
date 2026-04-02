"""
Flask backend:
  1. /summarize      — Claude API summarizes a webpage
  2. /download-image — Pure Python: downloads image directly from a given image URL
Run:
  pip install flask flask-cors anthropic requests beautifulsoup4
  python server.py
"""
import json
import requests
from pathlib import Path
from datetime import datetime
from urllib.parse import urlparse
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import anthropic
from bs4 import BeautifulSoup
app = Flask(__name__, static_folder=".")
CORS(app)
DOWNLOAD_DIR = Path("./downloads")
DOWNLOAD_DIR.mkdir(exist_ok=True)
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ClaudeTool/1.0)"}
# ─── helpers ──────────────────────────────────────────────────────────────────
def fetch_page_text(url: str) -> str:
    resp = requests.get(url, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()
    return soup.get_text(separator="\n", strip=True)[:8000]
def download_image_from_url(image_url: str) -> dict:
    """Directly download an image from a URL. Pure Python, no Claude."""
    resp = requests.get(image_url, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    content_type = resp.headers.get("Content-Type", "image/jpeg")
    if "image" not in content_type:
        raise ValueError(f"URL does not point to an image (Content-Type: {content_type})")
    # derive file extension
    ext = content_type.split("/")[-1].split(";")[0].strip()
    ext = ext.replace("jpeg", "jpg").replace("svg+xml", "svg")
    if ext not in ("jpg", "png", "gif", "webp", "svg", "bmp"):
        path_ext = Path(urlparse(image_url).path).suffix.lstrip(".")
        ext = path_ext if path_ext else "jpg"
    filename = f"image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{ext}"
    save_path = DOWNLOAD_DIR / filename
    save_path.write_bytes(resp.content)
    return {
        "filename": filename,
        "source_url": image_url,
        "size_kb": round(len(resp.content) / 1024, 1),
        "content_type": content_type,
        "saved_to": str(save_path.resolve())
    }
# ─── Claude agentic loop (summarize only) ─────────────────────────────────────
SUMMARIZE_TOOL = {
    "name": "fetch_page_text",
    "description": "Fetches the text content of a webpage for summarization.",
    "input_schema": {
        "type": "object",
        "properties": {
            "url": {"type": "string", "description": "The full URL of the webpage"}
        },
        "required": ["url"]
    }
}
def claude_summarize(url: str, api_key: str) -> dict:
    client = anthropic.Anthropic(api_key=api_key)
    messages = [{"role": "user", "content": f"Please summarize this webpage clearly and concisely: {url}"}]
    tool_calls_log = []
    while True:
        resp = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            tools=[SUMMARIZE_TOOL],
            messages=messages
        )
        text = " ".join(b.text for b in resp.content if hasattr(b, "text"))
        if resp.stop_reason == "end_turn":
            return {"response": text, "tool_calls": tool_calls_log}
        if resp.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": resp.content})
            tool_results = []
            for block in resp.content:
                if block.type == "tool_use":
                    tool_calls_log.append({"tool": block.name, "input": block.input})
                    try:
                        result = fetch_page_text(block.input["url"])
                        result_str = json.dumps({"page_text": result})
                    except Exception as e:
                        result_str = json.dumps({"error": str(e)})
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result_str
                    })
            messages.append({"role": "user", "content": tool_results})
        else:
            return {"response": text or "Unexpected stop.", "tool_calls": tool_calls_log}
# ─── routes ───────────────────────────────────────────────────────────────────
@app.route("/")
def index():
    return send_from_directory(".", "index.html")
@app.route("/downloads/<path:filename>")
def serve_download(filename):
    return send_from_directory(DOWNLOAD_DIR, filename)
@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    url     = (data.get("url") or "").strip()
    api_key = (data.get("apiKey") or "").strip()
    if not url or not api_key:
        return jsonify({"error": "url and apiKey are required"}), 400
    result = claude_summarize(url, api_key)
    return jsonify(result)
@app.route("/download-image", methods=["POST"])
def download_image_route():
    data = request.json
    image_url = (data.get("url") or "").strip()
    if not image_url:
        return jsonify({"error": "url is required"}), 400
    try:
        result = download_image_from_url(image_url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
if __name__ == "__main__":
    print("✓ Server running at http://localhost:5000")
    print(f"✓ Downloads folder: {DOWNLOAD_DIR.resolve()}")
    app.run(port=5000, debug=True)
