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
    COLORS, GpsOffIcon, GlobalWarningIcon
} from '../components/LocationTheme';

export const Scene4_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={50} />
            <Vignette />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 80px',
                zIndex: 10,
            }}>
                {/* Visual: GPS Crossed out with a pulse */}
                <div style={{
                    position: 'relative',
                    marginBottom: 60,
                    transform: `scale(${appear}) translateY(${Math.sin(frame / 15) * 10}px)`,
                }}>
                    <div style={{
                        position: 'absolute',
                        width: 140, height: 140,
                        background: COLORS.red,
                        borderRadius: '50%',
                        filter: 'blur(50px)',
                        opacity: interpolate(Math.sin(frame / 10), [-1, 1], [0.1, 0.3]),
                        zIndex: -1,
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                    }} />
                    <GpsOffIcon size={180} color={COLORS.red} />
                </div>

                <h1 style={{
                    fontSize: 60,
                    fontWeight: 800,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    color: '#fff',
                    lineHeight: 1.5,
                    margin: 0,
                    opacity: interpolate(frame, [15, 30], [0, 1]),
                }}>
                    لهذا السبب، حتى إذا <span style={{ color: COLORS.red }}>أوقفت GPS</span>، <br />
                    لا يعني ذلك أنك <span style={{ color: COLORS.blue }}>غير قابل للتتبع</span> على الإنترنت.
                </h1>

                {/* Final Badge */}
                <div style={{
                    marginTop: 60,
                    padding: '25px 50px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${COLORS.red}22, transparent)`,
                    border: `1.5px solid ${COLORS.red}44`,
                    opacity: interpolate(frame, [40, 60], [0, 1]),
                    transform: `scale(${interpolate(frame, [40, 60], [0.8, 1])})`,
                    display: 'flex', alignItems: 'center', gap: 20
                }}>
                    <GlobalWarningIcon size={40} color={COLORS.red} />
                    <span style={{ color: COLORS.red, fontWeight: 900, fontSize: 40, fontFamily: 'Cairo' }}>
                        STAY ALERT
                    </span>
                </div>
            </div>

            {/* Glowing Scan Line */}
            <div style={{
                position: 'absolute',
                top: (frame * 12) % 1920,
                left: 0, right: 0,
                height: 200,
                background: `linear-gradient(to bottom, transparent, ${COLORS.red}05, transparent)`,
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};
