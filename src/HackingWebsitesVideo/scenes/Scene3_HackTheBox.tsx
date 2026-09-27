import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { Hexagon, Box, Brain, MousePointer2, Cpu } from 'lucide-react';

export const Scene3_HackTheBox: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const titleAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const contentAppear = spring({
        frame: frame - 25,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const tipAppear = spring({
        frame: frame - 180,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    // Logo floating & rotating
    const logoY = Math.sin(frame / 25) * 12;
    const logoRotate = interpolate(Math.sin(frame / 60), [-1, 1], [-5, 5]);

    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 60px',
                zIndex: 20,
            }}>

                {/* Header */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    marginBottom: 80,
                    opacity: titleAppear,
                    transform: `translateY(${interpolate(titleAppear, [0, 1], [30, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 45,
                        color: '#9fef00',
                        fontFamily: 'Cairo, sans-serif',
                        margin: '0 0 10px 0',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                    }}>
                        الثاني:
                    </h2>
                    <h1 style={{
                        fontSize: 110,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        textShadow: '0 0 40px rgba(159,239,0,0.3)',
                    }}>
                        Hack The Box
                    </h1>
                </div>

                {/* Hack The Box Logo Reconstruction */}
                <div style={{
                    position: 'relative',
                    width: 380,
                    height: 380,
                    marginBottom: 90,
                    opacity: contentAppear,
                    transform: `scale(${interpolate(contentAppear, [0, 1], [0.8, 1])}) translateY(${logoY}px) rotate(${logoRotate}deg)`,
                }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle, #9fef0025 0%, transparent 75%)',
                        animation: 'pulse 3s infinite ease-in-out',
                    }} />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        position: 'relative',
                    }}>
                        <Hexagon size={320} color="#9fef00" strokeWidth={1.5} fill="#9fef0010" />
                        <Box size={140} color="#fff" style={{ position: 'absolute' }} strokeWidth={1} />

                        {/* Dynamic Orbitals */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            border: '1px dashed #9fef0040',
                            borderRadius: '50%',
                            transform: `rotate(${frame * 0.5}deg) scale(1.15)`,
                        }} />
                        <Cpu
                            size={40}
                            color="#9fef00"
                            fill="#000"
                            style={{
                                position: 'absolute',
                                top: '5%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                filter: 'drop-shadow(0 0 10px #9fef00)',
                            }}
                        />
                    </div>
                </div>

                {/* Description */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 900,
                    opacity: contentAppear,
                    transform: `translateY(${interpolate(contentAppear, [0, 1], [30, 0])}px)`,
                    marginBottom: 100,
                }}>
                    <p style={{
                        fontSize: 55,
                        fontFamily: 'Cairo, sans-serif',
                        lineHeight: 1.4,
                        color: '#eee',
                        margin: 0,
                        fontWeight: 600,
                    }}>
                        تحديات حقيقية تحاكي <br />
                        <span style={{ color: '#9fef00', textShadow: '0 0 20px #9fef0040' }}>أنظمة ضعيفة</span>.
                    </p>
                </div>

                {/* The "Thinking" Tip */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(159,239,0,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '2px solid rgba(159,239,0,0.3)',
                    padding: '35px 60px',
                    borderRadius: 40,
                    opacity: tipAppear,
                    transform: `translateY(${interpolate(tipAppear, [0, 1], [40, 0])}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 40,
                    maxWidth: 1000,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}>
                    <div style={{ position: 'relative' }}>
                        <Brain size={75} color="#9fef00" />
                        <div style={{
                            position: 'absolute',
                            bottom: -10, right: -10,
                            background: '#000', borderRadius: '50%', padding: 5
                        }}>
                            <MousePointer2 size={30} color="#fff" />
                        </div>
                    </div>
                    <p style={{
                        fontSize: 44,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        fontWeight: 700,
                        lineHeight: 1.4,
                    }}>
                        هنا تتعلم <span style={{ color: '#9fef00' }}>التفكير</span>… <br />
                        وليس فقط الضغط على أدوات.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.2; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(0.95); opacity: 0.2; }
                }
            `}</style>
        </AbsoluteFill>
    );
};
