import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';
import { Server, HardDrive, Share2, FolderOpen, ShieldCheck } from 'lucide-react';

const COLORS = {
    primary: '#00BDF2', // Windows Blue
    accent: '#ff0055', // Pink accent
    background: '#000000',
    card: 'rgba(255, 255, 255, 0.05)',
};

// --- COMPONENTS ---

const FloatingIcon: React.FC<{
    Icon: React.ElementType;
    delay: number;
    color: string;
    size: number;
    className?: string;
}> = ({ Icon, delay, color, size, className }) => {
    const frame = useCurrentFrame();
    const slide = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    const floatY = Math.sin((frame + delay) / 30) * 15;
    const opacity = interpolate(slide, [0, 1], [0, 0.8]);
    const scale = interpolate(slide, [0, 1], [0.5, 1]);

    return (
        <div
            className={className}
            style={{
                opacity,
                transform: `scale(${scale}) translateY(${floatY}px)`,
                color,
                filter: `drop-shadow(0 0 20px ${color}40)`,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon size={size} />
        </div>
    );
};

const ConnectionLine: React.FC<{ start: number; end: number }> = ({ start, end }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame, [start, end], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // Animated particles along the line
    const dotProgress = (frame % 30) / 30;

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 400,
            height: 4,
            background: `linear-gradient(90deg, ${COLORS.primary}00, ${COLORS.primary}80, ${COLORS.primary}00)`,
            transform: 'translate(-50%, -50%)',
            opacity: progress,
        }}>
            <div style={{
                position: 'absolute',
                left: `${dotProgress * 100}%`,
                width: 15,
                height: 15,
                background: '#fff',
                borderRadius: '50%',
                top: -6,
                boxShadow: `0 0 15px #fff`,
            }} />
        </div>
    );
};

// --- SCENE ---

export const Scene2_SMB: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text Reveal Logic
    const tText1 = 15;
    const tText2 = 120;
    const tText3 = 240;

    const text1Slide = spring({ frame: frame - tText1, fps, config: { damping: 15 } });
    const text2Slide = spring({ frame: frame - tText2, fps, config: { damping: 15 } });
    const text3Slide = spring({ frame: frame - tText3, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            {/* Background Atmosphere */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, #00182b 0%, #000 100%)',
                opacity: 0.6,
            }} />

            {/* Central Animation Area */}
            <div style={{
                position: 'absolute',
                top: '40%',
                width: '100%',
                height: '30%',
            }}>
                {/* Server 1 (Source) */}
                <FloatingIcon
                    Icon={Server}
                    delay={30}
                    color={COLORS.primary}
                    size={180}
                    className="left-1/4"
                />

                {/* Connection Line */}
                <ConnectionLine start={60} end={100} />

                {/* Server 2 (Target) */}
                <FloatingIcon
                    Icon={Server}
                    delay={80}
                    color={COLORS.primary}
                    size={180}
                    className="right-1/4"
                />

                {/* Sharing Icons Animation */}
                {frame > 120 && (
                    <>
                        <FloatingIcon Icon={FolderOpen} delay={130} color="#fff" size={80} className="top-[20%] left-[45%]" />
                        <FloatingIcon Icon={HardDrive} delay={160} color="#fff" size={80} className="top-[10%] left-[35%]" />
                        <FloatingIcon Icon={Share2} delay={190} color={COLORS.accent} size={80} className="top-[30%] left-[55%]" />
                        <FloatingIcon Icon={ShieldCheck} delay={220} color={COLORS.primary} size={80} className="top-[0%] left-[50%]" />
                    </>
                )}
            </div>

            {/* CONTENT TEXT */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                width: '100%',
                padding: '0 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                alignItems: 'center',
            }}>
                {/* Text 1: Today we talk about SMB */}
                <div style={{
                    opacity: text1Slide,
                    transform: `translateY(${interpolate(text1Slide, [0, 1], [40, 0])}px)`,
                    display: frame < tText2 + 30 ? 'block' : 'none'
                }}>
                    <h1 style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                    }}>
                        اليوم سنتكلم عن بروتوكول اسمه <span style={{ color: COLORS.primary }}>SMB</span>
                    </h1>
                </div>

                {/* Text 2: SMB means Server Message Block */}
                <div style={{
                    opacity: text2Slide,
                    transform: `translateY(${interpolate(text2Slide, [0, 1], [40, 0])}px)`,
                    display: frame >= tText2 && frame < tText3 + 30 ? 'block' : 'none'
                }}>
                    <h1 style={{
                        fontSize: 55,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        lineHeight: 1.5,
                    }}>
                        <span style={{ color: COLORS.accent }}>SMB</span> يعني Server Message Block
                    </h1>
                </div>

                {/* Text 3: Responsible for sharing files */}
                <div style={{
                    opacity: text3Slide,
                    transform: `translateY(${interpolate(text3Slide, [0, 1], [40, 0])}px)`,
                    display: frame >= tText3 ? 'block' : 'none'
                }}>
                    <h1 style={{
                        fontSize: 50,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        lineHeight: 1.6,
                    }}>
                        وهو المسؤول عن مشاركة الملفات بين أجهزة الويندوز
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};
