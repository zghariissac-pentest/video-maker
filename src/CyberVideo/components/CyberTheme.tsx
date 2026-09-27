import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, staticFile, Img, random } from 'remotion';

export const COLORS = {
    primary: '#ff00ff', // Neon Pink
    secondary: '#00ffff', // Cyan
    accent: '#ffff00', // Yellow/Gold
    background: '#0d0221', // Deep Space Blue/Purple
    text: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.6)',
};

// -- HELPER COMPONENTS --

const Rain: React.FC = () => {
    const drops = Array.from({ length: 50 }).map((_, i) => {
        const seed = i * 100;
        return {
            x: random(`x-${seed}`) * 100,
            y: random(`y-${seed}`) * 100,
            speed: 0.5 + random(`speed-${seed}`) * 1.5,
            opacity: 0.1 + random(`op-${seed}`) * 0.4,
            length: 10 + random(`len-${seed}`) * 20,
        };
    });

    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {drops.map((drop, i) => {
                const dropY = (drop.y + frame * drop.speed) % 100;
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${drop.x}%`,
                        top: `${dropY}%`,
                        width: 1,
                        height: drop.length,
                        background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.5))',
                        opacity: drop.opacity,
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

const Traffic: React.FC = () => {
    const cars = Array.from({ length: 15 }).map((_, i) => {
        const seed = i * 200;
        return {
            y: 40 + random(`y-${seed}`) * 40, // Middle area of the city
            speed: 0.2 + random(`speed-${seed}`) * 0.5,
            direction: random(`dir-${seed}`) > 0.5 ? 1 : -1,
            color: random(`col-${seed}`) > 0.5 ? COLORS.secondary : COLORS.primary,
            delay: random(`del-${seed}`) * 100,
        };
    });

    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'screen' }}>
            {cars.map((car, i) => {
                const progress = ((frame + car.delay) * car.speed) % 120; // 0 to 120%
                const x = car.direction === 1 ? progress - 10 : 110 - progress;

                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${car.y}%`,
                        width: 15,
                        height: 2,
                        background: car.color,
                        boxShadow: `0 0 10px ${car.color}`,
                        opacity: 0.6,
                        borderRadius: 2,
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

export const CyberBackground: React.FC = () => {
    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            {/* 1. Base Image - FIXED (no movement) */}
            <AbsoluteFill>
                <Img
                    src={staticFile('assets/cyber/background.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.4) contrast(1.2)' // Make it darker
                    }}
                />
            </AbsoluteFill>

            {/* 2. Moving Traffic */}
            <Traffic />

            {/* 3. Rain Effect */}
            <Rain />

            {/* 4. Atmospheric Glow Overlay (Darker) */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.6) 100%)',
                mixBlendMode: 'multiply'
            }} />
        </AbsoluteFill>
    );
};

export const StaticVignette: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
            }}
        />
    );
};

export const Scanlines: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                backgroundSize: '100% 6px, 4px 100%',
                pointerEvents: 'none',
                opacity: 0.4,
            }}
        />
    );
};
