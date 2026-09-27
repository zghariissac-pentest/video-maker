import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month3Theme';

const BurpWindow: React.FC<{ frame: number; showPost: boolean }> = ({ frame, showPost }) => (
    <div style={{
        width: 1000,
        height: 600,
        background: 'rgba(5, 10, 20, 0.9)',
        backdropFilter: 'blur(40px)',
        borderRadius: 24,
        border: `1px solid ${showPost ? COLORS.accent : COLORS.secondary}40`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: `0 50px 100px rgba(0,0,0,0.8), 0 0 50px ${showPost ? COLORS.accent : COLORS.secondary}15`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
        {/* Header */}
        <div style={{ padding: '0 25px', height: 60, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 'bold' }}>BURP_REPEATER_v2.1</div>
        </div>

        {/* Content Split */}
        <div style={{ flex: 1, display: 'flex' }}>
            {/* Request */}
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', padding: 30, fontFamily: 'monospace', fontSize: 24 }}>
                <div style={{ color: COLORS.primary, marginBottom: 15 }}>REQUEST</div>
                <div style={{ color: COLORS.white }}>
                    <span style={{ color: showPost ? COLORS.accent : COLORS.secondary, padding: '2px 8px', background: `${showPost ? COLORS.accent : COLORS.secondary}15`, borderRadius: 4 }}>
                        {showPost ? 'POST' : 'GET'}
                    </span> /admin/dashboard HTTP/1.1
                </div>
                <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>
                    Host: target-server.com<br />
                    User-Agent: Mozilla/5.0...<br />
                    Accept: */*
                </div>
            </div>

            {/* Response */}
            <div style={{ flex: 1, padding: 30, fontFamily: 'monospace', fontSize: 24, background: 'rgba(0,0,0,0.1)' }}>
                <div style={{ color: COLORS.primary, marginBottom: 15 }}>RESPONSE</div>
                <div style={{
                    color: showPost ? COLORS.accent : COLORS.secondary,
                    opacity: interpolate(frame % 30, [0, 15, 30], [1, 0.7, 1]), // subtle pulse
                }}>
                    HTTP/1.1 {showPost ? '200 OK' : '403 Forbidden'}
                </div>

                {showPost && frame > 300 && (
                    <div style={{ marginTop: 20, color: '#E6DB74', fontSize: 18, borderLeft: `2px solid ${COLORS.accent}`, paddingLeft: 15 }}>
                        {'{'} <br />
                        &nbsp;&nbsp;admin_stats: 843,<br />
                        &nbsp;&nbsp;latest_user: admin_root,<br />
                        &nbsp;&nbsp;debug_mode: true<br />
                        {'}'}
                    </div>
                )}
            </div>
        </div>
    </div>
);

export const Month3Demo: React.FC = () => {
    const frame = useCurrentFrame();

    // Timing
    const showPost = frame > 200;

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
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
                gap: 60,
                zIndex: 10
            }}>
                {/* NARRATIVE TEXT (Stable fade) */}
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
                        frame < 200 ? "ممنوع… طبيعي." :
                            "لكن بدل GET… استخدمت POST عبر Burp Suite:"}
                </div>

                {/* VISUAL DEMO AREA */}
                <div style={{
                    opacity: interpolate(frame, [10, 30], [0, 1])
                }}>
                    <BurpWindow frame={frame} showPost={showPost} />
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
