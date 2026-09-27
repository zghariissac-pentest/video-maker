import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, Cpu, Target } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Overall entrance
    const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Recap (0-3.5s)
    const part1Opacity = interpolate(frame, [0, 10, 95, 105], [0, 1, 1, 0]);
    const part1Slide = spring({ frame, fps: FPS, config: { damping: 12 } });

    // Part 2: Pivot to Processes (3.5-7s)
    const part2Opacity = interpolate(frame, [105, 115, 200, 210], [0, 1, 1, 0]);
    const part2Scale = spring({ frame: frame - 115, fps: FPS, config: { damping: 10 } });

    // Part 3: Definition & Question (7-10s)
    const part3Opacity = interpolate(frame, [210, 220], [0, 1], { extrapolateRight: 'clamp' });
    const part3Slide = spring({ frame: frame - 210, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_MODULE: PROCESS_MANAGEMENT" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🎬 HEADER (Always visible or semi-persistent) */}
                <div className="absolute top-32 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                        <Target className="w-5 h-5 text-green-500" />
                        <span className="text-xl font-black text-green-500 tracking-wider">🎯 المقدمة</span>
                    </div>
                </div>

                {/* PART 1: RECAP */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part1Opacity,
                        transform: `translateY(${(1 - part1Slide) * 40}px)`
                    }}
                >
                    <div className="p-4 bg-green-500/10 rounded-3xl border border-green-500/20 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                        <ShieldAlert className="w-20 h-20 text-green-500" />
                    </div>
                    <p className="text-4xl font-bold leading-relaxed max-w-2xl">
                        كما فهمنا الصلاحيات في الحلقة السابقة،
                    </p>
                </div>

                {/* PART 2: THE REVEAL */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part2Opacity,
                        transform: `scale(${part2Scale})`
                    }}
                >
                    <p className="text-3xl font-mono text-white/60 mb-6 uppercase tracking-[0.3em]">اليوم سنفهم :</p>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative px-16 py-8 bg-green-500 rounded-[2.5rem] border-2 border-green-300 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                            <GlitchText
                                text="العمليات Processes"
                                className="text-6xl font-black text-black tracking-tighter"
                            />
                        </div>
                    </div>
                </div>

                {/* PART 3: DEFINITION & QUESTION */}
                <div
                    className="flex flex-col items-center gap-10"
                    style={{
                        opacity: part3Opacity,
                        transform: `translateY(${(1 - part3Slide) * -30}px)`
                    }}
                >
                    <div className="p-4 bg-white/5 rounded-full border border-white/10 animate-pulse">
                        <Cpu className="w-16 h-16 text-white" />
                    </div>

                    <div className="space-y-6">
                        <p className="text-4xl font-black text-white leading-tight">
                            كل برنامج تشغّله في Linux يتحول إلى <span className="text-green-500 italic">Process</span>.
                        </p>
                        <div className="h-1 w-24 bg-green-500/30 mx-auto rounded-full" />
                        <p className="text-3xl font-bold text-green-500/80 italic">
                            لكن ما الذي يحدث فعلياً؟
                        </p>
                    </div>
                </div>

            </div>

            {/* Sub-Title / Episode Overlay */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
                <GlitchText
                    text="الحلقة 4 Processes في Linux"
                    className="text-2xl font-mono text-white/30 uppercase tracking-[0.4em]"
                    delay={10}
                />
            </div>
        </AbsoluteFill>
    );
};
