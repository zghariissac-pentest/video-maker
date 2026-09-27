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
    COLORS, ServerIcon, GhostIcon
} from '../components/Theme';

const TextBlock: React.FC<{
    text: React.ReactNode;
    icon: React.ReactNode;
    showAt: number;
    hideAt?: number;
    accentColor: string;
}> = ({ text, icon, showAt, hideAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });
    const yOffset = interpolate(appear, [0, 1], [30, 0]);
    const scale = interpolate(appear, [0, 1], [0.9, 1]);

    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px) scale(${scale})`,
            gap: 40,
            zIndex: 20,
        }}>
            <div style={{
                width: 160, height: 160, borderRadius: '40px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 50px ${accentColor}20, inset 0 0 20px ${accentColor}10`,
                transform: `rotate(${Math.sin(frame / 30) * 5}deg)`,
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 56,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '85%',
                margin: 0,
                textShadow: `0 0 20px ${accentColor}40`,
            }}>
                {text}
            </p>
        </div>
    );
};

const TerminalStyleCommand: React.FC<{
    command: string;
    showAt: number;
    hideAt: number;
}> = ({ command, showAt, hideAt }) => {
    const frame = useCurrentFrame();
    if (frame < showAt || frame > hideAt) return null;

    const typedIndex = Math.floor(interpolate(frame, [showAt, showAt + 20], [0, command.length], { extrapolateRight: 'clamp' }));
    const cursorOp = (Math.floor(frame / 10) % 2) === 0 ? 1 : 0;

    return (
        <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            padding: '20px 40px',
            borderRadius: '15px',
            border: `1px solid ${COLORS.primary}40`,
            fontFamily: 'monospace',
            fontSize: 40,
            color: COLORS.primary,
            boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${COLORS.primary}20`,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
        }}>
            <span style={{ opacity: 0.6 }}>$</span>
            <span>{command.slice(0, typedIndex)}</span>
            <span style={{
                width: 20, height: 40,
                background: COLORS.primary,
                opacity: cursorOp,
                display: 'inline-block'
            }} />
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Part 1 */}
            <TextBlock
                showAt={10}
                hideAt={140}
                accentColor={COLORS.primary}
                icon={<ServerIcon size={100} color={COLORS.primary} />}
                text={
                    <>
                        أحيانا يكون الموقع الذي <span style={{ color: COLORS.primary }}>تبحث عنه…</span>
                    </>
                }
            />

            <TerminalStyleCommand
                command="curl -I http://target.htb"
                showAt={40}
                hideAt={140}
            />

            {/* Part 2 */}
            <TextBlock
                showAt={150}
                hideAt={290}
                accentColor={COLORS.secondary}
                icon={<GhostIcon size={100} color={COLORS.secondary} />}
                text={
                    <>
                        موجوداً بالفعل على <span style={{ color: COLORS.secondary }}>نفس الخادم</span>،<br />
                        لكنه <span style={{ color: COLORS.secondary }}>مخفي تماماً.</span>
                    </>
                }
            />

            <TerminalStyleCommand
                command='ffuf -w vhosts.txt -u http://target.htb -H "Host: FUZZ.target.htb"'
                showAt={180}
                hideAt={290}
            />

            <Vignette />
        </AbsoluteFill>
    );
};
