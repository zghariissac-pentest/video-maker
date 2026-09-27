import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Rocket, ShieldCheck } from 'lucide-react';

export const Scene7_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SYSTEM EXIT SEQUENCE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl" style={{ opacity }}>
                <h2 className="text-3xl font-mono text-green-500 mb-8 uppercase tracking-[0.2em] opacity-60 italic">MEMORY AUDIT COMPLETE</h2>

                <p className="text-4xl font-black text-white text-center leading-relaxed mb-12 px-10">
                    فهم الذاكرة هو مفتاح فهم الأمان… <br />
                    <span className="text-green-500 font-bold decoration-green-500/20 underline underline-offset-12">بوابة الهاكر والمهندس المحترف.</span>
                </p>

                <div className="flex items-center gap-10 bg-green-500/5 px-12 py-8 rounded-2xl border border-green-500/10 backdrop-blur-sm">
                    <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/10 shadow-inner">
                        <Rocket className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-2xl text-white opacity-40 font-bold uppercase mb-1">الحلقة القادمة</span>
                        <div className="flex gap-3 items-center">
                            <span className="text-4xl text-green-500 font-black tracking-widest uppercase">Binary Exploitation</span>
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
