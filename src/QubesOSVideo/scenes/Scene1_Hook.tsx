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

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Logo Animations (Fixed after appear)
    const logoAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, stiffness: 120 }
    });
    const logoScale = interpolate(logoAppear, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });

    // Light & Short Glitch (only at appearance)
    const glitchFrames = (frame >= 15 && frame <= 28);
    const glitchX = glitchFrames ? (Math.random() - 0.5) * 12 : 0;
    const glitchY = glitchFrames ? (Math.random() - 0.5) * 4 : 0;

    // 2. Text Animations (Appear and Stay Fixed)
    const text1Appear = spring({
        frame: frame - 40,
        fps,
        config: { damping: 14 }
    });
    const text2Appear = spring({
        frame: frame - 100,
        fps,
        config: { damping: 14 }
    });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            {/* Subtle Space BG */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                <SpaceBg />
                <StarField count={70} />
            </div>

            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 70,
            }}>
                {/* Qubes OS Distro Logo */}
                <div style={{
                    position: 'relative',
                    width: 320,
                    height: 320,
                    opacity: logoAppear,
                    transform: `scale(${logoScale}) translate(${glitchX}px, ${glitchY}px)`,
                }}>
                    {/* Soft cyan glow behind logo to match style */}
                    <div style={{
                        position: 'absolute',
                        inset: -30,
                        background: 'radial-gradient(circle, rgba(147, 197, 253, 0.25) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }} />

                    <Img
                        src={staticFile('qubes-logo.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 20px rgba(147, 197, 253, 0.3))',
                        }}
                    />

                    {/* Brief glitch slice */}
                    {glitchFrames && frame % 6 < 3 && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-10%',
                            width: '120%',
                            height: '1px',
                            background: 'rgba(255,255,255,0.4)',
                        }} />
                    )}
                </div>

                {/* Question Text (Fixed after appear) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 15,
                    direction: 'rtl',
                    padding: '0 40px',
                }}>
                    <div style={{
                        opacity: text1Appear,
                        transform: `scale(${interpolate(text1Appear, [0, 1], [0.95, 1], { extrapolateRight: 'clamp' })})`,
                    }}>
                        <h1 style={{
                            fontSize: 75,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: '#fff',
                            margin: 0,
                            textAlign: 'center',
                            lineHeight: 1.3,
                        }}>
                            هل هذه التوزيعة فعلاً<br />
                            <span style={{ color: COLORS.primary }}>الأكثر أماناً في العالم؟</span>
                        </h1>
                    </div>

                    <div style={{
                        marginTop: 20,
                        opacity: text2Appear,
                        transform: `scale(${interpolate(text2Appear, [0, 1], [0.95, 1], { extrapolateRight: 'clamp' })})`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20,
                    }}>
                        <p style={{
                            fontSize: 65,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: '#fff',
                            margin: 0,
                        }}>
                            <span style={{ color: COLORS.primary }}>Qubes OS</span>… أم مجرد كلام؟
                        </p>

                        {/* Elegant separator line */}
                        <div style={{
                            width: 140,
                            height: 4,
                            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
                            borderRadius: '2px',
                        }} />
                    </div>
                </div>
            </AbsoluteFill>

            {/* Corner Details for High Art Aesthetic */}
            <div style={{
                position: 'absolute',
                top: 100,
                left: 100,
                width: 80,
                height: 1,
                background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{
                position: 'absolute',
                top: 100,
                left: 100,
                width: 1,
                height: 80,
                background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: 100,
                right: 100,
                width: 80,
                height: 1,
                background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: 100,
                right: 100,
                width: 1,
                height: 80,
                background: 'rgba(255,255,255,0.1)',
            }} />

            <Vignette />
        </AbsoluteFill>
    );
};
