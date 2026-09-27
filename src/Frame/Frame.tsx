import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

// ── ADVANCED SKETCHY CARTOON — DARK, CLEAN, HAND-DRAWN REALISM ────
const BG = '#08080B';
const CHALK = '#FFF7E0';
const ACCENT = '#FF3B2F';
const ACCENT2 = '#FFD23F';

// Natural hand speed: slow → fast → slow, with pressure variation
const HAND_EASE = Easing.bezier(0.22, 1, 0.36, 1);
const SCRIBBLE_EASE = Easing.bezier(0.32, 0.72, 0, 1);
const POP_EASE = Easing.out(Easing.back(1.6));

const boil = (frame: number, seed: number, amp = 1) =>
  Math.sin(frame * 0.62 + seed * 1.91) * amp * 0.45 + Math.cos(frame * 0.51 + seed * 2.3) * amp * 0.28;

// get point along filament zigzag for pen tracking (piecewise)
const filamentPoints = [
  { x: -22, y: -30 },
  { x: -12, y: -10 },
  { x: -2, y: -30 },
  { x: 8, y: -10 },
  { x: 18, y: -30 },
  { x: 24, y: -12 },
];
const getFilamentPoint = (t: number) => {
  const segs = filamentPoints.length - 1;
  const f = t * segs;
  const i = Math.floor(f);
  const frac = f - i;
  if (i >= segs) return filamentPoints[segs];
  const a = filamentPoints[i];
  const b = filamentPoints[i + 1];
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
};

// get rough point around bulb outline for pen (angle based approximation)
const getBulbOutlinePoint = (t: number) => {
  // t 0..1 travels around bulb clockwise starting top
  // Use piecewise: top -> left bulb -> left neck -> base -> right neck -> right bulb -> top
  if (t < 0.18) {
    const p = t / 0.18;
    return { x: interpolate(p, [0, 1], [0, -72]), y: interpolate(p, [0, 1], [-136, -98]) };
  }
  if (t < 0.38) {
    const p = (t - 0.18) / 0.2;
    return { x: interpolate(p, [0, 1], [-72, -98]), y: interpolate(p, [0, 1], [-98, -56]) };
  }
  if (t < 0.52) {
    const p = (t - 0.38) / 0.14;
    return { x: interpolate(p, [0, 1], [-98, -46]), y: interpolate(p, [0, 1], [-56, 46]) };
  }
  if (t < 0.64) {
    const p = (t - 0.52) / 0.12;
    return { x: interpolate(p, [0, 1], [-46, 34]), y: interpolate(p, [0, 1], [46, 84]) };
  }
  if (t < 0.78) {
    const p = (t - 0.64) / 0.14;
    return { x: interpolate(p, [0, 1], [34, 98]), y: interpolate(p, [0, 1], [84, -14]) };
  }
  const p = (t - 0.78) / 0.22;
  return { x: interpolate(p, [0, 1], [98, 0]), y: interpolate(p, [0, 1], [-14, -136]) };
};

const DarkBG: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Chalk texture filter definition */}
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <filter id="chalk-rough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.92" numOctaves={2} seed={7} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={1.2} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="bulb-fill" cx="38%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#FFF8C6" />
            <stop offset="38%" stopColor="#FFF1A8" />
            <stop offset="72%" stopColor="#FFE585" />
            <stop offset="100%" stopColor="#FFD23F" />
          </radialGradient>
          <radialGradient id="spark-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFF7E0" stopOpacity={0.95} />
            <stop offset="28%" stopColor="#FFD23F" stopOpacity={0.55} />
            <stop offset="58%" stopColor="#FF3B2F" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#FF3B2F" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};

// ── Pen tip that follows drawing ────────────────────────────────────
const PenTip: React.FC<{ x: number; y: number; opacity: number; color?: string; size?: number }> = ({
  x,
  y,
  opacity,
  color = CHALK,
  size = 4.2,
}) => {
  const frame = useCurrentFrame();
  const wob = boil(frame, 99, 0.6);
  return (
    <g opacity={opacity} transform={`translate(${x + wob}, ${y + wob * 0.7})`} style={{ pointerEvents: 'none' }}>
      {/* Chalk tip shadow */}
      <ellipse cx={1} cy={7} rx={size * 0.9} ry={size * 0.45} fill="black" opacity={0.22} style={{ filter: 'blur(2px)' }} />
      {/* Tip body — marker */}
      <g transform="rotate(-42)">
        <rect x={-2.2} y={-10} width={4.4} height={14} rx={2.2} fill={color} stroke={BG} strokeWidth={0.7} />
        <rect x={-1} y={-12} width={2} height={3.5} rx={1} fill={BG} opacity={0.92} />
      </g>
      {/* Ink dot at contact */}
      <circle cx={0} cy={0} r={size * 0.38} fill={BG} opacity={0.14} style={{ filter: 'blur(0.8px)' }} />
    </g>
  );
};

