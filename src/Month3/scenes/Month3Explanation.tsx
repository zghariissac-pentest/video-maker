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

const ShieldIcon: React.FC<{ active: boolean; opacity: number; label: string }> = ({ active, opacity, label }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        opacity
    }}>
        <div style={{
            width: 120,
            height: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: active ? `${COLORS.accent}10` : `${COLORS.secondary}10`,
            border: `2px solid ${active ? COLORS.accent : COLORS.secondary}40`,
            borderRadius: '20px 20px 50px 50px',
            position: 'relative',
            boxShadow: active ? `0 0 30px ${COLORS.accent}20` : `0 0 30px ${COLORS.secondary}20`,
        }}>
            <svg viewBox="0 0 24 24" width="60" height="60" fill={active ? COLORS.accent : COLORS.secondary}>
                {active ? (
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                ) : (
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1z M11 14h2v2h-2v-2z" />
                )}
            </svg>
            {!active && (
                <div style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    background: COLORS.secondary,
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 'bold'
                }}>MISSING</div>
            )}
        </div>
        <div style={{ color: active ? COLORS.accent : COLORS.secondary, fontWeight: 'bold', fontSize: 24 }}>{label}</div>
    </div>
);

export const Month3Explanation: React.FC = () => {
    const frame = useCurrentFrame();

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
                    maxWidth: 1000
                }}>
                    <div style={{
                        fontSize: 50,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [10, 30], [0, 1]),
                    }}>
                        بعض الأنظمة تطبق الحماية فقط على<br />
                        <span style={{ color: COLORS.accent }}>GET requests…</span>
                    </div>
                    <div style={{
                        fontSize: 45,
                        fontWeight: 700,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [100, 120], [0, 1]),
                    }}>
                        لكنها تنسى POST أو غيرها.
                    </div>
                </div>

                {/* VISUAL SECURITY MATRIX */}
                <div style={{ display: 'flex', gap: 60 }}>
                    <ShieldIcon
                        label="GET"
                        active={true}
                        opacity={interpolate(frame, [40, 60], [0, 1])}
                    />
                    <div style={{ width: 1, height: 150, background: 'rgba(255,255,255,0.1)', alignSelf: 'center' }} />
                    <ShieldIcon
                        label="POST"
                        active={false}
                        opacity={interpolate(frame, [120, 140], [0, 1])}
                    />
                    <ShieldIcon
                        label="HEAD"
                        active={false}
                        opacity={interpolate(frame, [150, 170], [0, 1])}
                    />
                </div>

                {/* THE TAKEAWAY */}
                <div style={{
                    marginTop: 30,
                    direction: 'rtl',
                    fontSize: 40,
                    fontWeight: 800,
                    color: COLORS.purple,
                    opacity: interpolate(frame, [180, 200], [0, 1]),
                    background: 'rgba(168, 85, 247, 0.05)',
                    padding: '15px 40px',
                    borderRadius: 40,
                    border: '1px solid rgba(168, 85, 247, 0.2)'
                }}>
                    يعني: التحقق موجود… لكن ليس في كل الحالات
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
