# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Paths
- **Public repo (this):** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/brainwave-public`
- **Private repo:** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/brainwave-private`
- **Source materials:** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/source-materials`
- **EEG research:** `/Users/vidyasaravanapandian/ClaudeCode/projects/eeg-research`
- **Live site:** `https://brainwaveinitiative.org`

## Project Overview

This repo is the BRAINWAVE website:
- Single-file HTML/CSS/JS site at `index.html` (also `brainwave.html`), Flask backend at `server.py`
- EEG research data lives separately at `ClaudeCode/projects/eeg-research/`

## Running the Flask App

```bash
pip install flask flask-cors anthropic requests beautifulsoup4
python server.py
# Runs at http://localhost:5000
```

No build step. Open `index.html` is served by Flask at `/`.

## Architecture

### Flask Backend (`server.py`)
- **`/summarize` (POST)** — Accepts `{ url, apiKey }`. Runs a Claude agentic tool-use loop: Claude calls `fetch_page_text`, the server executes it and feeds results back until Claude returns a final text summary. Model: `claude-sonnet-4-6`.
- **`/download-image` (POST)** — Accepts `{ url }`. Pure Python: directly downloads the image, derives extension from `Content-Type`, saves to `./downloads/image_YYYYMMDD_HHMMSS.ext`. No Claude involved.
- **`/downloads/<filename>`** — Serves saved images from `./downloads/`.
- Page text is stripped of `<script>`, `<style>`, `<nav>`, `<footer>`, `<header>` tags and truncated to 8000 chars before being returned to Claude.

### Frontend (`index.html`)
- Single file, no framework, no build. Two skill cards call the Flask API via `fetch()`.
- API key is entered in the browser and sent per-request; never stored server-side.
- Skill 1 (Summarize): POSTs to `/summarize`, displays response text and tool call trace.
- Skill 2 (Download Image): POSTs to `/download-image`, shows image preview and download link by parsing `image_YYYYMMDD_HHMMSS.ext` from the response.

## EEG Research Data

EEG data has been moved to a separate project:
`/Users/vidyasaravanapandian/ClaudeCode/projects/eeg-research/`

See `projects/eeg-research/data/EEG_Documentation.md` for full details.
