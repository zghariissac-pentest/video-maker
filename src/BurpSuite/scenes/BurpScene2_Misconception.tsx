import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { HelpCircle } from 'lucide-react';

export const BurpScene2_Misconception: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({
        frame: frame - 10,
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
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 60px',
                zIndex: 20,
            }}>
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    opacity: appear,
                    transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        lineHeight: 1.5,
                    }}>
                        يعتقد الكثير أن <span style={{ color: '#FF6633' }}>Burp Suite</span> <br />
                        أداة <span style={{ color: '#ff4d4d', position: 'relative' }}>
                            معقدة...
                            <HelpCircle
                                size={60}
                                style={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    opacity: appear,
                                    filter: 'drop-shadow(0 0 20px rgba(255, 77, 77, 0.4))'
                                }}
                            />
                        </span>
                    </h2>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.3 * appear,
                zIndex: 1,
            }} />
        </AbsoluteFill>
    );
};
