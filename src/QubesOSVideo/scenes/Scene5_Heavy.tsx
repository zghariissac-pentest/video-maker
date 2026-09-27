import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Monitor, Cpu, AlertTriangle, Loader } from 'lucide-react';

export const Scene5_Heavy: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Laptop Appearance
    const pcAppear = spring({
        frame: frame - 20,
        fps,
        config: { damping: 14 }
    });

    // Loading State
    const loadingSpin = (frame / 3) % 360;
    const isError = frame > 120;
    const errorAppear = spring({
        frame: frame - 120,
        fps,
        config: { damping: 12, stiffness: 200 }
    });

    // Sluggish effect (Jittery movement for the PC)
    const jitterX = (!isError && frame > 40) ? (Math.random() - 0.5) * 4 : 0;
    const jitterY = (!isError && frame > 40) ? (Math.random() - 0.5) * 4 : 0;

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                <SpaceBg />
                <StarField count={50} />
            </div>

            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 80,
            }}>
                {/* Visual: Weak PC struggling */}
                <div style={{
                    position: 'relative',
                    width: 400,
                    height: 300,
                    opacity: pcAppear,
                    transform: `scale(${pcAppear}) translate(${jitterX}px, ${jitterY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '30px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}>
                    {!isError ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                            <Monitor size={100} color="white" opacity={0.5} />
                            <div style={{ transform: `rotate(${loadingSpin}deg)`, color: COLORS.primary }}>
                                <Loader size={40} />
                            </div>
                            <span style={{ fontSize: 20, color: 'white', opacity: 0.6, fontFamily: 'monospace' }}>LOADING QUBES...</span>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 20,
                            opacity: errorAppear,
                            transform: `scale(${interpolate(errorAppear, [0, 1], [0.8, 1])})`,
                        }}>
                            <AlertTriangle size={120} color="#ff4d4d" style={{ filter: 'drop-shadow(0 0 20px rgba(255,77,77,0.4))' }} />
                            <div style={{
                                background: '#ff4d4d22',
                                padding: '10px 20px',
                                border: '1px solid #ff4d4d',
                                borderRadius: '10px',
                                color: '#ff4d4d',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                fontSize: 22,
                            }}>OUT OF MEMORY</div>
                        </div>
                    )}

                    {/* Hardware specs floating around */}
                    <div style={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        opacity: 0.3,
                    }}>
                        <Cpu size={24} color="white" />
                        <span style={{ color: 'white', fontSize: 18 }}>i3 / 4GB RAM</span>
                    </div>
                </div>

                {/* Arabic Text (Corrected & Fixed position) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 25,
                    direction: 'rtl',
                    textAlign: 'center',
                    padding: '0 60px',
                }}>
                    <div style={{
                        opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 44,
                            fontWeight: 700,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            lineHeight: 1.4,
                            margin: 0,
                        }}>
                            لكن الحقيقة؟ هذه القوة تأتي <span style={{ color: COLORS.secondary }}>بسعر</span>:
                        </p>
                    </div>

                    <div style={{
                        opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 40,
                            fontWeight: 600,
                            fontFamily: 'Cairo, sans-serif',
                            color: 'white',
                            opacity: 0.9,
                            margin: 0,
                            lineHeight: 1.3,
                        }}>
                            Qubes ثقيل، يحتاج <span style={{ color: COLORS.secondary, fontWeight: 900 }}>RAM كبير</span>، وتجهيزات قوية.
                        </p>
                    </div>

                    <div style={{
                        opacity: interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 55,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: '#ff4d4d',
                            margin: 0,
                            textShadow: '0 0 20px rgba(255,77,77,0.3)',
                        }}>
                            لذلك… ليس للجميع.
                        </p>
                    </div>
                </div>
            </AbsoluteFill>

            <Vignette />
        </AbsoluteFill>
    );
};
