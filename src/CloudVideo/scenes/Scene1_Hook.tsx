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
    COLORS, ConfigErrorIcon, HackerIcon
} from '../components/CloudTheme';

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
    const yOffset = interpolate(appear, [0, 1], [40, 0]);
    const scale = interpolate(appear, [0, 1], [0.95, 1]);

    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px) scale(${scale})`,
            gap: 50,
            padding: '0 80px',
        }}>
            <div style={{
                width: 180, height: 180, borderRadius: '45px',
                background: `linear-gradient(135deg, ${accentColor}15, ${COLORS.bg})`,
                border: `1.5px solid ${accentColor}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 30px 60px ${accentColor}15, inset 0 0 25px ${accentColor}08`,
                transform: `rotate(${Math.sin(frame / 25) * 5}deg)`,
            }}>
                {icon}
            </div>

            <h2 style={{
                fontSize: 64,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: COLORS.white,
                lineHeight: 1.5,
                margin: 0,
                textShadow: '0 15px 40px rgba(0,0,0,0.6)',
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
            <StarField count={70} />
            <Vignette />

            <div style={{ width: '100%', height: '100%' }}>
                {/* Part 1: No need to hack the server (0s - 5s) */}
                <ElegantMessage
                    showAt={15}
                    hideAt={140}
                    accentColor={COLORS.blue}
                    icon={<HackerIcon size={100} color={COLORS.red} />}
                    text={
                        <>
                            أحياناً لا يحتاج <span style={{ color: COLORS.red }}>المخترق</span> إلى<br />
                            <span style={{ color: COLORS.blue }}>اختراق الخادم</span>…
                        </>
                    }
                />

                {/* Part 2: Just a small mistake in settings (5.3s - 10s) */}
                <ElegantMessage
                    showAt={155}
                    accentColor={COLORS.cyan}
                    icon={<ConfigErrorIcon size={100} color={COLORS.red} />}
                    text={
                        <>
                            مجرد <span style={{ color: COLORS.red }}>خطأ صغير</span> في الإعدادات يكفي.
                        </>
                    }
                />
            </div>

            {/* Scanning Line Effect */}
            <div style={{
                position: 'absolute',
                top: (frame * 10) % 1920,
                left: 0, right: 0,
                height: 150,
                background: `linear-gradient(to bottom, transparent, ${COLORS.blue}08, transparent)`,
                pointerEvents: 'none',
                opacity: 0.4,
            }} />
        </AbsoluteFill>
    );
};
