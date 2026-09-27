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

export const Month1Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({ frame, fps, config: { damping: 20 } });

    // Logic path animation
    const pathLine = interpolate(frame, [30, 80], [0, 1], { extrapolateRight: 'clamp' });
    const revealLogic = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });

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
                gap: 80,
                zIndex: 10
            }}>

                {/* SERVER LOGIC VISUALIZATION */}
                <div style={{ position: 'relative', width: 600, height: 400, opacity: entry }}>
                    {/* Server Node */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 140,
                        height: 140,
                        background: 'rgba(71, 160, 245, 0.1)',
                        border: `2px solid ${COLORS.primary}`,
                        borderRadius: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 50px ${COLORS.primary}40`,
                        zIndex: 5
                    }}>
                        <svg viewBox="0 0 24 24" width="70" height="70" fill={COLORS.primary}>
                            <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        </svg>
                    </div>

                    {/* Logic Paths */}
                    <svg width="600" height="400" style={{ position: 'absolute', top: 0, left: 0 }}>
                        {/* Normal Path (ID 101) */}
                        <line
                            x1="300" y1="200"
                            x2="100" y2="100"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                            strokeDasharray="400"
                            strokeDashoffset={400 * (1 - pathLine)}
                        />
                        <circle cx="100" cy="100" r="10" fill="rgba(255,255,255,0.2)" opacity={pathLine} />
                        <text x="50" y="80" fill="rgba(255,255,255,0.4)" fontSize="14" opacity={pathLine}>ID: 101 (Default)</text>

                        {/* Vulnerable Path (ID 102) */}
                        <line
                            x1="300" y1="200"
                            x2="500" y2="100"
                            stroke={COLORS.secondary}
                            strokeWidth="4"
                            strokeDasharray="400"
                            strokeDashoffset={400 * (1 - pathLine)}
                            style={{ filter: `drop-shadow(0 0 10px ${COLORS.secondary}80)` }}
                        />
                        <circle cx="500" cy="100" r="12" fill={COLORS.secondary} opacity={pathLine} />
                        <text x="480" y="70" fill={COLORS.secondary} fontSize="18" fontWeight="bold" opacity={pathLine}>ID: 102 (HIDDEN LOGIC)</text>

                        {/* More rays */}
                        <line x1="300" y1="200" x2="150" y2="320" stroke="rgba(255,255,255,0.05)" strokeWidth="1" opacity={pathLine} />
                        <line x1="300" y1="200" x2="450" y2="320" stroke="rgba(255,255,255,0.05)" strokeWidth="1" opacity={pathLine} />
                    </svg>

                    {/* Logic Connection Symbol */}
                    <div style={{
                        position: 'absolute',
                        top: 250,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        opacity: revealLogic
                    }}>
                        <div style={{ color: COLORS.accent, fontSize: 16, fontWeight: 'bold' }}>SENSITIVE DATA FLOW DETECTED</div>
                        <div style={{ width: 200, height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)` }} />
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
                        fontSize: 54,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: interpolate(frame, [20, 40], [0, 1]),
                    }}>
                        هذا الفرق يعني…
                    </div>
                    <div style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: COLORS.primary,
                        opacity: interpolate(frame, [80, 100], [0, 1]),
                    }}>
                        أن السيرفر يتعامل مع كل ID بشكل مختلف…
                    </div>
                    <div style={{
                        fontSize: 40,
                        fontWeight: 600,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [150, 175], [0, 1]),
                        fontStyle: 'italic'
                    }}>
                        حتى لو لم يظهر ذلك مباشرة.
                    </div>
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
