import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Network, Search, ArrowDownRight, GitBranch } from 'lucide-react';

export const Scene5_ParentChild: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    return (
        <AbsoluteFill className="bg-[#050505] overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_ARCH: PROCESS_HIERARCHY" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-12" dir="rtl">

                {/* Title */}
                <div
                    className="flex flex-col items-center mb-16"
                    style={{ opacity: interpolate(frame, [0, 15], [0, 1]) }}
                >
                    <GitBranch className="w-16 h-16 text-green-500 mb-6 animate-pulse" />
                    <GlitchText
                        text="Process Hierarchy"
                        className="text-4xl font-black text-white tracking-tighter uppercase italic"
                    />
                </div>

                <div className="flex flex-col gap-10 w-full max-w-2xl">

                    {/* Visual Tree Component */}
                    <div className="relative border-r-4 border-green-500/20 pr-10 space-y-8">

                        <div
                            className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl relative"
                            style={{ opacity: interpolate(frame, [20, 35], [0, 1]) }}
                        >
                            <div className="flex items-center gap-4 text-green-500 mb-2">
                                <Network className="w-6 h-6" />
                                <span className="text-xl font-black font-mono tracking-widest uppercase">$ pstree</span>
                            </div>
                            <p className="text-2xl text-white font-bold text-right italic leading-relaxed">
                                إظهار شجرة العمليات والعلاقات بين الـ <span className="text-green-400 underline underline-offset-4 decoration-2 decoration-green-400 italic">Parent</span> والـ <span className="text-green-400 underline underline-offset-4 decoration-2 decoration-green-400 italic">Child</span>.
                            </p>
                        </div>

                        {/* Connection Arrow */}
                        <div
                            className="flex justify-start pr-12 text-green-500/40"
                            style={{ opacity: interpolate(frame, [40, 50], [0, 1]) }}
                        >
                            <ArrowDownRight className="w-12 h-12" />
                        </div>

                        {/* Child Box / Security Box */}
                        <div
                            className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl text-right backdrop-blur-md relative transform -rotate-1 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
                            style={{
                                opacity: interpolate(frame, [50, 65], [0, 1]),
                                transform: `rotate(-1deg) translateX(${(1 - spring({ frame: frame - 50, fps: 30 })) * -50}px)`
                            }}
                        >
                            <div className="flex items-center gap-6 mb-6 text-red-500">
                                <Search className="w-10 h-10 animate-pulse" />
                                <span className="text-2xl font-black font-mono tracking-widest uppercase">Security Audit Point</span>
                            </div>
                            <p className="text-2xl text-white leading-relaxed font-bold italic tracking-tight">
                                يساعد في اكتشاف الـ <span className="text-red-500 underline underline-offset-8 decoration-red-500 decoration-4 shadow-[0_0_15px_rgba(239,68,68,0.3)] italic">Backdoors</span> وتتبع العمليات المشبوهة التي قد تشير لاختراق.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </AbsoluteFill>
    );
};
