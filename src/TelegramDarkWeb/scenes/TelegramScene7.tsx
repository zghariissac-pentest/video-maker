import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { TimerReset, Activity, Layers, Shuffle } from 'lucide-react';

export const TelegramScene7: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Part 1: The Speed Factor
    const t1Slide = spring({ frame: frame - 10, fps, config: { damping: 12, mass: 0.5 } });
    const t1Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 2: Operational Agility
    const t2Pop = spring({ frame: frame - 100, fps, config: { damping: 12, stiffness: 200 } });
    const t2Opacity = interpolate(frame, [100, 110], [0, 1], { extrapolateRight: 'clamp' });

    // Part 3: Changing Infrastructure Quickly
    const t3Slide = spring({ frame: frame - 280, fps, config: { damping: 14 } });
    const t3Opacity = interpolate(frame, [280, 290], [0, 1], { extrapolateRight: 'clamp' });

    // Exit first section dynamically via fast slide left
    const exitTopSection = spring({ frame: frame - 260, fps, config: { damping: 16 } });

    // Agile shifting boxes animation (Frames 280+)
    // Using overlapping sine/cosine waves to simulate rapid infrastructure swapping
    const swapCycle = interpolate(frame, [280, 500], [0, Math.PI * 8]); // Rapid spinning math

    const box1X = Math.cos(swapCycle) * 150;
    const box1Y = Math.sin(swapCycle) * 50;

    const box2X = Math.cos(swapCycle + (Math.PI * 2) / 3) * 150;
    const box2Y = Math.sin(swapCycle + (Math.PI * 2) / 3) * 50;

    const box3X = Math.cos(swapCycle + (Math.PI * 4) / 3) * 150;
    const box3Y = Math.sin(swapCycle + (Math.PI * 4) / 3) * 50;

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Subtle fast moving grid for speed sensation */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    transform: `translateY(${frame * 4}px)` // Fast panning effect
                }}
            />

            {/* TOP SECTION: SPEED AND AGILITY */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-10"
                style={{
                    opacity: interpolate(exitTopSection, [0, 1], [1, 0]),
                    transform: `translateX(${interpolate(exitTopSection, [0, 1], [0, 300])}px)`
                }}
            >
                <div className="flex flex-col items-center gap-16 w-full max-w-[900px]">

                    {/* Speed Factor */}
                    <div
                        style={{
                            opacity: t1Opacity,
                            transform: `translateY(${interpolate(t1Slide, [0, 1], [50, 0])}px)`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        {/* Rapid ticking timer icon */}
                        <div className="relative" style={{ transform: `rotate(${-frame * 5}deg)` }}>
                            <TimerReset size={80} color="#facc15" style={{ filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.5))' }} />
                        </div>
                        <span className="text-6xl font-bold tracking-wide text-gray-300">
                            وهنا يظهر <span className="text-yellow-400">عامل السرعة.</span>
                        </span>
                    </div>

                    {/* Operational Agility */}
                    <div
                        style={{
                            opacity: t2Opacity,
                            transform: `scale(${interpolate(t2Pop, [0, 1], [0.5, 1])})`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '30px'
                        }}
                    >
                        <span className="text-5xl font-bold text-gray-400">هذه الشبكات تعتمد على ما يُسمى</span>

                        <div className="flex items-center gap-6 bg-cyan-900/30 border border-cyan-500/50 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                            {/* Scanning beam visual */}
                            <div className="absolute top-0 bottom-0 w-2 bg-cyan-400/50 blur-sm flex" style={{ left: `${(frame * 10) % 150}%` }}></div>

                            <Activity size={80} className="text-cyan-400" />
                            <span
                                className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
                                dir="ltr"
                                style={{ letterSpacing: '2px' }}
                            >
                                Operational Agility
                            </span>
                        </div>
                    </div>

                </div>
            </AbsoluteFill>

            {/* BOTTOM SECTION: SHIFTING INFRASTRUCTURE */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20"
                style={{
                    opacity: t3Opacity,
                    pointerEvents: frame < 280 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col items-center gap-24 w-full max-w-[1000px]">

                    {/* The Swapping Infrastructure Nodes */}
                    <div className="relative w-full h-[300px] flex justify-center items-center" dir="ltr">
                        {/* Dynamic connection paths showing rapid reshuffling */}
                        <div className="absolute inset-0 flex justify-center items-center opacity-40">
                            <Shuffle size={120} className="text-gray-600 absolute" />
                        </div>

                        {/* Node A */}
                        <div
                            className="absolute flex items-center justify-center w-36 h-36 bg-indigo-900/60 border-2 border-indigo-500 rounded-[2rem] shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10"
                            style={{ transform: `translate(${box1X}px, ${box1Y}px)` }}
                        >
                            <Layers size={60} className="text-indigo-400" />
                        </div>

                        {/* Node B */}
                        <div
                            className="absolute flex items-center justify-center w-36 h-36 bg-rose-900/60 border-2 border-rose-500 rounded-[2rem] shadow-[0_0_30px_rgba(244,63,94,0.5)] z-20"
                            style={{ transform: `translate(${box2X}px, ${box2Y}px)` }}
                        >
                            <Layers size={60} className="text-rose-400" />
                        </div>

                        {/* Node C */}
                        <div
                            className="absolute flex items-center justify-center w-36 h-36 bg-emerald-900/60 border-2 border-emerald-500 rounded-[2rem] shadow-[0_0_30px_rgba(16,185,129,0.5)] z-30"
                            style={{ transform: `translate(${box3X}px, ${box3Y}px)` }}
                        >
                            <Layers size={60} className="text-emerald-400" />
                        </div>
                    </div>

                    {/* Conclusion text */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(t3Slide, [0, 1], [50, 0])}px)`,
                            fontSize: '60px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: '1.5'
                        }}
                    >
                        أي القدرة على تغيير <span className="text-emerald-400">البنية التشغيلية</span> <br />
                        <span className="text-yellow-400" style={{ textShadow: '0 0 30px rgba(250,204,21,0.5)' }}>بسرعة كبيرة.</span>
                    </div>

                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
