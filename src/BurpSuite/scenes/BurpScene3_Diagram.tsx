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
import { User, Globe, ArrowLeftRight } from 'lucide-react';

export const BurpScene3_Diagram: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({
        frame: frame - 15,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const floatY = Math.sin(frame / 20) * 15;

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
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 500,
                    opacity: appear,
                    transform: `scale(${interpolate(appear, [0, 1], [0.85, 1])})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 120,
                }}>
                    {/* User / You */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 220,
                            height: 220,
                            borderRadius: '50%',
                            border: '4px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.05)',
                        }}>
                            <User size={120} color="#ddd" />
                        </div>
                        <p style={{ color: '#ddd', fontSize: 45, fontFamily: 'Cairo', marginTop: 30, fontWeight: 700 }}>أنت</p>
                    </div>

                    {/* Burp Suite (The Interceptor) */}
                    <div style={{
                        position: 'relative',
                        transform: `translateY(${floatY}px)`
                    }}>
                        <div style={{
                            width: 320,
                            height: 320,
                            borderRadius: 60,
                            border: '6px solid #FF6633',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,102,51,0.1)',
                            boxShadow: '0 0 60px rgba(255,102,51,0.3)',
                        }}>
                            <Img
                                src={staticFile('assets/burpsuite.svg')}
                                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                            />
                        </div>
                        <ArrowLeftRight
                            size={80}
                            color="#FF6633"
                            style={{ position: 'absolute', width: '100%', bottom: -100, opacity: 0.8 }}
                        />
                    </div>

                    {/* Target Website */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 220,
                            height: 220,
                            borderRadius: '50%',
                            border: '4px solid #00d4ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,212,255,0.05)',
                        }}>
                            <Globe size={120} color="#00d4ff" />
                        </div>
                        <p style={{ color: '#00d4ff', fontSize: 45, fontFamily: 'Cairo', marginTop: 30, fontWeight: 700 }}>الموقع</p>
                    </div>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.3 * appear,
                zIndex: 1,
            }} />
        </AbsoluteFill>
    );
};
