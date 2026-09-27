import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';

const COLORS = {
    primary: '#00BDF2',
    accent: '#ff0055',
    background: '#0a0a0c',
};

// --- COMPONENTS ---

const Particles: React.FC<{ frame: number; impactFrame: number }> = ({ frame, impactFrame }) => {
    const progress = frame - impactFrame;
    if (progress < 0 || progress > 50) return null;

    return (
        <>
            {Array.from({ length: 80 }).map((_, i) => {
                const angle = (i / 80) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
                const dist = interpolate(progress, [0, 50], [0, 1600 + Math.random() * 800]);
                const size = interpolate(progress, [0, 50], [25, 0]);
                const opacity = interpolate(progress, [0, 50], [1, 0]);
                const driftY = (progress * progress) * 0.1; // Gravity-like drift

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            width: size,
                            height: size,
                            background: i % 4 === 0 ? '#fff' : i % 4 === 1 ? COLORS.primary : COLORS.accent,
                            opacity,
                            transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + driftY}px) rotate(${progress * 5}deg)`,
                            boxShadow: `0 0 40px ${COLORS.primary}`,
                            borderRadius: i % 2 === 0 ? '50%' : '0%',
                        }}
                    />
                );
            })}
        </>
    );
};

const ScanlineOverlay: React.FC = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))`,
                backgroundSize: '100% 4px, 3px 100%',
                opacity: 0.45,
            }} />
        </AbsoluteFill>
    );
};

