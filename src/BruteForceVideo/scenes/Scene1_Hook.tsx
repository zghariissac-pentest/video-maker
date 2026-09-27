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
} from '../../NotetakingVideo/components/Theme';
import { ShieldAlert, Terminal, LogIn, Key, Lock, Shield, Cpu, Activity, Database, LucideProps } from 'lucide-react';

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    top: string;
    left: string;
    delay: number;
    size: number;
    color: string;
}> = ({ icon, top, left, delay, size, color }) => {
    const frame = useCurrentFrame();
    const yShift = Math.sin((frame + delay) / 30) * 20;
    const opacity = 0.05 + Math.sin((frame + delay) / 50) * 0.02;

    return (
        <div style={{
            position: 'absolute',
            top,
            left,
            opacity,
            transform: `translateY(${yShift}px)`,
            color,
        }}>
            {React.cloneElement(icon as React.ReactElement<LucideProps>, { size })}
        </div>
    );
};

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
            gap: 50,
            zIndex: 20,
        }}>
            <div style={{
                width: 180, height: 180, borderRadius: '45px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 60px ${accentColor}25, inset 0 0 25px ${accentColor}15`,
                transform: `rotate(${Math.sin(frame / 25) * 6}deg)`,
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 60,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: 0,
                textShadow: `0 0 30px ${accentColor}50`,
            }}>
                {text}
            </p>
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            {/* Background Icons */}
            <FloatingIcon icon={<Key />} top="15%" left="10%" delay={0} size={150} color={COLORS.primary} />
            <FloatingIcon icon={<Lock />} top="70%" left="15%" delay={100} size={120} color={COLORS.secondary} />
            <FloatingIcon icon={<Shield />} top="20%" left="80%" delay={200} size={180} color={COLORS.accent} />
            <FloatingIcon icon={<Cpu />} top="75%" left="75%" delay={300} size={140} color={COLORS.primary} />
            <FloatingIcon icon={<Activity />} top="45%" left="5%" delay={400} size={100} color={COLORS.secondary} />
            <FloatingIcon icon={<Database />} top="10%" left="45%" delay={500} size={110} color={COLORS.accent} />

            {/* Part 1: Login or API */}
            <TextBlock
                showAt={10}
                hideAt={130}
                accentColor={COLORS.primary}
                icon={<LogIn size={110} color={COLORS.primary} />}
                text={
                    <>
                        إذا كنت تريد اختبار <span style={{ color: COLORS.primary }}>Login</span> أو <span style={{ color: COLORS.primary }}>API</span>…
                    </>
                }
            />

            {/* Part 2: Rate Limits */}
            <TextBlock
                showAt={140}
                hideAt={280}
                accentColor={COLORS.secondary}
                icon={<ShieldAlert size={110} color={COLORS.secondary} />}
                text={
                    <>
                        لكن يتوقف كل شيء بسبب<br />
                        <span style={{ color: COLORS.secondary }}>Rate Limits</span>…
                    </>
                }
            />

            {/* Part 3: The Problem */}
            <TextBlock
                showAt={290}
                accentColor={COLORS.accent}
                icon={<Terminal size={110} color={COLORS.accent} />}
                text={
                    <>
                        فأنت غالباً تختبرها<br />
                        <span style={{ color: COLORS.accent }}>بالطريقة الخطأ</span>.
                    </>
                }
            />

            <Vignette />
        </AbsoluteFill>
    );
};
