import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SPRINGS = {
  snappy: { damping: 14, stiffness: 220, mass: 0.7 },
  smooth: { damping: 18, stiffness: 80, mass: 1 },
  bouncy: { damping: 10, stiffness: 130, mass: 0.9 },
  gentle: { damping: 20, stiffness: 60, mass: 1 },
  stiff: { damping: 22, stiffness: 300, mass: 0.6 },
  wobbly: { damping: 9, stiffness: 110, mass: 1.1 },
} as const;

export type SpringPreset = keyof typeof SPRINGS;

export const EASE = {
  pop: Easing.out(Easing.cubic),
  glide: Easing.inOut(Easing.cubic),
  smash: Easing.out(Easing.back(1.8)),
  breathe: Easing.inOut(Easing.sin),
  expoOut: Easing.out(Easing.exp),
  expoInOut: Easing.inOut(Easing.exp),
  circOut: Easing.out(Easing.circle),
  bezSnappy: Easing.bezier(0.22, 1, 0.36, 1),
  bezSmooth: Easing.bezier(0.4, 0, 0.2, 1),
  bezEmphasized: Easing.bezier(0.2, 0, 0, 1),
} as const;

export const useSpring = (delayFrames: number, preset: SpringPreset = "snappy") => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delayFrames, fps, config: SPRINGS[preset] });
};

export const useProgress = (from: number, duration: number, easing: (t: number) => number = EASE.bezSnappy) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + duration], [0, 1], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

export const useStagger = (index: number, baseDelay: number, stagger = 6, preset: SpringPreset = "snappy") => {
  return useSpring(baseDelay + index * stagger, preset);
};

export const DUR = { micro: 8, quick: 14, normal: 22, slow: 36, epic: 60 } as const;
