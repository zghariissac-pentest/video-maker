import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

// ─── Custom Icons ─────────────────────────────────────────────────────────────
const GitHubIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.white }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

const ReconIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={`${color}15`} />
        <circle cx="12" cy="12" r="6" stroke={`${color}88`} />
        <circle cx="12" cy="12" r="2" fill={color} />
        <line x1="12" y1="12" x2="19" y2="5" />
    </svg>
);

const WebSecIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}15`} />
        <circle cx="12" cy="12" r="4" />
        <ellipse cx="12" cy="12" rx="2" ry="4" stroke={`${color}88`} />
        <line x1="8" y1="12" x2="16" y2="12" stroke={`${color}88`} />
    </svg>
);

const ReverseEngIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.secondary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill={`${color}15`} opacity="0.6" />
        <circle cx="12" cy="12" r="4" fill={`${color}30`} />
        <path d="M14 14l-4-4" />
        <path d="M10 14l4-4" />
        <path d="M12 2v4M12 18v2M4.93 4.93l2.83 2.83M16.24 16.24l1.5 1.5M2 12h4M18 12h2" opacity="0.4" />
    </svg>
);

const ForensicsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#ffb86c' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill={`${color}15`} />
        <circle cx="12" cy="12" r="3" stroke={`${color}`} />
        <line x1="14.12" y1="14.12" x2="17" y2="17" strokeWidth="2.5" />
        <path d="M9 8h6M9 16h3" opacity="0.5" />
    </svg>
);

// ─── Reusable Components ──────────────────────────────────────────────────────

const CategoryCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    color: string;
    showAt: number;
}> = ({ title, icon, color, showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const scale = interpolate(appear, [0, 1], [0.5, 1]);
    const op = interpolate(appear, [0, 1], [0, 1]);
    const yOffset = interpolate(appear, [0, 1], [40, 0]);

    return (
        <div style={{
            opacity: op,
            transform: `scale(${scale}) translateY(${yOffset}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            border: `1px solid ${color}30`,
            borderRadius: '24px',
            padding: '40px 30px',
            width: 320,
            gap: 20,
            boxShadow: `0 15px 35px rgba(0,0,0,0.5), inset 0 0 20px ${color}10`,
        }}>
            <div style={{
                background: `${color}15`,
                borderRadius: '50%',
                padding: '20px',
                boxShadow: `0 0 20px ${color}30`
            }}>
                {icon}
            </div>
            <h3 style={{
                color: 'white',
                fontSize: 36,
                fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
                margin: 0,
                textShadow: `0 0 15px ${color}50`
            }}>
                {title}
            </h3>
        </div>
    );
};

// ─── Main Scene Structure ─────────────────────────────────────────────────────

export const Scene2_AwesomeHacking: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={150} />

            {/* Part 1: GitHub Intro */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: frame < 200 ? 1 : interpolate(frame, [200, 220], [1, 0]),
                transform: `scale(${frame > 200 ? interpolate(spring({ frame: frame - 200, fps, config: { damping: 14 } }), [0, 1], [1, 1.2]) : 1})`,
                pointerEvents: 'none'
            }}>
                <p style={{
                    fontSize: 52,
                    fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 1.5,
                    maxWidth: '85%',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`,
                    opacity: interpolate(spring({ frame: frame - 10, fps }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 10, fps }), [0, 1], [30, 0])}px)`
                }}>
                    وللوصول بسرعة إلى <span style={{ color: COLORS.primary }}>معظم أدوات الاختبار الأمني</span>،<br /> يمكنك ببساطة استخدام مستودع:
                </p>

                {frame >= 80 && (
                    <div style={{
                        marginTop: 70,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 30,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '30px 60px',
                        borderRadius: '30px',
                        boxShadow: `0 20px 50px rgba(255, 255, 255, 0.05)`,
                        opacity: interpolate(spring({ frame: frame - 80, fps }), [0, 1], [0, 1]),
                        transform: `scale(${interpolate(spring({ frame: frame - 80, fps }), [0, 1], [0.8, 1])})`
                    }}>
                        <GitHubIcon size={70} />
                        <span style={{
                            fontSize: 60,
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            color: 'white',
                            letterSpacing: '2px',
                        }}>
                            Awesome Hacking
                        </span>
                    </div>
                )}
            </div>

            {/* Part 2: Categories */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: frame > 210 ? interpolate(frame, [210, 230], [0, 1], { extrapolateRight: 'clamp' }) : 0,
                zIndex: 10,
            }}>
                <p style={{
                    marginBottom: 80,
                    fontSize: 48,
                    fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 1.5,
                    maxWidth: '90%',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`,
                    opacity: interpolate(spring({ frame: frame - 230, fps }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 230, fps }), [0, 1], [-30, 0])}px)`
                }}>
                    هذا المستودع يجمع <span style={{ color: COLORS.accent }}>مئات أدوات Cybersecurity</span> في مكان واحد،<br /> مصنفة حسب مجالات مثل:
                </p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 40,
                    width: '90%',
                    maxWidth: 1200
                }}>
                    <CategoryCard
                        title="Recon"
                        icon={<ReconIcon size={90} color={COLORS.primary} />}
                        color={COLORS.primary}
                        showAt={280}
                    />
                    <CategoryCard
                        title="Web Security"
                        icon={<WebSecIcon size={90} color={COLORS.accent} />}
                        color={COLORS.accent}
                        showAt={315}
                    />
                    <CategoryCard
                        title="Reverse Eng"
                        icon={<ReverseEngIcon size={90} color={COLORS.secondary} />}
                        color={COLORS.secondary}
                        showAt={350}
                    />
                    <CategoryCard
                        title="Forensics"
                        icon={<ForensicsIcon size={90} color="#ffb86c" />}
                        color="#ffb86c"
                        showAt={385}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
