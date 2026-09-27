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
import { Monitor, Server, ArrowRight, ArrowLeft, Code, Eye } from 'lucide-react';


export const BurpScene5_BasicConcept: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sequence animations
    const titleAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const browserServerAppear = spring({
        frame: frame - 60,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const requestAppear = spring({
        frame: frame - 120,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const responseAppear = spring({
        frame: frame - 240,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const burpInterceptAppear = spring({
        frame: frame - 360,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const detailsAppear = spring({
        frame: frame - 480,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    // Particle flow
    const flowT = (frame / 40) % 1;

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
                    marginBottom: 80,
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
                        <Code size={40} /> الفكرة الأساسية
                    </h2>
                    <h1 style={{
                        fontSize: 90,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                    }}>
                        HTTP Request & Response
                    </h1>
                </div>

                {/* The Technical Flow Diagram */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 100,
                    opacity: browserServerAppear,
                    transform: `scale(${interpolate(browserServerAppear, [0, 1], [0.9, 1])})`,
                }}>

                    {/* Browser */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 200,
                            height: 200,
                            border: '3px solid #ddd',
                            borderRadius: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.05)',
                        }}>
                            <Monitor size={100} color="#ddd" />

                        </div>
                        <p style={{ color: '#ddd', fontSize: 35, fontFamily: 'Cairo', marginTop: 25, fontWeight: 700 }}>المتصفح</p>
                    </div>

                    {/* The Intercepting Path */}
                    <div style={{ position: 'relative', width: 400, height: 200 }}>
                        {/* Request Path (Top) */}
                        <div style={{
                            position: 'absolute',
                            top: 40,
                            left: 0,
                            width: '100%',
                            opacity: requestAppear,
                        }}>
                            <div style={{
                                width: '100%',
                                height: 4,
                                background: 'rgba(255,255,255,0.1)',
                                position: 'relative',
                            }}>
                                <ArrowRight size={40} color="#FF6633" style={{ position: 'absolute', right: 0, top: -18 }} />
                                <div style={{
                                    position: 'absolute',
                                    top: -40,
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#FF6633',
                                    fontFamily: 'Cairo',
                                    fontSize: 30,
                                    fontWeight: 700,
                                }}>
                                    Request
                                </div>
                            </div>
                        </div>

                        {/* Burp Suite Proxy (Middle Interception) */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '55%',
                            transform: 'translate(-50%, -50%)',
                            opacity: burpInterceptAppear,
                            zIndex: 30,
                        }}>
                            <div style={{
                                width: 220,
                                height: 220,
                                borderRadius: 40,
                                border: '4px solid #FF6633',
                                background: '#111',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 50px rgba(255,102,51,0.4)',
                            }}>
                                <Img
                                    src={staticFile('assets/burpsuite.svg')}
                                    style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: -30,
                                    width: '200%',
                                    textAlign: 'center',
                                    color: '#FF6633',
                                    fontFamily: 'Cairo',
                                    fontSize: 35,
                                    fontWeight: 900,
                                    textShadow: '0 0 20px rgba(255,102,51,0.5)',
                                }}>
                                    Intercepting Proxy
                                </div>
                            </div>
                        </div>

                        {/* Response Path (Bottom) */}
                        <div style={{
                            position: 'absolute',
                            bottom: 40,
                            left: 0,
                            width: '100%',
                            opacity: responseAppear,
                        }}>
                            <div style={{
                                width: '100%',
                                height: 4,
                                background: 'rgba(0,212,255,0.1)',
                                position: 'relative',
                            }}>
                                <ArrowLeft size={40} color="#00d4ff" style={{ position: 'absolute', left: 0, top: -18 }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: -40,
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#00d4ff',
                                    fontFamily: 'Cairo',
                                    fontSize: 30,
                                    fontWeight: 700,
                                }}>
                                    Response
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Server */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 200,
                            height: 200,
                            border: '3px solid #00d4ff',
                            borderRadius: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,212,255,0.05)',
                        }}>
                            <Server size={100} color="#00d4ff" />
                        </div>
                        <p style={{ color: '#00d4ff', fontSize: 35, fontFamily: 'Cairo', marginTop: 25, fontWeight: 700 }}>السيرفر</p>
                    </div>
                </div>

                {/* Detail Description */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 1000,
                    marginTop: 80,
                    opacity: detailsAppear,
                    transform: `translateY(${interpolate(detailsAppear, [0, 1], [30, 0])}px)`,
                }}>
                    <p style={{
                        fontSize: 55,
                        fontFamily: 'Cairo, sans-serif',
                        lineHeight: 1.5,
                        color: '#ddd',
                        fontWeight: 600,
                    }}>
                        يعطيك القدرة على <span style={{ color: '#FF6633' }}>رؤية وتعديل</span> <br />
                        كل <span style={{ color: '#FF6633' }}>Request</span> و <span style={{ color: '#00d4ff' }}>Response</span> بالتفصيل.
                        <Eye size={40} style={{ display: 'inline-block', marginRight: 15, color: '#FF6633' }} />
                    </p>
                </div>

            </div>

            {/* Background Aesthetic */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, #FF663305 0%, transparent 70%)',
                zIndex: 0,
            }} />
        </AbsoluteFill>
    );
};
