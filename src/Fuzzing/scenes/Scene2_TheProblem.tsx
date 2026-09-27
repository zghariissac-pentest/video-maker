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
} from '../components/FuzzingTheme';

const TerminalCard: React.FC<{
    command: string;
    showAt: number;
    title?: string;
}> = ({ command, showAt, title = "TERMINAL" }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const typedIndex = Math.floor(interpolate(frame, [showAt + 5, showAt + 25], [0, command.length], { extrapolateRight: 'clamp' }));

    return (
        <div style={{
            width: '95%',
            background: 'rgba(5, 10, 20, 0.95)',
            border: `2px solid ${COLORS.primary}30`,
            borderRadius: '20px',
            padding: '30px',
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${COLORS.primary}10`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
            opacity: appear,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderBottom: `1px solid ${COLORS.primary}20`, paddingBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>{title}</span>
            </div>

            <div style={{
                fontFamily: 'monospace',
                fontSize: 40,
                color: 'white',
                lineHeight: 1.2,
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                <span>{command.slice(0, typedIndex)}</span>
                <div style={{
                    width: 20, height: 40,
                    background: COLORS.primary,
                    opacity: (Math.floor(frame / 10) % 2) === 0 ? 1 : 0,
                }} />
            </div>
        </div>
    );
};

const ExplanatonLine: React.FC<{
    text: string;
    showAt: number;
    hideAt: number;
    color?: string;
    align?: 'right' | 'center';
}> = ({ text, showAt, hideAt, color = 'white', align = 'right' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt || frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <p style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: align,
            color: color,
            lineHeight: 1.6,
            width: '95%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '15px 0',
            textShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

export const Scene2_TheProblem: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={110} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '0 40px',
                zIndex: 10
            }}>
                {/* Intro Explanation */}
                <div style={{ width: '100%' }}>
                    <ExplanatonLine
                        text="عند استخدام أدوات مثل ffuf أو dirsearch قد يعيد الخادم نفس صفحة الخطأ لكل مسار غير موجود،"
                        showAt={10}
                        hideAt={280}
                    />
                    <ExplanatonLine
                        text="مما يجعل الفحص ينتج عدداً كبيراً من النتائج غير الحقيقية."
                        showAt={80}
                        hideAt={280}
                        color={COLORS.secondary}
                    />
                </div>

                {/* Transition to Solution */}
                <ExplanatonLine
                    text="لهذا السبب من الأفضل أولاً معرفة Response Size لصفحة الخطأ:"
                    showAt={290}
                    hideAt={590}
                    color={COLORS.primary}
                    align="center"
                />

                <TerminalCard
                    command="curl -i target.com/random"
                    showAt={340}
                />

                {/* Size Reveal Animation */}
                {frame >= 400 && (
                    <div style={{
                        marginTop: 40,
                        padding: '20px 40px',
                        background: 'rgba(255, 42, 109, 0.1)',
                        border: `1px solid ${COLORS.secondary}50`,
                        borderRadius: '15px',
                        opacity: interpolate(frame, [400, 420], [0, 1]),
                        transform: `scale(${interpolate(spring({ frame: frame - 400, fps: 30 }), [0, 1], [0.8, 1])})`,
                    }}>
                        <p style={{
                            fontSize: 36,
                            fontFamily: 'monospace',
                            color: COLORS.secondary,
                            margin: 0,
                            fontWeight: 'bold'
                        }}>
                            Content-Length: 1420
                        </p>
                    </div>
                )}
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
