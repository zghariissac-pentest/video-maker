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
import { Cpu, Layout, Globe } from 'lucide-react';

const SimpleLayer: React.FC<{
    title: string;
    icon: React.ReactNode;
    color: string;
    showAt: number;
}> = ({ title, icon, color, showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 12, stiffness: 200 } // Quicker appearance
    });

    return (
        <div style={{
            opacity: appear,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            padding: '20px 40px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${color}33`,
            borderRadius: '20px',
            width: 500,
            boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${color}10`,
        }}>
            <div style={{ color }}>{icon}</div>
            <span style={{
                fontSize: 40,
                fontWeight: 800,
                color: 'white',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: 2,
            }}>{title}</span>
        </div>
    );
};

export const Scene4_Layers: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                <SpaceBg />
                <StarField count={60} />
            </div>

            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 25,
            }}>
                <SimpleLayer title="SYSTEM" icon={<Cpu size={40} />} color={COLORS.secondary} showAt={20} />
                <SimpleLayer title="APPS" icon={<Layout size={40} />} color={COLORS.primary} showAt={35} />
                <SimpleLayer title="NETWORK" icon={<Globe size={40} />} color={COLORS.accent} showAt={50} />

                {/* Arabic Text Block - Simple & Clean */}
                <div style={{
                    marginTop: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    direction: 'rtl',
                    textAlign: 'center',
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
                            Qubes يستخدم <span style={{ color: COLORS.primary }}>Xen Hypervisor</span> لعزل كل شيء.
                        </p>
                    </div>

                    <div style={{
                        opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: 'clamp' }),
                    }}>
                        <p style={{
                            fontSize: 50,
                            fontWeight: 900,
                            fontFamily: 'Cairo, sans-serif',
                            color: COLORS.accent,
                            margin: 0,
                            textShadow: `0 0 20px ${COLORS.accent}44`,
                        }}>
                            وهذا يقلل من أي فرصة للهجوم.
                        </p>
                    </div>
                </div>
            </AbsoluteFill>

            <Vignette />
        </AbsoluteFill>
    );
};
