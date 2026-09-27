import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, Lock, User, Skull, XCircle } from 'lucide-react';

export const Scene3_MemorySecurity: React.FC = () => {
    const frame = useCurrentFrame();

    // Transition
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Division Concept (0-7s)
    const part1Opacity = interpolate(frame, [0, 10, 200, 210], [0, 1, 1, 0]);

    // Part 2: Failed Access Example (7-14s)
    const part2Opacity = interpolate(frame, [210, 220, 410, 420], [0, 1, 1, 0]);

    // Part 3: Root Vuln Scenario (14-20s)
    const part3Opacity = interpolate(frame, [420, 430], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_AUDIT: MEMORY_POLICIES" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🛡️ HEADER */}
                <div className="absolute top-24 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-red-500/10 px-6 py-2 rounded-full border border-red-500/30 backdrop-blur-md">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        <span className="text-xl font-black text-red-500 tracking-wider">🔒 علاقة Memory بالأمان</span>
                    </div>
                </div>

                {/* PART 1: Division Concept */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: part1Opacity }}
                >
                    <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-2xl">
                        <p className="text-4xl font-black text-white leading-relaxed">
                            كل عملية تعمل في <span className="text-blue-400 italic">User Space</span> <br />
                            أو <span className="text-red-500 italic">Kernel Space</span> حسب الصلاحيات.
                        </p>
                    </div>
                    <div className="flex gap-12 mt-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/40">
                                <User className="w-12 h-12 text-blue-400" />
                            </div>
                            <span className="font-mono text-xl opacity-60 italic">User Process</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/40">
                                <Lock className="w-12 h-12 text-red-500" />
                            </div>
                            <span className="font-mono text-xl opacity-60 italic">Kernel Core</span>
                        </div>
                    </div>
                </div>

                {/* PART 2: Failed Access Example */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: part2Opacity }}
                >
                    <div className="flex flex-col items-center gap-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 scale-150 rounded-full animate-pulse" />
                            <XCircle className="w-24 h-24 text-red-500 relative z-10" />
                        </div>
                        <p className="text-4xl font-black text-white leading-tight max-w-2xl px-8">
                            إذا عملية عادية حاولت الوصول للـ <span className="text-red-500 underline underline-offset-8">Kernel Memory</span> ...
                        </p>
                        <div className="bg-red-950/40 border-2 border-red-500 px-12 py-6 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <GlitchText text="ACCESS_DENIED_SEC_FAULT" className="text-3xl font-mono text-red-500 font-black" />
                        </div>
                        <p className="text-2xl text-white/50 italic font-bold">يحدث فشل حماية فوراً.</p>
                    </div>
                </div>

                {/* PART 3: Root Vuln Scenario */}
                <div
                    className="flex flex-col items-center gap-12"
                    style={{ opacity: part3Opacity }}
                >
                    <div className="bg-red-500/5 border-2 border-red-500/30 p-12 rounded-[3.5rem] backdrop-blur-md relative transform -rotate-1">
                        <Skull className="absolute -top-10 -right-10 w-24 h-24 text-red-500/20 rotate-12" />
                        <div className="flex items-center gap-6 mb-8 text-red-500">
                            <ShieldAlert className="w-14 h-14 animate-bounce" />
                            <span className="text-4xl font-black italic tracking-widest uppercase">Exploit Vector</span>
                        </div>
                        <p className="text-3xl font-bold text-white text-right leading-relaxed tracking-tight">
                            إذا خدمة تعمل بصلاحيات <span className="text-red-500 font-black italic underline underline-offset-8">root</span> مع ثغرة → <br />
                            يمكن للمهاجم الوصول للذاكرة <span className="text-red-500 italic decoration-double line-through opacity-80 decoration-white/20">الحساسة</span>.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-block px-10 py-5 bg-red-500 rounded-3xl border-2 border-red-300 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                                <span className="text-3xl font-black text-black">TOTAL_SYSTEM_COMPROMISE</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
