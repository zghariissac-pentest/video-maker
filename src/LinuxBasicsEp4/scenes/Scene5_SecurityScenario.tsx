import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Skull, ShieldAlert, ShieldCheck, Lock, UserMinus, Box, Zap } from 'lucide-react';

export const Scene5_SecurityScenario: React.FC = () => {
    const frame = useCurrentFrame();

    // Stages
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: The Exploit Scenario (0-10s) - frames 0-300
    const exploitOpacity = interpolate(frame, [0, 10, 290, 300], [0, 1, 1, 0]);

    // Part 2: The Security Solutions (10-20s) - frames 300-600
    const solutionOpacity = interpolate(frame, [300, 310], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_AUDIT: EXPLOITATION_SCENARIO" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🚨 HEADER */}
                <div className="absolute top-24 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-red-500/10 px-6 py-2 rounded-full border border-red-500/30 backdrop-blur-md">
                        <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="text-xl font-black text-red-500 tracking-wider">🚨 سيناريو أمني حقيقي</span>
                    </div>
                </div>

                {/* PART 1: THE EXPLOIT */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: exploitOpacity }}
                >
                    <div className="relative mb-8">
                        <Skull
                            className="w-24 h-24 text-red-600 z-10 relative"
                            style={{ transform: `scale(${1 + Math.sin(frame / 5) * 0.1})` }}
                        />
                        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
                    </div>

                    <div className="bg-red-500/10 border-2 border-red-500/40 p-10 rounded-[3rem] backdrop-blur-md max-w-2xl mb-12">
                        <p className="text-3xl font-bold leading-relaxed mb-6">
                            تخيل خدمة تعمل بصلاحيات <span className="text-red-500 italic underline underline-offset-8">root</span>، <br />
                            وبها ثغرة <span className="text-red-500 font-black italic">Remote Code Execution</span>.
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-8 bg-black border-2 border-red-500 p-8 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] animate-bounce"
                        style={{ opacity: interpolate(frame, [150, 165], [0, 1]) }}
                    >
                        <Zap className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                        <p className="text-4xl font-black text-white italic">
                            المهاجم يحصل مباشرة على صلاحيات <span className="text-red-500 underline">ROOT</span>
                        </p>
                        <Zap className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                    </div>
                </div>

                {/* PART 2: THE SECURITY LAYERS */}
                <div
                    className="flex flex-col items-center gap-8 w-full max-w-4xl"
                    style={{ opacity: solutionOpacity }}
                >
                    <div className="mb-4">
                        <GlitchText
                            text="لهذا في الأنظمة الآمنة :"
                            className="text-4xl font-black text-green-500 italic tracking-[0.2em]"
                        />
                        <div className="h-1 w-48 bg-green-500 mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 w-full">
                        <SecurityPoint
                            icon={<UserMinus className="w-8 h-8" />}
                            text="يتم تشغيل الخدمات بمستخدم محدود"
                            delay={340}
                            frame={frame}
                        />
                        <SecurityPoint
                            icon={<Box className="w-8 h-8" />}
                            text="يتم عزل العمليات (Isolation)"
                            delay={380}
                            frame={frame}
                        />
                        <SecurityPoint
                            icon={<ShieldCheck className="w-8 h-8" />}
                            text="يتم استخدام مبدأ Least Privilege"
                            delay={420}
                            frame={frame}
                        />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};

const SecurityPoint: React.FC<{ icon: React.ReactNode; text: string; delay: number; frame: number }> = ({ icon, text, delay, frame }) => {
    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    return (
        <div
            className="flex items-center gap-6 bg-green-500/10 border border-green-500/20 p-7 rounded-[2.5rem] w-full backdrop-blur-sm group hover:border-green-500 transition-colors"
            style={{
                opacity,
                transform: `translateX(${(1 - entrance) * 60}px)`
            }}
        >
            <div className="p-4 bg-green-500 text-black rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                {icon}
            </div>
            <p className="text-3xl font-black text-white text-right flex-grow italic tracking-tight">{text}</p>
            <Lock className="w-8 h-8 text-green-500/40" />
        </div>
    );
};
