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

export const BurpScene1: React.FC = () => {

    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance Animations
    const assetAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    // Visual Effects
    const floatingY = Math.sin(frame / 20) * 10;
    const assetScale = interpolate(assetAppear, [0, 1], [0.8, 1.2], { extrapolateRight: 'clamp' });

    // Text split reveal
    const title = "بعد هذا الفيديو… ولن ترتبك مرة أخرى عندما ترى BurpSuite";
    const words = title.split(" ").map(w => w === 'BurpSuite' ? 'Burp Suite' : w);


    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
        }}>
            {/* Main Content Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 60,
                zIndex: 20,
            }}>

                {/* Burp Suite Logo Asset */}
                <div style={{
                    width: 450,
                    height: 450,
                    transform: `scale(${assetScale}) translateY(${floatingY}px)`,
                    opacity: assetAppear,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'drop-shadow(0 0 40px rgba(255, 102, 51, 0.4))', // Glowing Burp Orange
                }}>
                    <Img
                        src={staticFile('assets/burpsuite.svg')}
                        style={{
                            width: '90%',
                            height: '90%',
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* Arabic Hook Text */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    padding: '0 60px',
                    maxWidth: 1200,
                }}>
                    <h1 style={{
                        fontSize: 90,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        lineHeight: 1.4,
                    }}>
                        {words.map((word, i) => {
                            const delay = i * 3;
                            const wordAppear = spring({
                                frame: frame - (20 + delay),
                                fps,
                                config: { stiffness: 120, damping: 20 }
                            });

                            const opacity = interpolate(wordAppear, [0, 1], [0, 1]);
                            const translateY = interpolate(wordAppear, [0, 1], [40, 0]);
                            const scale = interpolate(wordAppear, [0, 1], [0.8, 1]);

                            return (
                                <span key={i} style={{
                                    display: 'inline-block',
                                    opacity,
                                    transform: `translateY(${translateY}px) scale(${scale})`,
                                    marginLeft: 20,
                                    textShadow: word === 'Burp Suite' ? '0 0 20px rgba(255, 102, 51, 0.6)' : 'none',
                                    color: word === 'Burp Suite' ? '#FF6633' : 'white',

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
