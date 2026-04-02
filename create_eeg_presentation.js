const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Sleep EEG Research — Study Overview";

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  navy:    "0A3D52",
  teal:    "0D7C99",
  ltTeal:  "3FBAD8",
  ice:     "D6EEF5",
  white:   "FFFFFF",
  offWhite:"F2F8FB",
  dark:    "1E293B",
  mid:     "475569",
  slate:   "94A3B8",
  green:   "1E8A5E",
  ltGreen: "D1FAE5",
  amber:   "B45309",
  ltAmber: "FEF3C7",
  purple:  "5B21B6",
  ltPurp:  "EDE9FE",
  code:    "1A1A2E",   // dark bg for code blocks
  codeTxt: "A8D8EA",   // light blue mono text
};

const makeShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.10 });

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.8, w: 10, h: 0.825, fill: { color: C.teal }, line: { color: C.teal } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.15, h: 5.625, fill: { color: C.ltTeal }, line: { color: C.ltTeal } });
  s.addText("Sleep EEG Research", { x: 0.4, y: 0.8, w: 9.2, h: 1.1, fontSize: 44, bold: true, color: C.white, fontFace: "Georgia", align: "center", margin: 0 });
  s.addText("Study Dataset Overview", { x: 0.4, y: 1.95, w: 9.2, h: 0.7, fontSize: 26, color: C.ice, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  const groups = [
    { label: "Control",  n: "8 subjects",  col: C.green },
    { label: "Dup15q",   n: "11 subjects", col: C.teal },
    { label: "Rett",     n: "8 subjects",  col: C.purple },
  ];
  groups.forEach((g, i) => {
    const x = 1.2 + i * 2.7;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.0, w: 2.2, h: 0.85, fill: { color: g.col }, line: { color: g.col } });
    s.addText(g.label, { x, y: 3.05, w: 2.2, h: 0.42, fontSize: 17, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(g.n,     { x, y: 3.47, w: 2.2, h: 0.32, fontSize: 13, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  });
  s.addText("UCLA Collaboration  •  Nihon Kohden EEG System  •  EEGLAB/MATLAB Pipeline", { x: 0.4, y: 4.88, w: 9.2, h: 0.42, fontSize: 12, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Study Design
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("Study Design", { x: 0.45, y: 0.25, w: 9.1, h: 0.65, fontSize: 30, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addText("Three subject groups compared via overnight sleep EEG", { x: 0.45, y: 0.88, w: 9.1, h: 0.38, fontSize: 14, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });
  const cols = [
    { title: "Control", color: C.green, lines: ["8 subjects","Typically-developing","IDs: 3912633, 4068015,","4137123, 4329285,","4757853, 5141475,","5360954, 5409426"], status: "Raw NKT data" },
    { title: "Dup15q",  color: C.teal,  lines: ["11 subjects","Dup15q syndrome","IDs: 4546621, 4574335,","4646135, 4672497,","4745551, 4939552,","4959323, 4969700,","4981316, 5158834, 5426282"], status: "Raw NKT data" },
    { title: "Rett",    color: C.purple,lines: ["8 subjects","Rett syndrome","EA1720U (2-night merge)","EEG 030, 034, 036,","038, 041, 043, 044","(7-hr clean recordings)"], status: "Processed ✓" },
  ];
  cols.forEach((col, i) => {
    const x = 0.25 + i * 3.25; const w = 3.0;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w, h: 3.7, fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w, h: 0.65, fill: { color: col.color }, line: { color: col.color } });
    s.addText(col.title, { x: x+0.1, y: 1.4, w: w-0.2, h: 0.65, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    col.lines.forEach((line, li) => {
      s.addText(line, { x: x+0.15, y: 2.15+li*0.34, w: w-0.3, h: 0.34, fontSize: li===0?14:12, bold: li===0, color: li===0?col.color:C.dark, fontFace: "Calibri", margin: 0 });
    });
    const badgeColor = col.status.includes("✓") ? C.green : C.amber;
    const badgeLight = col.status.includes("✓") ? C.ltGreen : C.ltAmber;
    s.addShape(pres.shapes.RECTANGLE, { x: x+0.2, y: 4.7, w: w-0.4, h: 0.3, fill: { color: badgeLight }, line: { color: badgeColor, width: 1 } });
    s.addText(col.status, { x: x+0.2, y: 4.7, w: w-0.4, h: 0.3, fontSize: 11, bold: true, color: badgeColor, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Processing Pipeline
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("Processing Pipeline", { x: 0.45, y: 0.22, w: 9.1, h: 0.65, fontSize: 30, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addText("MATLAB / EEGLAB — 3-stage workflow", { x: 0.45, y: 0.85, w: 9.1, h: 0.35, fontSize: 13, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.45, w: 1.9, h: 0.9, fill: { color: C.ice }, line: { color: C.slate, width: 1 } });
  s.addText("Raw EDF", { x: 0.3, y: 1.45, w: 1.9, h: 0.5, fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  s.addText("Nihon Kohden", { x: 0.3, y: 1.85, w: 1.9, h: 0.35, fontSize: 11, color: C.mid, fontFace: "Calibri", align: "center", margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 2.2, y: 1.9, w: 0.35, h: 0, line: { color: C.slate, width: 2 } });
  s.addText("▶", { x: 2.5, y: 1.74, w: 0.2, h: 0.35, fontSize: 14, color: C.slate, margin: 0 });
  const stages = [
    { num: "1", title: "Import",           config: "config_import.mat", color: C.teal,   bullets: ["EDF → EEGLAB .set/.fdt","Standardise channel labels","Output: *_import.set"] },
    { num: "2", title: "Preprocessing",    config: "config_prep.mat",   color: C.navy,   bullets: ["Assign channel locations (10-20)","Artifact rejection & cleaning","ICA decomposition","ICLabel classification","Output: *_prep.set"] },
    { num: "3", title: "Spectral Analysis",config: "CONFIG.mat",        color: C.purple, bullets: ["Epoch-based power spectra","5 frequency bands computed","Topomaps + TF spectrograms","Output: Report directory"] },
  ];
  const stageX = [2.75, 4.85, 6.95]; const stageW = 1.95;
  stages.forEach((st, i) => {
    const x = stageX[i];
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: stageW, h: 3.85, fill: { color: C.white }, line: { color: st.color, width: 2 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: stageW, h: 0.6, fill: { color: st.color }, line: { color: st.color } });
    s.addText(`Stage ${st.num}  |  ${st.title}`, { x: x+0.08, y: 1.3, w: stageW-0.16, h: 0.6, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x+0.1, y: 2.0, w: stageW-0.2, h: 0.3, fill: { color: C.offWhite }, line: { color: "D1D5DB", width: 1 } });
    s.addText(`⚙ ${st.config}`, { x: x+0.1, y: 2.0, w: stageW-0.2, h: 0.3, fontSize: 9, color: C.slate, fontFace: "Consolas", align: "center", valign: "middle", margin: 0 });
    st.bullets.forEach((b, bi) => {
      s.addText(`• ${b}`, { x: x+0.12, y: 2.4+bi*0.45, w: stageW-0.24, h: 0.42, fontSize: 11, color: C.dark, fontFace: "Calibri", margin: 0 });
    });
    if (i < stages.length - 1) {
      s.addShape(pres.shapes.LINE, { x: x+stageW, y: 2.22, w: 0.1, h: 0, line: { color: st.color, width: 2 } });
      s.addText("▶", { x: x+stageW+0.05, y: 2.07, w: 0.22, h: 0.32, fontSize: 14, color: st.color, margin: 0 });
    }
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.95, y: 1.45, w: 1.0, h: 2.85, fill: { color: C.ltGreen }, line: { color: C.green, width: 1 }, shadow: makeShadow() });
  s.addText("Report\nDirectory", { x: 8.95, y: 1.55, w: 1.0, h: 0.7, fontSize: 11, bold: true, color: C.green, fontFace: "Calibri", align: "center", margin: 0 });
  [".xlsx", ".png\ntopo-\nmaps", ".png\nTF plots"].forEach((o, i) => {
    s.addText(o, { x: 8.95, y: 2.35+i*0.65, w: 1.0, h: 0.6, fontSize: 10, color: C.green, fontFace: "Calibri", align: "center", margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: 8.9, y: 2.22, w: 0.05, h: 0, line: { color: C.green, width: 2 } });
  s.addText("▶", { x: 8.86, y: 2.07, w: 0.22, h: 0.32, fontSize: 14, color: C.green, margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Channels & Frequency Bands
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("Channels & Frequency Bands", { x: 0.45, y: 0.22, w: 9.1, h: 0.65, fontSize: 30, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.1, w: 4.5, h: 4.15, fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.1, w: 4.5, h: 0.5, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("International 10-20 Channel Montage (22 EEG)", { x: 0.35, y: 1.1, w: 4.4, h: 0.5, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  const regions = [
    { region: "Frontal",   ch: "Fp1, Fp2, Fpz, F3, F4, F7, F8, Fz" },
    { region: "Central",   ch: "C3, C4, Cz" },
    { region: "Temporal",  ch: "T1, T2, T3, T4, T5, T6" },
    { region: "Parietal",  ch: "P3, P4, Pz" },
    { region: "Occipital", ch: "O1, O2" },
    { region: "Reference", ch: "A1, A2" },
    { region: "ECG",       ch: "ECGL, ECGR" },
    { region: "EMG",       ch: "EMG1, EMG2" },
    { region: "EOG",       ch: "LOC, ROC" },
  ];
  regions.forEach((r, i) => {
    const y = 1.7 + i * 0.38;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 4.5, h: 0.38, fill: { color: i%2===0?C.offWhite:C.white }, line: { color: i%2===0?C.offWhite:C.white } });
    s.addText(r.region, { x: 0.4, y, w: 1.1, h: 0.38, fontSize: 11, bold: true, color: C.teal, fontFace: "Calibri", valign: "middle", margin: 0 });
    s.addText(r.ch,     { x: 1.5, y, w: 3.2, h: 0.38, fontSize: 11, color: C.dark, fontFace: "Calibri", valign: "middle", margin: 0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.1, w: 4.6, h: 4.15, fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.1, w: 4.6, h: 0.5, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("Frequency Bands Analyzed", { x: 5.15, y: 1.1, w: 4.5, h: 0.5, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  const bands = [
    { name: "Delta", hz: "0.5 – 4 Hz",  note: "Dominant in deep sleep",       bar: 1.0, color: "1E3A8A" },
    { name: "Theta", hz: "4 – 8 Hz",    note: "Light sleep / drowsiness",      bar: 0.7, color: "0D7C99" },
    { name: "Alpha", hz: "8 – 13 Hz",   note: "Relaxed wakefulness",           bar: 0.5, color: "1E8A5E" },
    { name: "Beta",  hz: "13 – 30 Hz",  note: "Active cognition",              bar: 0.35, color: "B45309" },
    { name: "Gamma", hz: "30 – 50 Hz",  note: "High-frequency processing",     bar: 0.2, color: "7C3AED" },
  ];
  bands.forEach((b, i) => {
    const y = 1.75 + i * 0.67;
    s.addText(b.name, { x: 5.2, y, w: 0.85, h: 0.35, fontSize: 13, bold: true, color: b.color, fontFace: "Calibri", margin: 0 });
    s.addText(b.hz,   { x: 6.05, y, w: 1.1, h: 0.35, fontSize: 12, color: C.mid, fontFace: "Calibri", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y+0.35, w: 3.9, h: 0.18, fill: { color: "E2E8F0" }, line: { color: "E2E8F0" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y+0.35, w: 3.9*b.bar, h: 0.18, fill: { color: b.color }, line: { color: b.color } });
    s.addText(b.note, { x: 5.2, y: y+0.53, w: 3.9, h: 0.16, fontSize: 9, color: C.slate, fontFace: "Calibri", italic: true, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Output Types
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("Analysis Outputs per Subject", { x: 0.45, y: 0.22, w: 9.1, h: 0.65, fontSize: 30, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addText("Each processed recording produces a Report directory with the following files", { x: 0.45, y: 0.85, w: 9.1, h: 0.35, fontSize: 13, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });
  const outputs = [
    { label: "ICLabel.png",       desc: "ICA Component Classification",  detail: "Grid of scalp topoplots — one per ICA component — labeled Brain / Eye / Other with confidence %. Used to reject non-brain artifacts.", color: C.purple, light: C.ltPurp },
    { label: "power_{band}.png",  desc: "Absolute Power Topomaps",       detail: "Scalp heatmaps showing absolute spectral power (μV²) for each of 5 bands. Color: blue (low) → red (high). One file per band.",  color: C.teal,   light: C.ice },
    { label: "rpower_{band}.png", desc: "Relative Power Topomaps",       detail: "Normalized 0–1 topomaps showing what fraction of total power each band contributes. Delta typically dominates (0.4–0.9) in sleep.", color: C.navy,   light: "E0E9F4" },
    { label: "tfplot_{channel}.png", desc: "Time-Frequency Spectrograms",detail: "Per-channel plots: time (sec) on x-axis, frequency (Hz, up to 50) on y-axis. Color = log power. Shows sleep stage shifts over time.", color: C.green, light: C.ltGreen },
    { label: "Result_*.xlsx",     desc: "Power Values Spreadsheet",      detail: "Excel table of computed spectral power across all bands and channels. Primary quantitative output for statistical comparison between groups.", color: C.amber, light: C.ltAmber },
  ];
  outputs.forEach((o, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = col === 0 ? 0.3 : 5.2;
    const y = 1.35 + row * 1.38;
    const w = 4.6; const h = 1.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, line: { color: "E2E8F0", width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.12, h, fill: { color: o.color }, line: { color: o.color } });
    s.addText(o.label,  { x: x+0.22, y: y+0.08, w: w-0.3, h: 0.32, fontSize: 12, bold: true, color: o.color, fontFace: "Consolas", margin: 0 });
    s.addText(o.desc,   { x: x+0.22, y: y+0.38, w: w-0.3, h: 0.28, fontSize: 12, bold: true, color: C.dark, fontFace: "Calibri", margin: 0 });
    s.addText(o.detail, { x: x+0.22, y: y+0.65, w: w-0.3, h: 0.52, fontSize: 10, color: C.mid, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Dataset Status
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.85, w: 10, h: 0.775, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("Current Dataset Status", { x: 0.45, y: 0.25, w: 9.1, h: 0.75, fontSize: 30, bold: true, color: C.white, fontFace: "Georgia", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.2, w: 4.4, h: 3.4, fill: { color: "0D3B2E" }, line: { color: C.green, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.2, w: 4.4, h: 0.55, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Rett  —  PROCESSED ✓", { x: 0.35, y: 1.2, w: 4.3, h: 0.55, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  ["EA1720U (2-night merged)","EEG 030 — 7hr clean","EEG 034 — 7hr clean","EEG 036 — 7hr clean","EEG 038 — 7hr clean","EEG 041 — 7hr clean","EEG 043 — 7hr clean","EEG 044 — 7hr clean"].forEach((subj, i) => {
    s.addText(`✓  ${subj}`, { x: 0.45, y: 1.88+i*0.33, w: 4.1, h: 0.32, fontSize: 11, color: "90EE90", fontFace: "Calibri", margin: 0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.2, w: 4.4, h: 3.4, fill: { color: "2A1F0D" }, line: { color: C.amber, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.2, w: 4.4, h: 0.55, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("Control & Dup15q  —  RAW DATA", { x: 5.35, y: 1.2, w: 4.3, h: 0.55, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  s.addText("Control (8 subjects)", { x: 5.4, y: 1.88, w: 4.1, h: 0.35, fontSize: 12, bold: true, color: C.ltAmber, fontFace: "Calibri", margin: 0 });
  ["3912633","4068015","4137123","4329285","4757853","5141475","5360954","5409426"].forEach((subj, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    s.addText(`○  ${subj}`, { x: 5.4+col*2.1, y: 2.28+row*0.32, w: 2.0, h: 0.3, fontSize: 10, color: "FBBF24", fontFace: "Calibri", margin: 0 });
  });
  s.addText("Dup15q (11 subjects) — NKT format", { x: 5.4, y: 3.62, w: 4.1, h: 0.35, fontSize: 11, bold: true, color: C.ltAmber, fontFace: "Calibri", margin: 0 });
  s.addText("4546621 · 4574335 · 4646135 · 4672497 · 4745551 · 4939552 · 4959323 · 4969700 · 4981316 · 5158834 · 5426282", { x: 5.4, y: 3.97, w: 4.1, h: 0.52, fontSize: 10, color: "FBBF24", fontFace: "Calibri", margin: 0 });
  s.addText("Next step: Run MATLAB pipeline on Control & Dup15q groups to enable cross-group comparison", { x: 0.5, y: 4.92, w: 9.0, h: 0.36, fontSize: 11, color: C.white, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── SECTION DIVIDER — MATLAB / resteeg-master ───────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — resteeg-master: Toolbox Overview
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.code };

  // Teal left stripe
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.ltTeal }, line: { color: C.ltTeal } });

  s.addText("resteeg-master", { x: 0.4, y: 0.2, w: 9.2, h: 0.75, fontSize: 36, bold: true, color: C.ltTeal, fontFace: "Consolas", align: "center", margin: 0 });
  s.addText("Automated Analysis of Resting-State EEG for Clinicians", { x: 0.4, y: 0.95, w: 9.2, h: 0.42, fontSize: 15, color: C.slate, fontFace: "Calibri", align: "center", italic: true, margin: 0 });

  // Left: Purpose card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.5, w: 3.8, h: 3.8, fill: { color: "12243A" }, line: { color: C.teal, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.5, w: 3.8, h: 0.48, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("Purpose", { x: 0.35, y: 1.5, w: 3.7, h: 0.48, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  const purposes = [
    { icon: "▸", text: "Single MATLAB function call processes raw EEG through the full pipeline" },
    { icon: "▸", text: "Skips already-completed stages automatically (import / preproc)" },
    { icon: "▸", text: "All parameters are passed via a CONFIG struct — reproducible & auditable" },
    { icon: "▸", text: "Generates topomaps, TF spectrograms, and Excel power tables automatically" },
    { icon: "▸", text: "Batch-processes multiple subjects in a loop from one config file" },
  ];
  purposes.forEach((p, i) => {
    s.addText(`${p.icon}  ${p.text}`, { x: 0.45, y: 2.1+i*0.58, w: 3.5, h: 0.52, fontSize: 11, color: C.ice, fontFace: "Calibri", margin: 0 });
  });

  // Right: File tree
  s.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 1.5, w: 5.2, h: 3.8, fill: { color: "12243A" }, line: { color: C.ltTeal, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 1.5, w: 5.2, h: 0.48, fill: { color: C.ltTeal }, line: { color: C.ltTeal } });
  s.addText("File Structure", { x: 4.55, y: 1.5, w: 5.1, h: 0.48, fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  const tree = [
    { indent: 0, text: "resteeg-master/",          color: C.ltTeal,  bold: true },
    { indent: 1, text: "resteeg.m",                color: "F0E68C",  bold: true },
    { indent: 2, text: "← main function (entry)",  color: C.slate,   bold: false, italic: true },
    { indent: 1, text: "tutorial_resteeg_vidya.m", color: "98FB98",  bold: true },
    { indent: 2, text: "← our config & run script",color: C.slate,   bold: false, italic: true },
    { indent: 1, text: "functions/",               color: C.ltTeal,  bold: true },
    { indent: 2, text: "prep_import.m",            color: C.codeTxt, bold: false },
    { indent: 2, text: "prep_proc.m",              color: C.codeTxt, bold: false },
    { indent: 2, text: "gen_report_materials.m",   color: C.codeTxt, bold: false },
    { indent: 2, text: "export_feature.m",         color: C.codeTxt, bold: false },
    { indent: 2, text: "export_excel.m",           color: C.codeTxt, bold: false },
    { indent: 1, text: "chanlocs/",                color: C.ltTeal,  bold: true },
    { indent: 2, text: "chanlocs_nihonkohden.mat", color: C.codeTxt, bold: false },
  ];
  tree.forEach((item, i) => {
    const prefix = item.indent === 0 ? "" : item.indent === 1 ? "  ├─ " : "  │     ";
    s.addText(`${prefix}${item.text}`, {
      x: 4.6, y: 2.05+i*0.25, w: 5.0, h: 0.25,
      fontSize: 11, bold: item.bold, italic: item.italic||false,
      color: item.color, fontFace: "Consolas", margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Entry Point: tutorial_resteeg_vidya.m
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: "1E8A5E" }, line: { color: "1E8A5E" } });
  s.addText("tutorial_resteeg_vidya.m  —  Entry Point", { x: 0.45, y: 0.2, w: 9.1, h: 0.6, fontSize: 26, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addText("How to run the pipeline on new subjects", { x: 0.45, y: 0.78, w: 9.1, h: 0.32, fontSize: 13, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });

  // 5 step flow
  const steps = [
    { n: "1", title: "Setup Paths",      color: C.teal,   detail: "uigetdir() prompts for EEGLAB folder, resteeg folder.\nSets chanlocs path → chanlocs_nihonkohden.mat" },
    { n: "2", title: "Select Files",     color: "1E8A5E", detail: "uigetfile() to pick one or more .set files.\nSupports multi-select for batch processing." },
    { n: "3", title: "Configure",        color: C.purple, detail: "Set CONFIG struct:\n  filter: HP 1 Hz, LP 55 Hz  |  reref: average\n  ASR cutoff: 20  |  ICLabel threshold: 0.5\n  Time window: [1, 21591] sec" },
    { n: "4", title: "Run Loop",         color: C.amber,  detail: "for each file → CONFIG.filename = file\nCONFIG = resteeg(CONFIG)\nFailed files caught and logged." },
    { n: "5", title: "Export to Excel",  color: C.navy,   detail: "uigetfile_n_dir selects report folders.\nexport_feature() → export_excel()\nOutputs: Result_Baseline_Power.xlsx" },
  ];

  steps.forEach((st, i) => {
    const x = 0.25 + i * 1.9;
    const w = 1.75;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.25, w, h: 3.85, fill: { color: C.white }, line: { color: st.color, width: 2 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.25, w, h: 0.62, fill: { color: st.color }, line: { color: st.color } });
    s.addText(`${st.n}`, { x, y: 1.25, w: 0.45, h: 0.62, fontSize: 22, bold: true, color: "CCCCCC", fontFace: "Georgia", align: "center", valign: "middle", margin: 0 });
    s.addText(st.title, { x: x+0.42, y: 1.3, w: w-0.5, h: 0.55, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", margin: 0 });
    s.addText(st.detail, { x: x+0.1, y: 2.0, w: w-0.18, h: 2.9, fontSize: 10, color: C.dark, fontFace: "Calibri", margin: 0 });

    // Arrow between steps
    if (i < steps.length - 1) {
      s.addText("▶", { x: x+w, y: 2.55, w: 0.2, h: 0.35, fontSize: 13, color: C.slate, align: "center", margin: 0 });
    }
  });

  // Code snippet
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 5.12, w: 9.5, h: 0.38, fill: { color: C.code }, line: { color: C.teal, width: 1 } });
  s.addText("CONFIG = resteeg(CONFIG);   % called once per subject inside the for-loop", {
    x: 0.35, y: 5.13, w: 9.3, h: 0.35,
    fontSize: 11, color: "98FB98", fontFace: "Consolas", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — resteeg.m: Main Function Flow
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("resteeg.m  —  Main Function", { x: 0.45, y: 0.18, w: 9.1, h: 0.62, fontSize: 28, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });
  s.addText("Smart caching: each stage checks for existing output before re-running", { x: 0.45, y: 0.78, w: 9.1, h: 0.32, fontSize: 12, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });

  // Left column: flow boxes
  const blocks = [
    { title: "① Import",          fn: "prep_import(CONFIG)",           color: C.teal,   cached: "*_import.set", detail: "EDF/BDF/SET → EEGLAB format\nChannel removal + location assign\nTime window selection" },
    { title: "② Preprocessing",   fn: "prep_proc(EEG, CONFIG)",        color: C.navy,   cached: "*_prep.set",   detail: "Filter → Bad ch. removal → Reref\nCleanLine (60/120 Hz)\nASR → ICA + ICLabel rejection" },
    { title: "③ Power Analysis",  fn: "power_analysis(EEG, CONFIG)",   color: C.purple, cached: null,           detail: "PSD via spectopo() → 5 bands\nAbsolute + relative power\nFrontal alpha asymmetry (F3/F4, F7/F8)" },
    { title: "④ TF Analysis",     fn: "time_freq_analysis(EEG, CONFIG)",color: "028090", cached: null,           detail: "Hann-windowed STFT\nSpectrogram 1–50 Hz, log power\nSaves tfplot_{channel}.png per channel" },
    { title: "⑤ Generate Report", fn: "gen_report_materials(EEG, CONFIG)", color: C.green, cached: null,         detail: "Saves CONFIG.mat\n10× topomap PNGs (power + rpower)\nOptional: gen_report()" },
  ];

  blocks.forEach((b, i) => {
    const y = 1.18 + i * 0.86;
    const h = 0.78;

    // Main box
    s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y, w: 5.6, h, fill: { color: "F8FAFC" }, line: { color: b.color, width: 2 }, shadow: makeShadow() });
    // Left color bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y, w: 0.12, h, fill: { color: b.color }, line: { color: b.color } });
    // Title
    s.addText(b.title, { x: 0.45, y: y+0.04, w: 1.6, h: 0.35, fontSize: 13, bold: true, color: b.color, fontFace: "Calibri", margin: 0 });
    // Function call
    s.addShape(pres.shapes.RECTANGLE, { x: 2.1, y: y+0.05, w: 3.65, h: 0.3, fill: { color: C.code }, line: { color: C.code } });
    s.addText(b.fn, { x: 2.15, y: y+0.05, w: 3.6, h: 0.3, fontSize: 10, color: C.codeTxt, fontFace: "Consolas", valign: "middle", margin: 0 });
    // Detail
    s.addText(b.detail, { x: 0.45, y: y+0.38, w: 5.25, h: 0.36, fontSize: 10, color: C.mid, fontFace: "Calibri", margin: 0 });

    // Arrow down (except last)
    if (i < blocks.length - 1) {
      s.addText("▼", { x: 2.7, y: y+h, w: 0.3, h: 0.12, fontSize: 10, color: C.slate, align: "center", margin: 0 });
    }
  });

  // Right column: caching info box
  s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y: 1.18, w: 3.6, h: 3.3, fill: { color: C.ltAmber }, line: { color: C.amber, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y: 1.18, w: 3.6, h: 0.48, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("Smart Skip / Cache", { x: 6.2, y: 1.18, w: 3.5, h: 0.48, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  const cacheItems = [
    { file: "*_import.set exists?",  flag: "FORCE_RUN_IMPORT = 0", action: "Skip import, load from disk" },
    { file: "*_prep.set exists?",    flag: "FORCE_RUN_PREPROC = 0",action: "Skip preprocessing, load from disk" },
  ];
  cacheItems.forEach((c, i) => {
    const y = 1.8 + i * 0.85;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y, w: 3.4, h: 0.75, fill: { color: C.white }, line: { color: C.amber, width: 1 } });
    s.addText(c.file,   { x: 6.32, y: y+0.04, w: 3.25, h: 0.26, fontSize: 10, bold: true, color: C.amber, fontFace: "Consolas", margin: 0 });
    s.addText(c.flag,   { x: 6.32, y: y+0.28, w: 3.25, h: 0.22, fontSize: 9, color: C.mid, fontFace: "Consolas", italic: true, margin: 0 });
    s.addText(`→ ${c.action}`, { x: 6.32, y: y+0.49, w: 3.25, h: 0.22, fontSize: 10, color: C.dark, fontFace: "Calibri", margin: 0 });
  });

  // CONFIG keys
  s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y: 4.6, w: 3.6, h: 0.85, fill: { color: "E0E9F4" }, line: { color: C.navy, width: 1 } });
  s.addText("SAVESET = 1  →  writes .set files after each stage\ndouble_precision = 0  →  use float (faster)\nEXPORT_REPORT = 0  →  skip PDF report", {
    x: 6.25, y: 4.65, w: 3.4, h: 0.75,
    fontSize: 10, color: C.navy, fontFace: "Consolas", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Stage 1 & 2 Deep Dive: Import + Preprocessing
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("Stage 1 & 2 Deep Dive  —  Import & Preprocessing", { x: 0.35, y: 0.18, w: 9.3, h: 0.62, fontSize: 26, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });

  // ── LEFT: prep_import.m ──
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.95, w: 4.45, h: 4.45, fill: { color: C.white }, line: { color: C.teal, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.95, w: 4.45, h: 0.52, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("prep_import.m  —  Stage 1: Import", { x: 0.3, y: 0.95, w: 4.35, h: 0.52, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  const importSteps = [
    { fn: "import_data()",    desc: "Loads EDF/BDF via pop_biosig()\nor .set via pop_loadset()\nStores nbchan, srate, xmax in rawinfo" },
    { fn: "remove_channel()", desc: "Removes user-specified non-EEG\nchannels via pop_select()\n(e.g. EMG, ECG, DC channels)" },
    { fn: "import_chanlocs()",desc: "Loads chanlocs_nihonkohden.mat\nAssigns 3D electrode positions\nFallback: template lookup" },
    { fn: "select_time()",    desc: "Trims to CONFIG.time_window\n[1, 21591] sec for our data\n(~6 hours overnight)" },
  ];
  importSteps.forEach((st, i) => {
    const y = 1.58 + i * 0.93;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.25, h: 0.82, fill: { color: "F0F9FF" }, line: { color: "BAE6FD", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.1, h: 0.82, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(st.fn, { x: 0.52, y: y+0.04, w: 3.95, h: 0.27, fontSize: 11, bold: true, color: C.teal, fontFace: "Consolas", margin: 0 });
    s.addText(st.desc, { x: 0.52, y: y+0.30, w: 3.95, h: 0.48, fontSize: 10, color: C.dark, fontFace: "Calibri", margin: 0 });
    if (i < importSteps.length - 1) s.addText("▼", { x: 2.35, y: y+0.82, w: 0.3, h: 0.12, fontSize: 9, color: C.teal, align: "center", margin: 0 });
  });

  // ── RIGHT: prep_proc.m ──
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 0.95, w: 4.45, h: 4.45, fill: { color: C.white }, line: { color: C.navy, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 0.95, w: 4.45, h: 0.52, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("prep_proc.m  —  Stage 2: Preprocessing", { x: 5.35, y: 0.95, w: 4.35, h: 0.52, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  const procSteps = [
    { fn: "filter_data()",      desc: "HP: 1 Hz FIR  |  LP: 55 Hz FIR\npop_eegfiltnew()", tag: "Basic" },
    { fn: "remove_badchan()",   desc: "pop_rejchan (±3 SD spectral)\nclean_flatlines + clean_channels\n(flatline 5s, corr 0.6, noise 4 SD)", tag: "Basic" },
    { fn: "interp_badchan()",   desc: "Spherical interpolation\nof removed bad channels\npop_interp()", tag: "Basic" },
    { fn: "reref_data()",       desc: "Average reference\npop_reref(EEG, [])", tag: "Basic" },
    { fn: "remove_linenoise()", desc: "CleanLine plugin: 60 + 120 Hz\npop_cleanline()", tag: "Adv." },
    { fn: "asr_autoclean()",    desc: "Artifact Subspace Reconstruction\nstdcutoff = 20\nclean_asr()", tag: "Adv." },
    { fn: "ica_autoclean()",    desc: "runica ICA → ICLabel classifier\nReject: Muscle/Eye/Heart/Line/Chan\nthreshold = 0.5", tag: "Adv." },
  ];
  const tagColors = { "Basic": C.teal, "Adv.": C.purple };
  procSteps.forEach((st, i) => {
    const y = 1.58 + i * 0.54;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y, w: 4.25, h: 0.47, fill: { color: "F5F3FF" }, line: { color: "C4B5FD", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y, w: 0.1, h: 0.47, fill: { color: tagColors[st.tag] }, line: { color: tagColors[st.tag] } });
    // Tag badge
    s.addShape(pres.shapes.RECTANGLE, { x: 9.3, y: y+0.06, w: 0.38, h: 0.22, fill: { color: tagColors[st.tag] }, line: { color: tagColors[st.tag] } });
    s.addText(st.tag, { x: 9.3, y: y+0.06, w: 0.38, h: 0.22, fontSize: 8, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(st.fn, { x: 5.55, y: y+0.03, w: 3.0, h: 0.2, fontSize: 10, bold: true, color: tagColors[st.tag], fontFace: "Consolas", margin: 0 });
    s.addText(st.desc, { x: 5.55, y: y+0.22, w: 3.65, h: 0.22, fontSize: 9, color: C.mid, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11 — Stage 3: Power & TF Analysis
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.10, fill: { color: C.purple }, line: { color: C.purple } });
  s.addText("Stage 3 Deep Dive  —  Power & Time-Frequency Analysis", { x: 0.35, y: 0.18, w: 9.3, h: 0.62, fontSize: 24, bold: true, color: C.navy, fontFace: "Georgia", margin: 0 });

  // ── power_analysis() ──
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.95, w: 4.5, h: 4.4, fill: { color: "F5F3FF" }, line: { color: C.purple, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.95, w: 4.5, h: 0.52, fill: { color: C.purple }, line: { color: C.purple } });
  s.addText("power_analysis()  —  resteeg.m", { x: 0.3, y: 0.95, w: 4.4, h: 0.52, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.55, w: 4.3, h: 1.25, fill: { color: C.code }, line: { color: "4B0082", width: 1 } });
  s.addText(
    "[spectra, freqs] = spectopo(EEG.data, 0, EEG.srate);\n\npower_delta = mean(10.^(spectra(:, freqs>=1 & freqs<4)/10), 2);\npower_alpha = mean(10.^(spectra(:, freqs>=8 & freqs<13)/10), 2);\n...\ntotal = sum([delta, theta, alpha, beta, gamma], 2);\nrpower_delta = power_delta ./ total;",
    { x: 0.42, y: 1.58, w: 4.15, h: 1.18, fontSize: 9, color: C.codeTxt, fontFace: "Consolas", margin: 0 }
  );

  const powerItems = [
    { label: "PSD method",        val: "spectopo() — EEGLAB's FFT-based power spectral density" },
    { label: "5 bands computed",  val: "Delta 1–4  |  Theta 4–8  |  Alpha 8–13  |  Beta 13–30  |  Gamma 30–50 Hz" },
    { label: "Relative power",    val: "Each band / sum of all 5 bands (0–1 normalized)" },
    { label: "Alpha asymmetry",   val: "(F3−F4)/(F3+F4)  and  (F7−F8)/(F7+F8) — frontal lateralization index" },
  ];
  powerItems.forEach((item, i) => {
    const y = 2.9 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.3, h: 0.52, fill: { color: C.white }, line: { color: "D8B4FE", width: 1 } });
    s.addText(item.label, { x: 0.45, y: y+0.04, w: 1.35, h: 0.22, fontSize: 10, bold: true, color: C.purple, fontFace: "Calibri", margin: 0 });
    s.addText(item.val,   { x: 0.45, y: y+0.26, w: 4.1, h: 0.22, fontSize: 10, color: C.dark, fontFace: "Calibri", margin: 0 });
  });

  // ── time_freq_analysis() ──
  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 0.95, w: 4.5, h: 4.4, fill: { color: "F0FDF4" }, line: { color: "028090", width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 0.95, w: 4.5, h: 0.52, fill: { color: "028090" }, line: { color: "028090" } });
  s.addText("time_freq_analysis()  —  resteeg.m", { x: 5.3, y: 0.95, w: 4.4, h: 0.52, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 1.55, w: 4.3, h: 1.25, fill: { color: C.code }, line: { color: "014D40", width: 1 } });
  s.addText(
    "window = hann(window_len * EEG.srate);  % 5-sec Hann\nnoverlap = floor(length(window) / 2);\nnfft = max(256, 2.^ceil(log2(length(window))));\n[s, f, t] = spectrogram(EEG.data(ch,:), window,\n              noverlap, nfft, EEG.srate);\nlog_power = log(abs(s(freq_range,:)).^2);",
    { x: 5.42, y: 1.58, w: 4.15, h: 1.18, fontSize: 9, color: "A8F0D0", fontFace: "Consolas", margin: 0 }
  );

  const tfItems = [
    { label: "Window",        val: "5-second Hann window (configurable via timefreq_window_len)" },
    { label: "Overlap",       val: "50% overlap (floor(window/2) samples)" },
    { label: "Freq. range",   val: "1–50 Hz displayed  |  NFFT = next power of 2 ≥ window length" },
    { label: "Color scale",   val: "log power, clipped to [0.25th percentile, max]  |  jet colormap" },
    { label: "Channels",      val: "CONFIG.report.timefreq_plot_chan = {T3, T4, P3, P4} in our setup" },
    { label: "Output",        val: "tfplot_{channel}.png saved to report directory" },
  ];
  tfItems.forEach((item, i) => {
    const y = 2.9 + i * 0.41;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 4.3, h: 0.36, fill: { color: C.white }, line: { color: "6EE7B7", width: 1 } });
    s.addText(item.label, { x: 5.45, y: y+0.05, w: 1.15, h: 0.22, fontSize: 9, bold: true, color: "028090", fontFace: "Calibri", margin: 0 });
    s.addText(item.val,   { x: 6.6,  y: y+0.05, w: 2.98, h: 0.22, fontSize: 9, color: C.dark, fontFace: "Calibri", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "/Users/vidyasaravanapandian/ClaudeCode/EEG_Research_Overview.pptx" })
  .then(() => console.log("✅ Saved: EEG_Research_Overview.pptx  (11 slides)"))
  .catch(e => console.error("❌", e));
