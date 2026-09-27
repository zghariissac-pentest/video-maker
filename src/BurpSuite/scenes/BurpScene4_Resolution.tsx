import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from 'remotion';
import { User, Globe, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const BurpScene4_Resolution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Appear animation
    const appear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    // Content reveal animation
    const contentReveal = spring({
        frame: frame - 25,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    // Floating animation
    const floatY = Math.sin(frame / 20) * 12;

    // Moving signal animation (proxy flow)
    const signalPos = interpolate(frame % 60, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
    const signalOpacity = interpolate(signalPos, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
        }}>
            {/* Subtle Grid Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.3 * appear,
                zIndex: 1,
            }} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 60px',
                zIndex: 20,
                gap: 80,
            }}>

                {/* Animated Proxy Diagram at the Top */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 350,
                    opacity: contentReveal,
                    transform: `scale(${interpolate(contentReveal, [0, 1], [0.9, 1])})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 100,
                }}>
                    {/* User / You */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 160,
                            height: 160,
                            borderRadius: '50%',
                            border: '3px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.05)',
                        }}>
                            <User size={90} color="#ddd" />
                        </div>
                    </div>

                    {/* Burp Suite (The Interceptor) */}
                    <div style={{
                        position: 'relative',
                        transform: `translateY(${floatY}px)`
                    }}>
                        <div style={{
                            width: 260,
                            height: 260,
                            borderRadius: 45,
                            border: '5px solid #FF6633',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,102,51,0.1)',
                            boxShadow: '0 0 50px rgba(255,102,51,0.3)',
                        }}>
                            <Img
                                src={staticFile('assets/burpsuite.svg')}
                                style={{ width: '75%', height: '75%', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Target Website */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 160,
                            height: 160,
                            borderRadius: '50%',
                            border: '3px solid #00d4ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,212,255,0.05)',
                        }}>
                            <Globe size={90} color="#00d4ff" />
                        </div>
                    </div>

                    {/* Moving Signal Dots (Animates Flow) */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: 2,
                        background: 'rgba(255,255,255,0.05)',
                        zIndex: -1,
                        opacity: 0.5,
                    }}>
                        {/* Dot moving towards Burp */}
                        <div style={{
                            position: 'absolute',
                            left: `${interpolate(signalPos, [0, 1], [15, 45])}%`,
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                            backgroundColor: '#FF6633',
                            opacity: signalOpacity,
                            boxShadow: '0 0 15px #FF6633',
                        }} />
                        {/* Dot moving towards Website */}
                        <div style={{
                            position: 'absolute',
                            left: `${interpolate(signalPos, [0, 1], [55, 85])}%`,
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                            backgroundColor: '#00d4ff',
                            opacity: signalOpacity,
                            boxShadow: '0 0 15px #00d4ff',
                        }} />
                    </div>
                </div>

                {/* Arabic Resolution Text Under It */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 1100,
                    opacity: appear,
                    transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 75,
                        fontFamily: 'Cairo, sans-serif',
                        lineHeight: 1.5,
                        color: 'white',
                        fontWeight: 900,
                    }}>
                        لكن في الحقيقة، هو <span style={{ color: '#00ff41', textShadow: '0 0 20px rgba(0,255,65,0.4)' }}>وسيلة بسيطة</span> <br />
                        لفهم ما يحدث <span style={{ color: '#FF6633' }}>بينك</span> وبين أي <span style={{ color: '#00d4ff' }}>موقع</span>.
                        <CheckCircle2
                            size={60}
                            color="#00ff41"
                            style={{
                                display: 'block',
                                margin: '20px auto 0',
                                filter: 'drop-shadow(0 0 20px rgba(0,255,65,0.3))'
                            }}
                        />
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
