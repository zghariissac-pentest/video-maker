import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene2_Motivation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── Phase A: "ما تخليش هاد الحاجة توقفك على التعلم" ───
    const aAppear = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
    const aOpacity = interpolate(aAppear, [0, 1], [0, 1]);
    const aY = interpolate(aAppear, [0, 1], [30, 0]);
    const aFadeOut = interpolate(frame, [140, 160], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const aSlideOut = interpolate(frame, [140, 165], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // ─── Phase B: "أنا بديت نتعلم من عمر 15 عام" ───
    const bDelay = 170;
    const bAppear = spring({ frame: frame - bDelay, fps, config: { damping: 14, stiffness: 90 } });
    const bOpacity = frame < bDelay ? 0 : interpolate(bAppear, [0, 1], [0, 1]);
    const bY = frame < bDelay ? 25 : interpolate(bAppear, [0, 1], [25, 0]);

    // "15" number pop
    const numDelay = bDelay + 20;
    const numSpr = spring({ frame: frame - numDelay, fps, config: { damping: 10, stiffness: 140 } });
    const numScale = frame < numDelay ? 0.3 : interpolate(numSpr, [0, 1], [0.3, 1]);
    const numRotate = frame < numDelay ? -15 : interpolate(numSpr, [0, 1], [-15, 0]);

    const bFadeOut = interpolate(frame, [310, 330], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // ─── Phase C: "و راه غادي نقولك كامل واش نعرف وكيفاش تبدا نتا حتى" ───
    const cDelay = 335;
    const cAppear = spring({ frame: frame - cDelay, fps, config: { damping: 15, stiffness: 80 } });
    const cOpacity = frame < cDelay ? 0 : interpolate(cAppear, [0, 1], [0, 1]);
    const cY = frame < cDelay ? 30 : interpolate(cAppear, [0, 1], [30, 0]);

    // Subtle glow pulse for phase C
    const cGlow = interpolate(Math.sin((frame - cDelay) / 14), [-1, 1], [0.3, 0.8]);

    // Floating dots
    const dots = React.useMemo(() =>
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: (i * 137.5) % 100,
            y: (i * 91.3) % 100,
            size: (i % 3) + 2,
            speed: (i % 4) + 6,
        })),
    []);

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Floating dots */}
            {dots.map(d => (
                <div key={d.id} style={{
                    position: 'absolute',
                    left: `${d.x}%`,
                    top: `${(d.y + frame * 0.1 / d.speed) % 110 - 5}%`,
                    width: d.size,
                    height: d.size,
                    borderRadius: '50%',
                    background: COLORS.primary,
                    opacity: 0.04,
                }} />
            ))}

            {/* ═══ PHASE A ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: aOpacity * aFadeOut,
                transform: `translateY(${aY + aSlideOut}px)`,
                padding: 60,
            }}>
                <p style={{
                    fontSize: 50, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.7,
                    maxWidth: '90%',
                    textShadow: `0 0 25px ${COLORS.primary}33`,
                }}>
                    ما تخليش هاد الحاجة<br />توقفك على <span style={{ color: COLORS.accent }}>التعلم</span>.
                </p>
            </div>

            {/* ═══ PHASE B ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: bOpacity * bFadeOut,
                transform: `translateY(${bY}px)`,
                gap: 40,
                padding: 60,
            }}>
                <p style={{
                    fontSize: 48, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.7,
                    maxWidth: '90%',
                    margin: 0,
                }}>
                    أنا بديت نتعلم من عمر
                </p>

                {/* Big 15 */}
                <div style={{
                    transform: `scale(${numScale}) rotate(${numRotate}deg)`,
                    fontSize: 140, fontWeight: 900,
                    fontFamily: 'Cairo, sans-serif',
                    color: COLORS.gold,
                    textShadow: `0 0 40px ${COLORS.gold}66, 0 0 80px ${COLORS.gold}33`,
                    lineHeight: 1,
                    margin: '-20px 0',
                }}>
                    15
                </div>

                <p style={{
                    fontSize: 48, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.7,
                    maxWidth: '90%',
                    margin: 0,
                }}>
                    عام،
                </p>
            </div>

            {/* ═══ PHASE C ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: cOpacity,
                transform: `translateY(${cY}px)`,
                padding: 60,
            }}>
                <p style={{
                    fontSize: 46, fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl', textAlign: 'center',
                    color: 'white', lineHeight: 1.8,
                    maxWidth: '92%',
                    textShadow: `0 0 ${20 + cGlow * 20}px ${COLORS.accent}44`,
                }}>
                    و راه نقولك كامل<br />
                    واش نعرف و<span style={{ color: COLORS.accent }}>كيفاش تبدا نتا حتى</span>
                </p>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
