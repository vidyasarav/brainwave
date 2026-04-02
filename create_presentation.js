const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Claude Skills Demo";

// Color palette: Ocean Gradient
const C = {
  navy:    "21295C",
  blue:    "065A82",
  teal:    "1C7293",
  ltBlue:  "9DC3D4",
  white:   "FFFFFF",
  offWhite:"F0F4F8",
  gray:    "64748B",
  darkGray:"1E293B",
};

// ─── SLIDE 1: Title ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Accent bar left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: C.teal }, line: { color: C.teal }
  });

  // Title
  s.addText("Claude Skills", {
    x: 0.5, y: 1.6, w: 9, h: 1.0,
    fontSize: 48, bold: true, color: C.white,
    fontFace: "Georgia", align: "center", margin: 0
  });

  // Subtitle
  s.addText("A Proof-of-Concept Flask + AI Application", {
    x: 0.5, y: 2.75, w: 9, h: 0.55,
    fontSize: 20, color: C.ltBlue,
    fontFace: "Calibri", align: "center", margin: 0
  });

  // Tag line box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.6, w: 3, h: 0.5,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  s.addText("Powered by Claude API", {
    x: 3.5, y: 3.6, w: 3, h: 0.5,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  // Slide number label
  s.addText("01", {
    x: 9.0, y: 5.1, w: 0.7, h: 0.3,
    fontSize: 11, color: C.teal, bold: true,
    fontFace: "Calibri", align: "right", margin: 0
  });
}

// ─── SLIDE 2: Overview ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.12,
    fill: { color: C.blue }, line: { color: C.blue }
  });

  s.addText("What is Claude Skills?", {
    x: 0.5, y: 0.35, w: 9, h: 0.7,
    fontSize: 32, bold: true, color: C.navy,
    fontFace: "Georgia", margin: 0
  });

  // Left column card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.3, w: 4.2, h: 3.5,
    fill: { color: C.white },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.10 },
    line: { color: "E2E8F0", width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.3, w: 4.2, h: 0.1,
    fill: { color: C.blue }, line: { color: C.blue }
  });
  s.addText("Project Purpose", {
    x: 0.55, y: 1.45, w: 3.9, h: 0.45,
    fontSize: 16, bold: true, color: C.blue,
    fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "A proof-of-concept application that demonstrates how Claude AI can be integrated into real-world workflows.", options: { breakLine: true } },
    { text: "\nBuilt with Flask + vanilla HTML/JS for simplicity and speed.", options: {} },
  ], {
    x: 0.55, y: 2.0, w: 3.8, h: 2.6,
    fontSize: 14, color: C.darkGray,
    fontFace: "Calibri"
  });

  // Right column card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.4, y: 1.3, w: 4.2, h: 3.5,
    fill: { color: C.white },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.10 },
    line: { color: "E2E8F0", width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.4, y: 1.3, w: 4.2, h: 0.1,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  s.addText("Two Core Features", {
    x: 5.55, y: 1.45, w: 3.9, h: 0.45,
    fontSize: 16, bold: true, color: C.teal,
    fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "1. Summarize Webpage", options: { bold: true, breakLine: true } },
    { text: "Agentic tool-use loop with Claude\n\n", options: { breakLine: true } },
    { text: "2. Download Image", options: { bold: true, breakLine: true } },
    { text: "Python endpoint to save images\nfrom any URL", options: {} },
  ], {
    x: 5.55, y: 2.0, w: 3.8, h: 2.6,
    fontSize: 14, color: C.darkGray,
    fontFace: "Calibri"
  });

  s.addText("02", { x: 9.0, y: 5.1, w: 0.7, h: 0.3, fontSize: 11, color: C.gray, bold: true, fontFace: "Calibri", align: "right", margin: 0 });
}

