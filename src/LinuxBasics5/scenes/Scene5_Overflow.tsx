import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Terminal } from 'lucide-react';

export const Scene5_Overflow: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="VULNERABILITY RECONNAISSANCE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-4xl font-mono text-red-500 mb-12 uppercase tracking-widest font-black italic underline underline-offset-12 decoration-red-500/30">🚨 Buffer Overflow</h2>

                <div
                    className="flex flex-col gap-6 w-full max-w-2xl bg-[#0a0a0a] border border-red-500/10 p-10 rounded-3xl relative overflow-hidden"
                    style={{ opacity: interpolate(frame, [10, 20], [0, 1]) }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
                    <div className="flex items-center gap-4 mb-8 text-yellow-500/60 font-mono text-2xl">
                        <Terminal className="w-8 h-8" />
                        <span>Vulnerable Code Snippet</span>
                    </div>

                    <div className="bg-black/50 p-8 rounded-xl border border-white/5 font-mono text-left mb-6">
                        <p className="text-xl text-white/50 mb-2">char buf[10];</p>
                        <p className="text-2xl text-red-500 font-bold tracking-tight">strcpy(buf, "ThisIsTooLong");</p>
                    </div>

                    <p className="text-3xl font-black text-white text-right leading-relaxed">
                        الثغرة تحدث عندما يتم كتابة بيانات <span className="text-red-500">أكبر</span> من حجم الذاكرة المخصص، مما يسمح للمهاجم بالتحكم في مسار التنفيذ.
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
