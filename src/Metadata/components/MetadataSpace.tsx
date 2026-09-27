import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';

export const MetadataSpace: React.FC = () => {
    const frame = useCurrentFrame();
    const numStars = 200;

    return (
        <AbsoluteFill className="bg-[#020205] overflow-hidden">
            {/* Deep Space Gradient */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #020205 100%)'
                }}
            />

            {/* Glowing Nebulae */}
            <div
                className="absolute w-[150%] h-[150%] -left-1/4 -top-1/4 opacity-20 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle at 30% 40%, #4f46e5 0%, transparent 50%), radial-gradient(circle at 70% 60%, #7c3aed 0%, transparent 50%)',
                    transform: `rotate(${frame * 0.05}deg)`
                }}
            />

            {/* Stars */}
            {Array.from({ length: numStars }).map((_, i) => {
                const x = random(i) * 100;
                const y = random(i + 1) * 100;
                const size = random(i + 2) * 2 + 1;
                const opacity = interpolate(
                    Math.sin(frame * 0.05 + i),
                    [-1, 1],
                    [0.1, 0.8]
                );

                return (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: size,
                            height: size,
                            opacity,
                            boxShadow: size > 2 ? `0 0 ${size * 2}px white` : 'none'
                        }}
                    />
                );
            })}

            {/* Subtle Cyber Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                    transform: `perspective(1000px) rotateX(60deg) translateY(${frame * 0.5}px)`
                }}
            />
        </AbsoluteFill>
    );
};
