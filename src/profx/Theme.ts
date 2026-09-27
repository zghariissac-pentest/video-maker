import { Easing } from "remotion";

// Cyber / hacker artisan palette used across the toolkit.
export const CYBER = {
  // base surfaces
  bg0: "#030509",
  bg1: "#070b12",
  panel: "rgba(8,14,24,0.72)",
  // accent gradients (cyan -> neon green -> magenta)
  cyan: "#22d3ee",
  green: "#22c55e",
  magenta: "#e879f9",
  amber: "#fbbf24",
  red: "#ef4444",
  // text
  white: "#eaf7ff",
  muted: "#7c93ad",
  dim: "#42526b",
  // strokes
  line: "rgba(34,211,238,0.35)",
  line2: "rgba(232,121,249,0.35)",
};

export type Accent = keyof typeof CYBER;

// Shared motion choreography — snappy on entry, buttery off-beat.
export const EASE = {
  // fast pop-in for UI elements
  pop: Easing.out(Easing.cubic),
  // smooth long slides
  glide: Easing.inOut(Easing.cubic),
  // springy overshoot feel via easing (approx)
  smash: Easing.out(Easing.back(1.8)),
  // organic breathing
  breathe: Easing.inOut(Easing.sin),
};

export const GLOWS = {
  cyan: `drop-shadow(0 0 6px rgba(34,211,238,0.9)) drop-shadow(0 0 18px rgba(34,211,238,0.35))`,
  green: `drop-shadow(0 0 6px rgba(34,197,94,0.9)) drop-shadow(0 0 18px rgba(34,197,94,0.35))`,
  magenta: `drop-shadow(0 0 6px rgba(232,121,249,0.9)) drop-shadow(0 0 18px rgba(232,121,249,0.35))`,
  red: `drop-shadow(0 0 6px rgba(239,68,68,0.9)) drop-shadow(0 0 18px rgba(239,68,68,0.4))`,
} as const;

export type GlowKey = keyof typeof GLOWS;

export const FONT = {
  mono: `'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`,
  display: `'Changa', ui-sans-serif, system-ui, sans-serif`,
  arabic: `'Cairo', ui-sans-serif, system-ui, sans-serif`,
};

export const THEMES = {
  cyber: CYBER,
  midnight: { bg0: "#070A12", bg1: "#0B1020", panel: "rgba(12,18,36,0.78)", cyan: "#38bdf8", green: "#34d399", magenta: "#c084fc", amber: "#fbbf24", red: "#f87171", white: "#f1f5f9", muted: "#94a3b8", dim: "#475569", line: "rgba(56,189,248,0.3)", line2: "rgba(192,132,252,0.3)" },
  neon: { bg0: "#040008", bg1: "#0a0620", panel: "rgba(18,8,40,0.72)", cyan: "#00E5FF", green: "#00FF85", magenta: "#FF00E5", amber: "#FFD600", red: "#FF3B30", white: "#ffffff", muted: "#9aa0c8", dim: "#5a5e8a", line: "rgba(0,229,255,0.4)", line2: "rgba(255,0,229,0.4)" },
  chalk: { bg0: "#0A0A0B", bg1: "#141416", panel: "rgba(28,28,32,0.82)", cyan: "#E8E6E1", green: "#FFD23F", magenta: "#FF3B2F", amber: "#FFF7E0", red: "#FF3B2F", white: "#FFF7E0", muted: "#8a8884", dim: "#5a5957", line: "rgba(255,242,208,0.25)", line2: "rgba(255,59,47,0.25)" },
  paper: { bg0: "#F8F7F4", bg1: "#EFEDE8", panel: "rgba(255,255,255,0.92)", cyan: "#0ea5e9", green: "#059669", magenta: "#db2777", amber: "#d97706", red: "#dc2626", white: "#0f172a", muted: "#64748b", dim: "#94a3b8", line: "rgba(14,165,233,0.2)", line2: "rgba(219,39,119,0.2)" },
} as const;
export type ThemeName = keyof typeof THEMES;

// A dotted "circuit" background you can layer under any scene.
export const circuitBackground = (color: string, dot = 3, gap = 46, bleed = 0.35) =>
  `radial-gradient(circle, ${color} ${dot}px, transparent ${dot + 1}px) 0 0 / ${gap}px ${gap}px, ` +
  `radial-gradient(circle, ${color} ${bleed}px, transparent ${dot + 1}px) ${gap / 2}px ${gap / 2}px / ${gap}px ${gap}px`;
