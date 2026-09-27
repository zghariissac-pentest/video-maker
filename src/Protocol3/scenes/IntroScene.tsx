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
const WINDOWS_ICON = "assets/distros/windows-real.png";

const PRIMARY = '#00BDF2';
const ACCENT = '#ff0055';

// ─── PARTICLE LOGIC ──────────────────────────────────────────
const PARTICLE_COUNT = 80;
const PARTICLE_ANGLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => (i / PARTICLE_COUNT) * Math.PI * 2);
const PARTICLE_SPEEDS = Array.from({ length: PARTICLE_COUNT }, () => 0.4 + Math.random() * 2.8);

export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ─── KATANA ZERO TIMING ──────────────────────────────────────
    const startRun = 0;
    const runEnd = 40;
    const dashStart = 45;
    const impactFrame = 49; // Snap point

    // HITSTOP: 4-frame time freeze on the moment of impact
    const isHitstop = frame >= impactFrame && frame < impactFrame + 4;
    const effectiveFrame = isHitstop ? impactFrame : (frame > impactFrame + 4 ? frame - 4 : frame);

    // ─── RUNNING PHASE (0-40) ────────────────────────────────────
    const runCycle = effectiveFrame / 10;
    const runBounce = -Math.abs(Math.sin(runCycle * Math.PI)) * 20;
    const runX = interpolate(effectiveFrame, [startRun, runEnd], [-width / 2 - 300, -150], { extrapolateRight: 'clamp' });
    const runLean = 8; // degrees

    // ─── DASH STRIKE (40-49) ─────────────────────────────────────
    const dashProg = interpolate(effectiveFrame, [dashStart, impactFrame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const easeDash = dashProg * dashProg;
    const dashX = interpolate(easeDash, [0, 1], [-150, 400]);

    // ─── RECOIL & SKID (49-100) ──────────────────────────────────
    const recoilSpring = spring({
        frame: effectiveFrame - impactFrame,
        fps,
        config: { damping: 15, stiffness: 60 },
    });
    const skidX = interpolate(recoilSpring, [0, 1], [400, 550]);
    const skidRot = interpolate(recoilSpring, [0, 1], [30, -5]);

    // ─── DYNAMIC TRANSFORMS ──────────────────────────────────────
    let x = runX;
    let y = runBounce;
    let rot = runLean;
    let scaX = 1;
    let scaY = 1;

    if (effectiveFrame >= runEnd && effectiveFrame < dashStart) {
        // Windup Crouch
        const windProgress = spring({ frame: effectiveFrame - runEnd, fps });
        x = interpolate(windProgress, [0, 1], [-150, -200]);
        scaY = interpolate(windProgress, [0, 1], [1, 0.8]);
        rot = interpolate(windProgress, [0, 1], [8, -5]);
    } else if (effectiveFrame >= dashStart && effectiveFrame < impactFrame) {
        // Dash Snap
        x = dashX;
        y = 0;
        rot = 45;
        scaX = 1.8; // Stretch for speed
        scaY = 0.6;
    } else if (effectiveFrame >= impactFrame) {
        // Recoil slide
        x = skidX;
        y = 0;
        rot = skidRot;
        scaX = interpolate(recoilSpring, [0, 0.4, 1], [1.8, 0.8, 1]);
        scaY = interpolate(recoilSpring, [0, 0.4, 1], [0.6, 1.2, 1]);
    }

    // ─── IMPACT FEEDBACK ─────────────────────────────────────────
    const shake = (effectiveFrame >= impactFrame && effectiveFrame < impactFrame + 20)
        ? Math.sin(effectiveFrame * 5) * 35
        : 0;

    return (
        <AbsoluteFill style={{
            backgroundColor: '#000',
            overflow: 'hidden',
            filter: isHitstop ? 'invert(1) contrast(2)' : 'none'
        }}>
            {/* Background Atmosphere */}
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 50%, #001e30 0%, #000 100%)` }} />

            <div style={{ position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)` }}>

                {/* Windows Icon Target */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)`,
                    opacity: effectiveFrame > impactFrame + 30 ? interpolate(effectiveFrame, [impactFrame + 30, impactFrame + 50], [1, 0]) : 1,
                }}>
                    {/* The Shield */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', width: 500, height: 500,
                        border: `4px solid ${PRIMARY}`, borderRadius: '50%',
                        transform: `translate(-50%, -50%)`,
                        opacity: effectiveFrame < impactFrame ? 1 : 0,
                        boxShadow: `0 0 60px ${PRIMARY}, inset 0 0 60px ${PRIMARY}`,
                    }} />

                    {/* The Windows Icon */}
                    <img src={staticFile(WINDOWS_ICON)} style={{
                        width: 350, height: 350,
                        filter: `drop-shadow(0 0 40px ${PRIMARY}) ${effectiveFrame === impactFrame ? 'brightness(10)' : ''}`
                    }} />

                    {/* Exploding Shards on Impact */}
                    {effectiveFrame >= impactFrame && PARTICLE_ANGLES.map((angle, i) => {
                        const t = (effectiveFrame - impactFrame) / 40;
                        if (t > 1) return null;
                        const dist = t * PARTICLE_SPEEDS[i] * 1600;
                        const gravity = (t * t) * 0.25;
                        return (
                            <div key={i} style={{
                                position: 'absolute', top: '50%', left: '50%', width: 14, height: 4,
                                background: i % 2 === 0 ? '#fff' : PRIMARY,
                                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px) rotate(${angle * 100}deg)`,
                                opacity: 1 - t, boxShadow: `0 0 20px ${PRIMARY}`,
                            }} />
                        );
                    })}
                </div>

                {/* Katana Zero Ghost Trails */}
                {(effectiveFrame >= dashStart || effectiveFrame >= impactFrame) && [1, 2, 3].map(i => {
                    const f = effectiveFrame - i * 2;
                    if (f < dashStart) return null;
                    const p = interpolate(f, [dashStart, impactFrame], [0, 1], { extrapolateRight: 'clamp' });
                    const tx = f < impactFrame ? interpolate(p * p, [0, 1], [-200, 400]) : interpolate(spring({ frame: f - impactFrame, fps }), [0, 1], [400, 550]);
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: `translate(-50%, -50%) translate(${tx}px, 0) scale(1.6, 0.7) rotate(45deg)`,
                            opacity: 0.2 / i, filter: 'sepia(1) hue-rotate(180deg) saturate(10) blur(4px)',
                        }}>
                            <img src={staticFile(CHARACTER_IMG)} style={{ width: 650, height: 650 }} />
                        </div>
                    );
                })}

                {/* Main Character (The Agent) */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scaX}, ${scaY})`,
                    zIndex: 20, filter: effectiveFrame === impactFrame ? 'brightness(20)' : 'none',
                }}>
                    <img src={staticFile(CHARACTER_IMG)} style={{ width: 650, height: 650 }} />
                </div>
            </div>

            {/* Cinematic Scanlines */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px', opacity: 0.1,
            }} />

            {/* Arabic Captions Fade In After Impact */}
            <div style={{
                position: 'absolute', bottom: '15%', width: '100%', textAlign: 'center',
                opacity: interpolate(effectiveFrame, [impactFrame + 10, impactFrame + 30], [0, 1], { extrapolateLeft: 'clamp' }),
                transform: `translateY(${interpolate(effectiveFrame, [impactFrame + 10, impactFrame + 30], [40, 0], { extrapolateLeft: 'clamp' })}px)`,
            }}>
                <h2 style={{
                    color: 'white', fontSize: '55px', fontFamily: 'Cairo, sans-serif', fontWeight: 950,
                    textShadow: `0 0 30px ${PRIMARY}`, direction: 'rtl', margin: 0,
                }}>
                    لنخترق بروتوكولات Windows — الحلقة الثالثة.
                </h2>
                <div style={{
                    width: interpolate(effectiveFrame, [impactFrame + 10, impactFrame + 30], [0, 900], { extrapolateLeft: 'clamp' }), height: 6,
                    background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                    margin: '15px auto 0', boxShadow: `0 0 25px ${PRIMARY}`,
                }} />
            </div>

            {/* Title HUD */}
            <div style={{
                position: 'absolute', top: '10%', left: '50%',
                transform: `translateX(-50%)`,
                opacity: interpolate(effectiveFrame, [impactFrame + 5, impactFrame + 25], [0, 1], { extrapolateLeft: 'clamp' }),
            }}>
                <h1 style={{ fontSize: '115px', color: 'white', fontWeight: 950, fontFamily: 'Cairo, sans-serif', textShadow: `0 0 50px ${ACCENT}`, margin: 0, fontStyle: 'italic' }}>
                    PROTOCOL 3
                </h1>
            </div>
        </AbsoluteFill>
    );
};
