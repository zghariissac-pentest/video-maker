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
import { FileJson, AlertCircle, CheckCircle2 } from 'lucide-react';

const TerminalCard: React.FC<{
    command: string;
    showAt: number;
    title?: string;
    status?: 'success' | 'error';
    statusText?: string;
    width?: string;
}> = ({ command, showAt, title = "TERMINAL", status = 'success', statusText, width = '95%' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const typedIndex = Math.floor(interpolate(frame, [showAt + 5, showAt + 25], [0, command.length], { extrapolateRight: 'clamp' }));

    const statusColor = status === 'success' ? '#27c93f' : '#ff5f56';
    const borderColor = status === 'success' ? `${COLORS.primary}30` : '#ff5f5640';

    return (
        <div style={{
            width: width,
            background: 'rgba(5, 10, 20, 0.95)',
            border: `2px solid ${borderColor}`,
            borderRadius: '25px',
            padding: '30px',
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px ${status === 'success' ? COLORS.primary : '#ff5f56'}15`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
            opacity: appear,
            marginTop: '30px',
            backdropFilter: 'blur(15px)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>{title}</span>
            </div>

            <div style={{
                fontFamily: 'Fira Code',
                fontSize: 32,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                <span>
                    {command.slice(0, typedIndex).split(' ').map((word, i) => {
                        let color = 'white';
                        if (word === 'cat') color = COLORS.accent;
                        if (word.startsWith('"') || word.includes('\\')) color = COLORS.secondary;
                        return <span key={i} style={{ color, marginRight: '10px' }}>{word}</span>;
                    })}
                </span>
            </div>

            {frame > showAt + 40 && statusText && (
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    color: statusColor,
                    background: `${statusColor}10`,
                    padding: '8px 15px',
                    borderRadius: '8px',
                    fontSize: 20,
                    fontFamily: 'Cairo',
                    opacity: spring({ frame: frame - (showAt + 40), fps }),
                    border: `1px solid ${statusColor}30`
                }}>
                    {status === 'success' ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
                    <span>{statusText}</span>
                </div>
            )}
        </div>
    );
};

const ExplanatonLine: React.FC<{
    text: React.ReactNode;
    showAt: number;
    hideAt?: number;
    color?: string;
    align?: 'right' | 'center';
}> = ({ text, showAt, hideAt, color = 'white', align = 'right' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <p style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: align,
            color: color,
            lineHeight: 1.5,
            width: '95%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '15px 0',
            textShadow: '0 5px 20px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

export const Scene3_WithSpace: React.FC = () => {
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
                {/* Part 1: Intro with Error Case */}
                {frame < 300 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '35px',
                            background: `${COLORS.secondary}15`, border: `2px solid ${COLORS.secondary}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 50px ${COLORS.secondary}20`,
                            marginBottom: 40,
                            opacity: spring({ frame: frame - 10, fps: 30 })
                        }}>
                            <FileJson size={80} color={COLORS.secondary} />
                        </div>
                        <ExplanatonLine
                            text={<><span style={{ color: COLORS.secondary, fontFamily: 'Fira Code' }}>"home here"</span> → ملف يحتوي على مسافة.</>}
                            showAt={20}
                            hideAt={290}
                            align="center"
                        />
                        <TerminalCard
                            command="cat home here"
                            showAt={60}
                            status="error"
                            statusText="خطأ: سيبحث عن ملفين (home) و (here)"
                        />
                    </div>
                )}

                {/* Part 2: Technical Explanation */}
                {frame >= 300 && frame < 550 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ExplanatonLine
                            text={
                                <>
                                    تقنيًا: المسافة تُعامل كـ <span style={{ color: COLORS.accent }}>فاصل بين الوسائط</span> arguments في الـ shell،<br />
                                    لذا سيعتبره أمرين مختلفين تماماً.
                                </>
                            }
                            showAt={300}
                            align="center"
                        />
                        <div style={{
                            marginTop: 40,
                            display: 'flex',
                            gap: 30,
                            opacity: spring({ frame: frame - 320, fps: 30 })
                        }}>
                            <div style={{ padding: '15px 30px', background: 'rgba(255,95,86,0.1)', border: '1px solid #ff5f5640', borderRadius: '15px', color: '#ff5f56', fontSize: 32, fontFamily: 'Fira Code' }}>home</div>
                            <div style={{ padding: '15px 30px', background: 'rgba(255,95,86,0.1)', border: '1px solid #ff5f5640', borderRadius: '15px', color: '#ff5f56', fontSize: 32, fontFamily: 'Fira Code' }}>here</div>
                        </div>
                    </div>
                )}

                {/* Part 3: Solutions */}
                {frame >= 550 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ExplanatonLine
                            text={<>الحل؟ استخدم <span style={{ color: COLORS.primary }}>الاقتباسات</span> أو الـ <span style={{ color: COLORS.secondary }}>Escape</span>:</>}
                            showAt={550}
                            align="center"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', alignItems: 'center' }}>
                            <TerminalCard
                                command='cat "home here"'
                                showAt={580}
                                status="success"
                                statusText="أمر صحيح باستخدام Quote"
                                width="95%"
                            />
                            <TerminalCard
                                command="cat home\ here"
                                showAt={640}
                                status="success"
                                statusText="أمر صحيح باستخدام Escape"
                                width="95%"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
