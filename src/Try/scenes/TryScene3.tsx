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

// ─── HELPER COMPONENTS ───────────────────────────────────────

const SlashArc: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
    const t = frame - start;
    if (t < 0 || t > 15) return null;
    const opacity = interpolate(t, [0, 2, 8, 15], [0, 1, 1, 0]);
    const scale = interpolate(t, [0, 10], [0.8, 1.2]);
    const rotate = interpolate(t, [0, 15], [-20, 45]);

    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 800, height: 400,
            borderTop: `40px solid #fff`,
            borderRadius: '50%',
            opacity,
            transform: `translate(-50%, -100%) scale(${scale}) rotate(${rotate}deg)`,
            filter: `blur(4px) drop-shadow(0 0 20px ${PRIMARY})`,
            zIndex: 15,
        }} />
    );
};

const ShadowTrail: React.FC<{ x: number; y: number; rot: number; opacity: number }> = ({ x, y, rot, opacity }) => (
    <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg)`,
        opacity,
        filter: 'brightness(0) sepia(1) hue-rotate(180deg) saturate(10) blur(4px)',
        zIndex: 5,
    }}>
        <img src={staticFile(CHARACTER_IMG)} style={{ width: 650, height: 650 }} />
    </div>
);

export const TryScene3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    // ─── KATANA ZERO TIMING ──────────────────────────────────────
    const startWindup = 20;
    const startDash = 50;  // Slow-mo windup
    const impactFrame = 54; // Instant dash

    // ─── PHYSICS & MOMENTUM ──────────────────────────────────────

    // Windup (Slow pull back)
    const windupProgress = spring({
        frame: frame - startWindup,
        fps,
        config: { damping: 20, stiffness: 40 }
    });

    // Dash Strike (Teleport logic)
    const dashProgress = interpolate(frame, [startDash, impactFrame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Recoil & Slide (Momentum)
    const recoilSpring = spring({
        frame: frame - impactFrame,
        fps,
        config: { damping: 15, stiffness: 100 },
    });

    // Positioning
    const initialX = -width / 2;
    let charX = initialX;
    let charY = 0;
    let charRot = 0;
    let charScaleX = 1;
    let charScaleY = 1;

    if (frame < startDash) {
        // WINDUP: Lean back, build tension (Katana Zero style)
        charX = interpolate(windupProgress, [0, 1], [initialX, initialX - 120]);
        charRot = interpolate(windupProgress, [0, 1], [0, -15]);
        charScaleY = interpolate(windupProgress, [0, 1], [1, 0.85]); // Crouch Low
    } else if (frame < impactFrame) {
        // THE DASH: Near-instant velocity
        charX = interpolate(dashProgress, [0, 1], [initialX - 120, 250]);
        charScaleX = 1.8; // Extreme stretch
        charScaleY = 0.6; // Extreme flattened
        charRot = 60;
    } else {
        // RECOIL & SLIDE: Move past target and skid
        charX = interpolate(recoilSpring, [0, 1], [250, 450]);
        charY = interpolate(Math.sin(recoilSpring * Math.PI), [0, 0.5, 1], [0, -20, 0]);
        charRot = interpolate(recoilSpring, [0, 1], [60, 0]);
        charScaleX = interpolate(recoilSpring, [0, 0.3, 1], [1.8, 0.7, 1]); // Snap from stretch to squash
    }

    // ─── EFFECTS ────────────────────────────────────────────────

    // Violent Shake on Impact
    const shake = (frame >= impactFrame && frame < impactFrame + 25)
        ? Math.sin(frame * 4) * 35
        : 0;

    // Inversion Flash (1 Frame)
    const isInverted = frame === impactFrame;

    return (
        <AbsoluteFill style={{
            backgroundColor: '#000',
            overflow: 'hidden',
            filter: isInverted ? 'invert(1)' : 'none',
        }}>
            {/* Dark Cyber Atmosphere */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 75% 50%, ${PRIMARY}15 0%, transparent 75%)`,
            }} />

            <div style={{ position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.3}px)` }}>

                {/* Visual Slash Arc */}
                <SlashArc frame={frame} start={impactFrame} />

                {/* Katana Zero Shadow Trails */}
                {frame >= startDash && [1, 2, 3, 4, 5].map(i => {
                    const f = frame - i * 1.5;
                    if (f < startDash) return null;
                    const p = interpolate(f, [startDash, impactFrame], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const tx = f < impactFrame
                        ? interpolate(p, [0, 1], [initialX - 120, 250])
                        : interpolate(spring({ frame: f - impactFrame, fps }), [0, 1], [250, 450]);
                    return (
                        <ShadowTrail key={i} x={tx} y={0} rot={f < impactFrame ? 60 : 25} opacity={0.3 / i} />
                    );
                })}

                {/* Main Character */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) translate(${charX}px, ${charY}px) rotate(${charRot}deg) scale(${charScaleX}, ${charScaleY})`,
                    zIndex: 20,
                    filter: frame === impactFrame ? 'brightness(20)' : 'none',
                }}>
                    <img src={staticFile(CHARACTER_IMG)} style={{ width: 650, height: 650 }} />
                </div>

                {/* Impact "Katana Zero" Sparks */}
                {frame >= impactFrame && Array.from({ length: 40 }).map((_, i) => {
                    const t = (frame - impactFrame) / 30;
                    if (t > 1) return null;
                    const angle = (i / 40) * Math.PI * 2;
                    const speed = 1 + (i % 5) * 0.5;
                    const dist = t * speed * 1200;
                    const gravity = (t * t) * 0.2;
                    return (
                        <div key={i} style={{
                            position: 'absolute', top: '50%', left: '50%', width: 12, height: 4,
                            background: i % 2 === 0 ? '#fff' : PRIMARY,
                            transform: `translate(-50%, -50%) translate(${260 + Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + gravity}px) rotate(${angle * 180 / Math.PI}deg)`,
                            opacity: 1 - t,
                            boxShadow: `0 0 15px ${PRIMARY}`,
                        }} />
                    );
                })}
            </div>

            {/* Scanlines Overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px', opacity: 0.25,
            }} />
        </AbsoluteFill>
    );
};
