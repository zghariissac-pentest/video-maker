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

const PRIMARY = '#00f2ff';

// ─── UTILITIES ──────────────────────────────────────────────

const DustPuff: React.FC<{ frame: number; start: number; x: number; y: number }> = ({ frame, start, x, y }) => {
    const t = frame - start;
    if (t < 0 || t > 20) return null;
    const opacity = interpolate(t, [0, 5, 20], [0, 0.6, 0]);
    const scale = interpolate(t, [0, 20], [0.5, 2]);

    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 40, height: 30, borderRadius: '50%',
            background: `radial-gradient(circle, #fff, ${PRIMARY}00)`,
            filter: 'blur(8px)',
            opacity,
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
            zIndex: 4,
        }} />
    );
};

const SlashArc: React.FC<{ frame: number; start: number; x: number; y: number }> = ({ frame, start, x, y }) => {
    const t = frame - start;
    if (t < 0 || t > 12) return null;
    const opacity = interpolate(t, [0, 2, 12], [0, 1, 0]);
    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 1000, height: 400,
            borderTop: `60px solid #fff`,
            borderRadius: '50%',
            opacity,
            transform: `translate(-50%, -100%) translate(${x}px, ${y}px) rotate(15deg) scale(${interpolate(t, [0, 12], [0.9, 1.2])})`,
            filter: `blur(2px) drop-shadow(0 0 30px ${PRIMARY})`,
            zIndex: 15,
        }} />
    );
};

