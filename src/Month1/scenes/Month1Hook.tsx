import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month1Theme';

export const Month1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10,
        fps,
        config: { stiffness: 100, damping: 14 }
    });

    const terminalScale = interpolate(entry, [0, 1], [0.85, 1], { extrapolateRight: 'clamp' });
    const contentOpacity = interpolate(entry, [0, 1], [0, 1]);

    // -- TEXT DATA (Arabic) --
    const line1 = "هذا الطلب يبدو عادي…";
    const line2 = "لكن فرق بسيط في الرد… كشف مشكلة حقيقية.";

    // Command line simulation
    const commandText = "curl -i -X POST https://api.secure-app.com/v1/auth -H \"Content-Type: application/json\"";
    const responseHeader1 = "HTTP/1.1 200 OK";
    const responseHeader2 = "X-Backend-Server: edge-node-04";
    const responseHeader3 = "Content-Length: 432"; // The "small difference"

    // Character by character reveal for command
    const typedLength = Math.min(commandText.length, Math.floor(frame / 1.5));
    const currentCommand = commandText.substring(0, typedLength);

    return (
        <AbsoluteFill style={{
            background: '#010103',
            overflow: 'hidden',
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* 1. BACKGROUND: Space Theme */}
            <AbsoluteFill style={{ opacity: 0.25 }}>
                <StableSpaceBg />
                <StableStarField count={100} />
            </AbsoluteFill>

            {/* 2. LAYER: CENTER GLOW */}
            <div style={{
                position: 'absolute',
                width: 1000,
                height: 1000,
                background: 'radial-gradient(circle, rgba(71, 160, 245, 0.1) 0%, transparent 70%)',
                opacity: contentOpacity,
            }} />

            {/* 3. LAYER: CONTENT */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 80,
                opacity: contentOpacity,
                transform: `scale(${terminalScale})`,
            }}>

                {/* ADVANCED TERMINAL COMPONENT */}
                <div style={{
                    width: 850,
                    height: 500,
                    background: 'rgba(10, 15, 20, 0.7)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: 24,
                    border: '1px solid rgba(71, 160, 245, 0.2)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 20px rgba(71, 160, 245, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    {/* Header */}
                    <div style={{
                        height: 48,
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 20px',
                        gap: 12,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                        <div style={{
                            marginLeft: 15,
                            fontSize: 14,
                            color: 'rgba(255,255,255,0.4)',
                            fontFamily: 'monospace',
                            letterSpacing: '0.1em'
                        }}>
                            SESSION: ADVANCED_PENTEST_v3.2
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div style={{
                        flex: 1,
                        padding: 30,
                        fontFamily: 'monospace',
                        fontSize: 22,
                        lineHeight: 1.5,
                        color: COLORS.white,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10
                    }}>
                        {/* Prompt & Typed Command */}
                        <div style={{ display: 'flex', gap: 15 }}>
                            <span style={{ color: COLORS.accent }}>visitor@proton:~$</span>
                            <span>{currentCommand}<span style={{
                                opacity: frame % 20 < 10 ? 1 : 0,
                                background: COLORS.primary,
                                color: COLORS.primary,
                                marginLeft: 2
                            }}>_</span></span>
                        </div>

                        {/* Response (Delayed appear) */}
                        <div style={{
                            marginTop: 30,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                            opacity: interpolate(frame, [100, 115], [0, 1], { extrapolateRight: 'clamp' }),
                        }}>
                            <div style={{ color: COLORS.accent }}>{responseHeader1}</div>
                            <div style={{ color: 'rgba(255,255,255,0.6)' }}>{responseHeader2}</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Content-Length:</span>
                                <span style={{
                                    color: COLORS.secondary,
                                    padding: '0 8px',
                                    background: `${COLORS.secondary}15`,
                                    borderRadius: 4,
                                    border: `1px solid ${COLORS.secondary}30`,
                                    fontWeight: 'bold',
                                    animation: frame > 130 ? 'pulse 1s infinite' : 'none'
                                }}>432</span>
                                <span style={{
                                    color: COLORS.secondary,
                                    opacity: interpolate(frame, [140, 155], [0, 1], { extrapolateRight: 'clamp' }),
                                    fontSize: 16,
                                    fontStyle: 'italic',
                                    marginLeft: 10
                                }}>{"<-- " + responseHeader3}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TEXT CONTENT (Arabic) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}>
                    <div style={{
                        fontSize: 70,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' }),
                        textShadow: '0 0 30px rgba(255,255,255,0.2)',
                    }}>
                        {line1}
                    </div>
                    <div style={{
                        fontSize: 54,
                        fontWeight: 700,
                        color: COLORS.primary,
                        opacity: interpolate(frame, [150, 175], [0, 1], { extrapolateRight: 'clamp' }),
                        maxWidth: 900,
                        lineHeight: 1.4,
                        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {line2}
                    </div>
                </div>
            </div>

            {/* VIGNETTE & SCANLINES */}
            <StaticVignette />
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
                backgroundSize: '100% 4px, 3px 100%',
                pointerEvents: 'none',
                opacity: 0.3
            }} />

            {/* STYLE KEYFRAMES (Inline) */}
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 1; box-shadow: 0 0 0px rgba(245, 71, 104, 0); }
                        50% { opacity: 0.7; box-shadow: 0 0 15px rgba(245, 71, 104, 0.4); }
                        100% { opacity: 1; box-shadow: 0 0 0px rgba(245, 71, 104, 0); }
                    }
                `}
            </style>
        </AbsoluteFill>
    );
};
