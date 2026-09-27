import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Rocket } from 'lucide-react';

export const Scene5_Conclusion: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SYSTEM EXIT SEQUENCE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-4xl font-mono text-green-500 mb-10 uppercase tracking-widest underline underline-offset-8">SECURITY THROUGH CLARITY</h2>

                <p className="text-4xl font-black text-white text-center leading-relaxed mb-16 px-10 italics">
                    Linux آمن لأن صلاحياته واضحة… <br /> <span className="text-green-500 font-bold italic">دقة تحكم غير مسبوقة.</span>
                </p>

                <div className="flex items-center gap-10 bg-green-500/5 px-14 py-8 rounded-full border border-green-500/20 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                    <div className="p-4 bg-green-500/10 rounded-2xl"><Rocket className="w-10 h-10 text-green-500" /></div>
                    <div className="flex flex-col text-right">
                        <span className="text-2xl text-white opacity-40 font-black uppercase mb-2">الحلقة القادمة</span>
                        <span className="text-4xl text-green-500 font-black tracking-tight tracking-widest uppercase">Processes & Exploit</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
