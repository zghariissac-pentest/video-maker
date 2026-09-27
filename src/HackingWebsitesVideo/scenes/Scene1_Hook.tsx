import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from 'remotion';

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance Animations
    const assetAppear = spring({
        frame: frame - 5,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    // Visual Effects
    const floatingY = Math.sin(frame / 20) * 10;
    const assetScale = interpolate(assetAppear, [0, 1], [0.8, 1], { extrapolateRight: 'clamp' });

    // Background Energy (None for fully black background)

    // Text split reveal
    const title = "هذه المواقع ستجعلك تتعلم الاختراق أسرع";
    const words = title.split(" ");

    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
        }}>
            {/* Fully black background as requested */}

            {/* Main Content Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 50,
                zIndex: 20,
            }}>

                {/* GIF Asset - No container, no border, no background */}
                <div style={{
                    width: 700,
                    height: 700,
                    transform: `scale(${assetScale}) translateY(${floatingY}px)`,
                    opacity: assetAppear,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Img
                        src={staticFile('assets/hacking_transparent.gif')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'contrast(120%) brightness(110%)', // Makes the character pop against the black bg
                        }}
                    />
                </div>

                {/* Arabic Hook Text - Clean and Effected */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    padding: '0 40px',
                    maxWidth: 1000,
                }}>
                    <h1 style={{
                        fontSize: 90,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        lineHeight: 1.2,
                    }}>
                        {words.map((word, i) => {
                            const delay = i * 4;
                            const wordAppear = spring({
                                frame: frame - (5 + delay), // Synchronized with assetAppear (frame - 5)
                                fps,
                                config: { stiffness: 100, damping: 15 }
                            });

                            const opacity = interpolate(wordAppear, [0, 1], [0, 1]);
                            const translateY = interpolate(wordAppear, [0, 1], [20, 0]);
                            const blur = interpolate(wordAppear, [0, 1], [10, 0]);

                            return (
                                <span key={i} style={{
                                    display: 'inline-block',
                                    opacity,
                                    transform: `translateY(${translateY}px)`,
                                    filter: `blur(${blur}px)`,
                                    marginLeft: 15,
                                }}>
                                    {word}{' '}
                                </span>
                            );
                        })}
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};
