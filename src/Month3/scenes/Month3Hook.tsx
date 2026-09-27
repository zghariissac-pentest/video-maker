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
} from '../components/Month3Theme';

export const Month3Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Stable Entry
    const entry = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15 }
    });

    const contentOpacity = interpolate(entry, [0, 1], [0, 1]);

    // 403 Error Animation
    const errorPulse = interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.7]);

    // Narrative Text
    const line1 = "الـ 403 هنا…";
    const line2 = "لا تعني ما تعتقد.";

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
            overflow: 'hidden',
            fontFamily: 'Cairo, sans-serif',
        }}>
            <StableSpaceBg />
            <StableStarField count={150} />

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

                {/* LARGE "403" BACKGROUND TEXT (Creative Decor) */}
                <div style={{
                    position: 'absolute',
                    fontSize: 600,
                    fontWeight: 950,
                    color: COLORS.secondary,
                    opacity: errorPulse * 0.1,
                    letterSpacing: '-20px',
                    filter: 'blur(10px)',
                    zIndex: -1,
                }}>
                    403
                </div>

                {/* ADVANCED BYPASS CONTROLLER (Terminal Window) */}
                <div style={{
                    width: 850,
                    height: 480,
                    background: 'rgba(10, 15, 30, 0.85)',
                    backdropFilter: 'blur(50px)',
                    borderRadius: 32,
                    border: `1px solid rgba(168, 85, 247, 0.3)`,
                    boxShadow: `0 80px 160px rgba(0,0,0,0.8), 0 0 60px rgba(168, 85, 247, 0.1)`,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    opacity: contentOpacity,
                }}>
                    {/* Header */}
                    <div style={{
                        height: 54,
                        background: 'rgba(168, 85, 247, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 25px',
                        gap: 15,
                        borderBottom: '1px solid rgba(168, 85, 247, 0.2)'
                    }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.secondary }} />
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.warning }} />
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.accent }} />
                        <div style={{ marginLeft: 20, fontSize: 13, color: COLORS.purple, fontWeight: 'bold', letterSpacing: '0.1em' }}>
                            BYPASS_PROTOCOL_EXT: 403_REWRITE
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div style={{ padding: 40, fontFamily: 'monospace', fontSize: 24, lineHeight: 1.6, color: COLORS.white }}>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <span style={{ color: COLORS.purple }}>$</span>
                            <span>curl -H <span style={{ color: COLORS.secondary }}>"X-Original-URL: /admin"</span></span>
                        </div>
                        <div style={{ marginLeft: 30, marginTop: 10 }}>
                            <span style={{ color: COLORS.primary }}>https://target-server.com/public</span>
                        </div>

                        {/* Bypass Status */}
                        <div style={{
                            marginTop: 60,
                            padding: 25,
                            borderLeft: `4px solid ${COLORS.accent}`,
                            background: 'rgba(40, 200, 64, 0.05)',
                            borderRadius: 8,
                            opacity: interpolate(frame, [80, 100], [0, 1]),
                        }}>
                            <div style={{ color: COLORS.accent, fontWeight: 'bold', fontSize: 16 }}>STATUS: 200 OK</div>
                            <div style={{ marginTop: 10, fontSize: 20 }}>Welcome to Admin Dashboard</div>
                        </div>
                    </div>
                </div>

                {/* TEXT CONTENT (Arabic) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15
                }}>
                    <div style={{
                        fontSize: 65,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [40, 60], [0, 1]),
                        textShadow: '0 0 30px rgba(255,255,255,0.2)',
                    }}>
                        {line1}
                    </div>
                    <div style={{
                        fontSize: 85,
                        fontWeight: 900,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [140, 160], [0, 1]),
                        textShadow: `0 0 50px ${COLORS.secondary}50`,
                    }}>
                        {line2}
                    </div>
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
