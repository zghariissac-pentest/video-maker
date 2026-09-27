import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Part 1: "ناس لي ما لحقاتش لمعدل تاع cyber security.."
    const p1Appear = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const p1Scale = interpolate(p1Appear, [0, 1], [0.85, 1]);
    const p1Opacity = interpolate(p1Appear, [0, 1], [0, 1]);
    const p1FadeOut = interpolate(frame, [160, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const p1Slide = interpolate(frame, [160, 180], [0, -60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Part 2: "watch this"
    const p2Delay = 190;
    const p2Appear = spring({ frame: frame - p2Delay, fps, config: { damping: 18, stiffness: 70 } });
    const p2Opacity = frame < p2Delay ? 0 : interpolate(p2Appear, [0, 1], [0, 1]);
    const p2Y = frame < p2Delay ? 20 : interpolate(p2Appear, [0, 1], [20, 0]);
    const p2FadeOut = interpolate(frame, [240, 260], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const glowPulse = interpolate(Math.sin((frame - p2Delay) / 10), [-1, 1], [0.4, 1]);
    const lineWidth = frame < p2Delay ? 0 : interpolate(
        spring({ frame: frame - p2Delay - 8, fps, config: { damping: 20, stiffness: 50 } }),
        [0, 1], [0, 320]
    );

    // Part 3: "خاصني نقولك حاجة"
    const p3Delay = 265;
    const p3Appear = spring({ frame: frame - p3Delay, fps, config: { damping: 14, stiffness: 90 } });
    const p3Opacity = frame < p3Delay ? 0 : interpolate(p3Appear, [0, 1], [0, 1]);
    const p3Y = frame < p3Delay ? 50 : interpolate(p3Appear, [0, 1], [50, 0]);

    // Glitch flash on "watch this"
    const glitchFlash = frame >= p2Delay && frame <= p2Delay + 6
        ? interpolate(frame, [p2Delay, p2Delay + 6], [0.4, 0], { extrapolateRight: 'clamp' })
        : 0;

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Glitch flash overlay */}
            <AbsoluteFill style={{
                background: COLORS.secondary,
                opacity: glitchFlash,
                pointerEvents: 'none',
            }} />

            {/* Part 1 */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: p1Opacity * p1FadeOut,
                transform: `scale(${p1Scale}) translateY(${p1Slide}px)`,
            }}>
                <p style={{
                    fontSize: 52, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.6,
                    maxWidth: '88%',
                    textShadow: `0 0 30px ${COLORS.primary}44`,
                }}>
                    ناس لي ما لحقاتش لمعدل تاع<br />
                    <span style={{ color: COLORS.secondary, fontSize: 60 }}>Cyber Security</span>..
                </p>
            </div>

            {/* Part 2: watch this */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: p2Opacity * p2FadeOut,
                transform: `translateY(${p2Y}px)`,
                gap: 30,
            }}>
                <p style={{
                    fontSize: 72, fontWeight: 900,
                    fontFamily: 'Cairo, sans-serif',
                    color: COLORS.gold,
                    textShadow: `0 0 ${30 + glowPulse * 30}px ${COLORS.gold}88, 0 0 ${60 + glowPulse * 40}px ${COLORS.gold}44`,
                    letterSpacing: 6,
                    margin: 0,
                }}>
                    watch this
                </p>
                <div style={{
                    width: lineWidth,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
                    borderRadius: 2,
                    opacity: 0.7,
                }} />
            </div>

            {/* Part 3: خاصني نقولك حاجة */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: p3Opacity,
                transform: `translateY(${p3Y}px)`,
            }}>
                <p style={{
                    fontSize: 58, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.6,
                    textShadow: `0 0 30px ${COLORS.accent}44`,
                }}>
                    خاصني نقولك <span style={{ color: COLORS.accent }}>حاجة</span>
                </p>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
