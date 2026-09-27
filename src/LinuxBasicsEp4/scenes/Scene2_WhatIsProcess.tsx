import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Settings, Terminal, Database, Fingerprint, User, Lock, ArrowRight } from 'lucide-react';

export const Scene2_WhatIsProcess: React.FC = () => {
    const frame = useCurrentFrame();

    // Entrance
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Heading & Definition (0-5s)
    const part1Opacity = interpolate(frame, [0, 10, 140, 150], [0, 1, 1, 0]);

    // Part 2: Example Command (5-8s)
    const part2Opacity = interpolate(frame, [150, 160, 230, 240], [0, 1, 1, 0]);

    // Part 3: Steps (8-20s) - Total scene length 20s
    const part3Opacity = interpolate(frame, [240, 250], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="PROCESS_LIFECYCLE: DEFINITION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* ⚙️ HEADER */}
                <div className="absolute top-24 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                        <Settings className="w-5 h-5 text-green-500 animate-spin-slow" />
                        <span className="text-xl font-black text-green-500 tracking-wider">⚙️ ما هي الـ Process؟</span>
                    </div>
                </div>

                {/* PART 1: Definition */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{ opacity: part1Opacity }}
                >
                    <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-xl">
                        <p className="text-3xl text-white/60 mb-8 font-mono">الـ Process هي:</p>
                        <GlitchText
                            text="نسخة قيد التنفيذ من برنامج."
                            className="text-5xl font-black text-white tracking-tight"
                        />
                    </div>
                </div>

                {/* PART 2: The Example */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{ opacity: part2Opacity }}
                >
                    <p className="text-3xl font-bold mb-10">عندما تشغل:</p>
                    <div className="flex items-center gap-6 bg-black border-2 border-green-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                        <Terminal className="w-12 h-12 text-green-500" />
                        <span className="text-5xl font-mono text-white font-black">$ firefox</span>
                        <div className="w-4 h-10 bg-green-500 animate-pulse" />
                    </div>
                </div>

                {/* PART 3: The Steps */}
                <div
                    className="flex flex-col items-center gap-8 w-full max-w-4xl"
                    style={{ opacity: part3Opacity }}
                >
                    <h3 className="text-3xl font-black text-green-500 mb-6 italic underline underline-offset-8 decoration-2 shadow-sm font-sans tracking-wide">Linux يقوم بـ:</h3>

                    <div className="grid grid-cols-1 gap-5 w-full">
                        <ProcessStep
                            icon={<Database className="w-8 h-8" />}
                            text="تحميل البرنامج في الذاكرة"
                            delay={260}
                            frame={frame}
                        />
                        <ProcessStep
                            icon={<Fingerprint className="w-8 h-8" />}
                            text="تخصيص PID (Process ID)"
                            delay={290}
                            frame={frame}
                        />
                        <ProcessStep
                            icon={<User className="w-8 h-8" />}
                            text="تحديد المستخدم الذي يشغله"
                            delay={320}
                            frame={frame}
                        />
                        <ProcessStep
                            icon={<Lock className="w-8 h-8" />}
                            text="ربطه بصلاحيات معينة"
                            delay={350}
                            frame={frame}
                        />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};

const ProcessStep: React.FC<{ icon: React.ReactNode; text: string; delay: number; frame: number }> = ({ icon, text, delay, frame }) => {
    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 10 } });
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: 'clamp' });

    return (
        <div
            className="flex items-center gap-6 bg-green-500/5 border border-green-500/10 p-6 rounded-2xl w-full"
            style={{
                opacity,
                transform: `translateX(${(1 - entrance) * 50}px)`
            }}
        >
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500 border border-green-500/20">
                {icon}
            </div>
            <p className="text-2xl font-bold text-white text-right flex-grow">{text}</p>
            <ArrowRight className="w-6 h-6 text-green-500/30 rotate-180" />
        </div>
    );
};
