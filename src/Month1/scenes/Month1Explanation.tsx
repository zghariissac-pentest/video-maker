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

const IntruderRow: React.FC<{ payload: string; status: string; length: string; isHighlighted?: boolean; opacity: number }> = ({
    payload, status, length, isHighlighted, opacity
}) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        padding: '12px 20px',
        background: isHighlighted ? `${COLORS.primary}20` : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        color: isHighlighted ? COLORS.primary : 'rgba(255,255,255,0.7)',
        fontFamily: 'monospace',
        fontSize: 20,
        opacity,
        borderLeft: isHighlighted ? `4px solid ${COLORS.primary}` : 'none'
    }}>
        <div>{payload}</div>
        <div style={{ color: status === '200' ? COLORS.accent : COLORS.secondary }}>{status}</div>
        <div style={{ fontWeight: isHighlighted ? 'bold' : 'normal', color: isHighlighted ? COLORS.secondary : 'inherit' }}>{length}</div>
    </div>
);

export const Month1Explanation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Data for Intruder table
    const intruderData = [
        { payload: "101", status: "200", length: "512" },
        { payload: "102", status: "200", length: "768", highlight: true },
        { payload: "103", status: "200", length: "512" },
        { payload: "104", status: "200", length: "512" },
        { payload: "105", status: "200", length: "512" },
        { payload: "106", status: "200", length: "512" },
    ];

    const showRepeater = frame < 100;
    const showIntruder = frame >= 80;

    // Repeater simulation logic
    const sendClicks = Math.floor(frame / 10);
    const isSending = frame % 10 < 3;

    return (
        <AbsoluteFill style={{
            background: '#010103',
            fontFamily: 'Cairo, sans-serif',
            overflow: 'hidden',
        }}>
            <StableSpaceBg />
            <StableStarField count={100} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 50,
                zIndex: 10
            }}>

                {/* 1. BURP REPEATER SECTION (Fast Sending) */}
                <div style={{
                    width: 700,
                    height: showRepeater ? 250 : 0,
                    opacity: interpolate(frame, [80, 100], [1, 0], { extrapolateRight: 'clamp' }),
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 20,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 25,
                    overflow: 'hidden',
                    transition: 'height 0.5s ease-in-out'
                }}>
                    <div style={{ color: COLORS.secondary, fontSize: 14, fontWeight: 'bold', marginBottom: 20, letterSpacing: '0.1em' }}>BURP REPEATER</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>Target: auth_v1</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 24, color: COLORS.white }}>GET /api/user?id={100 + sendClicks}</div>
                        </div>
                        <div style={{
                            width: 120,
                            height: 60,
                            background: isSending ? COLORS.primary : 'rgba(71, 160, 245, 0.2)',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: COLORS.white,
                            fontWeight: 'bold',
                            border: `1px solid ${COLORS.primary}`,
                            boxShadow: isSending ? `0 0 30px ${COLORS.primary}80` : 'none',
                            transform: `scale(${isSending ? 0.95 : 1})`,
                        }}>
                            SEND
                        </div>
                    </div>
                </div>

                {/* 2. BURP INTRUDER SECTION (Scale) */}
                {showIntruder && (
                    <div style={{
                        width: 800,
                        background: 'rgba(10, 15, 20, 0.8)',
                        backdropFilter: 'blur(30px)',
                        borderRadius: 24,
                        border: '1px solid rgba(71, 160, 245, 0.2)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                        overflow: 'hidden',
                        opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' }),
                        transform: `translateY(${interpolate(frame, [80, 100], [20, 0], { extrapolateRight: 'clamp' })}px)`
                    }}>
                        <div style={{
                            padding: '12px 20px',
                            background: 'rgba(255,255,255,0.02)',
                            color: COLORS.primary,
                            fontSize: 12,
                            fontWeight: 'bold',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            BURP INTRUDER - ATTACK RESULTS (Payload: ID)
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            padding: '15px 20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: 12,
                            fontFamily: 'monospace'
                        }}>
                            <div>PAYLOAD</div>
                            <div>STATUS</div>
                            <div>LENGTH</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {intruderData.map((row, i) => {
                                const rowAppear = spring({
                                    frame: frame - (100 + i * 3),
                                    fps,
                                    config: { damping: 15 }
                                });
                                return (
                                    <IntruderRow
                                        key={i}
                                        payload={row.payload}
                                        status={row.status}
                                        length={row.length}
                                        isHighlighted={row.highlight && frame > 160}
                                        opacity={rowAppear}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TEXT CONTENT */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15
                }}>
                    <div style={{
                        fontSize: 54,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [40, 60], [0, 1]),
                    }}>
                        هذه التقنية تعتمد على مقارنة الردود…
                    </div>
                    <div style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: COLORS.primary,
                        opacity: interpolate(frame, [120, 140], [0, 1]),
                    }}>
                        وليس فقط قراءتها.
                    </div>
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
