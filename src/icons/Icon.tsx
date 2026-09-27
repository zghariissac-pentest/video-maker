import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, GLOWS, type GlowKey } from "../profx/Theme";
import * as Lucide from "lucide-react";
import * as Phosphor from "phosphor-react";
import { ICONS as CustomIcons } from "../profx/Icons";
import { ICON_CATALOG, type CatalogName } from "./catalog";

export type IconAnimation = "draw" | "pop" | "pulse" | "spin" | "none";
export type IconProps = { name: CatalogName | string; size?: number; color?: string; glow?: GlowKey | "none"; strokeWidth?: number; delay?: number; duration?: number; animation?: IconAnimation; spinSpeed?: number; };
const drawProgress = (frame: number, delay: number, dur: number) => interpolate(frame, [delay, delay + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const LUCIDE_MAP: Record<string, React.ComponentType<any>> = { "shield-check": Lucide.ShieldCheck, "lock": Lucide.Lock, "unlock": Lucide.Unlock, "bug": Lucide.Bug, "terminal": Lucide.Terminal, "code-2": Lucide.Code2, "server": Lucide.Server, "database": Lucide.Database, "globe": Lucide.Globe, "wifi": Lucide.Wifi, "radar": Lucide.Radar, "eye": Lucide.Eye, "eye-off": Lucide.EyeOff, "key-round": Lucide.KeyRound, "cpu": Lucide.Cpu, "zap": Lucide.Zap, "shield-alert": Lucide.ShieldAlert, "skull": Lucide.Skull, "network": Lucide.Network, "layers": Lucide.Layers, "boxes": Lucide.Boxes, "cloud": Lucide.Cloud, "search": Lucide.Search, "scan": Lucide.Scan, "crosshair": Lucide.Crosshair, "target": Lucide.Target, "activity": Lucide.Activity, "line-chart": Lucide.LineChart, "fingerprint": Lucide.Fingerprint, "binary": Lucide.Binary, "atom": Lucide.Atom, "flame": Lucide.Flame, "rocket": Lucide.Rocket, "lightbulb": Lucide.Lightbulb, "sparkles": Lucide.Sparkles, "anvil": Lucide.Anvil, "hammer": Lucide.Hammer, "wrench": Lucide.Wrench, "file-code": Lucide.FileCode, };
const PH_MAP: Record<string, React.ComponentType<any>> = { "shield-check": Phosphor.ShieldCheck, "code": Phosphor.Code, "bug": Phosphor.Bug, "lock-key": Phosphor.LockKey, "globe": Phosphor.Globe, "cpu": Phosphor.Cpu, "network": (Phosphor as any).Graph ?? Phosphor.Globe, };
const DEV_MAP: Record<string, React.ComponentType<any>> = {};
export const Icon: React.FC<IconProps> = ({ name, size = 56, color, glow = "cyan", strokeWidth = 2, delay = 0, duration = 26, animation = "draw", spinSpeed = 120 }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig(); const c = color ?? CYBER.cyan;
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 160 } });
  const progress = drawProgress(frame, delay, duration);
  const entry = (ICON_CATALOG as Record<string, any>)[name];
  const set = entry?.set ?? (name.startsWith("lucide:") ? "lucide" : name.startsWith("ph:") ? "phosphor" : name.startsWith("dev:") ? "dev" : "lucide");
  const key = name.includes(":") ? name.split(":")[1] : name;
  let transform = ""; let opacity = 1; let filter = glow === "none" ? undefined : GLOWS[glow as GlowKey];
  if (animation === "pop") { const scale = interpolate(s, [0, 1], [0.5, 1]); transform = `scale(${scale})`; opacity = s; }
  else if (animation === "pulse") { const pulse = 1 + Math.sin(frame * 0.18) * 0.06; transform = `scale(${pulse})`; }
  else if (animation === "spin") { const rot = ((frame - delay) / spinSpeed) * 360; transform = `rotate(${rot}deg)`; }
  else if (animation === "draw") { opacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const sc = interpolate(progress, [0, 1], [0.92, 1]); transform = `scale(${sc})`; }
  const wrapperStyle: React.CSSProperties = { width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", opacity, transform, filter };
  if (set === "custom") { const Comp = (CustomIcons as Record<string, React.FC<any>>)[key] ?? (CustomIcons as Record<string, React.FC<any>>)[name]; if (Comp) return <span style={wrapperStyle}><Comp size={size} color={c} glow={glow} strokeWidth={strokeWidth} delay={delay} drawDuration={duration} /></span>; }
  if (set === "lucide") { const Comp = LUCIDE_MAP[key] ?? (Lucide as any)[key] ?? Lucide.Box; return <span style={wrapperStyle}><Comp size={size} color={c} strokeWidth={strokeWidth} /></span>; }
  if (set === "phosphor") { const Comp = PH_MAP[key] ?? (Phosphor as any)[key] ?? Phosphor.Cube; return <span style={wrapperStyle}><Comp size={size} color={c} weight={strokeWidth > 2 ? "bold" : "regular"} /></span>; }
  if (set === "dev") { return <span style={wrapperStyle}><Lucide.Box size={size} color={c} strokeWidth={strokeWidth} /></span>; }
  if (set === "emoji") { const emojiMap: Record<string, string> = { rocket: "🚀", fire: "🔥", shield: "🛡️", skull: "💀", eye: "👁️" }; return <span style={{ ...wrapperStyle, fontSize: size * 0.85, lineHeight: 1 }}>{emojiMap[key] ?? "✦"}</span>; }
  return <span style={wrapperStyle}><Lucide.Box size={size} color={c} strokeWidth={strokeWidth} /></span>;
};
export const IconGrid: React.FC<{ names: (CatalogName | string)[]; size?: number; color?: string; columns?: number; stagger?: number }> = ({ names, size = 48, color, columns = 6, stagger = 5 }) => {
  const frame = useCurrentFrame();
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 18 }}>{names.map((n, i) => { const d = i * stagger; const op = interpolate(frame - d, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return <div key={n + i} style={{ opacity: op, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}><Icon name={n} size={size} color={color} delay={d} animation="pop" /><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: CYBER.muted, textAlign: "center", wordBreak: "break-all" }}>{n}</span></div>; })}</div>;
};
