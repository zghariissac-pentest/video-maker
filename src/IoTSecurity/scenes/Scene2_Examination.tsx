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
    COLORS, WebIcon, ChipIcon
} from '../components/Theme';

const CommandBox: React.FC<{
    command: string;
    showAt: number;
}> = ({ command, showAt }) => {
    const frame = useCurrentFrame();
    const typedIndex = Math.floor(interpolate(frame, [showAt, showAt + 25], [0, command.length], { extrapolateRight: 'clamp' }));

    if (frame < showAt) return null;

    return (
        <div style={{
            background: 'rgba(5, 10, 15, 0.95)',
            padding: '18px 40px',
            borderRadius: '15px',
            border: `1px solid ${COLORS.primary}50`,
            fontFamily: 'monospace',
            fontSize: 34,
            color: COLORS.primary,
            boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 20px ${COLORS.primary}20`,
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
        }}>
            <span style={{ opacity: 0.5 }}>$</span>
            <span>{command.slice(0, typedIndex)}</span>
            <span style={{
                width: 15, height: 30,
                background: COLORS.primary,
                opacity: (Math.floor(frame / 10) % 2) === 0 ? 1 : 0,
            }} />
        </div>
    );
};

const TextBlock: React.FC<{
    text: React.ReactNode;
    icon: React.ReactNode;
    showAt: number;
    hideAt?: number;
    accentColor: string;
    command?: string;
    commandShowAt?: number;
}> = ({ text, icon, showAt, hideAt, accentColor, command, commandShowAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });
    const yOffset = interpolate(appear, [0, 1], [30, 0]);

    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px)`,
            zIndex: 20,
        }}>
            <div style={{
                width: 140, height: 140, borderRadius: '35px',
                background: `${accentColor}15`, border: `1px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 40px ${accentColor}15`,
                marginBottom: 40,
                position: 'relative'
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 52,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '85%',
                margin: 0,
                textShadow: `0 0 20px rgba(0,0,0,0.5)`,
            }}>
                {text}
            </p>

            {command && (
                <CommandBox
                    command={command}
                    showAt={commandShowAt || (showAt + 30)}
                />
            )}
        </div>
    );
};

export const Scene2_Examination: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Part 1: Scanning result */}
            <TextBlock
                showAt={10}
                hideAt={280}
                accentColor={COLORS.primary}
                icon={<WebIcon size={80} color={COLORS.primary} />}
                command="nmap -sV -p- 192.168.1.1"
                commandShowAt={40}
                text={
                    <>
                        بعد الفحص باستخدام <span style={{ color: COLORS.primary }}>nmap</span>...<br />
                        تلاحظ وجود <span style={{ color: COLORS.primary }}>Web Interface</span> لإدارة الجهاز.
                    </>
                }
            />

            {/* Part 2: Firmware Update */}
            <TextBlock
                showAt={300}
                hideAt={590}
                accentColor={COLORS.accent}
                icon={<ChipIcon size={80} color={COLORS.accent} />}
                text={
                    <>
                        مع خيار <span style={{ color: COLORS.accent }}>Firmware Update</span>.<br />
                        هذه هي <span style={{ color: COLORS.secondary }}>نقطة الدخول</span> الأهم!
                    </>
                }
            />

            {/* Part 3: System insight */}
            <TextBlock
                showAt={610}
                hideAt={890}
                accentColor={COLORS.secondary}
                icon={<ChipIcon size={80} color={COLORS.secondary} />}
                text={
                    <>
                        لأن الـ <span style={{ color: COLORS.secondary }}>Firmware</span> يحتوي على<br />
                        <span style={{ color: COLORS.white }}>النظام الكامل</span> للجهاز.
                    </>
                }
            />

            <Vignette />
        </AbsoluteFill>
    );
};
