import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Cpu, Database, Target } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Entrance
    const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Recap Processes (0-3.5s)
    const part1Opacity = interpolate(frame, [0, 10, 95, 105], [0, 1, 1, 0]);
    const part1Slide = spring({ frame, fps: FPS, config: { damping: 12 } });

    // Part 2: Need for Memory (3.5-7s)
    const part2Opacity = interpolate(frame, [105, 115, 200, 210], [0, 1, 1, 0]);
    const part2Scale = spring({ frame: frame - 115, fps: FPS, config: { damping: 10 } });

    // Part 3: Main Topic Reveal (Memory) (7-10s)
    const part3Opacity = interpolate(frame, [210, 220], [0, 1], { extrapolateRight: 'clamp' });
    const part3Slide = spring({ frame: frame - 210, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_MODULE: MEMORY_MANAGEMENT" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🎯 HEADER */}
                <div className="absolute top-32 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                        <Target className="w-5 h-5 text-green-500" />
                        <span className="text-xl font-black text-green-500 tracking-wider">🎯 المقدمة</span>
                    </div>
                </div>

                {/* PART 1: RECAP PROCESSES */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part1Opacity,
                        transform: `translateY(${(1 - part1Slide) * 40}px)`
                    }}
                >
                    <div className="p-4 bg-green-500/10 rounded-3xl border border-green-500/20 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                        <Cpu className="w-20 h-20 text-green-500" />
                    </div>
                    <p className="text-4xl font-bold leading-relaxed max-w-2xl">
                        كما فهمنا في الحلقة السابقة <span className="text-green-500 italic">Processes</span>،
                    </p>
                </div>

                {/* PART 2: THE NEED FOR MEMORY */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part2Opacity,
                        transform: `scale(${part2Scale})`
                    }}
                >
                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/30 mb-8 animate-pulse">
                        <Database className="w-16 h-16 text-red-500" />
                    </div>
                    <p className="text-4xl font-bold leading-relaxed max-w-2xl">
                        كل عملية تحتاج إلى <span className="text-red-500 font-black italic underline underline-offset-8">ذاكرة</span> لتعمل.
                    </p>
                </div>

                {/* PART 3: REVEAL MEMORY MANAGEMENT */}
                <div
                    className="flex flex-col items-center gap-10"
                    style={{
                        opacity: part3Opacity,
                        transform: `translateY(${(1 - part3Slide) * -30}px)`
                    }}
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative px-16 py-10 bg-green-500 rounded-[3rem] border-2 border-green-300 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                            <GlitchText
                                text="Memory Management"
                                className="text-6xl font-black text-black tracking-tighter"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                        <p className="text-3xl font-bold text-white leading-[1.3]">
                            اليوم سنتعلم كيف يدير <span className="text-green-500">Linux</span> هذه الذاكرة،
                        </p>
                        <p className="text-2xl text-white/50 italic leading-relaxed">
                            ولماذا هذا مهم لأي شخص يريد فهم النظام بعمق.
                        </p>
                    </div>
                </div>

            </div>

            {/* Sub-Title / Episode Overlay */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
                <GlitchText
                    text="Ep 5 — Memory in Linux"
                    className="text-2xl font-mono text-white/30 uppercase tracking-[0.4em]"
                    delay={10}
                />
            </div>
        </AbsoluteFill>
    );
};
