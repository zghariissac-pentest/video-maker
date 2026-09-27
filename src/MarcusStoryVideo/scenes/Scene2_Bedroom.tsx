import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Video,
    staticFile,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Home, Laptop, Bug, User } from 'lucide-react';

const KeyWord: React.FC<{
    text: string;
    icon: React.ReactNode;
    color: string;
    showAt: number;
}> = ({ text, icon, color, showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: `${color}15`,
            padding: '2px 15px',
            borderRadius: '12px',
            border: `1px solid ${color}30`,
            color: color,
            opacity: appear,
            transform: `scale(${interpolate(appear, [0, 1], [0.8, 1])})`,
            margin: '0 5px'
        }}>
            {icon}
            {text}
        </span>
    );
};

export const Scene2_Bedroom: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene transition
    const sceneAppear = spring({
        frame,
        fps,
        config: { damping: 12 }
    });

    // Content entrance
    const contentAppear = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12 }
    });

    // Text timing (staggered)
    const line1Appear = 60;
    const line2Appear = 120;
    const line3Appear = 180;
    const line4Appear = 240;

    const videoScale = interpolate(contentAppear, [0, 1], [0.95, 1]);
    const videoY = interpolate(contentAppear, [0, 1], [40, 0]);

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden', opacity: sceneAppear }}>
            <SpaceBg />
            <StarField count={120} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                gap: 40,
                zIndex: 20,
            }}>

                {/* Video Container (Big as requested) */}
                <div style={{
                    width: '95%',
                    aspectRatio: '16/9',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    border: `4px solid ${COLORS.primary}80`,
                    boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 60px ${COLORS.primary}40`,
                    transform: `scale(${videoScale}) translateY(${videoY}px)`,
                    opacity: contentAppear,
                    background: '#050505',
                    position: 'relative'
                }}>
                    <Video
                        src={staticFile('assets/marcus_video.mp4')}
                        startFrom={0}
                        muted
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />

                    {/* Hacking Shimmer Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(rgba(0,0,0,0) 70%, rgba(71, 160, 245, 0.15))',
                        pointerEvents: 'none'
                    }} />

                    {/* HISTORY Indicator */}
                    <div style={{
                        position: 'absolute', top: 30, right: 40,
                        background: 'rgba(71, 160, 245, 0.4)',
                        padding: '8px 20px',
                        borderRadius: '15px',
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        fontFamily: 'Cairo',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15,
                        boxShadow: `0 0 20px ${COLORS.primary}30`
                    }}>
                        <div style={{
                            width: 14, height: 14, borderRadius: '50%', background: 'white',
                            opacity: Math.sin(frame / 10) > 0 ? 1 : 0.3
                        }} />
                        DOSSIER: MARCUS
                    </div>
                </div>

                {/* Text Section (Animated line by line) */}
                <div style={{
                    maxWidth: '90%',
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    opacity: contentAppear,
                }}>

                    {/* Line 1: Introduction */}
                    <div style={{
                        opacity: spring({ frame: frame - line1Appear, fps }),
                        transform: `translateY(${interpolate(spring({ frame: frame - line1Appear, fps }), [0, 1], [20, 0])}px)`,
                        fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', color: 'white'
                    }}>
                        شاب بريطاني في أوائل العشرينيات،
                    </div>

                    {/* Line 2: The Bedroom/Home */}
                    <div style={{
                        opacity: spring({ frame: frame - line2Appear, fps }),
                        transform: `translateY(${interpolate(spring({ frame: frame - line2Appear, fps }), [0, 1], [20, 0])}px)`,
                        fontSize: 42, fontWeight: 600, fontFamily: 'Cairo, sans-serif', color: 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'
                    }}>
                        كان يعمل من
                        <KeyWord text="غرفة نومه" icon={<Home size={30} />} color={COLORS.accent} showAt={line2Appear + 15} />
                        في منزل والديه،
                    </div>

                    {/* Line 3: Blogs/Malware */}
                    <div style={{
                        opacity: spring({ frame: frame - line3Appear, fps }),
                        transform: `translateY(${interpolate(spring({ frame: frame - line3Appear, fps }), [0, 1], [20, 0])}px)`,
                        fontSize: 42, fontWeight: 600, fontFamily: 'Cairo, sans-serif', color: 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'
                    }}>
                        ويدون عن
                        <KeyWord text="أمن الشبكات" icon={<Laptop size={30} />} color={COLORS.primary} showAt={line3Appear + 15} />
                        و
                        <KeyWord text="البرمجيات الخبيثة" icon={<Bug size={30} />} color={COLORS.secondary} showAt={line3Appear + 30} />
                    </div>

                    {/* Line 4: MalwareTech Identity */}
                    <div style={{
                        opacity: spring({ frame: frame - line4Appear, fps }),
                        transform: `translateY(${interpolate(spring({ frame: frame - line4Appear, fps }), [0, 1], [20, 0])}px)`,
                        fontSize: 45, fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white',
                        marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15
                    }}>
                        وكان معروفاً كـ
                        <div style={{
                            padding: '5px 25px',
                            background: `linear-gradient(90deg, ${COLORS.primary}30, ${COLORS.accent}30)`,
                            border: `2px solid ${COLORS.primary}`,
                            borderRadius: '25px',
                            fontFamily: 'monospace',
                            color: COLORS.primary,
                            boxShadow: `0 0 30px ${COLORS.primary}40`,
                            display: 'flex', alignItems: 'center', gap: 15
                        }}>
                            <User size={35} />
                            MalwareTech
                        </div>
                    </div>

                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
