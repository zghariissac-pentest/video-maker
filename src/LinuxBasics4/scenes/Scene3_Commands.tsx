import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Terminal, Activity } from 'lucide-react';

export const Scene3_Commands: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="COMMAND EXECUTION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div className="flex flex-col gap-8 w-full max-w-2xl">
                    {/* ps aux */}
                    <div
                        className="bg-[#0a0a0a] border border-green-500/10 p-6 rounded-xl"
                        style={{ opacity: interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' }) }}
                    >
                        <div className="flex items-center gap-4 mb-3 text-green-500 font-mono text-xl">
                            <Terminal className="w-5 h-5" />
                            <span>$ ps aux</span>
                        </div>
                        <p className="text-lg text-white/70 text-right leading-relaxed">
                            عرض شامل لكل العمليات في النظام، مع تفاصيل لـ CPU والذاكرة.
                        </p>
                    </div>

                    {/* top */}
                    <div
                        className="bg-green-500/5 border border-green-500/10 p-6 rounded-xl"
                        style={{ opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' }) }}
                    >
                        <div className="flex items-center gap-4 mb-3 text-green-500 font-mono text-xl">
                            <Activity className="w-5 h-5" />
                            <span>$ top</span>
                        </div>
                        <p className="text-lg text-white/70 text-right leading-relaxed">
                            مراقب العمليات اللحظي. يحدّث البيانات تلقائياً لمراقبة الاستهلاك.
                        </p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
