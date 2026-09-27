import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS, GhostIcon
} from '../components/Theme';

const SearchIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" fill={`${color}15`} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const WorkflowStep: React.FC<{
    title: string;
    showAt: number;
    delay: number;
    icon: React.ReactNode;
}> = ({ title, showAt, delay, icon }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const appear = spring({ frame: frame - (showAt + delay), fps, config: { damping: 14 } });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            background: 'rgba(5, 15, 30, 0.6)',
            padding: '25px 40px',
            borderRadius: '20px',
            border: `1px solid ${COLORS.primary}20`,
            width: '100%',
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [50, 0])}px)`,
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `${COLORS.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {icon}
            </div>
            <span style={{
                fontSize: 40,
                color: 'white',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
            }}>{title}</span>
        </div>
    );
};

export const Scene4_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={150} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '0 60px',
                zIndex: 10,
                gap: 50
            }}>
                {/* Conclusion Text Part 1 */}
                <div style={{
                    opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(spring({ frame: frame - 10, fps }), [0, 1], [20, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 44,
                        fontWeight: 800,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'white',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        في كثير من تحديات <span style={{ color: COLORS.secondary }}>CTF</span> قد يكون التطبيق الحقيقي موجوداً خلف <span style={{ color: COLORS.primary }}>Virtual Host</span> غير ظاهر في الصفحة الرئيسية.
                    </p>
                </div>

                {/* Workflow Visualization */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <WorkflowStep
                        title="Web Reconnaissance"
                        showAt={80}
                        delay={0}
                        icon={<SearchIcon size={40} color={COLORS.accent} />}
                    />
                    <div style={{
                        height: 40, width: 2, background: `linear-gradient(${COLORS.primary}40, transparent)`,
                        marginLeft: 'auto', marginRight: 120, opacity: frame > 100 ? 1 : 0
                    }} />
                    <WorkflowStep
                        title="VHost Enumeration"
                        showAt={100}
                        delay={10}
                        icon={<GhostIcon size={40} color={COLORS.primary} />}
                    />
                </div>

                {/* Conclusion Text Part 2 */}
                <div style={{
                    opacity: interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateY(${interpolate(spring({ frame: frame - 160, fps }), [0, 1], [20, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 40,
                        fontWeight: 600,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        لهذا السبب تعتبر هذه المرحلة <span style={{ color: COLORS.accent }}>خطوة مهمة جداً</span>.
                    </p>
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: 60,
                    background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.secondary}20)`,
                    padding: '30px 50px',
                    borderRadius: '300px', // More pill-like
                    border: `1px solid ${COLORS.primary}50`,
                    opacity: interpolate(frame, [260, 280], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(spring({ frame: frame - 260, fps }), [0, 1], [0.8, 1])})`,
                    boxShadow: `0 0 40px ${COLORS.primary}20`,
                }}>
                    <p style={{
                        fontSize: 40,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'white',
                        margin: 0,
                    }}>
                        وإذا أردت المزيد من هذه الحيل العملية في <br />
                        <span style={{ color: COLORS.primary }}>Cybersecurity</span> و <span style={{ color: COLORS.secondary }}>CTFs</span>، تابع الحساب.
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