const Bulb: React.FC<{ progress: number; filamentProgress: number; pop: number; frame: number }> = ({
  progress,
  filamentProgress,
  pop,
  frame,
}) => {
  // Advanced hand-draw: not linear — use eased dash + pressure
  const easedDraw = interpolate(progress, [0, 1], [0, 1], { easing: HAND_EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const draw = interpolate(easedDraw, [0, 1], [820, 0]);
  const draw2 = interpolate(easedDraw, [0, 1], [820, 0]); // second rough layer slightly lagging
  const pressure = interpolate(easedDraw, [0, 0.15, 0.55, 0.85, 1], [1.2, 2.8, 3.9, 3.2, 2.4]); // stroke width variation like hand pressure

  // Filament hand scribble: fast, slightly overshoot
  const easedFil = interpolate(filamentProgress, [0, 1], [0, 1], { easing: SCRIBBLE_EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fDraw = interpolate(easedFil, [0, 1], [180, 0]);
  const filamentPenT = easedFil;
  const filamentPen = getFilamentPoint(Math.min(filamentPenT, 0.999));
  const outlinePenT = easedDraw;
  const outlinePen = getBulbOutlinePoint(outlinePenT);

  const popScale = interpolate(
    spring({ frame: frame - 52, fps: 30, config: { damping: 10, stiffness: 170, mass: 0.9 } }),
    [0, 1],
    [0.58, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const popGlow = 0.72 + Math.sin(frame * 0.18) * 0.14 + pop * 0.28;
  const bx = boil(frame, 40, 0.7);
  const by = boil(frame, 41, 0.6) + Math.sin(frame * 0.04) * 1.2;
  const shake = interpolate(pop, [0, 0.22, 0.52, 1], [0, 2.0, -1.0, 0]);

  // Fill reveals *after* outline is 68% done — more realistic (first draw outline, then fill)
  const fillOpacity = interpolate(easedDraw, [0.62, 0.78, 1], [0, 0.55, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fillScale = interpolate(easedDraw, [0.62, 0.78], [0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: POP_EASE });

  // Base appears after outline 75%
  const baseP = interpolate(easedDraw, [0.72, 0.92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <g transform={`translate(${bx + shake}, ${by}) scale(${popScale})`} style={{ transformOrigin: '0 28px', filter: 'url(#chalk-rough)' }}>
      {/* Contact shadow — advanced, soft + second sharper */}
      <ellipse cx={2} cy={124} rx={42} ry={8.5} fill="black" opacity={interpolate(easedDraw, [0.5, 1], [0, 0.22])} style={{ filter: 'blur(9px)' }} />
      <ellipse cx={2} cy={124} rx={22} ry={3.2} fill="black" opacity={interpolate(easedDraw, [0.7, 1], [0, 0.14])} style={{ filter: 'blur(3px)' }} />

      {/* Fill — clipped reveal, not just opacity, with gradient + inner shade */}
      <g opacity={fillOpacity} transform={`scale(${fillScale})`} style={{ transformOrigin: '0 -24px' }}>
        <path
          d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46 L -34 84 L 34 84 L 46 46 C 70 20 98 -14 98 -56 C 98 -104 56 -136 0 -136 Z"
          fill="url(#bulb-fill)"
        />
        {/* Inner ambient occlusion — hand shaded */}
        <path
          d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46 L -34 84 L 34 84 L 46 46 C 70 20 98 -14 98 -56 C 98 -104 56 -136 0 -136 Z"
          fill="none"
          stroke="#B88A00"
          strokeWidth={18}
          opacity={0.11}
          style={{ filter: 'blur(14px)' }}
        />
        {/* Edge darkening */}
        <path
          d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46"
          fill="none"
          stroke="#7A5A00"
          strokeWidth={2.2}
          opacity={0.14}
          strokeLinecap="round"
        />
      </g>
      {/* Lit overlay that blooms after filament */}
      <path
        d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46 L -34 84 L 34 84 L 46 46 C 70 20 98 -14 98 -56 C 98 -104 56 -136 0 -136 Z"
        fill="#FFD23F"
        opacity={interpolate(easedFil, [0.4, 0.82], [0, 0.22])}
      />

      {/* Outline — advanced: pressure-sensitive width + double sketch */}
      {/* Rough under-sketch (lighter, offset) */}
      <path
        d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46 L -34 84 L 34 84 L 46 46 C 70 20 98 -14 98 -56 C 98 -104 56 -136 0 -136 Z"
        fill="none"
        stroke={CHALK}
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={interpolate(easedDraw, [0, 0.45, 1], [0, 0.28, 0.22])}
        strokeDasharray={860}
        strokeDashoffset={draw2 + 6}
        style={{ transform: 'translate(1.4px, 1.1px)' }}
      />
      {/* Main crisp stroke with pressure variation via opacity + width interpolation (simulated) */}
      <path
        d="M 0 -136 C -56 -136 -98 -104 -98 -56 C -98 -14 -70 20 -46 46 L -34 84 L 34 84 L 46 46 C 70 20 98 -14 98 -56 C 98 -104 56 -136 0 -136 Z"
        fill="none"
        stroke={CHALK}
        strokeWidth={pressure}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={820}
        strokeDashoffset={draw}
        opacity={interpolate(easedDraw, [0, 0.08, 1], [0, 1, 1])}
      />
      {/* Second pass for sketch wobble — only at end for texture */}
      <path
        d="M 0.8 -134.5 C -54.5 -134.5 -96.2 -102.5 -96.2 -54.5 C -96.2 -12.5 -68.5 21.5 -44.5 47.5 L -32.5 85.5 L 35.5 85.5 L 47.5 47.5 C 71.5 21.5 99.5 -12.5 99.5 -54.5 C 99.5 -102.5 57.5 -134.5 0.8 -134.5 Z"
        fill="none"
        stroke={CHALK}
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={interpolate(easedDraw, [0.88, 1], [0, 0.38])}
      />

      {/* Pen following outline (only while drawing) */}
      {progress > 0.04 && progress < 0.98 && (
        <PenTip x={outlinePen.x} y={outlinePen.y} opacity={interpolate(easedDraw, [0, 0.08, 0.92, 1], [0, 1, 1, 0])} size={4.6} />
      )}

      {/* Highlight — draws slightly after main outline, hand-like quick stroke */}
      <path
        d="M -34 -114 Q -60 -92 -64 -54 Q -64 -18 -40 0"
        fill="none"
        stroke="white"
        strokeWidth={4.2}
        opacity={interpolate(easedDraw, [0.58, 0.72, 0.92], [0, 0.88, 0])}
        strokeLinecap="round"
        strokeDasharray={170}
        strokeDashoffset={interpolate(easedDraw, [0.58, 0.84], [170, 0], { easing: Easing.out(Easing.cubic) })}
      />
      <path
        d="M -32 -110 Q -54 -88 -58 -54 Q -58 -20 -38 -4"
        fill="none"
        stroke={CHALK}
        strokeWidth={1.0}
        opacity={interpolate(easedDraw, [0.72, 0.88], [0, 0.42])}
        strokeLinecap="round"
        strokeDasharray={140}
        strokeDashoffset={interpolate(easedDraw, [0.72, 0.92], [140, 0])}
      />

      {/* Glass glint — pops last */}
      <ellipse
        cx={-42}
        cy={-72}
        rx={12}
        ry={18}
        fill="white"
        opacity={interpolate(easedDraw, [0.78, 0.92], [0, 0.62])}
        style={{ transform: 'rotate(-14deg)' }}
      />
      <ellipse cx={-42} cy={-72} rx={5} ry={7} fill="white" opacity={interpolate(easedDraw, [0.86, 1], [0, 0.88])} />

      {/* Base — advanced sequenced draw */}
      <g opacity={baseP} transform={`scale(${interpolate(baseP, [0, 1], [0.96, 1], { easing: POP_EASE })})`} style={{ transformOrigin: '0 108px' }}>
        <path d="M -36 84 L -36 122 L -8 132 L 8 132 L 36 122 L 36 84 Z" fill="#1A1A1E" stroke={CHALK} strokeWidth={2.5} strokeLinejoin="round" />
        {[0, 1, 2].map((i) => {
          const lineP = interpolate(baseP, [i * 0.22, 0.3 + i * 0.22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: HAND_EASE });
          return (
            <g key={i} opacity={lineP}>
              <line
                x1={-36}
                y1={94 + i * 11}
                x2={36}
                y2={94 + i * 11}
                stroke={CHALK}
                strokeWidth={interpolate(lineP, [0, 1], [0.8, 1.9])}
                strokeLinecap="round"
                strokeDasharray={72}
                strokeDashoffset={interpolate(lineP, [0, 1], [72, 0])}
              />
              {/* Screw thread highlight */}
              <line x1={-34} y1={95 + i * 11} x2={34} y2={95 + i * 11} stroke="white" strokeWidth={0.45} opacity={0.18} strokeLinecap="round" />
            </g>
          );
        })}
        <path d="M -10 132 L -6 142 L 6 142 L 10 132" fill="#0F0F14" stroke={CHALK} strokeWidth={2.0} strokeLinejoin="round" />
        {/* Tiny sparkle on base when done */}
        <circle
          cx={24}
          cy={94}
          r={1.2}
          fill={ACCENT2}
          opacity={interpolate(baseP, [0.85, 1], [0, 1])}
          style={{ filter: 'blur(0.5px)' }}
        />
      </g>

      {/* Filament — advanced: support wires first, then zigzag scribble */}
      <g opacity={interpolate(easedFil, [0, 0.08, 1], [0, 0, 1])}>
        {/* Supports — draw slower */}
        <path
          d="M -32 84 L -18 -18 L -8 -6 L 8 -26 L 18 -10 L 32 84"
          fill="none"
          stroke={CHALK}
          strokeWidth={1.7}
          opacity={interpolate(easedFil, [0, 0.45], [0, 0.62])}
          strokeDasharray={260}
          strokeDashoffset={interpolate(easedFil, [0, 0.45], [260, 0], { easing: Easing.out(Easing.cubic) })}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Zigzag — quick hand scribble with pressure + glow */}
        <path
          d="M -22 -30 L -12 -10 L -2 -30 L 8 -10 L 18 -30 L 24 -12"
          fill="none"
          stroke={ACCENT2}
          strokeWidth={interpolate(easedFil, [0.35, 0.7], [2.2, 4.8])}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={164}
          strokeDashoffset={fDraw}
          opacity={interpolate(easedFil, [0.25, 0.5, 1], [0, 1, 1])}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,210,63,0.95))' }}
        />
        <path
          d="M -22 -30 L -12 -10 L -2 -30 L 8 -10 L 18 -30 L 24 -12"
          fill="none"
          stroke={BG}
          strokeWidth={1.25}
          opacity={interpolate(easedFil, [0.45, 1], [0, 0.82])}
          strokeDasharray={164}
          strokeDashoffset={fDraw}
          strokeLinecap="round"
        />
        {/* Pen for filament (more visible) */}
        {filamentProgress > 0.08 && filamentProgress < 0.96 && (
          <PenTip x={filamentPen.x} y={filamentPen.y} opacity={interpolate(easedFil, [0.12, 0.92], [0, 1])} color={ACCENT2} size={3.8} />
        )}

        {/* Spark — advanced bloom */}
        <g transform={`translate(0, -18) scale(${1 + Math.sin(frame * 0.16) * 0.06 + pop * 0.2})`} style={{ transformOrigin: '0 0' }}>
          <circle cx={0} cy={0} r={28} fill="url(#spark-glow)" opacity={popGlow * 0.42} style={{ filter: 'blur(4px)' }} />
          <circle cx={0} cy={0} r={14} fill={ACCENT} opacity={popGlow * 0.16} style={{ filter: 'blur(10px)' }} />
          <g opacity={interpolate(easedFil, [0.52, 1], [0, 1], { easing: POP_EASE })}>
            <g transform={`scale(${interpolate(easedFil, [0.52, 0.82], [0.42, 1], { easing: POP_EASE })})`}>
              <path
                d="M 0 -16 L 3.6 -3.8 L 16 0 L 3.6 3.8 L 0 16 L -3.6 3.8 L -16 0 L -3.6 -3.8 Z"
                fill="white"
                stroke={CHALK}
                strokeWidth={1.0}
              />
              <circle cx={0} cy={0} r={7.2} fill={ACCENT} stroke={BG} strokeWidth={1.1} />
              <circle cx={0} cy={0} r={3.0} fill="white" />
              <circle cx={-0.9} cy={-0.9} r={0.9} fill={ACCENT} opacity={0.95} />
            </g>
            {/* Radiating micro sparks */}
            {[0, 90, 180, 270].map((a, i) => {
              const r = 10 + i * 0.3;
              const rad = (a * Math.PI) / 180;
              const s = interpolate(easedFil, [0.6 + i * 0.04, 0.85 + i * 0.04], [0, 1], { easing: POP_EASE });
              return (
                <g key={i} opacity={s} transform={`translate(${Math.cos(rad) * r}, ${Math.sin(rad) * r}) scale(${s})`}>
                  <circle cx={0} cy={0} r={1.4} fill={ACCENT2} />
                  <circle cx={0} cy={0} r={3.2} fill={ACCENT} opacity={0.18} style={{ filter: 'blur(2px)' }} />
                </g>
              );
            })}
          </g>
        </g>
      </g>
    </g>
  );
};

// ── Burst — advanced staggered + trail ─────────────────────────────
const Burst: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const rays = 12;
  return (
    <g opacity={interpolate(progress, [0, 0.18, 1], [0, 0, 1], { easing: Easing.out(Easing.cubic) })}>
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays + (i % 2 === 0 ? 0 : 7);
        const rad = (angle * Math.PI) / 180;
        const isLong = i % 3 === 0;
        const isAccent = i % 4 === 0;
        const len = isLong ? 102 : isAccent ? 82 : 58;
        const inner = 110;
        const x1 = Math.cos(rad) * inner;
        const y1 = Math.sin(rad) * inner;
        const x2 = Math.cos(rad) * (inner + len);
        const y2 = Math.sin(rad) * (inner + len);
        const delay = i * 0.022;
        // Advanced: each ray has its own spring, not just interpolate
        const p = interpolate(
          spring({ frame: Math.max(0, frame - 56 - i * 1.6), fps: 30, config: { damping: 14, stiffness: 180 } }),
          [0, 1],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        // Alternative for early frames: use progress fallback
        const pp = progress < 0.12 ? interpolate(progress, [delay, delay + 0.32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) : p;
        const wob = boil(frame, 50 + i, 0.8);
        const mx = (x1 + x2) / 2 + Math.cos(rad + Math.PI / 2) * wob;
        const my = (y1 + y2) / 2 + Math.sin(rad + Math.PI / 2) * wob;
        const path = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
        const trailOpacity = interpolate(pp, [0, 0.4, 1], [0, 0.52, 0]);

        return (
          <g key={i} opacity={pp}>
            {/* Trail (fades) */}
            <path d={path} fill="none" stroke={isAccent ? ACCENT : CHALK} strokeWidth={isAccent ? 3.4 : 1.4} opacity={trailOpacity} strokeLinecap="round" style={{ filter: 'blur(2.5px)' }} />
            {/* Main */}
            <path
              d={path}
              fill="none"
              stroke={isAccent ? ACCENT : CHALK}
              strokeWidth={isAccent ? 2.35 : isLong ? 1.6 : 1.05}
              opacity={isAccent ? 0.98 : isLong ? 0.56 : 0.3}
              strokeLinecap="round"
            />
            <g transform={`translate(${x2}, ${y2})`} opacity={interpolate(pp, [0.42, 1], [0, 1], { easing: POP_EASE })}>
              {isAccent ? (
                <g transform={`scale(${interpolate(pp, [0.42, 1], [0.6, 1], { easing: POP_EASE })})`}>
                  <circle cx={0} cy={0} r={3.4} fill={ACCENT} stroke={CHALK} strokeWidth={0.9} />
                  <circle cx={0} cy={0} r={6} fill={ACCENT} opacity={0.18} style={{ filter: 'blur(3px)' }} />
                </g>
              ) : (
                <circle cx={0} cy={0} r={isLong ? 1.7 : 1.05} fill={CHALK} opacity={isLong ? 0.82 : 0.44} />
              )}
            </g>
          </g>
        );
      })}
    </g>
  );
};

const Stars: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const items = [
    { x: -142, y: -122, s: 1.02, d: 0 },
    { x: 148, y: -106, s: 0.9, d: 0.08 },
    { x: -128, y: 116, s: 0.92, d: 0.14 },
    { x: 132, y: 122, s: 0.84, d: 0.2 },
    { x: 0, y: -218, s: 0.72, d: 0.26 },
  ];
  return (
    <g opacity={interpolate(progress, [0, 1], [0, 1], { easing: Easing.out(Easing.cubic) })}>
      {items.map((it, i) => {
        const sp = spring({ frame: Math.max(0, frame - 64 - i * 3), fps: 30, config: { damping: 11, stiffness: 160 } });
        const p = interpolate(sp, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const p2 = progress < 0.14 ? interpolate(progress, [it.d, it.d + 0.34], [0, 1], { easing: HAND_EASE }) : p;
        const tw = 0.74 + Math.sin(frame * 0.14 + i * 1.8) * 0.26;
        const scale = p2 * tw * it.s;
        const isAccent = i % 3 === 0;
        const bx = boil(frame, 80 + i, 0.6);
        const by = boil(frame, 81 + i, 0.6);
        return (
          <g key={i} transform={`translate(${it.x + bx}, ${it.y + by}) rotate(${i * 22 + boil(frame, 82 + i, 1.4)}) scale(${scale})`} opacity={p2}>
            <path
              d="M 0 -13 L 2.8 -2.8 L 13 0 L 2.8 2.8 L 0 13 L -2.8 2.8 L -13 0 L -2.8 -2.8 Z"
              fill={isAccent ? ACCENT : CHALK}
              stroke={BG}
              strokeWidth={0.7}
              strokeLinejoin="round"
              opacity={0.98}
            />
            <path d="M 0 -7 L 1.4 -1.4 L 7 0 L 1.4 1.4 L 0 7 L -1.4 1.4 L -7 0 L -1.4 -1.4 Z" fill="white" opacity={0.24} />
          </g>
        );
      })}
    </g>
  );
};

const SceneIdea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Advanced timeline — tighter, more theatrical
  const bulbP = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 120, mass: 0.95 } });
  const filamentP = spring({ frame: frame - 30, fps, config: { damping: 13, stiffness: 165, mass: 0.85 } });
  const burstP = spring({ frame: frame - 48, fps, config: { damping: 14, stiffness: 150 } });
  const starsP = spring({ frame: frame - 58, fps, config: { damping: 13, stiffness: 140 } });

  const pop = interpolate(filamentP, [0.48, 1], [0, 1], { easing: POP_EASE });
  const shakeX = interpolate(pop, [0, 0.22, 0.48, 0.72, 1], [0, 1.4, -1.1, 0.7, 0], { easing: Easing.out(Easing.cubic) });
  const shakeY = interpolate(pop, [0, 0.22, 0.48, 0.72, 1], [0, -1.2, 0.9, -0.5, 0], { easing: Easing.out(Easing.cubic) });
  const exitOpacity = interpolate(frame, [170, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const breathe = 1 + Math.sin(frame * 0.013) * 0.004;
  const bgBreath = 1 + Math.sin(frame * 0.008) * 0.008;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <DarkBG />

      {/* Advanced: subtle camera dolly — slight scale + y shift on pop */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${breathe * (1 + pop * 0.02)}) translateY(${interpolate(pop, [0, 1], [8, 0], { easing: POP_EASE })}px)`,
        }}
      >
        <svg width={700} height={700} viewBox="0 0 700 700" style={{ display: 'block', overflow: 'visible', transform: `scale(${bgBreath})` }}>
          <g transform="translate(350, 350)">
            {/* Ultra subtle guides — almost invisible */}
            <circle cx={0} cy={0} r={172} fill="none" stroke={CHALK} strokeWidth={0.45} opacity={0.04} strokeDasharray="1.5 10" />
            <Burst progress={burstP} />
            <Stars progress={starsP} />
            <Bulb progress={bulbP} filamentProgress={filamentP} pop={pop} frame={frame} />
          </g>
        </svg>
      </AbsoluteFill>

      {/* Advanced lighting — two layered glows with breath */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 28% 22% at 50% 50%, rgba(255,210,63,${0.055 + pop * 0.07}) 0%, transparent 62%)`,
          opacity: 0.9,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 34% 30% at 50% 50%, rgba(255,59,47,${0.045 + pop * 0.05}) 0%, transparent 68%)`,
          opacity: 0.85 + Math.sin(frame * 0.06) * 0.07,
        }}
      />
      {/* Chromatic vignette — very subtle advanced grade */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 88% 76% at 50% 50%, transparent 64%, rgba(0,0,0,0.38) 100%)', opacity: 0.9 }} />
    </AbsoluteFill>
  );
};

export const Frame: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <SceneIdea />
    </AbsoluteFill>
  );
};

export const FRAME_DURATION = 180;
export const FRAME_FPS = 30;
export const FRAME_WIDTH = 1080;
export const FRAME_HEIGHT = 1920;
