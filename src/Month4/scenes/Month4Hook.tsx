import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    ModernBackground, ModernStaticVignette, BentoCard,
    COLORS
} from '../components/Month4Theme';

const RequestNode: React.FC<{ id: string; frame: number; activeFrame: number; color: string }> = ({ id, frame, activeFrame, color }) => {
    const active = frame > activeFrame;
    return (
        <div style={{
            flex: 1,
            height: 140,
            background: active ? `${color}10` : 'rgba(255, 255, 255, 0.02)',
            borderRadius: 20,
            border: `1px solid ${active ? color : 'rgba(255, 255, 255, 0.05)'}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            boxShadow: active ? `0 0 30px ${color}20` : 'none',
            opacity: interpolate(frame, [activeFrame - 15, activeFrame], [0, 1], { extrapolateLeft: 'clamp' }),
        }}>
            <div style={{ color: active ? color : 'rgba(255,255,255,0.2)', fontSize: 13, fontWeight: 'bold', letterSpacing: '0.1em' }}>REQ_ID</div>
            <div style={{ color: COLORS.white, fontSize: 32, fontWeight: '800', fontFamily: 'monospace' }}>{id}</div>
        </div>
    );
};

export const Month4Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({ frame, fps, config: { damping: 20 } });

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
            fontFamily: 'Inter, Cairo, sans-serif',
        }}>
            <ModernBackground />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 60,
                zIndex: 10
            }}>

                {/* MODERN ARCHITECTURE GRID */}
                <BentoCard style={{
                    width: 900,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 30,
                    opacity: entry
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        paddingBottom: 20
                    }}>
                        <div style={{ color: COLORS.primary, fontSize: 13, fontWeight: 'bold' }}>SYSTEM PROCESSING QUEUE</div>
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>LATENCY: 1.2ms</div>
                    </div>

                    <div style={{ display: 'flex', gap: 20 }}>
                        <RequestNode id="#A" frame={frame} activeFrame={40} color={COLORS.primary} />
                        <div style={{ alignSelf: 'center', opacity: interpolate(frame, [60, 80], [0, 1]) }}>
                            <svg width="40" height="20" viewBox="0 0 40 20">
                                <path d="M0 10 L40 10 M30 0 L40 10 L30 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                            </svg>
                        </div>
                        <RequestNode id="#B" frame={frame} activeFrame={70} color={COLORS.primary} />
                    </div>

                    {/* Logic Conflict (Modern Overlay) */}
                    <div style={{
                        height: 2,
                        width: '100%',
                        background: `linear-gradient(90deg, transparent, ${COLORS.secondary}, transparent)`,
                        opacity: interpolate(frame, [100, 120, 180, 200], [0, 1, 1, 0]),
                        boxShadow: `0 0 20px ${COLORS.secondary}`,
                    }} />
                </BentoCard>

                {/* TEXT CONTENT (Arabic) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                }}>
                    <div style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [30, 50], [0, 1]),
                    }}>
                        نفس الطلبات…
                    </div>
                    <div style={{
                        fontSize: 75,
                        fontWeight: 900,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [140, 160], [0, 1]),
                        textShadow: `0 0 40px ${COLORS.secondary}30`,
                        background: `linear-gradient(135deg, ${COLORS.white}, ${COLORS.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        لكن ترتيبها هو الذي غيّر النتيجة.
                    </div>
                </div>
            </div>

            <ModernStaticVignette />
        </AbsoluteFill>
    );
};
