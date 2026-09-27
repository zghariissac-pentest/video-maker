import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    ModernBackground, ModernStaticVignette,
    COLORS
} from '../components/Month4Theme';

const RequestCard: React.FC<{ method: string; path: string; status: string; statusColor: string; opacity: number; frame: number }> = ({
    method, path, status, statusColor, opacity
}) => (
    <div style={{
        width: '100%',
        padding: '25px 35px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(30px)',
        borderRadius: 24,
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.02)',
    }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <span style={{
                color: COLORS.primary,
                fontWeight: '900',
                fontSize: 14,
                padding: '6px 14px',
                background: `${COLORS.primary}15`,
                borderRadius: 8,
                letterSpacing: '0.05em'
            }}>{method}</span>
            <span style={{ color: COLORS.white, fontSize: 26, fontWeight: '800', fontFamily: 'monospace' }}>{path}</span>
        </div>
        <div style={{
            color: statusColor,
            fontWeight: '950',
            fontSize: 24,
            textShadow: `0 0 25px ${statusColor}50`,
            background: `${statusColor}10`,
            padding: '5px 15px',
            borderRadius: 8
        }}>{status}</div>
    </div>
);

export const Month4Demo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timing
    const swapTrigger = frame > 180;
    const showResult = frame > 300;

    // Smoother spring for swap
    const swapSpring = spring({
        frame: frame - 180,
        fps,
        config: { stiffness: 100, damping: 15 }
    });

    const swapOffset = interpolate(swapSpring, [0, 1], [0, 160]);
    const reverseSwapOffset = interpolate(swapSpring, [0, 1], [0, -160]);

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
            fontFamily: 'Inter, Cairo, sans-serif',
            overflow: 'hidden',
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
                {/* HEADLINE */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    fontSize: 52,
                    fontWeight: 900,
                    color: COLORS.white,
                    opacity: interpolate(frame, [10, 30], [0, 1]),
                    height: 100
                }}>
                    لكن ماذا لو عكسنا الترتيب؟
                </div>

                {/* INTERACTIVE REQUEST LIST */}
                <div style={{
                    width: 800,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 25,
                    position: 'relative',
                    padding: '40px',
                }}>

                    {/* Request 1 (Top -> Bottom) */}
                    <div style={{
                        transform: `translateY(${swapOffset}px)`,
                        zIndex: swapTrigger && frame < 200 ? 10 : 1,
                        opacity: interpolate(frame, [60, 80], [0, 1])
                    }}>
                        <RequestCard
                            method="POST"
                            path="/transfer"
                            status={frame > 240 ? "200 OK" : "403 Forbidden"}
                            statusColor={frame > 240 ? COLORS.accent : COLORS.secondary}
                            opacity={1}
                            frame={frame}
                        />
                    </div>

                    {/* Request 2 (Bottom -> Top) */}
                    <div style={{
                        transform: `translateY(${reverseSwapOffset}px)`,
                        zIndex: swapTrigger && frame < 200 ? 20 : 5,
                        opacity: interpolate(frame, [90, 110], [0, 1])
                    }}>
                        <RequestCard
                            method="POST"
                            path="/activate-account"
                            status={frame > 260 ? "200 OK" : "PENDING"}
                            statusColor={frame > 260 ? COLORS.accent : COLORS.primary}
                            opacity={1}
                            frame={frame}
                        />
                    </div>

                    {/* UNEXPECTED BEHAVIOR OVERLAY - Centered better */}
                    {showResult && (
                        <div style={{
                            position: 'absolute',
                            bottom: -180,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 650,
                            background: 'rgba(57, 255, 20, 0.08)',
                            backdropFilter: 'blur(50px)',
                            padding: '30px 40px',
                            borderRadius: 32,
                            border: `1px solid ${COLORS.accent}40`,
                            opacity: interpolate(frame, [300, 320], [0, 1]),
                            boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 50px ${COLORS.accent}15`,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 15
                        }}>
                            <div style={{ color: COLORS.accent, fontWeight: '900', fontSize: 16, letterSpacing: '0.15em' }}>UNEXPECTED LOGIC BYPASS</div>
                            <div style={{ color: COLORS.white, fontSize: 24, fontWeight: '800', lineHeight: 1.4 }}>
                                التحويل تم معالجته قبل انتهاء فحص التفعيل<br />
                                <span style={{ color: COLORS.accent }}>Logic vulnerability triggered.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ModernStaticVignette />
        </AbsoluteFill>
    );
};
