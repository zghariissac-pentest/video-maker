import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const DistroIcon: React.FC<{
    src: string;
    showAt: number;
    delay?: number;
    size?: number;
    isHook?: boolean;
}> = ({ src, showAt, delay = 0, size = 120, isHook = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt + delay) return null;

    const appear = spring({
        frame: frame - (showAt + delay),
        fps,
        config: isHook ? { damping: 16, stiffness: 120 } : { damping: 12, stiffness: 100 }
    });

    const scale = interpolate(appear, [0, 1], [isHook ? 0.8 : 0.5, 1]);
    const op = interpolate(appear, [0, 1], [0, 1]);
    const yOffset = interpolate(appear, [0, 1], [isHook ? 0 : 50, 0]);

    return (
        <div style={{
            opacity: op,
            transform: isHook ? `scale(${scale})` : `scale(${scale}) translateY(${yOffset}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size + 40,
            height: size + 40,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '30px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}>
            <Img src={staticFile(src)} style={{ width: size, height: size, objectFit: 'contain' }} />
        </div>
    );
};

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#02060a', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Part 1: Instead of using Kali Linux inside VM */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: frame < 180 ? interpolate(spring({ frame, fps, config: { damping: 16, stiffness: 120 } }), [0, 1], [0, 1]) : interpolate(frame, [180, 190], [1, 0]),
                transform: `translateX(${interpolate(frame, [180, 200], [0, -100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px) scale(${interpolate(spring({ frame, fps, config: { damping: 16, stiffness: 120 } }), [0, 1], [0.8, 1])})`,
            }}>
                <DistroIcon src="assets/distros/kalilinux.svg" showAt={0} size={150} isHook={true} />
                <p style={{
                    marginTop: 60,
                    fontSize: 56,
                    fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 1.5,
                    maxWidth: '85%',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`,
                }}>
                    بدلاً من استخدام <span style={{ color: COLORS.secondary }}>Kali Linux</span><br /> داخل Virtual Machine…
                </p>
            </div>

            {/* Part 2: Use stable distros */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: frame > 190 ? interpolate(frame, [190, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0,
                transform: `translateX(${interpolate(frame, [190, 210], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                zIndex: 10,
            }}>
                <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center', maxWidth: '80%' }}>
                    <DistroIcon src="assets/distros/ubuntu.svg" showAt={210} delay={0} size={100} />
                    <DistroIcon src="assets/distros/debian.svg" showAt={210} delay={10} size={100} />
                    <DistroIcon src="assets/distros/fedora.svg" showAt={210} delay={20} size={100} />
                    <DistroIcon src="assets/distros/archlinux.svg" showAt={210} delay={30} size={100} />
                    <DistroIcon src="assets/distros/manjaro.svg" showAt={210} delay={40} size={100} />
                </div>

                <p style={{
                    marginTop: 80,
                    fontSize: 48,
                    fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 1.5,
                    maxWidth: '90%',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`,
                    opacity: interpolate(spring({ frame: frame - 250, fps }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 250, fps }), [0, 1], [30, 0])}px)`
                }}>
                    يمكنك استخدام توزيعات <span style={{ color: COLORS.primary }}>مستقرة</span> وسهلة الاستخدام<br />
                    مثل Ubuntu, Debian, Fedora, Arch, أو Manjaro<br />
                    والعمل عليها <span style={{ color: COLORS.accent }}>يومياً</span> مع أدوات Cybersecurity.
                </p>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
