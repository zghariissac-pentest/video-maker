import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Network, Zap, Link, Edit3, Activity, Eye, Terminal } from 'lucide-react';

export const NetworkingPractical: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fades
    const opacity1 = interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity2 = interpolate(frame, [100, 120, 330, 350], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity3 = interpolate(frame, [350, 370, 630, 650], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            {/* Part 1: Headline */}
            <AbsoluteFill style={{ opacity: opacity1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                }}>
                    <div style={{ fontSize: 90, fontWeight: 900, color: 'white' }}>
                        كيف تطبق عملياً؟
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 2: Tools */}
            <AbsoluteFill style={{ opacity: opacity2 }}>
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
                    <div style={{ fontSize: 50, color: 'white', marginBottom: 60 }}>استخدم أدوات محاكاة ومنصات:</div>

                    <div style={{ display: 'flex', gap: 40, width: '100%' }}>
                        <div style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 209, 255, 0.1)',
                            border: '2px solid #00D1FF',
                            borderRadius: 20,
                            padding: 40,
                            textAlign: 'center',
                            transform: `translateY(${interpolate(spring({ frame: frame - 120, fps }), [0, 1], [30, 0])}px)`,
                            opacity: spring({ frame: frame - 120, fps })
                        }}>
                            <Network size={80} color="#00D1FF" style={{ margin: '0 auto 20px' }} />
                            <div style={{ fontSize: 35, fontWeight: 800 }}>Cisco Packet Tracer</div>
                        </div>

                        <div style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 51, 0, 0.1)',
                            border: '2px solid #FF3300',
                            borderRadius: 20,
                            padding: 40,
                            textAlign: 'center',
                            transform: `translateY(${interpolate(spring({ frame: frame - 160, fps }), [0, 1], [30, 0])}px)`,
                            opacity: spring({ frame: frame - 160, fps })
                        }}>
                            <Zap size={80} color="#FF3300" style={{ margin: '0 auto 20px' }} />
                            <div style={{ fontSize: 35, fontWeight: 800 }}>TryHackMe</div>
                            <div style={{ fontSize: 25, color: '#aaa', marginTop: 10 }}>(Networking Paths)</div>
                        </div>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 3: Action Steps */}
            <AbsoluteFill style={{ opacity: opacity3 }}>
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
                    <div style={{ fontSize: 45, fontWeight: 700, color: '#00FFCC', marginBottom: 40 }}>قم بتجارب بسيطة:</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, width: '100%' }}>
                        {[
                            { label: "اربط جهازين", Icon: Link },
                            { label: "غيّر IP", Icon: Edit3 },
                            { label: "جرّب Ping", Icon: Activity },
                            { label: "راقب النتائج", Icon: Eye }
                        ].map(({ label, Icon }, i) => (
                            <div key={i} style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                padding: 30,
                                borderRadius: 15,
                                fontSize: 35,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                opacity: spring({ frame: frame - (380 + i * 40), fps }),
                                transform: `translateY(${interpolate(spring({ frame: frame - (380 + i * 40), fps }), [0, 1], [20, 0])}px)`,
                            }}>
                                <Icon color="#00FFCC" />
                                {label}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, opacity: spring({ frame: frame - 550, fps }) }}>
                        <Terminal size={100} color="#666" />
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
