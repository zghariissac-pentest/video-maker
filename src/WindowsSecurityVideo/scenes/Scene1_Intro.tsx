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
    background: '#000000',
};

// --- COMPONENTS ---

const Particles: React.FC<{ frame: number; impactFrame: number }> = ({ frame, impactFrame }) => {
    const progress = frame - impactFrame;
    if (progress < 0 || progress > 45) return null;

    return (
        <>
            {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2 + Math.random();
                const dist = interpolate(progress, [0, 45], [0, 1500 + Math.random() * 800]);
                const size = interpolate(progress, [0, 45], [20, 0]);
                const opacity = interpolate(progress, [0, 45], [1, 0]);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            width: size,
                            height: size,
                            background: i % 3 === 0 ? '#fff' : i % 3 === 1 ? COLORS.primary : COLORS.accent,
                            opacity,
                            transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
                            boxShadow: `0 0 35px ${COLORS.primary}`,
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
                opacity: 0.35,
            }} />
        </AbsoluteFill>
    );
};

// --- SCENE ---

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- TIMING ---
    const tIconSpawn = 0;
    const tDashStart = 15;
    const tImpact = 45;      // 1.0s dash
    const tFreezeEnd = 65;   // 0.6s hitstop
    const tExplodeStart = 65;
    const tReturnStart = 105;
    const tTextStart = 115;
    const tStaticEnd = 140; // Frame to stop all procedural movement

    // Dynamic Logic
    const isDashing = frame >= tDashStart && frame < tImpact;
    const isFreezing = frame >= tImpact && frame < tFreezeEnd;
    const isReturning = frame >= tReturnStart;
    const isFinalStatic = frame >= tStaticEnd;

    // Procedural Movements (Stopper applied at the end)
    const stopFactor = interpolate(frame, [tStaticEnd - 10, tStaticEnd], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const idleBounce = Math.sin(frame / 8) * 12 * stopFactor;
    const weaponWave = Math.sin(frame / 6) * 5 * stopFactor;
    const walkCycle = Math.abs(Math.sin(frame / 4)) * 15;

    // 1. Icon Appearing
    const iconPop = spring({ frame: frame - tIconSpawn, fps, config: { damping: 15, stiffness: 200 } });
    const iconOpacity = interpolate(frame, [0, 5], [0, 1]);
    const iconInitialScale = interpolate(iconPop, [0, 1], [0.1, 1]);

    // 2. Character Movement
    const startX = -350;
    const impactX = 0;
    const returnX = -450;

    let currentX = startX;
    let currentY = idleBounce;
    let currentRotate = weaponWave;
    let leanForward = 0;
    let characterScaleY = 1;

    if (frame < tDashStart) {
        currentX = startX;
        currentY = idleBounce;
    } else if (isDashing) {
        currentX = interpolate(frame, [tDashStart, tImpact], [startX, impactX], { easing: (t) => t * t });
        currentY = -walkCycle;
        leanForward = interpolate(frame, [tDashStart, tImpact], [0, 25]);
        characterScaleY = interpolate(Math.sin(frame / 2), [-1, 1], [0.95, 1.05]);
    } else if (isFreezing) {
        currentX = impactX;
        currentY = 0;
        currentRotate = -45;
        leanForward = 35;
        characterScaleY = 0.85;
    } else if (isReturning) {
        currentX = interpolate(frame, [tReturnStart, tReturnStart + 25], [impactX, returnX], { extrapolateRight: 'clamp' });
        currentY = isFinalStatic ? 0 : idleBounce;
    } else {
        currentX = impactX;
        currentY = idleBounce;
    }

    const shake = isFreezing ? (Math.random() - 0.5) * 90 : 0;
    const flash = frame === tImpact ? 0.9 : 0;
    const cameraZoom = isFreezing ? 1.2 : 1;

    // Icon FX
    const isExploded = frame >= tExplodeStart;
    const iconExplodeSwell = interpolate(frame, [tExplodeStart, tExplodeStart + 35], [1, 6], { extrapolateRight: 'clamp' });
    const iconExplodeFade = interpolate(frame, [tExplodeStart, tExplodeStart + 35], [1, 0], { extrapolateRight: 'clamp' });
    const iconHitReact = interpolate(frame, [tImpact, tImpact + 5, tImpact + 25], [1, 0.4, 1.5], { extrapolateRight: 'clamp' });

    // 3. Text
    const textSlide = spring({ frame: frame - tTextStart, fps, config: { damping: 12 } });
    const textY = interpolate(textSlide, [0, 1], [40, 0]);
    const textOpacity = interpolate(frame, [tTextStart, tTextStart + 15], [0, 1]);

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <ScanlineOverlay />

            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'white',
                opacity: flash,
                zIndex: 100,
            }} />

            <div style={{
                position: 'absolute',
                inset: 0,
                transform: `scale(${cameraZoom}) translate(${shake}px, ${shake}px)`,
                transition: 'transform 0.05s ease-out',
            }}>
                {/* Windows Icon */}
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${isExploded ? iconExplodeSwell : (iconInitialScale * iconHitReact)})`,
                    opacity: isExploded ? iconExplodeFade : iconOpacity,
                    filter: isFreezing ? 'brightness(15) contrast(4) hue-rotate(180deg)' : 'none',
                    zIndex: 2,
                }}>
                    <img src={staticFile("assets/distros/windows-real.png")} style={{ width: 380, height: 380 }} alt="Windows" />
                </div>

                <Particles frame={frame} impactFrame={tExplodeStart} />

                {/* Reaper Ghosts */}
                {(isDashing || isFreezing) && [1, 2, 3, 4, 5, 6].map(i => {
                    const ghostFrame = frame - i * 3;
                    if (ghostFrame < tDashStart || ghostFrame > tImpact) return null;
                    const ghostX = interpolate(ghostFrame, [tDashStart, tImpact], [startX, impactX], { easing: (t) => t * t });
                    const ghostY = -Math.abs(Math.sin(ghostFrame / 4)) * 15;
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: `translate(-50%, -50%) translate(${ghostX}px, ${ghostY}px) rotate(${interpolate(ghostFrame, [tDashStart, tImpact], [0, 25])}deg)`,
                            opacity: 0.15 / i,
                            filter: 'brightness(3) grayscale(1)',
                            mixBlendMode: 'screen',
                        }}>
                            <img src={staticFile("assets/reaper.png")} style={{ width: 550, height: 550, imageRendering: 'pixelated' }} alt="Reaper Ghost" />
                        </div>
                    );
                })}

                {/* Main Reaper Character */}
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${currentRotate + leanForward}deg) scaleY(${characterScaleY})`,
                    mixBlendMode: 'screen',
                    zIndex: 10,
                }}>
                    <img
                        src={staticFile("assets/reaper.png")}
                        style={{
                            width: 550,
                            height: 550,
                            imageRendering: 'pixelated',
                            filter: isFreezing ? 'brightness(20) invert(1)' : 'none',
                        }}
                        alt="Reaper Main"
                    />
                </div>
            </div>

            {/* Subtitles (Matching Video Style) */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: `translateX(-50%) translateY(${textY}px)`, opacity: textOpacity }}>
                <h1 style={{ fontSize: 110, fontWeight: 950, color: 'white', fontFamily: 'Cairo, sans-serif', textShadow: `0 0 50px ${COLORS.primary}`, margin: 0 }}>👉 EP 1</h1>
            </div>

            <div style={{ position: 'absolute', bottom: '10%', width: '100%', textAlign: 'center', opacity: interpolate(frame, [15, 30], [0, 1]), transform: `translateY(${interpolate(spring({ frame: frame - 15, fps, config: { damping: 12 } }), [0, 1], [40, 0])}px)` }}>
                <h1 style={{ fontSize: 55, fontWeight: 950, color: 'white', fontFamily: 'Cairo, sans-serif', direction: 'rtl', textShadow: `0 0 50px ${COLORS.primary}` }}>خلينا نختبر اختراق بروتوكولات الويندوز — الحلقة الأولى</h1>
                <div style={{ width: interpolate(spring({ frame: frame - 20, fps, config: { damping: 12 } }), [0, 1], [0, 850]), height: 5, background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`, margin: '15px auto 0', boxShadow: `0 0 30px ${COLORS.primary}` }} />
            </div>
        </AbsoluteFill>
    );
};
