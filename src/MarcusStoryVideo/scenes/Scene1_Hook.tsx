import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
    Easing,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { ShieldAlert, GraduationCap, Zap, Globe } from 'lucide-react';

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance Animations
    const imageAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 120 }
    });

    const line1Appear = spring({
        frame: frame - 40,
        fps,
        config: { damping: 14, stiffness: 100 }
    });

    const line2Appear = spring({
        frame: frame - 65,
        fps,
        config: { damping: 14, stiffness: 100 }
    });

    // Visual Effects
    const floatingY = Math.sin(frame / 20) * 15;
    const pulseGlow = interpolate(Math.sin(frame / 15), [-1, 1], [0.4, 0.8]);
    const imageScale = interpolate(imageAppear, [0, 1], [0.5, 1], { extrapolateRight: 'clamp' });

    // Background Energy
    const bgScale = interpolate(frame, [0, 300], [1, 1.1], { easing: Easing.out(Easing.quad) });

    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
            transform: `scale(${bgScale})`
        }}>
            <SpaceBg />
            <StarField count={180} />

            {/* Ambient Hacking/Cyber Icons */}
            <div style={{
                position: 'absolute', top: '15%', left: '10%', opacity: 0.15,
                transform: `rotate(-15deg) translateY(${Math.sin(frame / 40) * 20}px)`,
            }}>
                <GraduationCap size={220} color={COLORS.secondary} />
            </div>

            <div style={{
                position: 'absolute', bottom: '15%', right: '8%', opacity: 0.15,
                transform: `rotate(20deg) translateY(${Math.cos(frame / 45) * 20}px)`,
            }}>
                <ShieldAlert size={250} color={COLORS.accent} />
            </div>

            <div style={{
                position: 'absolute', top: '40%', right: '5%', opacity: 0.1,
                transform: `scale(${interpolate(Math.sin(frame / 30), [-1, 1], [0.8, 1.2])})`,
            }}>
                <Globe size={180} color={COLORS.primary} />
            </div>

            {/* Central Glow Background for Image */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)', // Center relative to image pos
                width: 700,
                height: 700,
                background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
                opacity: imageAppear * pulseGlow,
                zIndex: 10,
            }} />

            {/* Main Content Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 70,
                zIndex: 20,
            }}>

                {/* Image Container with multiple borders/glows */}
                <div style={{
                    width: 520,
                    height: 520,
                    borderRadius: '60px',
                    padding: '8px',
                    background: `linear-gradient(135deg, ${COLORS.primary}60, ${COLORS.accent}60)`,
                    boxShadow: `0 0 100px ${COLORS.primary}${Math.floor(pulseGlow * 40).toString(16)}, 
                               0 0 40px ${COLORS.primary}30`,
                    transform: `scale(${imageScale}) translateY(${floatingY}px)`,
                    opacity: imageAppear,
                    position: 'relative',
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '52px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Img
                            src={staticFile('assets/marcus.jpg')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        {/* Shimmer Effect */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: `${interpolate(frame % 90, [0, 45], [-120, 220])}%`,
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transform: 'skewX(-25deg)',
                        }} />
                    </div>

                    {/* Accent Icon on Image */}
                    <div style={{
                        position: 'absolute',
                        bottom: -30,
                        right: -30,
                        width: 80,
                        height: 80,
                        borderRadius: '20px',
                        background: COLORS.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 10px 30px ${COLORS.accent}60`,
                        transform: `scale(${imageAppear}) rotate(${Math.sin(frame / 10) * 10}deg)`,
                    }}>
                        <Zap size={45} color="#000" fill="#000" />
                    </div>
                </div>

                {/* Text Section */}
                <div style={{
                    maxWidth: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    direction: 'rtl',
                }}>
                    {/* Line 1 */}
                    <div style={{
                        opacity: line1Appear,
                        transform: `translateY(${interpolate(line1Appear, [0, 1], [30, 0])}px)`,
                    }}>
                        <h2 style={{
                            fontSize: 70,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            margin: 0,
                            textShadow: `0 0 20px ${COLORS.secondary}40`,
                        }}>
                            من شخص <span style={{ color: COLORS.secondary }}>فشل دراسيًا…</span>
                        </h2>
                    </div>

                    {/* Line 2 */}
                    <div style={{
                        opacity: line2Appear,
                        transform: `translateY(${interpolate(line2Appear, [0, 1], [30, 0])}px)`,
                    }}>
                        <h2 style={{
                            fontSize: 65,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            margin: 0,
                            lineHeight: 1.2,
                            textShadow: `0 0 25px ${COLORS.accent}40`,
                        }}>
                            إلى بطل أنقذ الإنترنت من <span style={{ color: COLORS.accent }}>الهجوم العالمي!</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Scanlines Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0) 4px)',
                pointerEvents: 'none',
                opacity: 0.3,
            }} />

            <Vignette />
        </AbsoluteFill>
    );
};
