import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CYBER, GLOWS, type GlowKey } from "./Theme";

// A crisp, monoline icon system with a hand-drawn "stroke draw-in" animation.
// Every icon path uses pathLength={1} so dashoffset 1->0 = stroke draws itself.

const draw = (frame: number, delay: number, dur: number): number => {
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return 1 - p;
};

export type IconProps = {
  size?: number;
  color?: string;
  glow?: GlowKey | "none";
  strokeWidth?: number;
  delay?: number;
  drawDuration?: number;
};

const IconShell: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 72,
  color,
  glow = "cyan",
  strokeWidth = 2.5,
  delay = 0,
  drawDuration = 30,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = color ?? CYBER.cyan;
  const settle = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 140 } });
  const drop = drawDuration > 0 ? draw(frame, delay, drawDuration) : 0;

  const svgStyle: React.CSSProperties = glow === "none" ? {} : { filter: GLOWS[glow] };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={c}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...svgStyle,
        opacity: interpolate(settle, [0, 1], [0, 1]),
        transform: `scale(${interpolate(settle, [0, 1], [0.6, 1])})`,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<{ pathLength?: number; strokeDasharray?: string; strokeDashoffset?: string }>(child)
          ? React.cloneElement(child, {
              pathLength: 1,
              strokeDasharray: "1",
              strokeDashoffset: String(drop),
            })
          : child,
      )}
    </svg>
  );
};

const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} />;

export const IconTarget: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    {C(24, 24, 16)}
    {C(24, 24, 9)}
    {C(24, 24, 2)}
    <path d="M24 4v6M24 38v6M4 24h6M38 24h6" />
  </IconShell>
);

export const IconShield: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M24 6l14 6v9c0 8-6 14-14 17-8-3-14-9-14-17v-9l14-6z" />
    <path d="M17 24l5 5 9-10" />
  </IconShell>
);

export const IconBug: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <circle cx={24} cy={30} r={10} />
    <path d="M24 20v-6M24 14c-3 0-6-2-6-5 2 0 3 1 4 2 0-2 0-3-2-5 2 0 3 1 4 3 1-2 2-3 4-3-2 2-2 3-2 5 1-1 2-2 4-2 0 3-3 5-6 5z" />
    <path d="M24 20l4-5M24 20l-4-5M12 24h-6M12 36H5M36 24h6M36 36h7" />
  </IconShell>
);

export const IconTerminal: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <rect x={4} y={8} width={40} height={30} rx={3} />
    <path d="M12 17l6 5-6 5M24 27h10" />
  </IconShell>
);

export const IconLock: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <rect x={10} y={20} width={28} height={20} rx={3} />
    <path d="M16 20v-6a8 8 0 0116 0v6" />
    <circle cx={24} cy={29} r={3} />
    <path d="M24 32v4" />
  </IconShell>
);

export const IconServer: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <rect x={8} y={5} width={32} height={13} rx={2} />
    <rect x={8} y={30} width={32} height={13} rx={2} />
    <path d="M15 11h.01M15 36h.01M22 11h.01M22 36h.01" />
  </IconShell>
);

export const IconRadar: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    {C(24, 24, 16)}
    {C(24, 24, 9)}
    {C(24, 24, 2)}
    <path d="M24 24L37 15" />
    <path d="M24 8v-4M24 44v-4M8 24H4M44 24h-4" />
  </IconShell>
);

export const IconEye: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M4 24c4-7 11-11 20-11s16 4 20 11c-4 7-11 11-20 11S8 31 4 24z" />
    {C(24, 24, 5)}
  </IconShell>
);

export const IconSkull: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M24 8c-9 0-16 6-16 14 0 4 2 7 5 9v5a2 2 0 002 2h4v-4h4v4h2v-4h4v4h4a2 2 0 002-2v-5c3-2 5-5 5-9 0-8-7-14-16-14z" />
    <path d="M18 19h.01M30 19h.01" />
  </IconShell>
);

export const IconKey: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <circle cx={12} cy={20} r={7} />
    <path d="M17 25l14 14M27 35l4 4M24 32l3 3" />
  </IconShell>
);

export const IconNetwork: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    {C(24, 12, 5)}
    {C(9, 34, 5)}
    {C(39, 34, 5)}
    <path d="M20 16l-8 14M28 16l8 14M14 34h20" />
  </IconShell>
);

export const IconBraces: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M14 8c-4 0-6 3-6 6 0 4-2 5-2 5s2 1 2 5c0 3 2 6 6 6M34 8c4 0 6 3 6 6 0 4 2 5 2 5s-2 1-2 5c0 3-2 6-6 6" />
  </IconShell>
);

export const IconGlobe: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    {C(24, 24, 16)}
    <path d="M8 24h32M24 8c5 5 5 27 0 32M24 8c-5 5-5 27 0 32" />
  </IconShell>
);

export const IconWifi: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M6 18c5-5 11-7 18-7s13 2 18 7M11 24c4-4 8-5 13-5s9 1 13 5M17 30c2-2 5-3 7-3s5 1 7 3" />
    <path d="M24 36h.01" />
  </IconShell>
);

export const IconBolt: React.FC<IconProps> = (p) => (
  <IconShell {...p}>
    <path d="M27 4L10 27h11l-2 17 17-23H25l2-17z" />
  </IconShell>
);

// A battery that "charges" as the frame progresses — great for explainers.
export const IconBattery: React.FC<IconProps & { level?: number }> = ({
  level = 0.7,
  ...p
}) => {
  const frame = useCurrentFrame();
  const lvl = interpolate(frame, [0, 60], [0, level], {
    extrapolateRight: "clamp",
  });
  return (
    <IconShell {...p}>
      <rect x={5} y={13} width={34} height={20} rx={3} />
      <path d="M42 19v8" />
      <rect x={9} y={17} width={26 * lvl} height={12} rx={1.5} fill={p.color ?? CYBER.cyan} />
    </IconShell>
  );
};

export const ICONS = {
  target: IconTarget,
  shield: IconShield,
  bug: IconBug,
  terminal: IconTerminal,
  lock: IconLock,
  server: IconServer,
  radar: IconRadar,
  eye: IconEye,
  skull: IconSkull,
  key: IconKey,
  network: IconNetwork,
  braces: IconBraces,
  globe: IconGlobe,
  wifi: IconWifi,
  bolt: IconBolt,
} as const;

export type IconName = keyof typeof ICONS;
