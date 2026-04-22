# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Paths
- **Public repo (this):** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/brainwave-public`
- **Private repo:** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/brainwave-private`
- **Source materials:** `/Users/vidyasaravanapandian/ClaudeCode/projects/brainwave/source-materials`
- **EEG research:** `/Users/vidyasaravanapandian/ClaudeCode/projects/eeg-research`
- **Live site:** `https://brainwaveinitiative.org`

## Project Overview

BRAINWAVE website — neuroscience education for K-12 teachers in LA. Single-file HTML/CSS/JS frontend, Flask backend with Claude AI integration.

## Running Locally

**Flask backend** (for API routes):
```bash
pip install flask flask-cors anthropic requests beautifulsoup4
python server.py
# Runs at http://localhost:5000
```

**Static preview** (no backend needed for most UI work):
```bash
python3 -m http.server 3456
# Configured in .claude/launch.json
```

No build step — `index.html` is the entire frontend.

## Architecture

### Flask Backend (`server.py`)
- **`POST /summarize`** — Accepts `{ url, apiKey }`. Runs a Claude agentic tool-use loop: Claude calls `fetch_page_text`, the server executes it and feeds results back until Claude returns a final text summary. Model: `claude-sonnet-4-6`. Page text stripped of `<script>`, `<style>`, `<nav>`, `<footer>`, `<header>` and truncated to 8000 chars.
- **`POST /download-image`** — Accepts `{ url }`. Pure Python: downloads image, derives extension from `Content-Type`, saves to `./downloads/image_YYYYMMDD_HHMMSS.ext`. No Claude involved.
- **`GET /downloads/<filename>`** — Serves saved images.

### Frontend (`index.html`, ~2933 lines)
Single file, no framework, no build. CSS variables define the design system (`--navy`, `--teal`, `--amber`; fonts: Fraunces serif + DM Sans).

**Page sections (in order):** `#nav` → `#hero` → `#mission` → `#manifesto` → `#impact` → `#journey` → `#programs` → `#network` → `#workshops` → `#team` → `#story` → `#partners` → `#faq` → `#cta`

**Key JS data objects** (edit these to update content):
- `TEAM_DATA` — array of `{ name, role, research, bio, photo, color }` for team modals
- `SCHOOL_DATA` — array of `{ name, lat, lng, cohort, type }` for the Leaflet map (~60+ schools)
- `COHORT_COLORS` — maps cohort name → hex color (e.g. `"Fall 2024"`)
- `TYPE_ICONS` — maps school type → emoji

**Interactive features:** neural canvas animation (`requestAnimationFrame`), Leaflet.js school map (filterable by cohort), team bio modals, count-up stats, scroll-reveal, drag-scroll testimonials, video lightbox.

**Claude skill cards** in the page call the Flask API via `fetch()`. API key is entered in-browser per request; never stored server-side.

## EEG Research Data

Separate project at `/Users/vidyasaravanapandian/ClaudeCode/projects/eeg-research/`. See `projects/eeg-research/data/EEG_Documentation.md` for pipeline details.