// --- SCENE ---

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- TIMING (Ep 2: Narrative & Heavy) ---
    const tIconSpawn = 5;
    const tAnticipation = 25;  // Pulling back
    const tDashStart = 45;      // Start Dash
    const tImpact = 75;         // 1.0s Dash
    const tFreezeEnd = 95;      // 0.6s Impact/Hitstop
    const tExplodeStart = 95;
    const tOvershootEnd = 120;  // Overshoot recovery
    const tReturnEnd = 145;    // Settle back
    const tTextStart = 150;

    // 1. Icon Appearing
    const iconPop = spring({ frame: frame - tIconSpawn, fps, config: { damping: 15, stiffness: 200 } });
    const iconScaleBase = interpolate(iconPop, [0, 1], [0, 1]);
    const iconOpacity = interpolate(frame, [tIconSpawn, tIconSpawn + 5], [0, 1]);

    // 2. Character Logic
    const startX = -400;
    const impactX = 0;
    const overshootX = 200;
    const settleX = -450;

    let currentX = startX;
    let currentY = 0;
    let currentRotate = 0;
    let characterScaleY = 1;

    const isAnticipating = frame >= tAnticipation && frame < tDashStart;
    const isDashing = frame >= tDashStart && frame < tImpact;
    const isFreezing = frame >= tImpact && frame < tFreezeEnd;
    const isOvershooting = frame >= tFreezeEnd && frame < tOvershootEnd;
    const isSettling = frame >= tOvershootEnd && frame < tReturnEnd;

    // IDLE
    const idleBounce = Math.sin(frame / 8) * 10;
    const weaponWave = Math.sin(frame / 6) * 5;

    if (frame < tAnticipation) {
        currentX = startX;
        currentY = idleBounce;
        currentRotate = weaponWave;
    }
    else if (isAnticipating) {
        // CROWCH & PULL BACK
        currentX = interpolate(frame, [tAnticipation, tDashStart], [startX, startX - 80]);
        currentY = interpolate(frame, [tAnticipation, tDashStart], [idleBounce, 20]);
        currentRotate = interpolate(frame, [tAnticipation, tDashStart], [weaponWave, -35]);
        characterScaleY = 0.9;
    }
    else if (isDashing) {
        // FAST DASH
        currentX = interpolate(frame, [tDashStart, tImpact], [startX - 80, impactX], { easing: (t) => t * t });
        currentY = -Math.abs(Math.sin(frame / 4)) * 20; // Running bounce
        currentRotate = interpolate(frame, [tDashStart, tImpact], [-35, 15]); // Leaning forward
        characterScaleY = 1.05;
    }
    else if (isFreezing) {
        // IMPACT
        currentX = impactX;
        currentY = 0;
        currentRotate = -45;
        characterScaleY = 0.8; // Squash on impact
    }
    else if (isOvershooting) {
        // SLIDE PAST
        currentX = interpolate(frame, [tFreezeEnd, tOvershootEnd], [impactX, overshootX], { extrapolateRight: 'clamp' });
        currentY = 0;
        currentRotate = -45;
        characterScaleY = 0.95;
    }
    else if (isSettling) {
        // SETTLE BACK
        currentX = interpolate(frame, [tOvershootEnd, tReturnEnd], [overshootX, settleX], { extrapolateRight: 'clamp' });
        currentY = idleBounce;
        currentRotate = weaponWave;
    }
    else {
        currentX = settleX;
        currentY = idleBounce;
        currentRotate = weaponWave;
    }

    const shake = isFreezing ? (Math.random() - 0.5) * 100 : 0;
    const flash = frame === tImpact ? 1 : 0;
    const cameraZoom = isFreezing ? 1.25 : 1;
    const isInverse = frame === tImpact || frame === tImpact + 2; // Impact frames technique

    // Icon React
    const isExploded = frame >= tExplodeStart;
    const iconExplodeSwell = interpolate(frame, [tExplodeStart, tExplodeStart + 40], [1, 8], { extrapolateRight: 'clamp' });
    const iconExplodeFade = interpolate(frame, [tExplodeStart, tExplodeStart + 40], [1, 0], { extrapolateRight: 'clamp' });
    const iconHitReact = interpolate(frame, [tImpact, tImpact + 5, tImpact + 15], [1, 0.4, 1.6], { extrapolateRight: 'clamp' });

    // Text Reveal
    const textSlide = spring({ frame: frame - tTextStart, fps, config: { damping: 12 } });
    const textY = interpolate(textSlide, [0, 1], [40, 0]);
    const textOpacity = interpolate(frame, [tTextStart, tTextStart + 15], [0, 1]);

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <ScanlineOverlay />

            {/* Impact Flash Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: isInverse ? 'white' : 'white',
                opacity: flash,
                zIndex: 100,
            }} />

            {/* Stage Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                transform: `scale(${cameraZoom}) translate(${shake}px, ${shake}px)`,
                filter: isInverse ? 'invert(1) contrast(2)' : 'none',
                transition: 'transform 0.05s ease-out',
            }}>
                {/* Windows Icon */}
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${isExploded ? iconExplodeSwell : (iconScaleBase * iconHitReact)})`,
                    opacity: isExploded ? iconExplodeFade : iconOpacity,
                    filter: isFreezing ? 'brightness(15) hue-rotate(90deg)' : 'none',
                    zIndex: 2,
                }}>
                    <img src={staticFile("assets/distros/windows-real.png")} style={{ width: 380, height: 380 }} alt="Windows" />
                </div>

                <Particles frame={frame} impactFrame={tExplodeStart} />

                {/* Reaper Ghosts */}
                {(isDashing || isFreezing || isOvershooting) && [1, 2, 3, 4, 5, 6, 7].map(i => {
                    const ghostFrame = frame - i * 3;
                    if (ghostFrame < tDashStart || ghostFrame > tOvershootEnd) return null;
                    const gX = interpolate(ghostFrame, [tDashStart, tImpact], [startX - 80, impactX], { easing: (t) => t * t, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const gY = -Math.abs(Math.sin(ghostFrame / 4)) * 20;
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: `translate(-50%, -50%) translate(${gX}px, ${gY}px)`,
                            opacity: 0.15,
                            filter: 'brightness(3) grayscale(1) saturate(2)',
                            mixBlendMode: 'screen',
                        }}>
                            <img src={staticFile("assets/reaper.png")} style={{ width: 550, height: 550, imageRendering: 'pixelated' }} />
                        </div>
                    );
                })}

                {/* Main character */}
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg) scaleY(${characterScaleY})`,
                    mixBlendMode: 'screen',
                    zIndex: 10,
                }}>
                    <img
                        src={staticFile("assets/reaper.png")}
                        style={{
                            width: 550,
                            height: 550,
                            imageRendering: 'pixelated',
                            filter: isFreezing ? 'brightness(25)' : 'none',
                        }}
                    />
                </div>
            </div>

            {/* Episode Title (Ep 2 Style) */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: `translateX(-50%) translateY(${textY}px)`,
                opacity: textOpacity,
            }}>
                <h1 style={{
                    fontSize: 110,
                    fontWeight: 950,
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    textShadow: `0 0 50px ${COLORS.primary}, 0 0 100px ${COLORS.primary}40`,
                    letterSpacing: '5px',
                    margin: 0,
                }}>
                    👉 EP 2
                </h1>
            </div>

            {/* Bottom Arabic Hook */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                width: '100%',
                textAlign: 'center',
                opacity: interpolate(frame, [20, 40], [0, 1]),
                transform: `translateY(${interpolate(spring({ frame: frame - 20, fps, config: { damping: 12 } }), [0, 1], [40, 0])}px)`,
            }}>
                <h1 style={{
                    fontSize: 55,
                    fontWeight: 950,
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textShadow: `0 0 50px ${COLORS.primary}`,
                }}>
                    خلينا نختبر بروتوكولات الويندوز — الحلقة الثانية
                </h1>
                <div style={{
                    width: interpolate(spring({ frame: frame - 25, fps, config: { damping: 12 } }), [0, 1], [0, 850]),
                    height: 6,
                    background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
                    margin: '15px auto 0',
                    boxShadow: `0 0 30px ${COLORS.primary}`,
                }} />
            </div>
        </AbsoluteFill>
    );
};
