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
} from '../components/Month2Theme';

const SyntaxHighlighted: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(' ');
    return (
        <span>
            {parts.map((part, i) => {
                let color = COLORS.white;
                if (i === 0) color = COLORS.accent; // curl
                else if (part.startsWith('-')) color = COLORS.primary; // flags
                else if (part.includes('http')) color = '#E6DB74'; // strings/urls

                return (
                    <span key={i} style={{ color }}>
                        {part}{i < parts.length - 1 ? ' ' : ''}
                    </span>
                );
            })}
        </span>
    );
};

export const Month2Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS (STABLE) --
    const entry = spring({
        frame: frame - 10,
        fps,
        config: { stiffness: 100, damping: 14 }
    });

    const contentOpacity = interpolate(entry, [0, 1], [0.1, 1]); // Keep subtle glow even at start

    // Impact Flash
    const flash = interpolate(frame, [140, 142, 148], [0, 1, 0], { extrapolateRight: 'clamp' });

    // -- TEXT DATA --
    const line1 = "أرسلت نفس الـ parameter مرتين…";
    const line2 = "وأصبحت Admin";

    const commandText = "curl -X GET https://api.vulnerable.com/v1/profile?user=user&user=admin";
    const typedLength = Math.min(commandText.length, Math.floor(frame / 1.2));
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
            {/* 1. BACKGROUND: Advanced Space */}
            <AbsoluteFill style={{ opacity: 0.3 }}>
                <StableSpaceBg />
                <StableStarField count={120} />
            </AbsoluteFill>

            {/* Subtle Binary Particles */}
            {[...Array(15)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: `${(i * 137.5) % 100}%`,
                    left: `${(i * 224.7) % 100}%`,
                    color: COLORS.primary,
                    fontSize: 10,
                    opacity: 0.05,
                    fontFamily: 'monospace',
                }}>
                    {i % 2 === 0 ? '010101' : '101010'}
                </div>
            ))}

            {/* 2. CENTER GLOW */}
            <div style={{
                position: 'absolute',
                width: 1200,
                height: 1200,
                background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
                opacity: contentOpacity,
            }} />

            {/* 3. LAYER: CONTENT */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 90,
                opacity: contentOpacity,
            }}>

                {/* ADVANCED TERMINAL WITH GLASS & SCANLINE */}
                <div style={{
                    width: 900,
                    height: 520,
                    background: 'rgba(5, 8, 12, 0.8)',
                    backdropFilter: 'blur(40px)',
                    borderRadius: 32,
                    border: '1px solid rgba(71, 160, 245, 0.3)',
                    boxShadow: '0 60px 120px rgba(0,0,0,0.9), 0 0 40px rgba(71, 160, 245, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* Header */}
                    <div style={{
                        height: 54,
                        background: 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 25px',
                        gap: 14,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', boxShadow: '0 0 10px #ff5f5740' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', boxShadow: '0 0 10px #febc2e40' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 10px #28c84040' }} />
                        <div style={{ marginLeft: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>HPP_EXPLOIT_SESSION</div>
                    </div>

                    {/* Holographic Scanline */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, rgba(71, 160, 245, 0.4), transparent)',
                        boxShadow: '0 0 20px rgba(71, 160, 245, 0.5)',
                        transform: `translateY(${(frame * 4) % 520}px)`,
                        zIndex: 10,
                        opacity: 0.6
                    }} />

                    {/* Terminal Body */}
                    <div style={{
                        flex: 1,
                        padding: 40,
                        fontFamily: 'monospace',
                        fontSize: 24,
                        lineHeight: 1.6,
                        color: COLORS.white,
                    }}>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <span style={{ color: COLORS.accent, fontWeight: 'bold' }}>root@exploit:~$</span>
                            <SyntaxHighlighted text={currentCommand} />
                            <span style={{
                                width: 12,
                                height: 30,
                                background: COLORS.primary,
                                opacity: frame % 20 < 10 ? 1 : 0,
                                marginLeft: 4
                            }} />
                        </div>

                        {/* Parameter Highlight */}
                        {frame > 65 && (
                            <div style={{
                                position: 'absolute',
                                top: 125,
                                left: 470,
                                width: 330,
                                height: 40,
                                border: `2px solid ${COLORS.secondary}`,
                                background: `${COLORS.secondary}10`,
                                borderRadius: 6,
                                opacity: interpolate(frame, [65, 80], [0, 1]),
                                boxShadow: `0 0 25px ${COLORS.secondary}60`,
                            }} />
                        )}

                        {/* Hacker Response UI */}
                        <div style={{
                            marginTop: 50,
                            opacity: interpolate(frame, [110, 130], [0, 1]),
                        }}>
                            <div style={{ color: COLORS.accent, fontSize: 16 }}>HTTP/1.1 200 OK</div>
                            <div style={{
                                marginTop: 20,
                                background: 'rgba(0,0,0,0.3)',
                                padding: '25px',
                                borderRadius: 16,
                                borderLeft: `4px solid ${frame > 140 ? COLORS.secondary : COLORS.primary}`,
                                boxShadow: frame > 140 ? `inset 0 0 40px ${COLORS.secondary}15` : 'none',
                                transition: 'all 0.2s ease-in-out'
                            }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{'{ '}</span>
                                <span style={{ color: COLORS.primary }}>role</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>: </span>
                                <span style={{
                                    color: frame > 140 ? COLORS.secondary : COLORS.primary,
                                    fontWeight: 'bold',
                                    textShadow: frame > 140 ? `0 0 10px ${COLORS.secondary}` : 'none'
                                }}>
                                    {frame > 140 ? 'admin' : 'user'}
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>, </span>
                                <span style={{ color: COLORS.primary }}>status</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>: </span>
                                <span style={{ color: COLORS.accent }}>authenticated</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{' }'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TEXT CONTENT */}
                <div style={{ direction: 'rtl', textAlign: 'center' }}>
                    <div style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [40, 60], [0, 1]),
                        letterSpacing: '-0.02em'
                    }}>
                        {line1}
                    </div>
                    <div style={{
                        marginTop: 20,
                        fontSize: 90,
                        fontWeight: 950,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [140, 155], [0, 1]),
                        textShadow: `0 0 60px ${COLORS.secondary}80, 0 0 20px ${COLORS.secondary}`,
                        filter: `drop-shadow(0 0 40px ${COLORS.secondary}30)`
                    }}>
                        {line2}
                    </div>
                </div>
            </div>

            {/* IMPACT FLASH */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: COLORS.white,
                opacity: flash * 0.15,
                zIndex: 100,
                pointerEvents: 'none'
            }} />

            <StaticVignette />
        </AbsoluteFill>
    );
};
