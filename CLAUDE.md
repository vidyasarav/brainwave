# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Paths
- **Public repo (this):** `/Users/vidyasaravanapandian/ClaudeCode/brainwave`
- **Private repo:** `/Users/vidyasaravanapandian/ClaudeCode/brainwave-private`
- **Live site:** `https://brainwaveinitiative.org`

## Project Overview

Two independent components share this repo:
1. **BRAINWAVE Website** — Single-file HTML/CSS/JS site at `index.html` (also `brainwave.html`), Flask backend at `server.py`
2. **EEG Research Data** — Sleep EEG recordings for three subject groups (Control, Dup15q, Rett)

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

## EEG Research Data (`EEG/`)

```
EEG/Data/
├── Control/    — Sleep EEG from typically-developing subjects (8 subjects: 3912633, 4068015, 4137123, 4329285, 4757853, 5141475, 5360954, 5409426)
├── Dup15q/     — Sleep EEG from subjects with Dup15q syndrome
└── Rett/       — Sleep EEG from subjects with Rett syndrome (EA1720U + EEG 030,034,036,038,041,043,044)

MATLAB/         — MATLAB/EEGLAB processing scripts (lives at repo root, not under EEG/)
```

See `EEG/Data/EEG_Documentation.md` for full details on recording format, channel montage, processing pipeline stages, and output file descriptions.

### EEG Data Key Facts
- Raw format: EDF → imported to EEGLAB `.set`/`.fdt`
- Processing stages: Import → Preprocessing (ICA, artifact rejection) → Spectral analysis
- Each processed subject produces a `{SubjectID}_Report_{timestamp}/` directory with power topomaps, time-frequency spectrograms, and Excel power tables
- Frequency bands: Delta (0.5–4 Hz), Theta (4–8 Hz), Alpha (8–13 Hz), Beta (13–30 Hz), Gamma (30–50 Hz)
