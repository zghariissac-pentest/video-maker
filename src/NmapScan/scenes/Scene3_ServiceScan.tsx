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
                fontSize: 44, // Slightly smaller to fit subshell command
                color: 'white',
                lineHeight: 1.2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                {command.split(' ').map((word, i) => {
                    const isHighlighted = highlightFlags.includes(word);
                    const wordsBefore = command.split(' ').slice(0, i);
                    const wordCumLen = wordsBefore.join(' ').length + (wordsBefore.length > 0 ? 1 : 0) + word.length;

                    if (wordCumLen - word.length > typedIndex) return null;

                    return (
                        <span key={i} style={{
                            color: isHighlighted ? COLORS.accent : 'white',
                            textShadow: isHighlighted ? `0 0 20px ${COLORS.accent}` : 'none',
                            fontWeight: isHighlighted ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            opacity: interpolate(typedIndex, [wordCumLen - word.length, wordCumLen], [0, 1])
                        }}>
                            {word}
                        </span>
                    );
                })}
                {/* Cursor */}
                <div style={{
                    width: 25, height: 45,
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

export const Scene3_ServiceScan: React.FC = () => {
    const frame = useCurrentFrame();

    // Logic for highlighting flags
    const activeFlags = [];
    if (frame >= 110 && frame < 260) activeFlags.push('-sC');
    if (frame >= 270) activeFlags.push('-sV');

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={100} />

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
                    text="بعد تحديد المنافذ المفتوحة، يتم إجراء فحص أكثر دقة عليها فقط:"
                    showAt={10}
                    hideAt={590}
                    color={COLORS.primary}
                />

                <TerminalCard
                    command="nmap -sC -sV -p $(cat ports.txt) target"
                    highlightFlags={activeFlags}
                    showAt={50}
                />

                <div style={{ marginTop: 60, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ExplanatonLine
                        text="الخيار -sC يقوم بتشغيل مجموعة من Nmap Scripting Engine (NSE) لاكتشاف إعدادات وخدمات شائعة،"
                        showAt={110}
                        hideAt={260}
                    />

                    <ExplanatonLine
                        text="أما -sV فيفعّل Service Version Detection لتحديد نوع وإصدار الخدمات التي تعمل على تلك المنافذ."
                        showAt={270}
                        hideAt={590}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
