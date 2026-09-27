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
import { FileCode, CheckCircle2 } from 'lucide-react';

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
            borderRadius: '25px',
            padding: '35px',
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px ${COLORS.primary}15`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
            opacity: appear,
            marginTop: '40px',
            backdropFilter: 'blur(15px)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderBottom: `1px solid ${COLORS.primary}20`, paddingBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span style={{ color: COLORS.primary, fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>{title}</span>
            </div>

            <div style={{
                fontFamily: 'Fira Code',
                fontSize: 40,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                <span>
                    {command.slice(0, typedIndex).split(' ').map((word, i) => (
                        <span key={i} style={{
                            color: word === 'cat' ? COLORS.accent : 'white',
                            marginRight: '15px'
                        }}>{word}</span>
                    ))}
                </span>
                <div style={{
                    width: 15, height: 45,
                    background: COLORS.primary,
                    opacity: (Math.floor(frame / 10) % 2) === 0 ? 1 : 0,
                }} />
            </div>

            {frame > showAt + 40 && (
                <div style={{
                    marginTop: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    color: '#27c93f',
                    background: 'rgba(39, 201, 63, 0.1)',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    alignSelf: 'flex-start',
                    width: 'fit-content',
                    fontSize: 22,
                    fontFamily: 'Cairo',
                    opacity: spring({ frame: frame - (showAt + 40), fps })
                }}>
                    <CheckCircle2 size={24} />
                    <span>أمر صحيح - الاسم يعتبر كتلة واحدة</span>
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
            fontSize: 44,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: align,
            color: color,
            lineHeight: 1.6,
            width: '95%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '20px 0',
            textShadow: '0 5px 20px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

export const Scene4_Hyphen: React.FC = () => {
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
                padding: '0 40px',
                zIndex: 10
            }}>
                {/* Part 1: Intro */}
                <div style={{
                    width: '100%',
                    display: frame < 200 ? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: 140, height: 140, borderRadius: '35px',
                        background: `${COLORS.accent}15`, border: `2px solid ${COLORS.accent}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 50px ${COLORS.accent}20`,
                        marginBottom: 40,
                        opacity: spring({ frame: frame - 10, fps: 30 })
                    }}>
                        <FileCode size={80} color={COLORS.accent} />
                    </div>
                    <ExplanatonLine
                        text={<><span style={{ color: COLORS.accent, fontFamily: 'Fira Code' }}>home-is-here</span> → ملف يحتوي على شرطات.</>}
                        showAt={20}
                        hideAt={190}
                        align="center"
                    />
                </div>

                {/* Part 2: Technical Explanation + Terminal */}
                <div style={{
                    width: '100%',
                    display: frame >= 200 ? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <ExplanatonLine
                        text={
                            <>
                                تقنيًا: الشرطات ليست فاصل أو رمز خاص للـ <span style={{ color: COLORS.primary }}>shell</span>،<br />
                                لذلك يبقى الاسم <span style={{ color: COLORS.accent }}>token واحد</span> ويمكن تمريره مباشرة.
                            </>
                        }
                        showAt={200}
                        align="center"
                    />

                    <TerminalCard
                        command="cat home-is-here"
                        showAt={250}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
