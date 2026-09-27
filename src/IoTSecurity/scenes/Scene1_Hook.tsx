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
    COLORS, RouterIcon
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
    const scale = interpolate(appear, [0, 1], [0.8, 1]);

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
                width: 180, height: 180, borderRadius: '50px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 60px ${accentColor}30, inset 0 0 25px ${accentColor}20`,
                transform: `rotate(${Math.sin(frame / 20) * 8}deg)`,
                position: 'relative'
            }}>
                {/* Scanning ring */}
                <div style={{
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    border: `1px solid ${accentColor}40`,
                    opacity: interpolate(frame % 30, [0, 30], [0.8, 0]),
                    transform: `scale(${interpolate(frame % 30, [0, 30], [1, 1.5])})`
                }} />
                {icon}
            </div>

            <p style={{
                fontSize: 60,
                fontWeight: 900,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.5,
                maxWidth: '90%',
                margin: 0,
                textShadow: `0 0 25px ${accentColor}50`,
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
            background: 'rgba(0,0,0,0.85)',
            padding: '25px 45px',
            borderRadius: '15px',
            border: `1px solid ${COLORS.primary}50`,
            fontFamily: 'monospace',
            fontSize: 42,
            color: COLORS.primary,
            boxShadow: `0 15px 50px rgba(0,0,0,0.7), 0 0 30px ${COLORS.primary}30`,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
        }}>
            <span style={{ opacity: 0.6 }}>#</span>
            <span>{command.slice(0, typedIndex)}</span>
            <span style={{
                width: 20, height: 45,
                background: COLORS.primary,
                opacity: cursorOp,
                display: 'inline-block'
            }} />
        </div>
    );
};

const TargetUI: React.FC = () => {
    const frame = useCurrentFrame();
    const op = interpolate(frame % 20, [0, 10, 20], [0.2, 1, 0.2]);
    return (
        <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontFamily: 'monospace',
            color: COLORS.primary,
            fontSize: 24,
            gap: 5,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ opacity: op }}>●</span>
                <span>TARGET_LOCKED: 192.168.1.1</span>
            </div>
            <div style={{ opacity: 0.6 }}>PROTOCOL: MQTT/Zigbee</div>
            <div style={{ opacity: 0.6 }}>STATUS: VULNERABLE</div>
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />
            <TargetUI />

            {/* The Main Hook Text */}
            <TextBlock
                showAt={10}
                hideAt={290}
                accentColor={COLORS.primary}
                icon={<RouterIcon size={120} color={COLORS.primary} />}
                text={
                    <>
                        تخيل أنك تقوم <span style={{ color: COLORS.primary }}>باختبار أمني</span><br />
                        لجهاز <span style={{ color: COLORS.primary }}>IoT Router</span> <span style={{ color: COLORS.accent }}>داخل شبكة.</span>
                    </>
                }
            />

            <TerminalStyleCommand
                command="nmap --script iot-scan 192.168.1.1"
                showAt={50}
                hideAt={280}
            />

            <Vignette />
        </AbsoluteFill>
    );
};
