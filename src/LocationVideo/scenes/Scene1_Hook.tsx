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
    COLORS, GpsOffIcon, LocationPinIcon, HackerMapIcon
} from '../components/LocationTheme';

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
                boxShadow: `0 30px 60px ${accentColor}12, inset 0 0 25px ${accentColor}08`,
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
            <SpaceBg />
            <StarField count={70} />
            <Vignette />

            <div style={{ width: '100%', height: '100%' }}>
                {/* Part 1: Even without GPS (0s - 5s) */}
                <ElegantMessage
                    showAt={10}
                    hideAt={140}
                    accentColor={COLORS.red}
                    icon={<GpsOffIcon size={110} color={COLORS.red} />}
                    text={
                        <>
                            حتى <span style={{ color: COLORS.red }}>بدون تفعيل GPS</span>،<br />
                            يمكن للمخترقين معرفة <span style={{ color: COLORS.blue }}>موقعك</span>…
                        </>
                    }
                />

                {/* Part 2: Approximate location... here's how (5.3s - 10s) */}
                <ElegantMessage
                    showAt={155}
                    accentColor={COLORS.green}
                    icon={
                        <div style={{ position: 'relative' }}>
                            <LocationPinIcon size={100} color={COLORS.green} />
                            <div style={{
                                position: 'absolute', top: -40, right: -40,
                                opacity: interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 1])
                            }}>
                                <HackerMapIcon size={60} color={COLORS.blue} />
                            </div>
                        </div>
                    }
                    text={
                        <>
                            معرفة موقعك <span style={{ color: COLORS.green }}>التقريبي</span>…<br />
                            وإليك كيف.
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
                background: `linear-gradient(to bottom, transparent, ${COLORS.green}08, transparent)`,
                pointerEvents: 'none',
                opacity: 0.3,
            }} />
        </AbsoluteFill>
    );
};