// ─── SLIDE 3: Architecture ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.12, fill: { color: C.navy }, line: { color: C.navy } });

  s.addText("Architecture Overview", {
    x: 0.5, y: 0.35, w: 9, h: 0.7,
    fontSize: 32, bold: true, color: C.navy,
    fontFace: "Georgia", margin: 0
  });

  // Stack items
  const items = [
    { label: "Frontend", value: "index.html — Vanilla HTML/JS, no framework, calls Flask API via fetch()", color: C.blue },
    { label: "Backend", value: "server.py — Flask (port 5000), /summarize and /download-image endpoints", color: C.teal },
    { label: "AI Layer", value: "Anthropic Python SDK — claude-sonnet-4-6 model with tool-use agentic loop", color: "028090" },
    { label: "Storage", value: "downloads/ folder — timestamped image files (image_YYYYMMDD_HHMMSS.ext)", color: "50808E" },
  ];

  items.forEach((item, i) => {
    const y = 1.35 + i * 0.95;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.8, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 1.5, h: 0.8, fill: { color: item.color }, line: { color: item.color } });
    s.addText(item.label, { x: 0.4, y, w: 1.5, h: 0.8, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(item.value, { x: 2.1, y: y + 0.08, w: 7.3, h: 0.65, fontSize: 13, color: C.darkGray, fontFace: "Calibri", valign: "middle", margin: 0 });
  });

  s.addText("03", { x: 9.0, y: 5.1, w: 0.7, h: 0.3, fontSize: 11, color: C.gray, bold: true, fontFace: "Calibri", align: "right", margin: 0 });
}

// ─── SLIDE 4: Key Stats ──────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addText("By the Numbers", {
    x: 0.5, y: 0.35, w: 9, h: 0.75,
    fontSize: 32, bold: true, color: C.white,
    fontFace: "Georgia", align: "center", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.1, w: 3, h: 0.05, fill: { color: C.teal }, line: { color: C.teal } });

  const stats = [
    { num: "2", label: "Core Features" },
    { num: "8K", label: "Char Page Limit" },
    { num: "1", label: "API Key Required" },
    { num: "5000", label: "Flask Port" },
  ];

  stats.forEach((stat, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 2.0, h: 2.8, fill: { color: C.blue }, line: { color: C.teal, width: 1 } });
    s.addText(stat.num, { x, y: 1.7, w: 2.0, h: 1.2, fontSize: 52, bold: true, color: C.white, fontFace: "Georgia", align: "center", margin: 0 });
    s.addText(stat.label, { x, y: 3.1, w: 2.0, h: 0.7, fontSize: 13, color: C.ltBlue, fontFace: "Calibri", align: "center", margin: 0 });
  });

  s.addText("04", { x: 9.0, y: 5.1, w: 0.7, h: 0.3, fontSize: 11, color: C.teal, bold: true, fontFace: "Calibri", align: "right", margin: 0 });
}

// ─── SLIDE 5: Closing ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.blue };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: "02C39A" }, line: { color: "02C39A" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.82, y: 0, w: 0.18, h: 5.625, fill: { color: "02C39A" }, line: { color: "02C39A" } });

  s.addText("Get Started", {
    x: 0.5, y: 1.3, w: 9, h: 1.0,
    fontSize: 44, bold: true, color: C.white,
    fontFace: "Georgia", align: "center", margin: 0
  });

  s.addText("pip install flask flask-cors anthropic requests beautifulsoup4", {
    x: 1.0, y: 2.5, w: 8.0, h: 0.6,
    fontSize: 15, color: "B3E5FC",
    fontFace: "Consolas", align: "center", margin: 0,
    italic: false, bold: false
  });

  s.addText("python server.py", {
    x: 3.0, y: 3.25, w: 4.0, h: 0.6,
    fontSize: 18, bold: true, color: "02C39A",
    fontFace: "Consolas", align: "center", margin: 0
  });

  s.addText("Server runs at http://localhost:5000", {
    x: 0.5, y: 4.1, w: 9, h: 0.45,
    fontSize: 14, color: C.ltBlue,
    fontFace: "Calibri", align: "center", italic: true, margin: 0
  });

  s.addText("05", { x: 9.0, y: 5.1, w: 0.7, h: 0.3, fontSize: 11, color: "02C39A", bold: true, fontFace: "Calibri", align: "right", margin: 0 });
}

// ─── SAVE ────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/vidyasaravanapandian/ClaudeCode/ClaudeSkills.pptx" })
  .then(() => console.log("✅ Saved: ClaudeSkills.pptx"))
  .catch(e => console.error("❌ Error:", e));
