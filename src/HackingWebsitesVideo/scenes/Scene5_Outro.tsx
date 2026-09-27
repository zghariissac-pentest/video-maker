import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { Copy, X, Brain, HelpCircle } from 'lucide-react';

export const Scene5_Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance Animations
    const questionAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const mistakeAppear = spring({
        frame: frame - 60,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const detailsAppear = spring({
        frame: frame - 150,
        fps,
        config: { damping: 15, stiffness: 85 }
    });

    const finalPunchline = spring({
        frame: frame - 350,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

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

                {/* Section 1: The Question */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    marginBottom: 100,
                    opacity: questionAppear,
                    transform: `translateY(${interpolate(questionAppear, [0, 1], [30, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        textShadow: '0 0 40px rgba(255,255,255,0.2)',
                    }}>
                        أكبر خطأ يقع فيه <span style={{ color: '#ff0055' }}>المبتدئون؟</span>
                    </h1>
                </div>

                {/* Section 2: The Mistake Visualization */}
                <div style={{
                    position: 'relative',
                    marginBottom: 100,
                    opacity: mistakeAppear,
                    transform: `scale(${interpolate(mistakeAppear, [0, 1], [0.8, 1])})`,
                }}>
                    <div style={{
                        direction: 'rtl',
                        background: 'rgba(255, 0, 85, 0.15)',
                        border: '4px dashed #ff0055',
                        padding: '40px 80px',
                        borderRadius: 30,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 40,
                    }}>
                        <div style={{ position: 'relative' }}>
                            <Copy size={100} color="#ff0055" />
                            <X size={120} color="#fff" style={{ position: 'absolute', top: -10, left: -10 }} strokeWidth={4} />
                        </div>
                        <h2 style={{
                            fontSize: 70,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            margin: 0,
                            fontWeight: 900,
                        }}>
                            الاعتماد على <span style={{ color: '#ff0055' }}>النسخ واللصق</span> فقط.
                        </h2>
                    </div>
                </div>

                {/* Section 3: The Condition List */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'right',
                    width: '100%',
                    maxWidth: 900,
                    opacity: detailsAppear,
                    transform: `translateX(${interpolate(detailsAppear, [0, 1], [50, 0])}px)`,
                    marginBottom: 120,
                }}>
                    <h3 style={{
                        fontSize: 55,
                        fontFamily: 'Cairo, sans-serif',
                        color: '#bbb',
                        marginBottom: 40,
                        fontWeight: 600,
                    }}>
                        إذا لم تفهم:
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
                        {[
                            { text: "كيف تعمل الثغرة", icon: <HelpCircle size={45} color="#00d4ff" /> },
                            { text: "لماذا نجح الهجوم", icon: <Brain size={45} color="#00ff41" /> }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 25,
                                background: 'rgba(255,255,255,0.05)',
                                padding: '20px 40px',
                                borderRadius: 20,
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}>
                                {item.icon}
                                <span style={{ fontSize: 45, color: '#fff', fontFamily: 'Cairo', fontWeight: 700 }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 4: Final Punchline */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    width: '100%',
                    opacity: finalPunchline,
                    transform: `scale(${interpolate(finalPunchline, [0, 1], [0.9, 1.1])})`,
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#ff0055',
                        padding: '40px 100px',
                        borderRadius: 30,
                        boxShadow: '0 0 80px rgba(255,0,85,0.4)',
                    }}>
                        <p style={{
                            fontSize: 75,
                            fontFamily: 'Cairo, sans-serif',
                            color: '#000',
                            margin: 0,
                            fontWeight: 900,
                        }}>
                            فأنت لا تتعلم… <br />
                            أنت فقط <span style={{ color: '#fff' }}>تقلد</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Ambient Background Glow for final punchline */}
            <div style={{
                position: 'absolute',
                top: '75%',
                left: '50%',
                width: 1500,
                height: 800,
                background: `radial-gradient(circle, rgba(255,0,85,0.1) 0%, transparent 60%)`,
                transform: 'translate(-50%, -50%)',
                opacity: finalPunchline,
            }} />
        </AbsoluteFill>
    );
};
