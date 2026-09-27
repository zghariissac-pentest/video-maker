import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Book, HelpCircle, Brain, XCircle, Search, Lightbulb } from 'lucide-react';

export const NetworkingProblem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const line1 = "إذا كنت درست الشبكات، وشاهدت كورسات…";
    const line2 = "وما زلت لا تفهمها فعلاً،";
    const line3 = "فالمشكلة في الطريقة التي تتعلم بها.";

    // Smooth entry for each block
    const textEntry1 = spring({ frame: frame - 10, fps, config: { damping: 20 } });
    const textEntry2 = spring({ frame: frame - 40, fps, config: { damping: 20 } });
    const textEntry3 = spring({ frame: frame - 140, fps, config: { damping: 15 } });

    // Fades
    const opacity12 = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity3 = interpolate(frame, [150, 170, 280, 300], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const icons = [
        { Icon: Book, top: '10%', left: '10%', color: '#00D1FF' },
        { Icon: HelpCircle, top: '15%', right: '15%', color: '#FF3300' },
        { Icon: Brain, bottom: '20%', right: '10%', color: '#00FFCC' },
        { Icon: XCircle, bottom: '15%', left: '15%', color: '#FF3300' },
        { Icon: Search, top: '45%', right: '5%', color: '#ffffff' },
        { Icon: Lightbulb, bottom: '40%', left: '5%', color: '#FFCC00' },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
            {/* Background Grid */}
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '50px 50px',
            }} />

            {/* Background Icons */}
            {icons.map(({ Icon, top, left, right, bottom, color }: any, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top, left, right, bottom,
                    opacity: 0.1,
                    transform: `translateY(${Math.sin(frame / 40 + i) * 10}px)`,
                    color,
                }}>
                    <Icon size={50} strokeWidth={1} />
                </div>
            ))}

            {/* Content Area */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                padding: '0 80px',
            }}>
                {/* Part 1: The Frustration */}
                <AbsoluteFill style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity12,
                }}>
                    <div style={{
                        fontSize: 60,
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 30,
                        transform: `translateY(${interpolate(textEntry1, [0, 1], [30, 0])}px)`,
                    }}>
                        {line1}
                    </div>
                    <div style={{
                        fontSize: 75,
                        fontWeight: 900,
                        color: '#FF4444',
                        textAlign: 'center',
                        transform: `translateY(${interpolate(textEntry2, [0, 1], [30, 0])}px)`,
                        textShadow: '0 0 20px rgba(255,0,0,0.3)',
                    }}>
                        {line2}
                    </div>
                </AbsoluteFill>

                {/* Part 2: The Solution / Truth */}
                <AbsoluteFill style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity3,
                }}>
                    <div style={{
                        fontSize: 80,
                        fontWeight: 900,
                        color: '#00D1FF',
                        textAlign: 'center',
                        transform: `scale(${interpolate(textEntry3, [0, 1], [0.95, 1])})`,
                        textShadow: '0 0 30px rgba(0,209,255,0.4)',
                        lineHeight: 1.4,
                    }}>
                        {line3}
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
