import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month2Theme';

const RequestLine: React.FC<{ text: string; opacity: number; highlight?: boolean }> = ({ text, opacity, highlight }) => (
    <div style={{
        padding: '20px 30px',
        background: highlight ? `${COLORS.primary}15` : 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        border: `1px solid ${highlight ? COLORS.primary : 'rgba(255, 255, 255, 0.1)'}`,
        opacity,
        fontFamily: 'monospace',
        fontSize: 26,
        color: highlight ? COLORS.secondary : COLORS.white,
        boxShadow: highlight ? `0 0 30px ${COLORS.primary}20` : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 15
    }}>
        <span style={{ color: COLORS.accent }}>GET</span>
        <span>{text}</span>
    </div>
);

export const Month2Demo: React.FC = () => {
    const frame = useCurrentFrame();

    // Timing
    const showReq1 = frame > 20;
    const showReq2 = frame > 120;
    const showRepeater = frame > 220;
    const showResult = frame > 300;

    // Repeater button animation (Stable click)
    const isSending = frame >= 260 && frame <= 275;

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
                {/* NARRATIVE TEXT (Stable fade only) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    height: 120,
                    fontSize: 48,
                    fontWeight: 800,
                    color: COLORS.white,
                    maxWidth: 1000
                }}>
                    {frame < 120 ? "هذا الطلب العادي:" :
                        frame < 220 ? "لكن ماذا لو أرسلنا نفس الـ parameter مرتين؟" :
                            frame < 300 ? "باستخدام Burp Suite… أرسلت الطلب…" :
                                "والنتيجة؟ السيرفر أخذ قيمة مختلفة عما تتوقع."}
                </div>

                {/* VISUAL DEMO AREA (Stable fade only) */}
                <div style={{
                    width: 950,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 30,
                    opacity: interpolate(frame, [10, 30], [0, 1])
                }}>

                    {/* Normal Request */}
                    {showReq1 && frame < 220 && (
                        <RequestLine
                            text="/api/user?role=user"
                            opacity={interpolate(frame, [20, 35], [0, 1])}
                        />
                    )}

                    {/* Doubled Request */}
                    {showReq2 && frame < 220 && (
                        <RequestLine
                            text="/api/user?role=user&role=admin"
                            highlight
                            opacity={interpolate(frame, [120, 135], [0, 1])}
                        />
                    )}

                    {/* BURP REPEATER MINI-UI (Stable fade only) */}
                    {showRepeater && (
                        <div style={{
                            width: '100%',
                            background: 'rgba(10, 15, 20, 0.8)',
                            backdropFilter: 'blur(30px)',
                            borderRadius: 24,
                            border: '1px solid rgba(71, 160, 245, 0.3)',
                            padding: 30,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            opacity: interpolate(frame, [220, 235], [0, 1]),
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ color: COLORS.primary, fontSize: 14, fontWeight: 'bold' }}>BURP REPEATER SESSION</div>
                                <div style={{
                                    padding: '10px 25px',
                                    background: isSending ? COLORS.primary : 'rgba(71, 160, 245, 0.2)',
                                    borderRadius: 8,
                                    border: `1px solid ${COLORS.primary}`,
                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                    transition: 'all 0.1s ease',
                                    boxShadow: isSending ? `0 0 30px ${COLORS.primary}60` : 'none'
                                }}>
                                    SEND
                                </div>
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: 24, color: COLORS.white }}>
                                <span style={{ color: COLORS.accent }}>GET</span> /api/user?role=user&role=admin HTTP/1.1
                            </div>

                            {/* RESULT FADE IN */}
                            {showResult && (
                                <div style={{
                                    marginTop: 20,
                                    padding: 20,
                                    background: 'rgba(245, 71, 104, 0.1)',
                                    borderRadius: 12,
                                    border: `1px solid ${COLORS.secondary}40`,
                                    opacity: interpolate(frame, [300, 320], [0, 1]),
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ color: COLORS.white, fontWeight: 'bold' }}>Final Logic:</span>
                                    <span style={{ color: COLORS.secondary, fontSize: 28, fontWeight: '900', textShadow: `0 0 20px ${COLORS.secondary}50` }}>
                                        ADMIN PRIVILEGES GRANTED
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
