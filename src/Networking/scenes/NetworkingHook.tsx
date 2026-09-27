import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Network, Shield, Globe, Lock, Server, Wifi, Cpu, Database, Activity, Terminal } from 'lucide-react';

export const NetworkingHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const line1 = "لماذا لا تفهم الشبكات…";
    const line2 = "حتى بعد كل هذه الكورسات؟";

    // Text Smooth Entrance (Fixed feel)
    const textEntry1 = spring({
        frame: frame - 10,
        fps,
        config: { damping: 20, stiffness: 60 },
    });

    const textEntry2 = spring({
        frame: frame - 150,
        fps,
        config: { damping: 20, stiffness: 60 },
    });

    // Text Fades
    const opacity1 = interpolate(frame, [15, 30, 135, 145], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity2 = interpolate(frame, [155, 175, 280, 295], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Technical Background Icons
    const icons = [
        { Icon: Network, top: '15%', left: '8%', color: '#00D1FF' },
        { Icon: Shield, top: '10%', right: '12%', color: '#00FFCC' },
        { Icon: Globe, bottom: '15%', right: '10%', color: '#FF9900' },
        { Icon: Server, bottom: '10%', left: '12%', color: '#00D1FF' },
        { Icon: Terminal, top: '40%', left: '5%', color: '#ffffff' },
        { Icon: Activity, bottom: '40%', right: '5%', color: '#00FFCC' },
        { Icon: Database, top: '60%', right: '8%', color: '#00D1FF' },
        { Icon: Cpu, bottom: '60%', left: '8%', color: '#FF9900' },
        { Icon: Lock, top: '25%', right: '5%', color: '#FF3300' },
        { Icon: Wifi, bottom: '30%', left: '5%', color: '#00FFCC' },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
            {/* Clean Tech Grid (CSS) */}
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                opacity: 0.5,
            }} />

            {/* Decorative Lines */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(0, 209, 255, 0.2), transparent)',
                transform: 'translateY(-50%)',
            }} />

            {/* Structured Technical Icons */}
            {icons.map(({ Icon, top, left, right, bottom, color }: any, i) => {
                const float = Math.sin(frame / 30 + i) * 10;
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top, left, right, bottom,
                            opacity: 0.15,
                            transform: `translateY(${float}px)`,
                            color,
                            filter: `drop-shadow(0 0 10px ${color}44)`,
                        }}
                    >
                        <Icon size={50} strokeWidth={1} />
                    </div>
                );
            })}

            {/* Main Clean Text Area */}
            <AbsoluteFill style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                padding: '0 100px',
            }}>
                {/* Fixed Clean Line 1 */}
                <div style={{
                    position: 'absolute',
                    opacity: opacity1,
                    transform: `translateY(${interpolate(textEntry1, [0, 1], [20, 0])}px)`,
                    fontSize: 85,
                    fontWeight: 900,
                    color: 'white',
                    textAlign: 'center',
                    textShadow: '0 0 30px rgba(0,0,0,1), 0 0 10px rgba(255,255,255,0.1)',
                }}>
                    {line1}
                </div>

                {/* Fixed Clean Line 2 */}
                <div style={{
                    position: 'absolute',
                    opacity: opacity2,
                    transform: `translateY(${interpolate(textEntry2, [0, 1], [20, 0])}px)`,
                    fontSize: 75,
                    fontWeight: 800,
                    color: '#00D1FF',
                    textAlign: 'center',
                    textShadow: '0 0 30px rgba(0,0,0,1), 0 0 15px rgba(0,209,255,0.2)',
                }}>
                    {line2}
                </div>
            </AbsoluteFill>

            {/* Subtle Vignette */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};


