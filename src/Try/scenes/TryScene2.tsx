import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';

const CHARACTER_IMG = "assets/gif3.gif";
const WINDOWS_ICON = "assets/distros/windows-real.png";

const PRIMARY = '#00f2ff';
const ACCENT = '#ff0077';

// ─── PARTICLE LOGIC ──────────────────────────────────────────
const PARTICLE_COUNT = 60;
const PARTICLE_ANGLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => (i / PARTICLE_COUNT) * Math.PI * 2);
const PARTICLE_SPEEDS = Array.from({ length: PARTICLE_COUNT }, () => 0.5 + Math.random() * 3);

export const TryScene2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    // ─── TIMING PHASES ──────────────────────────────────────────
    const runEnd = 40;
    const strikeEnd = 52;

    // ─── PHYSICS CALCULATIONS ──────────────────────────────────

    // 1. RUNNING PHASE (0-40)
    // Bobbing and leaning
    const runBob = Math.sin(frame * 0.5) * 15;
    const runLean = 8; // degrees
    const runX = interpolate(frame, [0, runEnd], [-width / 2, -100]);

    // 2. DASH STRIKE PHASE (40-52)
    const dashProgress = interpolate(frame, [runEnd, strikeEnd], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const dashEase = dashProgress * dashProgress * dashProgress; // Fast snap
    const strikeX = interpolate(dashEase, [0, 1], [-100, 250]);
    const strikeStretch = interpolate(dashProgress, [0, 0.5, 1], [1, 1.6, 1.2]);

    // 3. IMPACT & RECOIL (52-65)
    const impactFrame = strikeEnd;
    const recoilProgress = spring({
        frame: frame - impactFrame,
        fps,
        config: { damping: 10, stiffness: 60 },
    });
    const recoilX = interpolate(recoilProgress, [0, 1], [250, 150]);
    const recoilSquashX = interpolate(recoilProgress, [0, 0.5, 1], [1.2, 0.7, 1]);
    const recoilSquashY = interpolate(recoilProgress, [0, 0.5, 1], [0.8, 1.3, 1]);

    // ─── FINAL TRANSFORM ───────────────────────────────────────
    let charX = runX;
    let charY = runBob;
    let charRot = runLean;
    let charScaleX = 1;
    let charScaleY = 1;

    if (frame >= runEnd && frame < strikeEnd) {
        charX = strikeX;
        charScaleX = strikeStretch;
        charRot = 25; // Aggressive forward tilt
    } else if (frame >= strikeEnd) {
        charX = recoilX;
        charScaleX = recoilSquashX;
        charScaleY = recoilSquashY;
        charRot = interpolate(recoilProgress, [0, 1], [25, -10]); // Snap back
    }

    // Camera Shake
    const shake = (frame >= impactFrame && frame < impactFrame + 15)
        ? Math.sin(frame * 3) * 25
        : 0;
    const flash = frame === impactFrame ? 1 : frame === impactFrame + 1 ? 0.6 : 0;

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
            {/* Impact Flash */}
            <div style={{ position: 'absolute', inset: 0, background: 'white', opacity: flash, zIndex: 100 }} />

            {/* Stage Container (with shake) */}
            <div style={{
                position: 'absolute', inset: 0,
                transform: `translate(${shake}px, ${shake * 0.5}px)`
            }}>
                {/* Visual Target (Windows Icon) */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(250px, -50%)' }}>

                    {/* The Windows Icon */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: `translate(-50%, -50%) scale(${frame >= impactFrame ? interpolate(frame, [impactFrame, impactFrame + 10], [1, 1.5]) : 1})`,
                        opacity: frame < impactFrame ? 1 : interpolate(frame, [impactFrame, impactFrame + 15], [1, 0]),
                        filter: frame === impactFrame ? 'brightness(10)' : 'none',
                    }}>
                        <img
                            src={staticFile(WINDOWS_ICON)}
                            style={{
                                width: 250, height: 250,
                                filter: `drop-shadow(0 0 40px ${PRIMARY})`
                            }}
                        />
                    </div>

                    {/* Impact Explosion */}
                    {frame >= impactFrame && PARTICLE_ANGLES.map((angle, i) => {
                        const t = (frame - impactFrame) / 40;
                        if (t > 1) return null;
                        const dist = t * PARTICLE_SPEEDS[i] * 1500;
                        const gravity = (t * t) * 0.1;
                        const op = interpolate(t, [0, 0.6, 1], [1, 1, 0]);
                        return (
                            <div key={i} style={{
                                position: 'absolute', width: 12, height: 12,
                                background: i % 2 === 0 ? PRIMARY : ACCENT,
                                borderRadius: '2px', // Shard look
                                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px) rotate(${angle * 100 + t * 50}deg)`,
                                opacity: op,
                                boxShadow: `0 0 15px ${PRIMARY}`,
                            }} />
                        );
                    })}
                    {/* Shockwave */}
                    {frame >= impactFrame && (
                        <div style={{
                            position: 'absolute', width: 800, height: 800, borderRadius: '50%',
                            border: `6px solid ${PRIMARY}`,
                            transform: `translate(-50%, -50%) scale(${interpolate(frame - impactFrame, [0, 20], [0, 1.2])})`,
                            opacity: interpolate(frame - impactFrame, [0, 5, 20], [0, 1, 0]),
                            boxShadow: `0 0 40px ${PRIMARY}`,
                        }} />
                    )}
                </div>

                {/* Ghost Trails during Strike */}
                {frame >= runEnd && frame < strikeEnd && [1, 2, 3].map(i => {
                    const f = frame - i * 1.5;
                    const p = interpolate(f, [runEnd, strikeEnd], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const gx = interpolate(p * p, [0, 1], [-100, 250]);
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: `translate(-50%, -50%) translate(${gx}px, 0) scale(1.4, 1)`,
                            opacity: 0.2 / i, filter: 'brightness(3) blur(10px)', mixBlendMode: 'screen',
                        }}>
                            <img src={staticFile(CHARACTER_IMG)} style={{ width: 650, height: 650 }} />
                        </div>
                    );
                })}

                {/* Main Character */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${charX}px, ${charY}px) rotate(${charRot}deg) scale(${charScaleX}, ${charScaleY})`,
                    zIndex: 10,
                }}>
                    <img
                        src={staticFile(CHARACTER_IMG)}
                        style={{
                            width: 650, height: 650,
                            filter: frame === impactFrame ? 'brightness(10)' : 'none',
                        }}
                    />
                </div>
            </div>

            {/* Atmospheric Grunge */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(circle at 70% 50%, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
            }} />
        </AbsoluteFill>
    );
};
