import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Sparkles, Rocket, Globe, Zap } from 'lucide-react';

export const Scene5_Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene transition
    const sceneAppear = spring({ frame, fps, config: { damping: 12 } });

    // Text staggered reveal
    const line1Appear = spring({ frame: frame - 20, fps, config: { damping: 12 } });
    const line2Appear = spring({ frame: frame - 150, fps, config: { damping: 12 } });
    const line3Appear = spring({ frame: frame - 350, fps, config: { damping: 12 } });

    // Final slogan reveal (Frame 500+)
    const sloganAt = 500;
    const sloganTrigger = spring({
        frame: frame - sloganAt,
        fps,
        config: { stiffness: 100, damping: 12 }
    });

    // Pulse effect for the final slogan
    const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [1, 1.05]);

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden', opacity: sceneAppear }}>
            <SpaceBg />
            <StarField count={200} />

            {/* Background elements */}
            <div style={{
                position: 'absolute', top: '15%', left: '15%', opacity: 0.1,
                transform: `rotate(${frame / 2}deg) scale(${1 + line1Appear * 0.2})`,
            }}>
                <Globe size={400} color={COLORS.primary} strokeWidth={0.5} />
            </div>

            {/* Final Slogan Layer */}
            {frame >= sloganAt && (
                <AbsoluteFill style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
                    zIndex: 50,
                    opacity: sloganTrigger
                }}>
                    <div style={{
                        textAlign: 'center',
                        transform: `scale(${sloganTrigger * pulse})`,
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 20,
                            background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.accent}30)`,
                            padding: '15px 50px', borderRadius: '30px',
                            border: `2px solid ${COLORS.primary}`,
                            marginBottom: 40,
                            boxShadow: `0 0 50px ${COLORS.primary}40`
                        }}>
                            <Zap size={60} color={COLORS.accent} fill={COLORS.accent} />
                            <span style={{
                                fontSize: 80, fontWeight: 900, color: 'white',
                                fontFamily: 'Fira Code, monospace',
                                letterSpacing: '-2px'
                            }}>IMPACT</span>
                        </div>
                        <h1 style={{
                            fontSize: 100,
                            fontWeight: 950,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            margin: 0,
                            textTransform: 'uppercase',
                            lineHeight: 1,
                            textShadow: `0 0 40px ${COLORS.primary}60, 0 10px 20px rgba(0,0,0,0.8)`
                        }}>
                            You Can Change<br />
                            <span style={{ color: COLORS.accent }}>The World Too</span>
                        </h1>
                    </div>
                </AbsoluteFill>
            )}

            {/* Narrative Sections */}
            <div style={{
                position: 'absolute', inset: 0,
                display: frame >= sloganAt ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 60px', gap: 60, zIndex: 30,
                direction: 'rtl',
            }}>

                {/* Line 1 */}
                <div style={{
                    opacity: line1Appear,
                    transform: `translateY(${interpolate(line1Appear, [0, 1], [30, 0])}px)`,
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 15,
                        color: COLORS.secondary, marginBottom: 20
                    }}>
                        <Sparkles size={40} />
                        <span style={{ fontSize: 35, fontWeight: 900, fontFamily: 'Cairo' }}>الخلاصة..</span>
                    </div>
                    <h2 style={{
                        fontSize: 60, fontWeight: 850, fontFamily: 'Cairo', color: 'white',
                        margin: 0, lineHeight: 1.3
                    }}>
                        هذه ليست مجرد قصة هكر…
                    </h2>
                </div>

                {/* Line 2 */}
                <div style={{
                    opacity: line2Appear,
                    transform: `translateY(${interpolate(line2Appear, [0, 1], [30, 0])}px)`,
                    textAlign: 'center',
                }}>
                    <h2 style={{
                        fontSize: 50, fontWeight: 700, fontFamily: 'Cairo', color: 'rgba(255,255,255,0.9)',
                        margin: 0, lineHeight: 1.4
                    }}>
                        إنه شخص مثلنا، بدأ من <span style={{ color: COLORS.accent }}>غرفته</span> في بيته الصغيرة…
                    </h2>
                </div>

                {/* Line 3 */}
                <div style={{
                    opacity: line3Appear,
                    transform: `translateY(${interpolate(line3Appear, [0, 1], [30, 0])}px)`,
                    textAlign: 'center',
                    maxWidth: '90%'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px dashed ${COLORS.primary}40`,
                        padding: '40px', borderRadius: '30px',
                        position: 'relative'
                    }}>
                        <Rocket size={50} color={COLORS.primary} style={{ position: 'absolute', top: -25, left: '50%', transform: 'translateX(-50%)' }} />
                        <h2 style={{
                            fontSize: 45, fontWeight: 800, fontFamily: 'Cairo', color: 'white',
                            margin: 0, lineHeight: 1.5
                        }}>
                            وإذا استطاع أن ينقذ الإنترنت بأكمله،<br />
                            فأنت أيضًا لديك القوة لتغيّر <span style={{ color: COLORS.primary }}>العالم في مجالك.</span>
                        </h2>
                    </div>
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
