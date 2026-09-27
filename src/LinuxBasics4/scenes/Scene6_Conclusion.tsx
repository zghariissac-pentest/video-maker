import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Rocket, Activity } from 'lucide-react';

export const Scene6_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SYSTEM EXIT SEQUENCE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl" style={{ opacity }}>
                <h2 className="text-3xl font-mono text-green-500 mb-8 uppercase tracking-[0.2em] opacity-60">PROCESSES MASTERED</h2>

                <p className="text-3xl font-black text-white text-center leading-relaxed mb-12 px-10">
                    الـ Processes هي الروح التي تحرك النظام… <br />
                    <span className="text-green-500 font-bold">وفهمها هو مفتاح التحكم المطلق.</span>
                </p>

                <div className="flex items-center gap-8 bg-green-500/5 px-10 py-6 rounded-2xl border border-green-500/10 backdrop-blur-sm">
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/10">
                        <Rocket className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xl text-white opacity-40 font-bold uppercase mb-1">الحلقة القادمة</span>
                        <div className="flex gap-3 items-center">
                            <span className="text-3xl text-green-500 font-black tracking-widest uppercase">Exploitation</span>
                            <Activity className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
