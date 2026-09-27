import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    spring,
} from 'remotion';
import { Play, CheckCircle2, XCircle } from 'lucide-react';

export const NetworkingOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings
    const opacity1 = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity2 = interpolate(frame, [150, 170, 280, 300], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const entry1 = spring({ frame: frame - 10, fps });
    const entry2 = spring({ frame: frame - 160, fps, config: { damping: 12, stiffness: 100 } });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            <AbsoluteFill style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            {/* Part 1: Not by watching */}
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
                    <div style={{ position: 'relative', marginBottom: 60 }}>
                        <Play size={120} color="#666" />
                        <XCircle size={60} color="#FF3300" style={{ position: 'absolute', top: -10, right: -10 }} />
                    </div>
                    <div style={{
                        fontSize: 65,
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        transform: `scale(${interpolate(entry1, [0, 1], [0.95, 1])})`,
                    }}>
                        الشبكات لا تُفهم بالمشاهدة <span style={{ color: '#FF3300' }}>فقط…</span>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Part 2: But by experience */}
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
                    <div style={{
                        fontSize: 120,
                        fontWeight: 900,
                        color: '#00FFCC',
                        textAlign: 'center',
                        transform: `scale(${interpolate(entry2, [0, 1], [0.5, 1])})`,
                        textShadow: '0 0 50px rgba(0,255,204,0.5)',
                    }}>
                        بل بالتجربة.
                    </div>
                    <div style={{ marginTop: 60 }}>
                        <CheckCircle2 size={100} color="#00FFCC" style={{ opacity: entry2 }} />
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
