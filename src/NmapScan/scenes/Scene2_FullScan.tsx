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
} from '../components/NmapTheme';

const TerminalCard: React.FC<{
    command: string;
    highlightFlags?: string[];
    showAt: number;
}> = ({ command, highlightFlags = [], showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });

    // Command typing effect
    const typedIndex = Math.floor(interpolate(frame, [showAt + 5, showAt + 25], [0, command.length], { extrapolateRight: 'clamp' }));

    return (
        <div style={{
            width: '90%',
            background: 'rgba(5, 10, 20, 0.9)',
            border: `2px solid ${COLORS.primary}30`,
            borderRadius: '24px',
            padding: '40px',
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${COLORS.primary}10`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
            opacity: appear,
            overflow: 'hidden',
        }}>
            {/* Terminal Header */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', opacity: 0.5 }}>
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#27c93f' }} />
            </div>

            <div style={{
                fontFamily: 'monospace',
                fontSize: 48,
                color: 'white',
                lineHeight: 1.2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                {command.split(' ').map((word, i) => {
                    const isHighlighted = highlightFlags.includes(word);
                    const wordCumulativeLen = command.split(' ').slice(0, i + 1).join(' ').length;

                    if (wordCumulativeLen > typedIndex + word.length) return null;

                    return (
                        <span key={i} style={{
                            color: isHighlighted ? COLORS.accent : 'white',
                            textShadow: isHighlighted ? `0 0 20px ${COLORS.accent}` : 'none',
                            fontWeight: isHighlighted ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            opacity: interpolate(typedIndex, [wordCumulativeLen - word.length, wordCumulativeLen], [0, 1])
                        }}>
                            {word}
                        </span>
                    );
                })}
                {/* Cursor */}
                <div style={{
                    width: 25, height: 50,
                    background: COLORS.primary,
                    opacity: (Math.floor(frame / 10) % 2) === 0 ? 1 : 0,
                    marginLeft: 5
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
}> = ({ text, showAt, hideAt, color = 'white' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt || frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <p style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: 'right',
            color: color,
            lineHeight: 1.6,
            width: '90%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '20px 0',
            textShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

export const Scene2_FullScan: React.FC = () => {
    const frame = useCurrentFrame();

    // Logic for highlighting flags
    const activeFlags = [];
    if (frame >= 110 && frame < 250) activeFlags.push('-p-');
    if (frame >= 260) activeFlags.push('--min-rate');

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
                {/* Intro Title */}
                <ExplanatonLine
                    text="أولاً يتم تنفيذ Full Port Scan سريع لاكتشاف جميع المنافذ المفتوحة:"
                    showAt={10}
                    hideAt={590}
                    color={COLORS.primary}
                />

                <TerminalCard
                    command="nmap --min-rate 5000 -p- -T4 target"
                    highlightFlags={activeFlags}
                    showAt={50}
                />

                <div style={{ marginTop: 60, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ExplanatonLine
                        text="الخيار -p- يقوم بفحص جميع منافذ TCP البالغ عددها 65535،"
                        showAt={110}
                        hideAt={250}
                    />

                    <ExplanatonLine
                        text="بينما يجبر --min-rate الأداة على إرسال عدد كبير من الحزم في الثانية لتسريع عملية Port Discovery."
                        showAt={260}
                        hideAt={590}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
