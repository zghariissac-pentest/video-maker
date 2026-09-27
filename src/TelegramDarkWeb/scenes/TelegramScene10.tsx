import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { FileWarning, FileCode2, Wrench, GitBranch, BugOff, ArrowRight } from 'lucide-react';

export const TelegramScene10: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade out first part to show upgrades
    const exitPart1 = spring({ frame: frame - 280, fps, config: { damping: 14 } });

    // "Every shutdown..."
    const introSlide = spring({ frame: frame - 20, fps, config: { damping: 14 } });
    const introOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });

    // "Is used as a case study"
    const casePop = spring({ frame: frame - 100, fps, config: { damping: 12 } });

    // The transformation from Error to Data
    const errorShrink = interpolate(frame, [100, 120], [1, 0.5], { extrapolateRight: 'clamp' });
    const dataExpand = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp' });

    // Second Part: 3 Action Nodes
    const part2Enter = spring({ frame: frame - 300, fps, config: { damping: 14 } });
    const p2Opacity = interpolate(part2Enter, [0, 1], [0, 1]);

    const n1Pop = spring({ frame: frame - 320, fps, config: { damping: 12 } });
    const n2Pop = spring({ frame: frame - 350, fps, config: { damping: 12 } });
    const n3Pop = spring({ frame: frame - 380, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Minimal Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 70%)'
                }}
            />

            {/* --- PART 1: SHUTDOWN BECOMES A CASE STUDY --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-10"
                style={{
                    opacity: interpolate(exitPart1, [0, 1], [1, 0]),
                    transform: `translateX(${interpolate(exitPart1, [0, 1], [0, -200])}px)`,
                    pointerEvents: frame > 290 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col items-center gap-16 w-full max-w-[900px]">

                    {/* Setup Text */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(introSlide, [0, 1], [30, 0])}px)`,
                            opacity: introOpacity,
                            fontSize: '60px',
                            fontWeight: 'bold',
                            color: '#e0e0e0',
                            textAlign: 'center'
                        }}
                    >
                        كل عملية <span className="text-rose-500 text-shadow-lg shadow-rose-500/50">إيقاف أو كشف…</span>
                    </div>

                    {/* The Visual Transformation Container */}
                    <div
                        className="flex items-center gap-10"
                        style={{ opacity: interpolate(introSlide, [0, 1], [0, 1]) }}
                    >
                        {/* 1. The Shutdown Event */}
                        <div
                            className="w-40 h-40 bg-rose-900/30 border-2 border-rose-500 flex justify-center items-center rounded-3xl"
                            style={{
                                transform: `scale(${errorShrink})`,
                                filter: frame > 100 ? 'grayscale(100%)' : 'none',
                                opacity: frame > 100 ? 0.3 : 1
                            }}
                        >
                            <FileWarning size={80} className="text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]" />
                        </div>

                        {/* Arrow */}
                        <div style={{ opacity: dataExpand }}>
                            <ArrowRight size={60} className="text-gray-500" />
                        </div>

                        {/* 2. The Case Study Data */}
                        <div
                            className="w-40 h-40 bg-cyan-900/30 border-2 border-cyan-500 flex justify-center items-center rounded-3xl relative shadow-[0_0_50px_rgba(34,211,238,0.4)]"
                            style={{
                                transform: `scale(${dataExpand})`,
                            }}
                        >
                            {/* Scanning overlay frame visually researching the code */}
                            <div className="absolute inset-0 border-2 border-cyan-400 opacity-50 rounded-3xl" style={{ transform: `scale(${interpolate(frame, [150, 450], [1, 1.2])})` }}></div>
                            <FileCode2 size={80} className="text-cyan-400" />
                        </div>
                    </div>

                    {/* Punchline text */}
                    <div
                        style={{
                            transform: `scale(${interpolate(casePop, [0, 1], [0.8, 1])})`,
                            opacity: interpolate(casePop, [0, 1], [0, 1]),
                            fontSize: '70px',
                            fontWeight: 'black',
                            color: '#34d399', // Emerald 400
                            textAlign: 'center',
                            textShadow: '0 0 40px rgba(52,211,153,0.5)'
                        }}
                    >
                        تُستخدم كحالة دراسة.
                    </div>

                </div>
            </AbsoluteFill>

            {/* --- PART 2: THE 3 ADAPTATIONS --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20"
                style={{
                    opacity: p2Opacity,
                    pointerEvents: frame < 280 ? 'none' : 'auto'
                }}
            >
                <div
                    className="flex flex-col items-center gap-16 w-full max-w-[1000px]"
                    style={{ transform: `translateY(${interpolate(part2Enter, [0, 1], [50, 0])}px)` }}
                >

                    <span className="text-5xl font-bold text-gray-300 text-center mb-4">فيتم بناءً عليها:</span>

                    {/* Nodes Container */}
                    <div className="flex gap-12 w-full justify-center">

                        {/* Node 1: Modifier Tools */}
                        <div style={{ transform: `scale(${n1Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="w-36 h-36 bg-blue-900/30 border border-blue-400 flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(96,165,250,0.4)]">
                                <Wrench size={60} className="text-blue-400" />
                            </div>
                            <span className="text-4xl text-blue-200 font-medium">تعديل الأدوات</span>
                        </div>

                        {/* Node 2: Changing Methods */}
                        <div style={{ transform: `scale(${n2Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="w-36 h-36 bg-purple-900/30 border border-purple-400 flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(192,132,252,0.4)] relative overflow-hidden">
                                <GitBranch size={60} className="text-purple-400 z-10" />
                                {/* Cool background spinning gear representing method shifts */}
                                <div className="absolute w-[200px] h-[200px] border-[2px] border-dashed border-purple-500/20 rounded-full animate-spin"></div>
                            </div>
                            <span className="text-4xl text-purple-200 font-medium">تغيير الأساليب</span>
                        </div>

                        {/* Node 3: Reducing Mistakes (Bugs) */}
                        <div style={{ transform: `scale(${n3Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="w-36 h-36 bg-emerald-900/30 border border-emerald-400 flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                                <BugOff size={60} className="text-emerald-400" />
                            </div>
                            <span className="text-4xl text-emerald-200 font-bold">تقليل الأخطاء<br /><span className="text-2xl font-normal opacity-80">(السابقة)</span></span>
                        </div>

                    </div>
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
