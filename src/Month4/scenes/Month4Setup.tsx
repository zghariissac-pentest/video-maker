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

const StateIndicator: React.FC<{ label: string; value: string; color: string; frame: number; activeFrame: number }> = ({ label, value, color, frame, activeFrame }) => {
    const active = frame > activeFrame;
    return (
        <div style={{
            padding: '20px 40px',
            background: active ? `${color}10` : 'rgba(255, 255, 255, 0.02)',
            borderRadius: 20,
            border: `1px solid ${active ? color : 'rgba(255, 255, 255, 0.05)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            opacity: interpolate(frame, [activeFrame - 15, activeFrame], [0, 1], { extrapolateLeft: 'clamp' }),
            minWidth: 250
        }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: '900', color: active ? color : COLORS.white }}>{value}</div>
        </div>
    );
};

export const Month4Setup: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({ frame, fps, config: { damping: 15 } });

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
                gap: 70,
                zIndex: 10
            }}>
                {/* NARRATIVE TEXT (Arabic) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    opacity: interpolate(frame, [10, 30], [0, 1])
                }}>
                    <div style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: COLORS.white,
                    }}>
                        بعض الأنظمة تعتمد على حالة معينة (state)…
                    </div>
                    <div style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.primary,
                        opacity: interpolate(frame, [100, 120], [0, 1]),
                    }}>
                        وليس فقط على الطلب نفسه
                    </div>
                </div>

                {/* STATE VISUALIZATION GRID */}
                <div style={{
                    display: 'flex',
                    gap: 30,
                    opacity: entry
                }}>
                    <BentoCard style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ fontSize: 13, color: COLORS.primary, fontWeight: 'bold' }}>SERVER PERSISTENT STATE</div>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <StateIndicator
                                label="BALANCE"
                                value="$1,000"
                                color={COLORS.primary}
                                frame={frame}
                                activeFrame={40}
                            />
                            <StateIndicator
                                label="IS_LOCKED"
                                value={frame > 140 ? "FALSE" : "TRUE"}
                                color={frame > 140 ? COLORS.accent : COLORS.secondary}
                                frame={frame}
                                activeFrame={60}
                            />
                        </div>
                    </BentoCard>

                    {/* INCOMING REQUEST (Floating Tooltip overlay) */}
                    <div style={{
                        position: 'absolute',
                        top: 450,
                        right: 150,
                        background: `${COLORS.white}10`,
                        backdropFilter: 'blur(20px)',
                        padding: '15px 30px',
                        borderRadius: 16,
                        border: `1px solid ${COLORS.white}20`,
                        opacity: interpolate(frame, [120, 140], [0, 1]),
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.white }} />
                        <div style={{ fontSize: 18, color: COLORS.white, fontWeight: 'bold' }}>Incoming: withdraw(500)</div>
                    </div>
                </div>
            </div>

            <ModernStaticVignette />
        </AbsoluteFill>
    );
};
