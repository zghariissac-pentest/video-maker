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

const MethodBox: React.FC<{ method: string; status: string; isVulnerable?: boolean; opacity: number; color: string }> = ({
    method, status, isVulnerable, opacity, color
}) => (
    <div style={{
        width: 300,
        padding: 25,
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(30px)',
        borderRadius: 24,
        border: `1px solid ${isVulnerable ? COLORS.secondary : color}40`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        boxShadow: isVulnerable ? `0 0 40px ${COLORS.secondary}20` : 'none',
        position: 'relative',
        overflow: 'hidden'
    }}>
        {isVulnerable && (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: COLORS.secondary,
                boxShadow: `0 0 20px ${COLORS.secondary}`
            }} />
        )}
        <div style={{ color, fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' }}>{method}</div>
        <div style={{
            fontSize: 32,
            fontWeight: '900',
            color: status === '403' ? COLORS.secondary : COLORS.accent,
            textShadow: status === '403' ? 'none' : `0 0 20px ${COLORS.accent}40`
        }}>
            {status}
        </div>
    </div>
);

export const Month3Setup: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

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
                gap: 80,
                zIndex: 10
            }}>
                {/* TEXT CONTENT (Arabic) */}
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
                        هذا endpoint محمي…
                    </div>
                    <div style={{
                        fontSize: 45,
                        fontWeight: 700,
                        color: COLORS.purple,
                        opacity: interpolate(frame, [80, 100], [0, 1]),
                    }}>
                        لكن الحماية هنا ليست على الوصول…
                    </div>
                    <div style={{
                        fontSize: 55,
                        fontWeight: 900,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [160, 180], [0, 1]),
                        textShadow: `0 0 30px ${COLORS.secondary}40`
                    }}>
                        بل على نوع الطلب.
                    </div>
                </div>

                {/* HTTP METHODS VISUALIZATION */}
                <div style={{
                    display: 'flex',
                    gap: 40,
                    opacity: interpolate(frame, [60, 80], [0, 1]),
                }}>
                    <MethodBox
                        method="GET"
                        status="403"
                        color={COLORS.secondary}
                        opacity={spring({ frame: frame - 80, fps, config: { damping: 12 } })}
                    />

                    {/* Visual Connector / Filter */}
                    <div style={{ alignSelf: 'center', opacity: interpolate(frame, [100, 120], [0, 1]) }}>
                        <svg width="60" height="40" viewBox="0 0 60 40">
                            <path d="M10 20 L50 20 M40 10 L50 20 L40 30" fill="none" stroke={COLORS.purple} strokeWidth="3" />
                        </svg>
                    </div>

                    <MethodBox
                        method="POST / DEBUG"
                        status="200"
                        color={COLORS.accent}
                        isVulnerable={frame > 180}
                        opacity={spring({ frame: frame - 140, fps, config: { damping: 12 } })}
                    />
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
