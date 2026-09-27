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
import { Brain, Search, Sparkles } from 'lucide-react';

export const Scene5_Ending: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const appear2 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
    const sparklesOp = interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.8]);

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={150} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                zIndex: 10,
                padding: '0 40px'
            }}>

                {/* Central Iconry */}
                <div style={{
                    position: 'relative',
                    marginBottom: 80,
                    opacity: appear1,
                    transform: `scale(${interpolate(appear1, [0, 1], [0.8, 1])})`,
                }}>
                    <div style={{
                        width: 220, height: 220, borderRadius: '60px',
                        background: `${COLORS.primary}10`, border: `2px solid ${COLORS.primary}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 100px ${COLORS.primary}20, inset 0 0 40px ${COLORS.primary}10`,
                        transform: `rotate(${Math.sin(frame / 40) * 5}deg)`,
                    }}>
                        <Brain size={120} color={COLORS.primary} />
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: -30,
                        right: -30,
                        width: 120, height: 120, borderRadius: '35px',
                        background: `${COLORS.accent}15`, border: `2px solid ${COLORS.accent}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 15px 40px rgba(0,0,0,0.4)`,
                        opacity: appear2,
                        transform: `scale(${interpolate(appear2, [0, 1], [0.5, 1])}) rotate(${Math.cos(frame / 35) * 8}deg)`,
                    }}>
                        <Search size={60} color={COLORS.accent} />
                    </div>

                    <div style={{
                        position: 'absolute',
                        top: -40,
                        left: -40,
                        opacity: sparklesOp * appear1,
                    }}>
                        <Sparkles size={60} color={COLORS.accent} />
                    </div>
                </div>

                {/* Text Section */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontSize: 65,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        direction: 'rtl',
                        margin: '0 0 30px 0',
                        opacity: appear1,
                        transform: `translateY(${interpolate(appear1, [0, 1], [30, 0])}px)`,
                        textShadow: `0 0 30px ${COLORS.primary}40`,
                    }}>
                        لذلك دائماً <span style={{ color: COLORS.primary }}>ابدأ بفهم النظام…</span>
                    </p>

                    <p style={{
                        fontSize: 55,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        direction: 'rtl',
                        margin: 0,
                        opacity: appear2,
                        transform: `translateY(${interpolate(appear2, [0, 1], [30, 0])}px)`,
                        textShadow: `0 0 30px ${COLORS.accent}30`,
                    }}>
                        ثم فكر كيف <span style={{ color: COLORS.accent }}>تختبره.</span>
                    </p>
                </div>

                {/* Final Glow Border */}
                <div style={{
                    position: 'absolute',
                    inset: 40,
                    border: `1px solid rgba(255,255,255,0.05)`,
                    borderRadius: '40px',
                    pointerEvents: 'none',
                    opacity: interpolate(frame, [0, 60], [0, 1]),
                }} />

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
