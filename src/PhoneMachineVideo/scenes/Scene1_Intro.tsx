import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Video,
    staticFile,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Smartphone, Shield, Zap, Target } from 'lucide-react';

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
            {icon}
        </div>
    );
};

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Video appear animation
    const videoAppear = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const videoScale = interpolate(videoAppear, [0, 1], [0.8, 1]);
    const videoOpacity = interpolate(videoAppear, [0, 1], [0, 1]);

    // Text appear animation
    const textAppear = spring({
        frame,
        fps,
        config: { damping: 12 },
    });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            {/* Background Decorations */}
            <FloatingIcon icon={<Smartphone size={150} />} top="15%" left="10%" delay={0} size={150} color={COLORS.primary} />
            <FloatingIcon icon={<Shield size={120} />} top="70%" left="15%" delay={100} size={120} color={COLORS.secondary} />
            <FloatingIcon icon={<Zap size={180} />} top="20%" left="80%" delay={200} size={180} color={COLORS.accent} />
            <FloatingIcon icon={<Target size={140} />} top="75%" left="75%" delay={300} size={140} color={COLORS.primary} />

            {/* Main Video Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 60,
                paddingBottom: 100, // Make room for text
            }}>
                <div style={{
                    width: 700,
                    height: 1244, // 9:16 aspect ratio relative to width
                    maxHeight: '60%',
                    borderRadius: 40,
                    overflow: 'hidden',
                    border: `4px solid ${COLORS.primary}40`,
                    boxShadow: `0 0 100px ${COLORS.primary}30`,
                    transform: `scale(${videoScale})`,
                    opacity: videoOpacity,
                    background: '#000',
                }}>
                    <Video
                        src={staticFile("assets/phonemachine.mp4")}
                        playbackRate={0.8}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* Question Text */}
                <div style={{
                    opacity: textAppear,
                    transform: `translateY(${interpolate(textAppear, [0, 1], [20, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 65,
                        fontWeight: 900,
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        margin: 0,
                        textShadow: `0 0 40px ${COLORS.primary}80`,
                    }}>
                        هل يمكن الاختراق باستخدام الهاتف؟
                    </h1>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
