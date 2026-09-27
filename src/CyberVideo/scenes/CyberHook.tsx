import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    random,
    Audio,
    staticFile,
} from 'remotion';
import { COLORS, Scanlines, StaticVignette, CyberBackground } from '../components/CyberTheme';

export const CyberHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry1 = spring({
        frame: frame - 30,
        fps,
        config: { stiffness: 100, damping: 12 }
    });

    const entry2 = spring({
        frame: frame - 110,
        fps,
        config: { stiffness: 100, damping: 12 }
    });

    // Glitch intensity (higher when text emerges)
    const glitchIntensity = interpolate(frame, [30, 45, 110, 125], [0, 1, 0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const isGlitching = random(frame) < glitchIntensity * 0.3;

    // Text data
    const line1 = "أنت لا ترى نفس الإنترنت الذي أراه…";
    const line2 = "حتى لو بحثنا عن نفس الشيء.";

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            {/* SFX */}
            <Audio src={staticFile('assets/cyber/sfx/whoosh.wav')} startFrom={0} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/typing.wav')} startFrom={50} volume={0.3} />
            {isGlitching && <Audio src={staticFile('assets/cyber/sfx/glitch.wav')} startFrom={0} volume={0.15} />}

            {/* 1. BACKGROUND LAYER */}
            <AbsoluteFill style={{
                filter: isGlitching ? `hue-rotate(${random(frame) * 360}deg) brightness(1.5) contrast(2)` : 'none',
                transform: isGlitching ? `translateX(${random(frame) * 10 - 5}px)` : 'none'
            }}>
                <CyberBackground />
            </AbsoluteFill>

            {/* 2. DUAL REALITY OVERLAY (Creative Twist) */}
            {/* Split screen effect to show "different internets" */}
            <AbsoluteFill style={{
                clipPath: `inset(0 0 0 50%)`,
                filter: 'sepia(0.5) hue-rotate(280deg) brightness(0.8)',
                opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp' })
            }}>
                <CyberBackground />
            </AbsoluteFill>

            {/* Middle Divider Line (Scanning line) */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                background: COLORS.secondary,
                boxShadow: `0 0 15px ${COLORS.secondary}`,
                opacity: interpolate(frame, [110, 130], [0, 0.5], { extrapolateRight: 'clamp' }),
                zIndex: 5
            }} />

            {/* 3. TEXT CONTENT */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 40,
                direction: 'rtl',
                fontFamily: 'Cairo, sans-serif',
                textAlign: 'center',
                padding: 60,
                zIndex: 10
            }}>
                {/* Line 1 */}
                <div style={{
                    opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(entry1, [0, 1], [0.9, 1])}) translateY(${interpolate(entry1, [0, 1], [20, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 80,
                        fontWeight: 900,
                        color: '#fff',
                        margin: 0,
                        textShadow: `
                            0 0 20px ${COLORS.primary},
                            ${isGlitching ? '5px' : '0'} 0 0 ${COLORS.secondary}
                        `,
                        letterSpacing: '-2px'
                    }}>
                        {line1}
                    </h1>
                </div>

                {/* Line 2 */}
                <div style={{
                    opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(entry2, [0, 1], [30, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 60,
                        fontWeight: 700,
                        color: COLORS.secondary,
                        margin: 0,
                        background: `linear-gradient(90deg, ${COLORS.secondary}, #fff)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: `0 0 30px ${COLORS.secondary}40`
                    }}>
                        {line2}
                    </h2>
                </div>
            </AbsoluteFill>

            {/* 4. CREATIVE "UI" SEARCH MOCKUP */}
            <div style={{
                position: 'absolute',
                top: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 500,
                height: 40,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                opacity: interpolate(frame, [60, 80], [0, 0.4], { extrapolateRight: 'clamp' })
            }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', marginRight: 15 }} />
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: 'monospace' }}>SEARCHING: [ HIDDEN_DATA ]</div>
            </div>

            {/* 5. OVERLAYS */}
            <StaticVignette />
            <Scanlines />

            {/* Glitch Overlay (Random Bars) */}
            {isGlitching && (
                <AbsoluteFill style={{ zIndex: 100, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        top: `${random(frame + 1) * 100}%`,
                        width: '100%',
                        height: 20,
                        background: 'rgba(255, 0, 255, 0.2)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: `${random(frame + 2) * 100}%`,
                        width: '100%',
                        height: 50,
                        background: 'rgba(0, 255, 255, 0.1)',
                    }} />
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
