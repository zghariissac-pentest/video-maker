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
    highlightFlags?: string[];
}> = ({ command, showAt, highlightFlags = [] }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const typedIndex = Math.floor(interpolate(frame, [showAt + 5, showAt + 25], [0, command.length], { extrapolateRight: 'clamp' }));

    return (
        <div style={{
            width: '95%',
            background: 'rgba(5, 10, 20, 0.95)',
            border: `2px solid ${COLORS.primary}30`,
            borderRadius: '24px',
            padding: '40px',
            boxShadow: `0 20px 80px rgba(0,0,0,0.8), 0 0 40px ${COLORS.primary}10`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
            opacity: appear,
        }}>
            {/* Window Controls */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', opacity: 0.5 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#27c93f' }} />
            </div>

            <div style={{
                fontFamily: 'monospace',
                fontSize: 42,
                color: 'white',
                lineHeight: 1.3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                {command.split(' ').map((word, i) => {
                    const wordsBefore = command.split(' ').slice(0, i);
                    const wordCumLen = wordsBefore.join(' ').length + (wordsBefore.length > 0 ? 1 : 0) + word.length;
                    const isHighlighted = highlightFlags.includes(word);

                    if (wordCumLen - word.length > typedIndex) return null;

                    return (
                        <span key={i} style={{
                            color: isHighlighted ? COLORS.secondary : 'white',
                            textShadow: isHighlighted ? `0 0 20px ${COLORS.secondary}` : 'none',
                            fontWeight: isHighlighted ? 'bold' : 'normal',
                            opacity: interpolate(typedIndex, [wordCumLen - word.length, wordCumLen], [0, 1]),
                            transition: 'all 0.3s ease'
                        }}>
                            {word}
                        </span>
                    );
                })}
                {/* Cursor */}
                <div style={{
                    width: 20, height: 45,
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
    size?: number;
}> = ({ text, showAt, hideAt, color = 'white', size = 46 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt || frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <p style={{
            fontSize: size,
            fontWeight: 800,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: 'right',
            color: color,
            lineHeight: 1.6,
            width: '95%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '20px 0',
            textShadow: '0 5px 20px rgba(0,0,0,0.6)',
        }}>
            {text}
        </p>
    );
};

export const Scene3_FilterResults: React.FC = () => {
    const frame = useCurrentFrame();

    // Logic for highlighting flags
    const activeFlags = [];
    if (frame >= 120) activeFlags.push('-fs', '4242');

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

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
                    text="بعد ذلك يمكن تصفية النتائج أثناء الفحص باستخدام ffuf:"
                    showAt={10}
                    hideAt={590}
                    color={COLORS.primary}
                />

                <TerminalCard
                    command="ffuf -u http://target/FUZZ -w wordlist.txt -fs 4242"
                    highlightFlags={activeFlags}
                    showAt={60}
                />

                <div style={{ marginTop: 60, width: '100%' }}>
                    <ExplanatonLine
                        text="الخيار -fs يقوم بتجاهل جميع الردود التي لها نفس Response Size،"
                        showAt={120}
                        hideAt={590}
                        size={42}
                    />

                    <ExplanatonLine
                        text="مما يسمح لك بالتركيز فقط على المسارات الحقيقية."
                        showAt={240}
                        hideAt={590}
                        color={COLORS.accent}
                        size={48}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
