import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { ChevronRight } from 'lucide-react';

export const Scene6_Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Shield Logo Appearance
    const shieldAppear = spring({
        frame: frame - 20,
        fps,
        config: { damping: 14 }
    });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                <SpaceBg />
                <StarField count={80} />
            </div>

            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 80,
            }}>
                {/* Visual: Qubes Logo as the top choice */}
                <div style={{
                    position: 'relative',
                    width: 280,
                    height: 280,
                    opacity: shieldAppear,
                    transform: `scale(${shieldAppear})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        position: 'absolute',
                        inset: -40,
                        background: `radial-gradient(circle, ${COLORS.primary}22 0%, transparent 70%)`,
                        filter: 'blur(30px)',
                    }} />
                    <Img
                        src={staticFile('qubes-logo.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: `drop-shadow(0 0 30px ${COLORS.primary}44)`,
                        }}
                    />
                </div>

                {/* Final Arabic Message */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 35,
                    direction: 'rtl',
                    textAlign: 'center',
                    padding: '0 60px',
                }}>
                    <div style={{
                        opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 48,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            lineHeight: 1.3,
                            margin: 0,
                        }}>
                            إذا أردت أقصى درجات الأمان… <br />
                            <span style={{ color: COLORS.primary }}>Qubes OS</span> هو خيارك.
                        </p>
                    </div>

                    {/* Questioning Text */}
                    <div style={{
                        opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 42,
                            fontWeight: 700,
                            fontFamily: 'Cairo, sans-serif',
                            color: COLORS.accent,
                            margin: 0,
                        }}>
                            لكن هل هو العملي لكل يوم؟
                        </p>
                    </div>

                    {/* Teaser Text */}
                    <div style={{
                        opacity: interpolate(frame, [220, 240], [0, 1], { extrapolateRight: 'clamp' }),
                        background: 'rgba(255,255,255,0.05)',
                        padding: '25px 40px',
                        borderRadius: '25px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginTop: 20,
                        transform: `scale(${interpolate(frame, [220, 240], [0.95, 1])})`,
                    }}>
                        <p style={{
                            fontSize: 38,
                            fontWeight: 600,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            opacity: 0.9,
                            margin: 0,
                            lineHeight: 1.5,
                        }}>
                            في الجزء القادم، سنقارن <span style={{ color: COLORS.primary }}>Qubes</span> مع أنظمة آمنة أخرى <br />
                            ونكشف عن <span style={{ color: COLORS.accent, fontWeight: 900 }}>أفضل خيار</span> لك.
                        </p>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Corner Decorative chevron */}
            <div style={{
                position: 'absolute',
                bottom: 80,
                left: 80,
                opacity: 0.3,
                animation: 'pulse 2s infinite ease-in-out',
            }}>
                <ChevronRight size={60} color="white" />
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
