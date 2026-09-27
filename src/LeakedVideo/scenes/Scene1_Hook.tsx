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
    COLORS, PasswordIcon, DatabaseLeakIcon,
} from '../components/LeakedTheme';

// ─── Elegant Clean Text Block ──────────────────────────────────────────────────
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
            {/* Animated Icon Container */}
            <div style={{
                width: 160, height: 160, borderRadius: '40px',
                background: `linear-gradient(135deg, ${accentColor}15, ${COLORS.bg})`,
                border: `1.5px solid ${accentColor}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 20px 50px ${accentColor}15, inset 0 0 20px ${accentColor}10`,
                transform: `rotate(${Math.sin(frame / 20) * 5}deg)`,
            }}>
                {icon}
            </div>

            {/* Premium Typography */}
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
                {/* Part 1: Your password is likely already on the internet */}
                <ElegantMessage
                    showAt={10}
                    hideAt={170}
                    accentColor={COLORS.red}
                    icon={<PasswordIcon size={90} color={COLORS.red} />}
                    text={
                        <>
                            من المحتمل أن <span style={{ color: COLORS.red }}>كلمة المرور</span> الخاصة بك<br />
                            موجودة بالفعل على الإنترنت…
                        </>
                    }
                />

                {/* Part 2: And here's why */}
                <ElegantMessage
                    showAt={180}
                    accentColor={COLORS.teal}
                    icon={<DatabaseLeakIcon size={90} color={COLORS.teal} />}
                    text={
                        <>...وإليك <span style={{ color: COLORS.teal }}>السبب</span>.</>
                    }
                />
            </div>

            {/* Decorative Scan Line */}
            <div style={{
                position: 'absolute',
                top: (frame * 8) % 1920,
                left: 0,
                right: 0,
                height: 100,
                background: `linear-gradient(to bottom, transparent, ${COLORS.teal}08, transparent)`,
                pointerEvents: 'none',
                zIndex: 5,
            }} />
        </AbsoluteFill>
    );
};
