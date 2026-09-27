import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';
import { ShieldAlert, FileWarning, Network, UserX, Terminal } from 'lucide-react';

const COLORS = {
    danger: '#ff4b2b', // Warning Red/Orange
    primary: '#00BDF2',
    background: '#0a0a0c',
};

// --- COMPONENTS ---

const RiskCard: React.FC<{
    Icon: React.ElementType;
    title: string;
    delay: number;
    color: string;
}> = ({ Icon, title, delay, color }) => {
    const frame = useCurrentFrame();
    const slide = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    const floatY = Math.sin((frame + delay) / 40) * 10;
    const opacity = interpolate(slide, [0, 1], [0, 1]);
    const scale = interpolate(slide, [0, 1], [0.8, 1]);

    return (
        <div style={{
            opacity,
            transform: `scale(${scale}) translateY(${floatY}px)`,
            background: 'rgba(255, 75, 43, 0.05)',
            border: `1px solid ${color}40`,
            padding: '20px 40px',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 15,
            boxShadow: `0 10px 40px ${color}10`,
        }}>
            <Icon size={80} color={color} style={{ filter: `drop-shadow(0 0 15px ${color}60)` }} />
            <span style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
                fontFamily: 'monospace',
                letterSpacing: 2,
            }}>{title}</span>
        </div>
    );
};

// --- SCENE ---

export const Scene3_Risk: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timing
    const tText1 = 15;
    const tText2 = 135;
    const tText3 = 285;

    const text1Slide = spring({ frame: frame - tText1, fps, config: { damping: 15 } });
    const text2Slide = spring({ frame: frame - tText2, fps, config: { damping: 15 } });
    const text3Slide = spring({ frame: frame - tText3, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            {/* Background Network Mesh (Subtle) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(circle at 50% 50%, #2b0c0c 0%, #0a0a0c 100%)`,
                opacity: 0.7,
            }} />

            {/* Visual Icons Area */}
            <div style={{
                position: 'absolute',
                top: '35%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 50,
                alignItems: 'center',
            }}>
                <RiskCard Icon={ShieldAlert} title="CONFIG_ERR" delay={30} color={COLORS.danger} />
                <RiskCard Icon={Network} title="LAN_NETWORK" delay={60} color={COLORS.primary} />
                <RiskCard Icon={FileWarning} title="SENSITIVE_FILES" delay={90} color={COLORS.danger} />
            </div>

            {/* Hacker/Control Icons Popping in later */}
            <div style={{
                position: 'absolute',
                top: '15%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 100,
            }}>
                {frame > 280 && (
                    <>
                        <div style={{
                            opacity: text3Slide,
                            transform: `scale(${text3Slide})`,
                            color: COLORS.danger,
                        }}>
                            <UserX size={120} style={{ filter: `drop-shadow(0 0 20px ${COLORS.danger})` }} />
                        </div>
                        <div style={{
                            opacity: text3Slide,
                            transform: `scale(${text3Slide})`,
                            color: COLORS.danger,
                        }}>
                            <Terminal size={120} style={{ filter: `drop-shadow(0 0 20px ${COLORS.danger})` }} />
                        </div>
                    </>
                )}
            </div>

            {/* CONTENT TEXT */}
            <div style={{
                position: 'absolute',
                bottom: '8%',
                width: '100%',
                padding: '0 80px',
                display: 'flex',
                flexDirection: 'column',
                gap: 30,
                alignItems: 'center',
            }}>
                {/* Heading (Why it matters) */}
                <h2 style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: COLORS.danger,
                    fontFamily: 'monospace',
                    letterSpacing: 10,
                    opacity: 0.3,
                    position: 'absolute',
                    top: -100,
                }}>
                    WHY IT MATTERS
                </h2>

                {/* Arabic Text 1: Misconfiguration error */}
                <div style={{
                    opacity: text1Slide,
                    transform: `translateX(${interpolate(text1Slide, [0, 1], [50, 0])}px)`,
                    display: frame < tText2 + 30 ? 'block' : 'none',
                }}>
                    <h1 style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        textShadow: `0 0 20px ${COLORS.danger}40`,
                    }}>
                        المشكلة أن أي خطأ في الإعدادات
                    </h1>
                </div>

                {/* Arabic Text 2: Sensitive files access */}
                <div style={{
                    opacity: text2Slide,
                    transform: `translateX(${interpolate(text2Slide, [0, 1], [50, 0])}px)`,
                    display: frame >= tText2 && frame < tText3 + 30 ? 'block' : 'none',
                }}>
                    <h1 style={{
                        fontSize: 55,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        lineHeight: 1.4,
                    }}>
                        قد يسمح لأي شخص داخل الشبكة بالوصول إلى <span style={{ color: COLORS.danger }}>ملفات حساسة</span>
                    </h1>
                </div>

                {/* Arabic Text 3: Full system control */}
                <div style={{
                    opacity: text3Slide,
                    transform: `scale(${interpolate(text3Slide, [0, 1], [0.9, 1])})`,
                    display: frame >= tText3 ? 'block' : 'none',
                }}>
                    <h1 style={{
                        fontSize: 60,
                        fontWeight: 950,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        textShadow: `0 0 40px ${COLORS.danger}`,
                    }}>
                        وأحياناً حتى <span style={{ color: COLORS.danger }}>التحكم في النظام</span>
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};
