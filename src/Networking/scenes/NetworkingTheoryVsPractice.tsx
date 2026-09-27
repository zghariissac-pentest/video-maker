import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Search, Activity, XCircle, AlertCircle } from 'lucide-react';

export const NetworkingTheoryVsPractice: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    // Fades
    const opacityPart1 = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacityPart2 = interpolate(frame, [150, 170, 330, 350], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacityPart3 = interpolate(frame, [350, 370, 480, 500], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // OSI Layers animation
    const osiSlide = (i: number) => spring({
        frame: frame - (20 + i * 10),
        fps,
        config: { damping: 12 }
    });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            {/* Background Grid */}
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                opacity: 0.5,
            }} />

            {/* Part 1: The Theory (OSI, IP, etc.) */}
            <AbsoluteFill style={{ opacity: opacityPart1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 60px'
                }}>
                    <div style={{ fontSize: 45, fontWeight: 700, color: 'white', marginBottom: 60, textAlign: 'center' }}>
                        تحفظ طبقات OSI، تفهم ما هو IP، Subnet، Ports…
                    </div>

                    {/* OSI Visual Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10 }}>
                        {[1, 2, 3, 4, 5, 6, 7].map((l, i) => (
                            <div key={l} style={{
                                width: 300,
                                height: 40,
                                backgroundColor: '#00D1FF',
                                borderRadius: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'black',
                                fontWeight: 900,
                                fontSize: 20,
                                transform: `translateX(${interpolate(osiSlide(i), [0, 1], [width, 0])}px)`,
                                opacity: osiSlide(i),
                            }}>
                                Layer {l}
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: 60,
                        fontSize: 60,
                        fontWeight: 900,
                        color: '#00FFCC',
                        opacity: spring({ frame: frame - 100, fps }),
                        transform: `scale(${interpolate(spring({ frame: frame - 100, fps }), [0, 1], [0.8, 1])})`,
                    }}>
                        وتشعر أن الأمور “واضحة”
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 2: The Reality (Lost in Network) */}
            <AbsoluteFill style={{ opacity: opacityPart2 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 60px'
                }}>
                    <div style={{ fontSize: 50, fontWeight: 700, color: 'white', marginBottom: 40, textAlign: 'center' }}>
                        لكن عندما ترى شبكة حقيقية… أو تحاول تحليل اتصال…
                    </div>

                    {/* Chaotic Network Visual */}
                    <div style={{ position: 'relative', width: 500, height: 400 }}>
                        {[...Array(12)].map((_, i) => {
                            const angle = (i / 12) * Math.PI * 2;
                            const r = 150 + Math.sin(frame / 20 + i) * 30;
                            const x = Math.cos(angle) * r;
                            const y = Math.sin(angle) * r;
                            return (
                                <div key={i} style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                    color: i % 2 === 0 ? '#FF3300' : '#ffffff',
                                    opacity: 0.6
                                }}>
                                    {i % 3 === 0 ? <Activity size={40} /> : i % 3 === 1 ? <Search size={40} /> : <AlertCircle size={40} />}
                                </div>
                            );
                        })}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: 100,
                            fontWeight: 900,
                            color: '#FF3300',
                            textShadow: '0 0 40px rgba(255,0,0,0.5)',
                        }}>
                            تضيع
                        </div>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 3: The Connection Problem */}
            <AbsoluteFill style={{ opacity: opacityPart3 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 60px'
                }}>
                    <div style={{
                        fontSize: 70,
                        fontWeight: 900,
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: 1.5,
                    }}>
                        لا تعرف كيف تربط <br />
                        <span style={{ color: '#00D1FF' }}>كل شيء ببعضه.</span>
                    </div>

                    <div style={{ marginTop: 80, display: 'flex', gap: 40, alignItems: 'center' }}>
                        <div style={{ padding: 20, border: '2px solid white', borderRadius: 10 }}>Theory</div>
                        <XCircle size={60} color="#FF3300" />
                        <div style={{ padding: 20, border: '2px dashed #00D1FF', borderRadius: 10 }}>Practice</div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
