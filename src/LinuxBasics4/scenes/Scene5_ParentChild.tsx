import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Network, Search } from 'lucide-react';

export const Scene5_ParentChild: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="PROCESS HIERARCHY ANALYSIS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div className="flex flex-col gap-8 w-full max-w-2xl">
                    {/* pstree */}
                    <div
                        className="bg-green-500/5 border border-green-500/10 p-6 rounded-2xl"
                        style={{ opacity: interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' }) }}
                    >
                        <div className="flex items-center gap-4 mb-3 text-green-500">
                            <Network className="w-8 h-8" />
                            <span className="text-2xl font-mono font-bold uppercase tracking-widest italic">$ pstree</span>
                        </div>
                        <p className="text-lg text-white/70 text-right leading-relaxed">
                            إظهار شجرة العمليات والعلاقات بين الـ <span className="text-green-500 font-bold">Parent</span> والـ <span className="text-green-500 font-bold">Child</span>.
                        </p>
                    </div>

                    {/* Security Logic */}
                    <div
                        className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl text-right"
                        style={{ opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' }) }}
                    >
                        <div className="flex items-center gap-4 mb-3 text-red-500">
                            <Search className="w-8 h-8" />
                            <span className="text-2xl font-mono font-bold uppercase tracking-widest italic">Security Audit</span>
                        </div>
                        <p className="text-lg text-white/70 leading-relaxed italic">
                            يساعد في اكتشاف الـ <span className="text-red-500 font-bold">Backdoors</span> وتتبع العمليات المشبوهة التي قد تشير لاختراق.
                        </p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
