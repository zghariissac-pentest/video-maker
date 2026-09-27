import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldCheck, User, Lock, ArrowRight, ShieldAlert } from 'lucide-react';

export const Scene4_Permissions: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Transition
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Main Concept (0-4s)
    const part1Opacity = interpolate(frame, [0, 10, 110, 120], [0, 1, 1, 0]);
    const part1Scale = spring({ frame, fps: FPS, config: { damping: 12 } });

    // Part 2: Example (4-10s)
    const part2Opacity = interpolate(frame, [120, 130], [0, 1], { extrapolateRight: 'clamp' });
    const exampleEntry = spring({ frame: frame - 130, fps: FPS, config: { damping: 10 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_MODULE: PROCESS_PERMISSIONS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🛡️ HEADER */}
                <div className="absolute top-24 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-red-500/10 px-6 py-2 rounded-full border border-red-500/30 backdrop-blur-md">
                        <Lock className="w-5 h-5 text-red-500" />
                        <span className="text-xl font-black text-red-500 tracking-wider">🔐 صلاحيات العمليات</span>
                    </div>
                </div>

                {/* PART 1: The Concept */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part1Opacity,
                        transform: `scale(${part1Scale})`
                    }}
                >
                    <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-2xl relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-5 bg-green-500 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                            <ShieldCheck className="w-12 h-12 text-black" />
                        </div>
                        <p className="text-4xl font-black text-white leading-[1.4] mt-6">
                            كل <span className="text-green-500 italic">Process</span> تعمل بصلاحيات <br />
                            المستخدم الذي شغلها.
                        </p>
                    </div>
                </div>

                {/* PART 2: The Example */}
                <div
                    className="flex flex-col items-center gap-10 w-full max-w-3xl"
                    style={{
                        opacity: part2Opacity,
                        transform: `translateY(${(1 - exampleEntry) * 50}px)`
                    }}
                >
                    <GlitchText
                        text="مثال :"
                        className="text-4xl font-black text-red-500 uppercase italic tracking-widest"
                    />

                    <div className="w-full bg-red-950/20 border-2 border-red-500/30 p-10 rounded-[3rem] backdrop-blur-md flex flex-col items-center gap-8 relative overflow-hidden">
                        {/* Background Pulse */}
                        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />

                        <div className="flex items-center gap-6 z-10">
                            <div className="flex flex-col items-center gap-2">
                                <User className="w-12 h-12 text-red-500" />
                                <span className="font-mono text-xl font-black">root</span>
                            </div>
                            <ArrowRight className="w-10 h-10 text-white/20 rotate-180" />
                            <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/40">
                                <span className="text-2xl font-bold font-mono text-white">Service</span>
                            </div>
                        </div>

                        <div className="h-[2px] w-full bg-gradient-to-l from-transparent via-red-500/50 to-transparent z-10" />

                        <p className="text-3xl font-bold text-white leading-relaxed z-10">
                            إذا شغّل <span className="text-red-500 underline underline-offset-8">root</span> خدمة معينة، <br />
                            فالعملية تعمل بصلاحيات <span className="text-red-500 font-black italic">root</span>.
                        </p>

                        <ShieldAlert className="absolute bottom-6 right-8 w-16 h-16 text-red-500 opacity-20" />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
