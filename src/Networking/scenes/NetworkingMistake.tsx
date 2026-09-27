import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Brain, Eye, Settings, BookOpen, XCircle } from 'lucide-react';

export const NetworkingMistake: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fades
    const opacityPart1 = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacityPart2 = interpolate(frame, [150, 170, 330, 350], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Entry springs
    const entry1 = spring({ frame: frame - 10, fps });
    const entry2 = spring({ frame: frame - 160, fps });
    const entryMistake = spring({ frame: frame - 250, fps, config: { stiffness: 200 } });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            {/* Background Grid */}
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            {/* Part 1: Not Memorization, but a System */}
            <AbsoluteFill style={{ opacity: opacityPart1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 80px'
                }}>
                    <div style={{
                        fontSize: 60,
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: 40,
                        textAlign: 'center',
                        transform: `scale(${interpolate(entry1, [0, 1], [0.9, 1])})`,
                    }}>
                        الشبكات ليست معلومات تُحفظ… <br />
                        <span style={{ color: '#FF3300', fontSize: 40, fontWeight: 400 }}> (Brain-dumping is not learning) </span>
                    </div>

                    <div style={{
                        fontSize: 70,
                        fontWeight: 900,
                        color: '#00D1FF',
                        textAlign: 'center',
                        opacity: spring({ frame: frame - 60, fps }),
                        transform: `translateY(${interpolate(spring({ frame: frame - 60, fps }), [0, 1], [20, 0])}px)`,
                    }}>
                        هي نظام يجب أن “تراه” وتتعامل معه.
                    </div>

                    <div style={{ marginTop: 50, display: 'flex', gap: 30 }}>
                        <Brain size={60} color="#FF3300" style={{ opacity: 0.5 }} />
                        <Settings size={60} color="#00D1FF" style={{ animation: 'spin 4s linear infinite' }} />
                        <Eye size={60} color="#00D1FF" />
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 2: The Biggest Mistake */}
            <AbsoluteFill style={{ opacity: opacityPart2 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 80px'
                }}>
                    <div style={{
                        fontSize: 55,
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: 40,
                        textAlign: 'center',
                        transform: `translateY(${interpolate(entry2, [0, 1], [30, 0])}px)`,
                    }}>
                        وأكبر خطأ يقع فيه أغلب المبتدئين هو:
                    </div>

                    <div style={{
                        fontSize: 90,
                        fontWeight: 900,
                        color: '#FF3300',
                        textAlign: 'center',
                        transform: `scale(${interpolate(entryMistake, [0, 1], [0.5, 1])}) rotate(${interpolate(entryMistake, [0, 1], [-5, 0])}deg)`,
                        textShadow: '0 0 40px rgba(255,0,0,0.4)',
                    }}>
                        التعلم النظري فقط.
                    </div>

                    <div style={{ marginTop: 60, display: 'flex', gap: 20 }}>
                        <XCircle size={80} color="#FF3300" />
                        <BookOpen size={80} color="#FF3300" />
                    </div>
                </div>
            </AbsoluteFill>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </AbsoluteFill>
    );
};
