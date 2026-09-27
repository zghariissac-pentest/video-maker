import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    staticFile,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Tablet, Cpu, Container, Waypoints, LucideProps } from 'lucide-react';

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    top: string;
    left: string;
    delay: number;
    size: number;
    color: string;
}> = ({ icon, top, left, delay, size, color }) => {
    const frame = useCurrentFrame();
    const yShift = Math.sin((frame + delay) / 30) * 15;
    const opacity = 0.04 + Math.sin((frame + delay) / 50) * 0.01;

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

export const Scene3_NetHunter: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Logo appear
    const logoSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Part 1 Text (NetHunter is...)
    const text1Spring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 12 },
    });

    // Part 2 Text (Mini Pentesting environment...)
    const text2Spring = spring({
        frame: frame - 60,
        fps,
        config: { damping: 12 },
    });

    // Question Part (But how...)
    const questSpring = spring({
        frame: frame - 150,
        fps,
        config: { damping: 12 },
    });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            {/* Background Icons */}
            <FloatingIcon icon={<Tablet />} top="15%" left="10%" delay={0} size={140} color={COLORS.primary} />
            <FloatingIcon icon={<Cpu />} top="70%" left="15%" delay={100} size={110} color={COLORS.secondary} />
            <FloatingIcon icon={<Container />} top="20%" left="80%" delay={200} size={160} color={COLORS.accent} />
            <FloatingIcon icon={<Waypoints />} top="75%" left="75%" delay={300} size={130} color={COLORS.primary} />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
                gap: 50,
            }}>
                {/* NetHunter Logo */}
                <div style={{
                    transform: `scale(${interpolate(logoSpring, [0, 1], [0.7, 1])})`,
                    opacity: logoSpring,
                    filter: `drop-shadow(0 0 40px ${COLORS.primary}40)`,
                    marginBottom: 20,
                }}>
                    <img
                        src={staticFile("assets/nethunter.png")}
                        style={{
                            width: 320,
                            height: 'auto',
                        }}
                        alt="NetHunter Logo"
                    />
                </div>

                {/* Text Blocks */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <div style={{
                        opacity: text1Spring,
                        transform: `translateY(${interpolate(text1Spring, [0, 1], [20, 0])}px)`,
                    }}>
                        <p style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: 'white',
                            fontFamily: 'Cairo, sans-serif',
                            direction: 'rtl',
                            margin: 0,
                            lineHeight: 1.4,
                        }}>
                            <span style={{ color: COLORS.primary, fontWeight: 900 }}>NetHunter</span> هو نسخة من نظام <span style={{ color: COLORS.secondary }}>Kali Linux</span> تم تكييفها لتعمل على هواتف Android.
                        </p>
                    </div>

                    <div style={{
                        opacity: text2Spring * (1 - questSpring), // Fade out when question appears
                        transform: `translateY(${interpolate(text2Spring, [0, 1], [20, 0])}px)`,
                    }}>
                        <p style={{
                            fontSize: 50,
                            fontWeight: 800,
                            color: COLORS.accent,
                            fontFamily: 'Cairo, sans-serif',
                            direction: 'rtl',
                            margin: 0,
                            lineHeight: 1.4,
                            textShadow: `0 0 30px ${COLORS.accent}40`,
                        }}>
                            بمعنى آخر: هاتفك يمكن أن يتحول إلى بيئة <br />
                            Penetration Testing صغيرة في جيبك.
                        </p>
                    </div>
                </div>

                {/* Transition Question */}
                <div style={{
                    position: 'absolute',
                    bottom: 200,
                    opacity: questSpring,
                    transform: `translateY(${interpolate(questSpring, [0, 1], [40, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 70,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        margin: 0,
                        borderBottom: `4px solid ${COLORS.primary}`,
                        paddingBottom: 10,
                        background: `linear-gradient(transparent 70%, ${COLORS.primary}20 70%)`,
                    }}>
                        لكن كيف يمكن أصلاً تشغيل Linux؟
                    </h2>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
