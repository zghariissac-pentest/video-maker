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
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Network, User, Cookie, Globe, FileSearch, ShieldCheck, LucideProps } from 'lucide-react';

const ExplanatonLine: React.FC<{
    text: React.ReactNode;
    showAt: number;
    hideAt?: number;
    color?: string;
    align?: 'right' | 'center';
    fontSize?: number;
}> = ({ text, showAt, hideAt, color = 'white', align = 'right', fontSize = 42 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <p style={{
            fontSize: fontSize,
            fontWeight: 800,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: align,
            color: color,
            lineHeight: 1.4,
            width: '100%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '10px 0',
            textShadow: '0 5px 20px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

const LogicCard: React.FC<{
    text: string;
    icon: React.ReactNode;
    showAt: number;
    color: string;
    delay: number;
}> = ({ text, icon, showAt, color, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt + delay) return null;

    const appear = spring({ frame: frame - (showAt + delay), fps, config: { damping: 12, stiffness: 100 } });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            background: 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${color}30`,
            borderRadius: '25px',
            padding: '25px 40px',
            width: '90%',
            maxWidth: '800px',
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [50, 0])}px)`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 20px ${color}10`,
            backdropFilter: 'blur(10px)',
            marginBottom: 20,
        }}>
            <div style={{
                color: color,
                background: `${color}15`,
                padding: 15,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 45 })}
            </div>
            <span style={{
                fontSize: 38,
                fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
                color: 'white',
                direction: 'rtl',
                textAlign: 'right',
                flex: 1,
            }}>
                {text}
            </span>
        </div>
    );
};

export const Scene2_IdentifyLogic: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={120} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '0 60px',
                zIndex: 10
            }}>

                {/* Header Section */}
                <div style={{ width: '100%', marginBottom: 60, opacity: interpolate(frame, [420, 440], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 30,
                        marginBottom: 30,
                        opacity: spring({ frame: frame - 10, fps: 30 })
                    }}>
                        <ShieldCheck size={80} color={COLORS.primary} />
                    </div>

                    <ExplanatonLine
                        text={<>أول خطوة: <span style={{ color: COLORS.primary }}>اعرف أين يتم تطبيق الحد.</span></>}
                        showAt={20}
                        align="center"
                        fontSize={55}
                    />
                </div>

                {/* Factors List */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: interpolate(frame, [420, 440], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                }}>
                    <ExplanatonLine
                        text="هل يعتمد على:"
                        showAt={80}
                        color={COLORS.accent}
                        align="center"
                        fontSize={40}
                    />

                    <div style={{ marginTop: 30, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LogicCard text="IP Address" icon={<Network />} showAt={100} delay={0} color={COLORS.primary} />
                        <LogicCard text="Account / Username" icon={<User />} showAt={100} delay={15} color={COLORS.secondary} />
                        <LogicCard text="Session أو Cookie" icon={<Cookie />} showAt={100} delay={30} color={COLORS.accent} />
                        <LogicCard text="Endpoint نفسه" icon={<Globe />} showAt={100} delay={45} color={COLORS.primary} />
                    </div>
                </div>

                {/* Tip Section - Now perfectly centered with AbsoluteFill */}
                {frame >= 430 && (
                    <AbsoluteFill style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: spring({ frame: frame - 440, fps: 30 }),
                        transform: `translateY(${interpolate(spring({ frame: frame - 440, fps: 30 }), [0, 1], [40, 0])}px)`,
                        zIndex: 30,
                    }}>
                        <div style={{
                            background: 'rgba(71, 245, 160, 0.08)',
                            border: `2px solid ${COLORS.accent}40`,
                            borderRadius: '35px',
                            padding: '60px 40px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 40,
                            direction: 'rtl',
                            backdropFilter: 'blur(20px)',
                            boxShadow: `0 0 60px ${COLORS.accent}15`,
                            width: '90%',
                        }}>
                            <div style={{
                                background: COLORS.accent,
                                borderRadius: '50%',
                                width: 120,
                                height: 120,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 0 40px ${COLORS.accent}40`
                            }}>
                                <FileSearch size={60} color="#000" />
                            </div>
                            <p style={{
                                fontSize: 45,
                                fontWeight: 800,
                                fontFamily: 'Cairo, sans-serif',
                                color: 'white',
                                lineHeight: 1.6,
                                margin: 0,
                                textAlign: 'center',
                                textShadow: `0 0 20px rgba(0,0,0,0.5)`,
                            }}>
                                يمكنك اكتشاف ذلك عبر مراقبة <br />
                                <span style={{ color: COLORS.accent }}>HTTP responses</span> و <span style={{ color: COLORS.accent }}>headers</span>.
                            </p>
                        </div>
                    </AbsoluteFill>
                )}
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