export const TryScene4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ─── PHASES ────────────────────────────────────────────────
    const runStart = 0;
    const runEnd = 50;
    const dashStart = 60;
    const impactFrame = 64;

    // ─── HITSTOP (Katana Zero style freeze) ────────────────────
    const isHitstop = frame >= impactFrame && frame < impactFrame + 4;
    const effectiveFrame = isHitstop ? impactFrame : (frame > impactFrame + 4 ? frame - 4 : frame);

    // ─── RUN PHYSICS (Sinusoidal Bobbing) ──────────────────────
    // Horizontal sway frequency = 1, Vertical bounce frequency = 2
    const runCycle = effectiveFrame / 10;
    const stepBob = -Math.abs(Math.sin(runCycle * Math.PI)) * 25; // Bounce up/down
    const stepTilt = Math.sin(runCycle * Math.PI) * 5; // Slight sway
    const currentRunX = interpolate(effectiveFrame, [runStart, runEnd], [-width / 2 - 200, 0], { extrapolateRight: 'clamp' });

    // ─── DASH PHYSICS ──────────────────────────────────────────
    const dashProg = interpolate(effectiveFrame, [dashStart, impactFrame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const easeDash = dashProg * dashProg;
    const dashX = interpolate(easeDash, [0, 1], [0, 350]);

    // ─── RECOIL & MOMENTUM ─────────────────────────────────────
    const recoilSpring = spring({
        frame: effectiveFrame - impactFrame,
        fps,
        config: { damping: 12, stiffness: 50 },
    });
    const skidX = interpolate(recoilSpring, [0, 1], [350, 500]);
    const skidTilt = interpolate(recoilSpring, [0, 1], [60, -10]);

    // ─── FINAL POSITIONING ─────────────────────────────────────
    let x = currentRunX;
    let y = stepBob;
    let rot = stepTilt + 10; // Basic forward lean
    let scaX = 1;
    let scaY = 1;

    if (effectiveFrame >= runEnd && effectiveFrame < dashStart) {
        // Windup/Anticipation
        const ant = spring({ frame: effectiveFrame - runEnd, fps });
        x = interpolate(ant, [0, 1], [0, -50]);
        y = interpolate(ant, [0, 1], [0, 40]);
        scaY = interpolate(ant, [0, 1], [1, 0.75]); // Squash
        rot = interpolate(ant, [0, 1], [10, -5]);
    } else if (effectiveFrame >= dashStart && effectiveFrame < impactFrame) {
        // High Intensity Dash
        x = dashX;
        y = 0;
        rot = 60;
        scaX = 1.8; // Extreme Stretch
        scaY = 0.6;
    } else if (effectiveFrame >= impactFrame) {
        // Recoil slide
        x = skidX;
        y = 0;
        rot = skidTilt;
        scaX = interpolate(recoilSpring, [0, 0.4, 1], [1.8, 0.8, 1]);
        scaY = interpolate(recoilSpring, [0, 0.4, 1], [0.6, 1.2, 1]);
    }

    // ─── EFFECTS ───────────────────────────────────────────────
    const shake = (effectiveFrame >= impactFrame && effectiveFrame < impactFrame + 18)
        ? Math.sin(effectiveFrame * 5) * 40
        : 0;

    return (
        <AbsoluteFill style={{
            backgroundColor: '#000',
            overflow: 'hidden',
            filter: isHitstop ? 'invert(1) contrast(2)' : 'none'
        }}>
            {/* Environment Glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 70% 50%, ${PRIMARY}11 0%, transparent 75%)`,
            }} />

            {/* Stage Transform */}
            <div style={{ position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)` }}>

                {/* Dust Puffs during Running */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <DustPuff key={i} frame={effectiveFrame} start={i * 10} x={interpolate(i * 10, [runStart, runEnd], [-width / 2 - 200, 0])} y={height / 2 + 100} />
                ))}

                <SlashArc frame={effectiveFrame} start={impactFrame} x={250} y={0} />

                {/* Katana Zero Ghost Trails */}
                {(effectiveFrame >= dashStart || effectiveFrame >= impactFrame) && [1, 2, 3, 4].map(i => {
                    const f = effectiveFrame - i * 1.5;
                    if (f < dashStart) return null;
                    const p = interpolate(f, [dashStart, impactFrame], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const tx = f < impactFrame
                        ? interpolate(p * p, [0, 1], [-50, 350])
                        : interpolate(spring({ frame: f - impactFrame, fps }), [0, 1], [350, 500]);
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: `translate(-50%, -50%) translate(${tx}px, 0) rotate(${f < impactFrame ? 60 : 30}deg) scale(1.6, 0.7)`,
                            opacity: 0.25 / i, filter: 'sepia(1) hue-rotate(180deg) saturate(10) blur(4px)',
                            zIndex: 5,
                        }}>
                            <img src={staticFile(CHARACTER_IMG)} style={{ width: 700, height: 700 }} />
                        </div>
                    );
                })}

                {/* Main Character (The Agent) */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scaX}, ${scaY})`,
                    zIndex: 20,
                    filter: isHitstop ? 'brightness(10)' : 'none',
                }}>
                    <img
                        src={staticFile(CHARACTER_IMG)}
                        style={{
                            width: 700, height: 700,
                            mixBlendMode: 'normal'
                        }}
                    />
                </div>

                {/* Impact "Katana Zero" Sparks */}
                {effectiveFrame >= impactFrame && Array.from({ length: 50 }).map((_, i) => {
                    const t = (effectiveFrame - impactFrame) / 35;
                    const angle = (i / 50) * Math.PI * 2;
                    const speed = 0.5 + (i % 8) * 0.4;
                    const dist = t * speed * 1600;
                    const gravity = (t * t) * 0.25;
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            width: 14, height: 4, background: i % 2 === 0 ? '#fff' : PRIMARY,
                            transform: `translate(-50%, -50%) translate(${350 + Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px) rotate(${angle * 180 / Math.PI + t * 200}deg)`,
                            opacity: 1 - t,
                            boxShadow: `0 0 15px ${PRIMARY}`,
                            zIndex: 10,
                        }} />
                    );
                })}
            </div>

            {/* Global Overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px', opacity: 0.1,
            }} />
        </AbsoluteFill>
    );
};
