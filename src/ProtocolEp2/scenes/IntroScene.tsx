import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';

// SWAP THIS PATH once you save your character image as assassin.png
const CHARACTER_IMG = "assets/reaper.png";
// const CHARACTER_IMG = "assets/assassin.png"; // <- use this after saving

const PRIMARY = '#00BDF2';
const ACCENT = '#ff0055';

// Pre-computed random-looking angles for determinism (no Math.random in render)
const PARTICLE_ANGLES = Array.from({ length: 50 }, (_, i) => (i / 50) * Math.PI * 2);
const PARTICLE_SIZES = [20, 16, 22, 18, 14, 24, 19, 15, 21, 17, 13, 23, 20, 16, 22, 18, 14, 24, 19, 15, 21, 17, 13, 23, 20, 16, 22, 18, 14, 24, 19, 15, 21, 17, 13, 23, 20, 16];

const ImpactExplosion: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
    const t = frame - start;
    if (t < 0 || t > 55) return null;
    const prog = t / 55; // 0 → 1

    // Shockwave ring
    const ringScale = interpolate(t, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const ringOpacity = interpolate(t, [0, 5, 30], [0, 1, 0], { extrapolateRight: 'clamp' });
    const ring2Scale = interpolate(t, [5, 40], [0, 1], { extrapolateRight: 'clamp' });
    const ring2Opacity = interpolate(t, [5, 10, 40], [0, 0.6, 0], { extrapolateRight: 'clamp' });

    // Glowing core
    const coreScale = interpolate(t, [0, 5, 20], [0, 2.5, 0], { extrapolateRight: 'clamp' });
    const coreOpacity = interpolate(t, [0, 3, 20], [0, 1, 0], { extrapolateRight: 'clamp' });

    // Spark particles (fast, spread wide then fall with gravity)
    const sparks = PARTICLE_ANGLES.map((angle, i) => {
        const speed = 0.6 + (i % 5) * 0.15; // varied speeds
        const dist = prog * speed * 900;
        const gravity = (t * t) * 0.18; // falling down naturally
        const sz = Math.max(0, PARTICLE_SIZES[i] * (1 - prog * 1.2));
        const opacity = interpolate(t, [0, 10, 55], [0, 1, 0]);
        const isWhite = i % 4 === 0;
        const isBlue = i % 4 === 1;
        const color = isWhite ? '#ffffff' : isBlue ? PRIMARY : i % 4 === 2 ? ACCENT : '#a0e8ff';
        const elongate = isDashingTime(t) ? 1 : 1;
        return { angle, dist, gravity, sz, opacity, color, elongate };
    });

    // Trailing ember particles (slower, linger)
    const embers = PARTICLE_ANGLES.filter((_, i) => i % 3 === 0).map((angle, i) => {
        const dist = prog * 0.4 * 500 + i * 10;
        const gravity = (t * t) * 0.06;
        const sz = Math.max(0, 8 * (1 - prog));
        const opacity = interpolate(t, [10, 55], [0.7, 0]);
        return { angle, dist, gravity, sz, opacity };
    });

    return (
        <>
            {/* Glowing Core */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '55%',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `radial-gradient(circle, #fff 0%, ${PRIMARY} 40%, transparent 80%)`,
                transform: `translate(-50%,-50%) scale(${coreScale})`,
                opacity: coreOpacity,
                boxShadow: `0 0 80px 40px ${PRIMARY}`,
            }} />

            {/* Shockwave Ring 1 */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '55%',
                width: 600,
                height: 600,
                borderRadius: '50%',
                border: `6px solid ${PRIMARY}`,
                transform: `translate(-50%,-50%) scale(${ringScale})`,
                opacity: ringOpacity,
                boxShadow: `0 0 30px ${PRIMARY}, inset 0 0 30px ${PRIMARY}40`,
            }} />

            {/* Shockwave Ring 2 (offset) */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '55%',
                width: 900,
                height: 900,
                borderRadius: '50%',
                border: `3px solid ${ACCENT}`,
                transform: `translate(-50%,-50%) scale(${ring2Scale})`,
                opacity: ring2Opacity,
                boxShadow: `0 0 20px ${ACCENT}`,
            }} />

            {/* Spark Particles */}
            {sparks.map(({ angle, dist, gravity, sz, opacity, color }, i) => (
                <div key={`spark-${i}`} style={{
                    position: 'absolute',
                    top: '45%',
                    left: '55%',
                    width: sz,
                    height: sz * 2, // elongated sparks
                    borderRadius: '40%',
                    background: color,
                    opacity,
                    transform: `translate(-50%,-50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px) rotate(${angle * (180 / Math.PI)}deg)`,
                    boxShadow: `0 0 10px ${color}`,
                }} />
            ))}

            {/* Ember Particles (slower floaters) */}
            {embers.map(({ angle, dist, gravity, sz, opacity }, i) => (
                <div key={`ember-${i}`} style={{
                    position: 'absolute',
                    top: '45%',
                    left: '55%',
                    width: sz,
                    height: sz,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, #fff, ${PRIMARY})`,
                    opacity,
                    transform: `translate(-50%,-50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px)`,
                    boxShadow: `0 0 8px ${PRIMARY}`,
                }} />
            ))}
        </>
    );
};

