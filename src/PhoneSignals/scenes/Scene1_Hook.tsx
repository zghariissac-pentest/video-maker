import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    CyberBg, StarField, Vignette,
    COLORS, PhoneIcon, WavesIcon, OfflineIcon
} from '../components/PhoneSignalsTheme';

const ElegantMessage: React.FC<{
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

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 90 } });
    const yOffset = interpolate(appear, [0, 1], [30, 0]);
    const scale = interpolate(appear, [0, 1], [0.97, 1]);

    const outOp = hideAt ? interpolate(frame, [hideAt - 12, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px) scale(${scale})`,
            gap: 45,
            padding: '0 60px',
        }}>
            <div style={{
                width: 160, height: 160, borderRadius: '40px',
                background: `linear-gradient(135deg, ${accentColor}15, ${COLORS.bg})`,
                border: `1.5px solid ${accentColor}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 20px 50px ${accentColor}15, inset 0 0 20px ${accentColor}10`,
                transform: `scale(${interpolate(Math.sin(frame / 15), [-1, 1], [0.95, 1.05])})`,
            }}>
                {icon}
            </div>

            <h2 style={{
                fontSize: 68,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: '#fff',
                lineHeight: 1.4,
                margin: 0,
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}>
                {text}
            </h2>
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={60} />
            <Vignette />

            <div style={{ width: '100%', height: '100%' }}>
                {/* Part 1: Your phone sends signals constantly (frames 0-140) */}
                {/* (Note: making it stay in place/sequenced so no "flying around" overlap) */}
                <ElegantMessage
                    showAt={10}
                    hideAt={140}
                    accentColor={COLORS.cyan}
                    icon={
                        <div style={{ position: 'relative' }}>
                            <PhoneIcon size={90} color={COLORS.cyan} />
                            <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%) rotate(90deg)' }}>
                                <WavesIcon size={50} color={COLORS.cyan} />
                            </div>
                        </div>
                    }
                    text={
                        <>
                            هاتفك يرسل <span style={{ color: COLORS.cyan }}>إشارات</span> باستمرار…
                        </>
                    }
                />

                {/* Part 2: Even when offline (frames 150-300) */}
                {/* We increase scene duration to 10s total to match the standard hook feel */}
                <ElegantMessage
                    showAt={150}
                    accentColor={COLORS.red}
                    icon={<OfflineIcon size={90} color={COLORS.red} />}
                    text={
                        <>
                            حتى عندما لا تكون <span style={{ color: COLORS.red }}>متصلاً</span> بالإنترنت.
                        </>
                    }
                />
            </div>

            {/* Decorative Scan Line */}
            <div style={{
                position: 'absolute',
                top: (frame * 8) % 1920,
                left: 0, right: 0,
                height: 100,
                background: `linear-gradient(to bottom, transparent, ${COLORS.cyan}08, transparent)`,
                pointerEvents: 'none',
                zIndex: 5,
            }} />
        </AbsoluteFill>
    );
};
