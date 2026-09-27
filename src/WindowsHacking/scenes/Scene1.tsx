import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { SpaceBackground, WindowsDesktop, CleanText, WindowsLogo } from '../components/WindowsTheme';

export const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    const logoSpring = spring({
        frame,
        fps,
        config: {
            damping: 12,
            stiffness: 100,
            mass: 0.5,
        }
    });

    const logoOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp' });
    const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);

    const desktopSpring = spring({
        frame,
        fps,
        config: {
            damping: 15,
            stiffness: 100,
            mass: 0.8,
        }
    });

    const desktopScale = interpolate(desktopSpring, [0, 1], [0.5, 0.8]);
    const desktopOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp' });
    const desktopRotation = interpolate(desktopSpring, [0, 1], [10, -5]);
    const desktopTranslateY = interpolate(desktopSpring, [0, 1], [100, 0]);

    return (
        <AbsoluteFill>
            <SpaceBackground />

            <div className="z-10 flex flex-col items-center justify-center h-full w-full gap-24">
                <div
                    style={{
                        transform: `scale(${logoScale})`,
                        opacity: logoOpacity,
                    }}
                >
                    <WindowsLogo size={180} />
                </div>

                <div
                    style={{
                        transform: `scale(${desktopScale}) rotate(${desktopRotation}deg) translateY(${desktopTranslateY}px)`,
                        opacity: desktopOpacity,
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
                    }}
                >
                    <WindowsDesktop />
                </div>

                <CleanText
                    text="3 آليات داخل ويندوز يستغلها المهاجمون"
                    delay={30}
                />
            </div>

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </AbsoluteFill>
    );
};