// helper for time check (used in spark calc)
function isDashingTime(_t: number) { return false; }


const Scanlines: React.FC = () => (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 99 }}>
        <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 50%)',
            backgroundSize: '100% 4px',
            opacity: 0.4,
        }} />
    </AbsoluteFill>
);

export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── TIMING ───────────────────────────────────────────────
    // Phase 1: Idle walk-in (0–20)
    // Phase 2: Jump/charge (20–35)
    // Phase 3: Air dash toward target (35–55)  ← QUICK
    // Phase 4: Stab impact + freeze (55–70)
    // Phase 5: Backstep / float (70–100)
    // Phase 6: Text entrance (95+)

    const startX = -360;
    const impactX = 40;
    const landX = -300;

    const isIdle = frame < 20;
    const isCharge = frame >= 20 && frame < 35;
    const isDashing = frame >= 35 && frame < 55;
    const isFrozen = frame >= 55 && frame < 72;
    const isBack = frame >= 72 && frame < 100;

    // POSITIONAL LOGIC
    let charX = startX;
    let charY = 0;
    let charRot = 0;
    let charScaleX = 1;
    let charScaleY = 1;

    if (isIdle) {
        charX = startX + interpolate(frame, [0, 20], [0, 30]); // Walk right slowly
        charY = -Math.abs(Math.sin(frame * 0.5)) * 10;         // Walk bob
        charRot = Math.sin(frame / 4) * 3;                      // Weapon sway
    }
    else if (isCharge) {
        // Crouch & pull back — character squashes
        const c = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 60 } });
        charX = interpolate(c, [0, 1], [startX + 30, startX - 40]);
        charY = interpolate(c, [0, 1], [0, 25]);    // Crouch down
        charRot = interpolate(c, [0, 1], [0, 15]);  // Lean back
        charScaleY = interpolate(c, [0, 1], [1, 0.82]);
        charScaleX = interpolate(c, [0, 1], [1, 1.15]);
    }
    else if (isDashing) {
        // FAST horizontal dash — quadratic snap
        const t = (frame - 35) / 20;
        const ease = t * t; // Accelerates
        charX = interpolate(ease, [0, 1], [startX - 40, impactX]);
        charY = interpolate(t, [0, 0.3, 0.7, 1], [25, -40, -25, 0]); // Arc jump
        charRot = interpolate(t, [0, 1], [15, 45]); // Rotate mid-air like a flip
        charScaleX = 1.1;
        charScaleY = 0.95;
    }
    else if (isFrozen) {
        // STAB POSE — frozen in stab position
        charX = impactX;
        charY = 0;
        charRot = 25; // Leaning forward with dagger extended
        charScaleX = 1.15; // Stretch on stab
        charScaleY = 0.85;
    }
    else if (isBack) {
        // Backstep jump
        charX = interpolate(frame, [72, 95], [impactX, landX], { extrapolateRight: 'clamp' });
        charY = -Math.abs(Math.sin(interpolate(frame, [72, 95], [0, Math.PI]))) * 80;
        charRot = Math.sin(frame / 6) * 5;
    }
    else {
        // Idle float at rest position
        charX = landX;
        charY = Math.sin(frame / 8) * 10;
        charRot = Math.sin(frame / 10) * 4;
    }

    // CAMERA
    const camShake = isFrozen ? Math.sin(frame * 9.3) * 14 : 0;
    const camZoom = isFrozen ? 1.18 : 1;

    // FLASH on stab impact
    const flashOpacity = frame === 55 ? 1 : frame === 56 ? 0.5 : 0;

    // WIN ICON
    const iconSlide = spring({ frame: frame - 0, fps, config: { damping: 16, stiffness: 200 } });
    const iconScale = interpolate(iconSlide, [0, 1], [0, 1]);
    const iconExplode = frame >= 72
        ? interpolate(frame, [72, 100], [1, 8], { extrapolateRight: 'clamp' })
        : 1;
    const iconFade = frame >= 72
        ? interpolate(frame, [72, 100], [1, 0], { extrapolateRight: 'clamp' })
        : 1;

    // TEXT
    const textIn = spring({ frame: frame - 98, fps, config: { damping: 13 } });
    const textY = interpolate(textIn, [0, 1], [40, 0]);
    const textOp = interpolate(frame, [98, 112], [0, 1], { extrapolateRight: 'clamp' });
    const subIn = spring({ frame: frame - 10, fps, config: { damping: 13 } });
    const subY = interpolate(subIn, [0, 1], [30, 0]);
    const subOp = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <Scanlines />

            {/* Flash overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'white', opacity: flashOpacity, zIndex: 100 }} />

            {/* Stage */}
            <div style={{
                position: 'absolute',
                inset: 0,
                transform: `scale(${camZoom}) translate(${camShake}px, 0)`,
            }}>
                {/* Windows icon */}
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '55%',
                    transform: `translate(-50%,-50%) scale(${iconScale * iconExplode})`,
                    opacity: iconFade,
                    filter: isFrozen ? 'brightness(12) hue-rotate(160deg)' : 'none',
                    zIndex: 3,
                }}>
                    <img src={staticFile("assets/distros/windows-real.png")} style={{ width: 320, height: 320 }} />
                </div>

                <ImpactExplosion frame={frame} start={72} />

                {/* Motion Blur ghosts during dash */}
                {isDashing && [1, 2, 3, 4].map(i => {
                    const gf = frame - i * 2;
                    const gt = Math.max(0, Math.min(1, (gf - 35) / 20));
                    const ge = gt * gt;
                    const gx = interpolate(ge, [0, 1], [startX - 40, impactX]);
                    const gy = interpolate(gt, [0, 0.3, 0.7, 1], [25, -40, -25, 0]);
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            top: '45%',
                            left: '50%',
                            transform: `translate(-50%,-50%) translate(${gx}px, ${gy}px) rotate(${interpolate(gt, [0, 1], [15, 45])}deg)`,
                            opacity: 0.12 / i,
                            filter: 'brightness(4)',
                            mixBlendMode: 'screen',
                        }}>
                            <img src={staticFile(CHARACTER_IMG)} style={{ width: 500, height: 500, imageRendering: 'pixelated' }} />
                        </div>
                    );
                })}

                {/* Main character */}
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transformOrigin: 'center bottom',
                    transform: `translate(-50%,-50%) translate(${charX}px, ${charY}px) rotate(${charRot}deg) scale(${charScaleX}, ${charScaleY})`,
                    mixBlendMode: 'screen',
                    zIndex: 10,
                }}>
                    <img
                        src={staticFile(CHARACTER_IMG)}
                        style={{
                            width: 500,
                            height: 500,
                            imageRendering: 'pixelated',
                            filter: isFrozen ? 'brightness(22)' : 'none',
                        }}
                    />
                </div>
            </div>

            {/* EP 2 title */}
            <div style={{
                position: 'absolute', top: '18%', left: '50%',
                transform: `translateX(-50%) translateY(${textY}px)`,
                opacity: textOp,
            }}>
                <h1 style={{
                    fontSize: 105, fontWeight: 950, color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    textShadow: `0 0 60px ${PRIMARY}`,
                    margin: 0, letterSpacing: 4,
                }}>
                    👉 EP 2
                </h1>
            </div>

            {/* Arabic subtitle */}
            <div style={{
                position: 'absolute', bottom: '9%', width: '100%',
                textAlign: 'center',
                opacity: subOp,
                transform: `translateY(${subY}px)`,
            }}>
                <h1 style={{
                    fontSize: 50, fontWeight: 900, color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textShadow: `0 0 40px ${PRIMARY}`,
                }}>
                    خلينا نختبر بروتوكولات الويندوز — الحلقة الثانية
                </h1>
                <div style={{
                    width: interpolate(spring({ frame: frame - 15, fps, config: { damping: 12 } }), [0, 1], [0, 820]),
                    height: 5,
                    background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                    margin: '14px auto 0',
                    boxShadow: `0 0 25px ${PRIMARY}`,
                }} />
            </div>
        </AbsoluteFill>
    );
};
