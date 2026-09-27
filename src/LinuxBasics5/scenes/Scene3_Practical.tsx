import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Terminal, Activity } from 'lucide-react';

export const Scene3_Practical: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="MONITORING SUITE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div className="flex flex-col gap-10 w-full max-w-2xl">
                    {/* free -h */}
                    <div
                        className="bg-[#0a0a0a] border border-green-500/20 p-8 rounded-2xl shadow-2xl"
                        style={{ opacity: interpolate(frame, [10, 20], [0, 1]) }}
                    >
                        <div className="flex items-center gap-4 mb-6 text-green-500 font-mono text-3xl">
                            <Terminal className="w-8 h-8" />
                            <span>$ free -h</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm font-mono text-white/40 uppercase mb-4 text-center border-b border-white/5 pb-2 px-2">
                            <span>Total</span>
                            <span>Used</span>
                            <span>Free</span>
                        </div>
                        <p className="text-2xl text-white/90 font-bold text-right leading-relaxed">
                            أسرع وسيلة لمراقبة استهلاك الـ RAM و Swap في النظام.
                        </p>
                    </div>

                    {/* top */}
                    <div
                        className="bg-green-500/5 border border-green-500/10 p-8 rounded-2xl shadow-xl"
                        style={{ opacity: interpolate(frame, [30, 40], [0, 1]) }}
                    >
                        <div className="flex items-center gap-4 mb-4 text-green-500 font-mono text-2xl uppercase tracking-widest">
                            <Activity className="w-6 h-6" />
                            <span>Real-time Monitoring</span>
                        </div>
                        <p className="text-3xl font-black text-white text-right leading-relaxed mb-4">
                            استخدم <span className="text-green-500 font-mono italic">"top"</span> لمراقبة الذاكرة لكل عملية على حدة وبشكل لحظي.
                        </p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
