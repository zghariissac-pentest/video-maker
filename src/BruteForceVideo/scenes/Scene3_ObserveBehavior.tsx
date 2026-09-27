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
import { Activity, Clock, BarChart3, Info, LucideProps } from 'lucide-react';

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

const HeaderTag: React.FC<{
    name: string;
    icon: React.ReactNode;
    showAt: number;
    color: string;
}> = ({ name, icon, showAt, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 25,
            background: 'rgba(10, 20, 30, 0.8)',
            border: `1px solid ${color}40`,
            borderRadius: '20px',
            padding: '20px 35px',
            width: '100%',
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [-40, 0])}px)`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 20px ${color}10`,
            backdropFilter: 'blur(10px)',
            marginBottom: 20,
        }}>
            <div style={{ color: color }}>
                {React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 35 })}
            </div>
            <span style={{
                fontSize: 42,
                fontWeight: 600,
                fontFamily: 'Fira Code, monospace',
                color: 'white',
            }}>
                {name}
            </span>
        </div>
    );
};

export const Scene3_ObserveBehavior: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={110} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                padding: '0 60px',
                zIndex: 10
            }}>

                {/* Header Section */}
                <div style={{ marginBottom: 50 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 30,
                        marginBottom: 30,
                        opacity: spring({ frame: frame - 10, fps: 30 }),
                        color: COLORS.primary
                    }}>
                        <Activity size={70} />
                        <h2 style={{ fontSize: 60, margin: 0, fontFamily: 'Cairo', fontWeight: 900 }}>راقب السلوك</h2>
                    </div>

                    <ExplanatonLine
                        text={<>بعض الأنظمة تعيد <span style={{ color: COLORS.accent }}>headers</span> مثل:</>}
                        showAt={30}
                        align="right"
                        fontSize={48}
                    />
                </div>

                {/* Headers List */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <HeaderTag name="Retry-After" icon={<Clock />} showAt={60} color={COLORS.secondary} />
                    <HeaderTag name="X-RateLimit-Limit" icon={<BarChart3 />} showAt={80} color={COLORS.primary} />
                    <HeaderTag name="X-RateLimit-Remaining" icon={<Activity />} showAt={100} color={COLORS.accent} />
                </div>

                {/* Conclusion Text */}
                <div style={{ marginTop: 60 }}>
                    <ExplanatonLine
                        text={
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                direction: 'rtl',
                                background: 'rgba(255,255,255,0.03)',
                                padding: '30px',
                                borderRadius: '25px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <Info size={40} color={COLORS.accent} />
                                <span>هذه تعطيك فكرة عن كيف تعمل الحماية.</span>
                            </div>
                        }
                        showAt={140}
                        align="right"
                        fontSize={38}
                        color="white"
                    />
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
