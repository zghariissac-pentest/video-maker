import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { Search, Brain, AlertTriangle } from 'lucide-react';


export const BurpScene7_Importance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sequence animations
    const titleAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const contentAppear = spring({
        frame: frame - 60,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const manualNoteAppear = spring({
        frame: frame - 250,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const disclaimerAppear = spring({
        frame: frame - 600, // Starts at 80s mark (approx frame 600 in this sequence)
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

                {/* Main Content Section (0-20s of sequence) */}
                <div style={{
                    display: frame < 600 ? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        direction: 'rtl',
                        textAlign: 'center',
                        marginBottom: 60,
                        opacity: titleAppear,
                        transform: `translateY(${interpolate(titleAppear, [0, 1], [-30, 0])}px)`,
                    }}>
                        <h2 style={{
                            fontSize: 45,
                            color: '#FF6633',
                            fontFamily: 'Cairo, sans-serif',
                            margin: '0 0 10px 0',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 20,
                        }}>
                            <Search size={40} /> لماذا هذا مهم؟
                        </h2>
                    </div>

                    <div style={{
                        direction: 'rtl',
                        textAlign: 'center',
                        maxWidth: 1000,
                        opacity: contentAppear,
                        transform: `translateY(${interpolate(contentAppear, [0, 1], [30, 0])}px)`,
                    }}>
                        <p style={{
                            fontSize: 60,
                            fontFamily: 'Cairo, sans-serif',
                            lineHeight: 1.4,
                            color: 'white',
                            fontWeight: 800,
                            marginBottom: 60,
                        }}>
                            بهذه الطريقة يمكنك <br />
                            <span style={{ color: '#00d4ff' }}>اختيار الثغرات</span> يدوياً وبدقة.
                        </p>

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '2px solid rgba(255,255,255,0.1)',
                            padding: '40px 60px',
                            borderRadius: 30,
                            opacity: manualNoteAppear,
                            transform: `scale(${interpolate(manualNoteAppear, [0, 1], [0.95, 1])})`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 40,
                        }}>
                            <Brain size={80} color="#FF6633" />
                            <p style={{
                                fontSize: 45,
                                fontFamily: 'Cairo, sans-serif',
                                color: '#ddd',
                                margin: 0,
                                textAlign: 'right',
                                lineHeight: 1.3,
                            }}>
                                Burp Suite <span style={{ color: '#ff4d4d' }}>لا يقوم</span> بالاختراق تلقائياً… <br />
                                بل هو أداة <span style={{ color: '#00ff41' }}>للتحليل والتحكم</span> الكامل.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section (20-25s of sequence) */}
                <div style={{
                    display: frame >= 600 ? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: disclaimerAppear,
                    transform: `translateY(${interpolate(disclaimerAppear, [0, 1], [30, 0])}px)`,
                }}>
                    <div style={{
                        background: 'rgba(255,77,77,0.1)',
                        border: '4px solid #ff4d4d',
                        padding: '60px 80px',
                        borderRadius: 40,
                        textAlign: 'center',
                        maxWidth: 1000,
                        boxShadow: '0 0 100px rgba(255,77,77,0.2)',
                    }}>
                        <AlertTriangle size={120} color="#ff4d4d" style={{ marginBottom: 40 }} />
                        <h2 style={{
                            fontSize: 55,
                            color: '#ff4d4d',
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 900,
                            margin: '0 0 30px 0',
                            direction: 'rtl',
                        }}>
                            ⚠️ ملاحظة مهمة جداً
                        </h2>
                        <p style={{
                            fontSize: 50,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            lineHeight: 1.4,
                            margin: 0,
                            direction: 'rtl',
                            fontWeight: 700,
                        }}>
                            أي اختبار يجب أن يكون على أنظمة <br />
                            لديك <span style={{ color: '#00ff41' }}>إذن رسمي</span> باختبارها فقط.
                        </p>
                    </div>
                </div>

            </div>

            {/* Background Aesthetic */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.3,
                zIndex: 1,
            }} />
        </AbsoluteFill>
    );
};
