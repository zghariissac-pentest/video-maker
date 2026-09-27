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
import { Beaker, RefreshCw, Timer, Share2, Target, LucideProps } from 'lucide-react';

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

const TestStep: React.FC<{
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
            gap: 25,
            padding: '25px 35px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRight: `6px solid ${color}`,
            borderRadius: '15px',
            marginBottom: 20,
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [40, 0])}px)`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.2)`,
            direction: 'rtl',
            width: '100%',
        }}>
            <div style={{ color: color }}>
                {React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 40 })}
            </div>
            <span style={{
                fontSize: 38,
                fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
                color: 'white',
            }}>
                {text}
            </span>
        </div>
    );
};

export const Scene4_TestLogic: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                padding: '0 60px',
                zIndex: 10
            }}>

                {/* Header Section */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 30,
                        marginBottom: 30,
                        opacity: spring({ frame: frame - 10, fps: 30 }),
                        color: COLORS.accent
                    }}>
                        <Beaker size={80} />
                        <h2 style={{ fontSize: 70, margin: 0, fontFamily: 'Cairo', fontWeight: 900 }}>اختبر المنطق</h2>
                    </div>
                </div>

                {/* Sub-header */}
                <div style={{ marginBottom: 40 }}>
                    <ExplanatonLine
                        text={<>بدل إرسال <span style={{ color: COLORS.secondary }}>آلاف الطلبات</span>:</>}
                        showAt={30}
                        align="center"
                        fontSize={45}
                    />
                </div>

                {/* Test Steps List */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <TestStep text="اختبر تغيير session" icon={<RefreshCw />} showAt={60} delay={0} color={COLORS.primary} />
                    <TestStep text="راقب response timing" icon={<Timer />} showAt={60} delay={15} color={COLORS.accent} />
                    <TestStep text="جرّب distributed requests" icon={<Share2 />} showAt={60} delay={30} color={COLORS.secondary} />
                </div>

                {/* Final Target Message */}
                <div style={{
                    marginTop: 50,
                    opacity: spring({ frame: frame - 150, fps: 30 }),
                    transform: `translateY(${interpolate(spring({ frame: frame - 150, fps: 30 }), [0, 1], [30, 0])}px)`,
                    display: frame < 150 ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${COLORS.primary}10`,
                    padding: '30px',
                    borderRadius: '25px',
                    border: `1px solid ${COLORS.primary}30`,
                    gap: 25,
                    direction: 'rtl'
                }}>
                    <Target size={50} color={COLORS.primary} />
                    <p style={{
                        fontSize: 36,
                        fontWeight: 800,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        textAlign: 'center'
                    }}>
                        الهدف ليس الكمية… بل <span style={{ color: COLORS.primary }}>فهم منطق النظام</span>
                    </p>
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
