import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { Zap, Square, FastForward, Edit3, Settings2 } from 'lucide-react';



export const BurpScene6_Intercept: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sequence animations
    const titleAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const mockInterfaceAppear = spring({
        frame: frame - 60,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const textChangePhase = spring({
        frame: frame - 280,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const optionsAppear = spring({
        frame: frame - 480,
        fps,
        config: { damping: 15, stiffness: 70 }
    });

    // Pulse for Intercept ON
    const interceptPulse = Math.sin(frame / 10) * 0.2 + 0.8;

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

                {/* Header Title */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    marginBottom: 50,
                    opacity: titleAppear,
                    transform: `translateY(${interpolate(titleAppear, [0, 1], [-30, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 45,
                        color: '#FF6633',
                        fontFamily: 'Cairo, sans-serif',
                        margin: '0 0 10px 0',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                    }}>
                        <Zap size={40} /> الجزء المهم
                    </h2>
                    <h1 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                    }}>
                        تفعيل الـ Intercept
                    </h1>
                </div>

                {/* Mock Burp Suite Interface */}
                <div style={{
                    width: 1000,
                    height: 550,
                    background: '#1a1a1a',
                    borderRadius: 20,
                    border: '2px solid #333',
                    padding: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: mockInterfaceAppear,
                    transform: `scale(${interpolate(mockInterfaceAppear, [0, 1], [0.8, 1])})`,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Top Bar */}
                    <div style={{ display: 'flex', gap: 20, marginBottom: 30, alignItems: 'center' }}>
                        <div style={{
                            padding: '10px 30px',
                            background: '#FF6633',
                            color: 'white',
                            borderRadius: 10,
                            fontWeight: 900,
                            fontSize: 25,
                            opacity: interceptPulse,
                            boxShadow: '0 0 20px rgba(255,102,51,0.4)',
                        }}>
                            Intercept is ON
                        </div>
                        <div style={{ padding: '10px 20px', background: '#333', color: '#999', borderRadius: 10, fontSize: 20 }}>Forward</div>
                        <div style={{ padding: '10px 20px', background: '#333', color: '#999', borderRadius: 10, fontSize: 20 }}>Drop</div>
                    </div>

                    {/* Request Content */}
                    <div style={{ flex: 1, background: '#0a0a0a', border: '1px solid #333', borderRadius: 10, padding: 25, position: 'relative' }}>
                        <p style={{ color: '#00ff41', fontFamily: 'monospace', fontSize: 28, margin: 0, opacity: 0.7 }}>
                            POST /checkout HTTP/1.1<br />
                            Host: example.com<br />
                            Content-Type: application/x-www-form-urlencoded<br /><br />
                            {"{ "}
                            <span style={{ color: 'white' }}>"item": "Laptop", </span>
                            <span style={{ color: '#FF6633', fontWeight: 900, fontSize: 32 }}>
                                "price": {interpolate(textChangePhase, [0, 1], [10, 1])}
                            </span>
                            {" }"}
                        </p>

                        {/* Cursor Indicator for the edit */}
                        <div style={{
                            position: 'absolute',
                            left: 200,
                            top: 220,
                            opacity: interpolate(frame, [250, 270], [0, 1]),
                        }}>
                            <Edit3 color="#FF6633" size={40} />
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div style={{ position: 'absolute', right: 40, top: 40, padding: '10px 20px', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', color: '#ff4d4d', borderRadius: 10, fontSize: 24, fontWeight: 700 }}>
                        <Square size={24} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 10 }} /> PAUSED
                    </div>
                </div>

                {/* Vertical Options List */}
                <div style={{
                    direction: 'rtl',
                    display: 'flex',
                    gap: 60,
                    marginTop: 60,
                    opacity: optionsAppear,
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <Settings2 color="#FF6633" size={60} style={{ marginBottom: 15 }} />
                        <p style={{ color: 'white', fontSize: 35, fontFamily: 'Cairo', margin: 0 }}>قراءة البيانات</p>
                        <p style={{ color: '#666', fontSize: 25, fontFamily: 'Cairo' }}>(Headers / Body)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Edit3 color="#FF6633" size={60} style={{ marginBottom: 15 }} />
                        <p style={{ color: 'white', fontSize: 35, fontFamily: 'Cairo', margin: 0 }}>تعديلها</p>
                        <p style={{ color: '#666', fontSize: 25, fontFamily: 'Cairo' }}>(Modify)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <FastForward color="#00ff41" size={60} style={{ marginBottom: 15 }} />
                        <p style={{ color: 'white', fontSize: 35, fontFamily: 'Cairo', margin: 0 }}>ثم إرسالها</p>
                        <p style={{ color: '#666', fontSize: 25, fontFamily: 'Cairo' }}>(Forward)</p>
                    </div>
                </div>
            </div>

            {/* Glowing Effects */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 1200,
                height: 800,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, #FF663308 0%, transparent 70%)',
                zIndex: 0,
            }} />
        </AbsoluteFill>
    );
};
