import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    RequirementsBg,
    Vignette,
    COLORS,
    PCIcon,
    Particle
} from '../components/RequirementsTheme';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrances
    const iconSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const textSpring = spring({
        frame: frame - 15,
        fps,
        config: { damping: 14, stiffness: 80 },
    });

    // Animations
    const iconScale = interpolate(iconSpring, [0, 1], [0.5, 1]);
    const iconY = interpolate(iconSpring, [0, 1], [50, 0]);

    const textY = interpolate(textSpring, [0, 1], [40, 0]);
    const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

    // Exit (fade out last 15 frames)
    const { durationInFrames } = useVideoConfig();
    const exitOp = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
            <RequirementsBg />

            <Particle delay={0} x="10%" y="20%" size={8} color={COLORS.teal} />
            <Particle delay={20} x="85%" y="15%" size={12} color={COLORS.blue} />
            <Particle delay={40} x="75%" y="80%" size={10} color={COLORS.purple} />
            <Particle delay={60} x="15%" y="75%" size={6} color={COLORS.pink} />

            <div style={{
                opacity: exitOp,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                gap: 60,
                padding: '0 60px'
            }}>
                {/* Icon Container */}
                <div style={{
                    transform: `translateY(${iconY}px) scale(${iconScale})`,
                    filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.5))`,
                }}>
                    <div style={{
                        width: 200,
                        height: 200,
                        borderRadius: 50,
                        background: `linear-gradient(135deg, ${COLORS.teal}15, ${COLORS.blue}15)`,
                        border: `2px solid ${COLORS.teal}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 50px ${COLORS.teal}11`,
                    }}>
                        <PCIcon size={120} color={COLORS.teal} />
                    </div>
                </div>

                {/* Text Container */}
                <div style={{
                    opacity: textOpacity,
                    transform: `translateY(${textY}px)`,
                    textAlign: 'center',
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: 62,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                        lineHeight: 1.4,
                        direction: 'rtl',
                        margin: 0,
                        textShadow: '0 5px 20px rgba(0,0,0,0.5)',
                    }}>
                        إليك الحد الأدنى من مواصفات الحاسوب
                        <br />
                        <span style={{
                            background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.blue})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: 68,
                            fontWeight: 900
                        }}>
                            التي تحتاجها لبدء تعلم Ethical Hacking
                        </span>
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
