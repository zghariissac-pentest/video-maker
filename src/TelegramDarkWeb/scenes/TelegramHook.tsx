import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const TelegramHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Bottom image animation
    const imgSlideUp = spring({ frame: frame - 10, fps, config: { damping: 14 } });

    // Icons animation
    const telegramPop = spring({ frame: frame - 30, fps, config: { damping: 12 } });
    const torPop = spring({ frame: frame - 50, fps, config: { damping: 12 } });

    // Text Animations
    const t1 = spring({ frame: frame - 20, fps, config: { damping: 14 } });
    const t2 = spring({ frame: frame - 70, fps, config: { damping: 14 } });
    const t3 = spring({ frame: frame - 110, fps, config: { damping: 14 } });
    const t4 = spring({ frame: frame - 160, fps, config: { damping: 14 } });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Target mysterious JPG image - bottom anchored */}
            <AbsoluteFill className="justify-end items-center pointer-events-none pb-0 z-0">
                <Img
                    src={staticFile('jpg')}
                    style={{
                        maxWidth: '900px',
                        width: '100%',
                        maxHeight: '40%', // Ensure it doesn't take up too much vertical space
                        objectFit: 'contain',
                        transform: `translateY(${interpolate(imgSlideUp, [0, 1], [300, 0])}px)`,
                        maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
                    }}
                />
            </AbsoluteFill>

            {/* Text Container - Centered vertically in the available top 60% */}
            <AbsoluteFill className="justify-center items-center pb-48 px-12 z-20 font-bold">

                {/* Line 1 */}
                <div
                    style={{
                        opacity: interpolate(t1, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(t1, [0, 1], [30, 0])}px)`,
                        fontSize: '60px',
                        marginBottom: '40px',
                        textAlign: 'center',
                        color: '#e0e0e0',
                    }}
                >
                    كثير من الناس يسأل…
                </div>

                {/* Line 2a */}
                <div
                    style={{
                        opacity: interpolate(t2, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(t2, [0, 1], [30, 0])}px)`,
                        fontSize: '52px',
                        marginBottom: '30px',
                        textAlign: 'center',
                        lineHeight: '1.5',
                        color: '#ffffff'
                    }}
                >
                    كيف أشخاص يعملون في الجرائم السيبرانية
                </div>

                {/* Line 2b - Stacked vertically so it doesn't overflow horizontally */}
                <div
                    style={{
                        opacity: interpolate(t3, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(t3, [0, 1], [30, 0])}px)`,
                        fontSize: '52px',
                        marginBottom: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px',
                        width: '100%'
                    }}
                >
                    {/* Telegram Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                        <span>على</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} dir="ltr">
                            <Img
                                src={staticFile('telegram-icon.svg')}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    transform: `scale(${telegramPop})`
                                }}
                            />
                            <span style={{ color: '#2AABEE' }}>Telegram</span>
                        </div>
                    </div>

                    {/* Tor Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                        <span>أو في الـ</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} dir="ltr">
                            <Img
                                src={staticFile('tor-icon.svg')}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    transform: `scale(${torPop})`
                                }}
                            />
                            <span style={{ color: '#7D4698' }}>dark web…</span>
                        </div>
                    </div>
                </div>

                {/* Line 3 */}
                <div
                    style={{
                        opacity: interpolate(t4, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(t4, [0, 1], [30, 0])}px) scale(${interpolate(t4, [0, 1], [0.95, 1])})`,
                        fontSize: '60px',
                        textAlign: 'center',
                        color: '#ef4444',
                        paddingTop: '20px'
                    }}
                >
                    ولم يتم القبض عليهم إلى الآن؟
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
