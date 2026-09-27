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
} from '../components/Theme';

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
            marginTop: '30px',
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
                fontSize: 32,
                color: 'white',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
            }}>
                <span style={{ color: COLORS.primary, opacity: 0.7 }}>$</span>
                <span>
                    {command.slice(0, typedIndex).split(' ').map((word, i) => {
                        let color = 'white';
                        if (word === 'ffuf') color = COLORS.primary;
                        else if (word.startsWith('-')) color = COLORS.secondary;
                        else if (word === '"Host:') color = COLORS.accent;
                        else if (word === 'FUZZ.target"') color = '#ff2a6d';
                        else if (word.includes('FUZZ') || word.includes('Host')) color = COLORS.accent;
                        return <span key={i} style={{ color, marginRight: '10px' }}>{word}</span>;
                    })}
                </span>
                <div style={{
                    width: 15, height: 35,
                    background: COLORS.primary,
                    opacity: (Math.floor(frame / 10) % 2) === 0 ? 1 : 0,
                    marginBottom: '-4px'
                }} />
            </div>
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

export const Scene3_VirtualHostFuzzing: React.FC = () => {
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

                {/* Part 1: Intro Tool */}
                <div style={{ width: '100%', position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ExplanatonLine
                        text={
                            <>
                                لهذا السبب يمكن اكتشاف هذه المواقع باستخدام <span style={{ color: COLORS.primary }}>Virtual Host Fuzzing</span> بأداة مثل <span style={{ color: COLORS.secondary }}>ffuf</span>:
                            </>
                        }
                        showAt={10}
                        hideAt={280}
                        align="center"
                    />

                    {/* We only render the terminal card when part 1 is visible */}
                    {useCurrentFrame() < 280 && (
                        <TerminalCard
                            command='ffuf -u http://target -H "Host: FUZZ.target" -w wordlist.txt'
                            showAt={40}
                        />
                    )}
                </div>

                {/* Part 2: Explanation of how it works */}
                <div style={{ width: '100%', position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ExplanatonLine
                        text={
                            <>
                                في هذا الفحص يتم تجربة كلمات مختلفة داخل <span style={{ color: COLORS.accent }}>Host Header</span> لمعرفة إن كان هناك <span style={{ color: COLORS.primary }}>Subdomains</span> أو مواقع مخفية على نفس الخادم.
                            </>
                        }
                        showAt={290}
                        align="center"
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
