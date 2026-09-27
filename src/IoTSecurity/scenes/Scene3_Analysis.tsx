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
    COLORS, ChipIcon, ToolIcon, ShieldIcon
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

const DiscoveredItem: React.FC<{ label: string; showAt: number; index: number }> = ({ label, showAt, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            background: 'rgba(255, 42, 109, 0.1)',
            border: `1px solid ${COLORS.secondary}40`,
            padding: '15px 30px',
            borderRadius: '12px',
            width: '100%',
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [-20, 0])}px)`,
            marginBottom: 15,
        }}>
            <div style={{
                width: 12, height: 12, borderRadius: '50%', background: COLORS.secondary,
                boxShadow: `0 0 10px ${COLORS.secondary}`
            }} />
            <span style={{ fontSize: 32, color: 'white', fontWeight: 600, fontFamily: 'monospace' }}>
                {label}
            </span>
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
    children?: React.ReactNode;
}> = ({ text, icon, showAt, hideAt, accentColor, command, children }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });
    const yOffset = interpolate(appear, [0, 1], [30, 0]);
    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <AbsoluteFill style={{
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
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 48,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '85%',
                margin: 0,
            }}>
                {text}
            </p>

            {command && <CommandBox command={command} showAt={showAt + 20} />}

            {children && (
                <div style={{ marginTop: 40, width: '60%', display: 'flex', flexDirection: 'column' }}>
                    {children}
                </div>
            )}
        </AbsoluteFill>
    );
};

export const Scene3_Analysis: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Part 1: Download and Binwalk */}
            <TextBlock
                showAt={10}
                hideAt={290}
                accentColor={COLORS.primary}
                icon={<ToolIcon size={80} color={COLORS.primary} />}
                command="binwalk -e firmware.bin"
                text={
                    <>
                        يمكن تحميل الـ <span style={{ color: COLORS.primary }}>Firmware</span> من الموقع الرسمي،<br />
                        ثم تحليلها باستخدام أداة <span style={{ color: COLORS.primary }}>binwalk</span>.
                    </>
                }
            />

            {/* Part 2: Embedded Filesystem */}
            <TextBlock
                showAt={310}
                hideAt={590}
                accentColor={COLORS.accent}
                icon={<ChipIcon size={80} color={COLORS.accent} />}
                text={
                    <>
                        هذا يسمح باستخراج الـ <span style={{ color: COLORS.accent }}>Embedded Filesystem</span><br />
                        الخاص بنظام تشغيل الجهاز.
                    </>
                }
            />

            {/* Part 3: Findings */}
            <TextBlock
                showAt={610}
                hideAt={990}
                accentColor={COLORS.secondary}
                icon={<ShieldIcon size={80} color={COLORS.secondary} />}
                text={
                    <>
                        داخل هذه الملفات <span style={{ color: COLORS.secondary }}>قد تجد</span>:
                    </>
                }
            >
                <DiscoveredItem label="config_files" showAt={640} index={0} />
                <DiscoveredItem label="startup_scripts" showAt={660} index={1} />
                <DiscoveredItem label="hardcoded_credentials" showAt={680} index={2} />
                <DiscoveredItem label="API_keys" showAt={700} index={3} />
            </TextBlock>

            <Vignette />
        </AbsoluteFill>
    );
};
