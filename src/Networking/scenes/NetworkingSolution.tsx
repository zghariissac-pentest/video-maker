import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
    staticFile,
    Img
} from 'remotion';
import { Laptop, Server, Info, Map as MapIcon, Activity, Eye } from 'lucide-react';

export const NetworkingSolution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fades
    const opacity1 = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity2 = interpolate(frame, [120, 140, 380, 400], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity3 = interpolate(frame, [400, 420, 630, 650], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity4 = interpolate(frame, [650, 670, 830, 850], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity5 = interpolate(frame, [850, 870, 980, 1000], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // HTTP Flow Progress
    const progress = interpolate(frame, [150, 350], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const isReturning = progress > 0.5;

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            {/* Part 1: The Solution Headline */}
            <AbsoluteFill style={{ opacity: opacity1 }}>
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
                    <div style={{ fontSize: 75, fontWeight: 900, color: '#00FFCC', textAlign: 'center', textShadow: '0 0 30px rgba(0,255,204,0.3)' }}>
                        الحل (الطريقة التي تجعل الأمور تتضح):
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 2: HTTP Flow */}
            <AbsoluteFill style={{ opacity: opacity2 }}>
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
                    <div style={{ fontSize: 45, fontWeight: 700, color: 'white', marginBottom: 100, textAlign: 'center' }}>
                        مثال بسيط (HTTP): عندما تفتح موقعاً:
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 150, position: 'relative', width: 800 }}>
                        {/* Device */}
                        <div style={{ textAlign: 'center', zIndex: 2 }}>
                            <Laptop size={120} color={isReturning ? 'white' : '#00D1FF'} />
                            <div style={{ marginTop: 20 }}>جهازك</div>
                        </div>

                        {/* Network Line */}
                        <div style={{ flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                            {/* Packet Positioning Correction */}
                            <div style={{
                                position: 'absolute',
                                left: isReturning ? interpolate(progress, [0.5, 1], [350, 0]) : interpolate(progress, [0, 0.5], [0, 350]),
                                top: -13,
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                backgroundColor: isReturning ? '#00FFCC' : '#00D1FF',
                                boxShadow: isReturning ? '0 0 20px #00FFCC' : '0 0 20px #00D1FF',
                                opacity: progress > 0.05 && progress < 0.95 ? 1 : 0,
                            }} />
                        </div>

                        {/* Server */}
                        <div style={{ textAlign: 'center', zIndex: 2 }}>
                            <Server size={120} color={progress > 0.45 && progress < 0.55 ? '#00FFCC' : 'white'} />
                            <div style={{ marginTop: 20 }}>السيرفر</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 80, fontSize: 40, color: '#aaa', display: 'flex', gap: 40 }}>
                        <div style={{ opacity: progress > 0.1 ? 1 : 0 }}>Request</div>
                        <div style={{ opacity: progress > 0.5 ? 1 : 0 }}>Response</div>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 3: Wireshark Switch */}
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
                    <div style={{ fontSize: 45, fontWeight: 700, color: 'white', marginBottom: 60, textAlign: 'center' }}>
                        بدلاً من تخيل هذا فقط… افتح أداة مثل:
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Img src={staticFile("wireshark.svg")} style={{ width: 250, marginBottom: 40 }} />
                        <div style={{ fontSize: 80, fontWeight: 900, color: '#1679A7' }}>Wireshark</div>
                    </div>

                    <div style={{ marginTop: 60, fontSize: 40, color: '#00FFCC', textAlign: 'center' }}>
                        وشاهد الحزم (Packets) بنفسك
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 4: Seeing the data */}
            <AbsoluteFill style={{ opacity: opacity4 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    padding: '0 100px'
                }}>
                    <div style={{ fontSize: 50, color: 'white', marginBottom: 60 }}>سترى بوضوح:</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%' }}>
                        {[
                            { label: "العناوين (IP)", color: "#00D1FF", Icon: MapIcon },
                            { label: "البروتوكولات (HTTP, TCP...)", color: "#00FFCC", Icon: Info },
                            { label: "الطلب والاستجابة (Payload)", color: "#FFCC00", Icon: Activity }
                        ].map(({ label, color, Icon }, i) => (
                            <div key={i} style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                padding: '30px 40px',
                                borderRadius: 15,
                                borderRight: `8px solid ${color}`,
                                fontSize: 45,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 30,
                                opacity: spring({ frame: frame - (670 + i * 40), fps }),
                                transform: `translateX(${interpolate(spring({ frame: frame - (670 + i * 40), fps }), [0, 1], [50, 0])}px)`
                            }}>
                                <Icon size={50} color={color} />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 5: Final Clarity */}
            <AbsoluteFill style={{ opacity: opacity5 }}>
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
                    <Eye size={150} color="#00FFCC" style={{ marginBottom: 60 }} />
                    <div style={{ fontSize: 90, fontWeight: 900, color: 'white', textAlign: 'center' }}>
                        وهنا تبدأ الصورة <br />
                        <span style={{ color: '#00D1FF', fontSize: 120 }}>بالوضوح.</span>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
