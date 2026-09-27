import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';

const CHARACTER_IMG = "assets/reaper.png";

const PRIMARY = '#00f2ff'; // Cyan
const ACCENT = '#ff0077';  // Pink/Magenta

// ─── PARTICLE LOGIC ──────────────────────────────────────────
const PARTICLE_COUNT = 40;
const PARTICLE_ANGLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => (i / PARTICLE_COUNT) * Math.PI * 2);
const PARTICLE_SPEEDS = Array.from({ length: PARTICLE_COUNT }, () => 0.4 + Math.random() * 2.5);

const GlitchPortal: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
    if (!active) return null;
    const t = frame % 30;
    const scale = interpolate(t, [0, 5, 25, 30], [0, 1.2, 1, 0], { extrapolateRight: 'clamp' });
    const opacity = interpolate(t, [0, 5, 25, 30], [0, 1, 1, 0]);

    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 500, height: 10,
            background: `linear-gradient(90deg, transparent, ${PRIMARY}, #fff, ${PRIMARY}, transparent)`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            boxShadow: `0 0 40px ${PRIMARY}, 0 0 100px ${PRIMARY}`,
            opacity, zIndex: 5,
        }} />
    );
};

const RGBSplit: React.FC<{ frame: number; active: boolean; children: React.ReactNode }> = ({ frame, active, children }) => {
    if (!active) return <>{children}</>;
    const drift = Math.sin(frame * 0.8) * 8;

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', opacity: 0.5, color: 'red', transform: `translateX(${-drift}px)`, zIndex: 1, filter: 'hue-rotate(0deg)' }}>{children}</div>
            <div style={{ position: 'absolute', opacity: 0.5, color: 'blue', transform: `translateX(${drift}px)`, zIndex: 1, filter: 'hue-rotate(240deg)' }}>{children}</div>
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </div>
    );
};

export const TryScene1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // TIMING
    const portalFrame = 20;
    const jumpFrame = 25;
    const landFrame = 45;

    // Portal Logic
    const portalActive = frame >= portalFrame && frame < landFrame;

    // Character Physics (Jump & Land)
    const jumpProgress = spring({
        frame: frame - jumpFrame,
        fps,
        config: { damping: 10, stiffness: 120 },
    });

    // Secondary Motion (Simulated breathing/momentum)
    const breathe = Math.sin(frame / 12) * 5;
    const tilt = Math.cos(frame / 15) * 2;

    // Calculations
    const charOpacity = interpolate(frame, [jumpFrame, jumpFrame + 5], [0, 1]);
    const charX = interpolate(jumpProgress, [0, 1], [-200, 0]);
    const charY = interpolate(Math.abs(Math.sin(jumpProgress * Math.PI)), [0, 1], [0, -200]);

    // Squash & Stretch
    const isLanding = frame >= landFrame && frame < landFrame + 10;
    const scaleY = isLanding ? interpolate(frame, [landFrame, landFrame + 5, landFrame + 10], [1, 0.7, 1], { extrapolateRight: 'clamp' }) : 1;
    const scaleX = isLanding ? interpolate(frame, [landFrame, landFrame + 5, landFrame + 10], [1, 1.3, 1], { extrapolateRight: 'clamp' }) : 1;

    // Glitch Toggles
    const isGlitching = (frame > 10 && frame < 20) || (frame > 44 && frame < 48) || (frame > 70 && frame < 75);

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
            {/* Background Atmosphere */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 50% 50%, #0a0a20 0%, #000 100%)`,
            }} />

            {/* Portal Interaction */}
            <GlitchPortal frame={frame} active={portalActive} />

            {/* Main Stage */}
            <div style={{
                position: 'absolute', inset: 0,
                transform: isLanding ? `translateY(${Math.sin(frame * 2) * 10}px)` : 'none'
            }}>
                {/* Character */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: `translate(-50%, -50%) translate(${charX}px, ${charY + breathe}px) rotate(${tilt}deg) scale(${scaleX}, ${scaleY})`,
                    opacity: charOpacity,
                    zIndex: 10,
                }}>
                    <RGBSplit frame={frame} active={isGlitching}>
                        <img
                            src={staticFile(CHARACTER_IMG)}
                            style={{
                                width: 600, height: 600,
                                filter: isGlitching ? 'brightness(2) contrast(1.5)' : `drop-shadow(0 0 50px ${PRIMARY}66)`,
                            }}
                        />
                    </RGBSplit>
                </div>

                {/* Impact Particles (on landFrame) */}
                {frame >= landFrame && PARTICLE_ANGLES.map((angle, i) => {
                    const t = (frame - landFrame) / 30;
                    if (t > 1) return null;
                    const dist = t * PARTICLE_SPEEDS[i] * 1200;
                    const op = interpolate(t, [0, 0.5, 1], [1, 1, 0]);
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%', width: 10, height: 10,
                            background: i % 2 === 0 ? PRIMARY : ACCENT, borderRadius: '50%',
                            transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
                            opacity: op, boxShadow: `0 0 10px ${PRIMARY}`,
                        }} />
                    );
                })}
            </div>

            {/* Text Experiment */}
            <div style={{
                position: 'absolute', bottom: '15%', width: '100%', textAlign: 'center',
                opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp' }),
            }}>
                <h1 style={{
                    color: '#fff', fontSize: '140px', fontFamily: 'Cairo, sans-serif', fontWeight: 950,
                    textShadow: `0 0 40px ${PRIMARY}`, margin: 0, letterSpacing: '10px',
                    transform: `skewX(${isGlitching ? 20 : 0}deg)`,
                }}>
                    EXPERIMENTAL
                </h1>
                <div style={{
                    width: 500, height: 4, background: PRIMARY, margin: '10px auto',
                    boxShadow: `0 0 20px ${PRIMARY}`,
                }} />
            </div>

            {/* Scanline Overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 50%)',
                backgroundSize: '100% 4px', opacity: 0.2,
            }} />
        </AbsoluteFill>
    );
};
