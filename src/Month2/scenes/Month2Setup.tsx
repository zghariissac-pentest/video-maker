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
} from '../components/Month2Theme';

const TechCard: React.FC<{ name: string; behavior: string; opacity: number; color: string; frame: number; i: number }> = ({
    name, behavior, color, frame, i
}) => {
    // Stable entry (fade only)
    const { fps } = useVideoConfig();
    const springEntry = spring({
        frame: frame - (40 + i * 8),
        fps,
        config: { stiffness: 120, damping: 12 }
    });

    return (
        <div style={{
            width: 320,
            padding: 24,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(30px)',
            borderRadius: 24,
            border: `1px solid ${color}${Math.floor(interpolate(springEntry, [0, 1], [10, 50]))}`,
            opacity: springEntry,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 30px ${color}${Math.floor(interpolate(springEntry, [0, 1], [0, 15]))}`,
        }}>
            <div style={{ color, fontSize: 18, fontWeight: 'bold', letterSpacing: '0.05em' }}>{name}</div>
            <div style={{ color: COLORS.white, fontSize: 26, fontWeight: '800' }}>{behavior}</div>
        </div>
    );
};

export const Month2Setup: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({ frame, fps, config: { stiffness: 100, damping: 15 } });

    const techs = [
        { name: "PHP / Apache", behavior: "Last occurrence", color: COLORS.primary },
        { name: "ASP.NET / IIS", behavior: "Comma separated", color: COLORS.secondary },
        { name: "Python / Flask", behavior: "First occurrence", color: COLORS.accent },
    ];

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
                gap: 70,
                zIndex: 10
            }}>
                {/* HEADLINE TEXT (Stable fade only) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 1000
                }}>
                    <div style={{
                        fontSize: 65,
                        fontWeight: 900,
                        color: COLORS.white,
                        opacity: entry,
                        textShadow: '0 0 40px rgba(71, 160, 245, 0.3)',
                        lineHeight: 1.3
                    }}>
                        بعض الأنظمة لا تتعامل مع<br />
                        <span style={{
                            color: COLORS.secondary,
                            background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>duplicate parameters</span> بشكل صحيح…
                    </div>
                </div>

                {/* TECHNOLOGY GRID (Stable fade only) */}
                <div style={{
                    display: 'flex',
                    gap: 30,
                }}>
                    {techs.map((tech, i) => (
                        <TechCard
                            key={i}
                            i={i}
                            frame={frame}
                            name={tech.name}
                            behavior={tech.behavior}
                            color={tech.color}
                            opacity={1}
                        />
                    ))}
                </div>

                {/* SYMBOLIC WARNING (Stable fade only) */}
                <div style={{
                    marginTop: 30,
                    opacity: interpolate(frame, [100, 120], [0, 1]),
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span>HPP Exploit Logic Active</span>
                </div>
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
