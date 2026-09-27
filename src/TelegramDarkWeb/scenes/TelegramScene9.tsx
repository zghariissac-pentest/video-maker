import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Lightbulb, BrainCog, ShieldBan, Wand2, RefreshCw } from 'lucide-react';

export const TelegramScene9: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Intro Group
    const t1Slide = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const t1Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });
    const bulbGlow = interpolate(frame, [30, 40], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // Learning Fast
    const t2Slide = spring({ frame: frame - 90, fps, config: { damping: 14 } });
    const t2Opacity = interpolate(frame, [90, 100], [0, 1], { extrapolateRight: 'clamp' });

    // Exit first section dynamically via fast slide upwards
    const exitTopSection = spring({ frame: frame - 230, fps, config: { damping: 14 } });

    // The Technical Concept Burst (Adversarial Adaptation)
    const conceptPop = spring({ frame: frame - 260, fps, config: { damping: 12 } });
    const conceptOpacity = interpolate(frame, [250, 260], [0, 1], { extrapolateRight: 'clamp' });

    // Adaptation visual mechanic
    const adaptRotate = interpolate(frame, [260, 450], [0, 360]);
    const shieldShake = Math.sin(frame * 0.8) * 10;

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Subtle evolving background representing "adaptation" */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    background: `linear-gradient(${interpolate(frame, [0, 450], [0, 360])}deg, rgba(239,68,68,0.1) 0%, rgba(168,85,247,0.1) 100%)`
                }}
            />

            {/* TOP SECTION: THE IMPORTANT POINT & FAST LEARNING */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-10"
                style={{
                    opacity: interpolate(exitTopSection, [0, 1], [1, 0]),
                    transform: `translateY(${interpolate(exitTopSection, [0, 1], [0, -200])}px)`
                }}
            >
                <div className="flex flex-col items-center gap-16 w-full max-w-[900px]">

                    {/* An important point */}
                    <div
                        style={{
                            opacity: t1Opacity,
                            transform: `translateY(${interpolate(t1Slide, [0, 1], [50, 0])}px)`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        {/* Bulb flashing on */}
                        <div className="relative">
                            <Lightbulb size={60} className={bulbGlow > 0.5 ? "text-yellow-400" : "text-gray-600"} style={{ filter: `drop-shadow(0 0 ${bulbGlow * 30}px rgba(250,204,21,0.8))` }} />
                        </div>
                        <span className="text-5xl font-bold text-gray-300">
                            هناك نقطة أخرى مهمة.
                        </span>
                    </div>

                    {/* Entities learn rapidly */}
                    <div
                        style={{
                            opacity: t2Opacity,
                            transform: `scale(${interpolate(t2Slide, [0, 1], [0.8, 1])}) translateY(${interpolate(t2Slide, [0, 1], [30, 0])}px)`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '30px'
                        }}
                    >
                        <div className="flex items-center justify-center p-6 bg-purple-900/30 border border-purple-500/50 rounded-full shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                            <BrainCog size={100} className="text-purple-400" style={{ transform: `rotate(${frame}deg)` }} />
                        </div>

                        <span className="text-6xl font-black text-center text-gray-200 mt-6 leading-tight">
                            وهي أن هذه الجهات <br />
                            <span className="text-purple-400 text-7xl" style={{ textShadow: '0 0 30px rgba(168,85,247,0.6)' }}>تتعلم بسرعة.</span>
                        </span>
                    </div>

                </div>
            </AbsoluteFill>

            {/* BOTTOM SECTION: THE SCIENTIFIC TERM */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20"
                style={{
                    opacity: conceptOpacity,
                    pointerEvents: frame < 250 ? 'none' : 'auto'
                }}
            >
                <div
                    className="flex flex-col items-center gap-16 w-full max-w-[1000px]"
                    style={{
                        transform: `scale(${interpolate(conceptPop, [0, 1], [0.5, 1])})`
                    }}
                >
                    <span className="text-4xl text-gray-400 font-bold mb-4">في علم الأمن السيبراني، هذا يُعرف بـ</span>

                    {/* Visual representation of an attack bypassing a shield */}
                    <div className="relative flex justify-center items-center w-full h-[200px] mb-8">
                        {/* The defense attempting to block */}
                        <ShieldBan size={150} className="text-blue-500 z-10" style={{ transform: `rotate(${shieldShake}deg)`, filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.6))' }} />

                        {/* The fluid/adaptive attack bending around the defense */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <div className="w-[300px] h-[300px] border-[10px] border-dashed border-rose-500 rounded-full flex justify-center items-center" style={{ transform: `rotate(${adaptRotate}deg)`, opacity: 0.8, filter: 'drop-shadow(0 0 20px rgba(244,63,94,0.6))' }}></div>
                        </div>

                        {/* Magic wand icon indicating transformation/adaptation */}
                        <div className="absolute right-[20%] text-rose-400">
                            <Wand2 size={80} style={{ transform: `rotate(${-adaptRotate * 2}deg)` }} />
                        </div>
                        <div className="absolute left-[20%] text-orange-400">
                            <RefreshCw size={80} style={{ transform: `rotate(${adaptRotate * 2}deg)` }} />
                        </div>
                    </div>

                    <span
                        className="text-[90px] font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500"
                        dir="ltr"
                        style={{ padding: '20px 0', textShadow: '0 0 50px rgba(244,63,94,0.3)' }}
                    >
                        Adversarial Adaptation
                    </span>

                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
