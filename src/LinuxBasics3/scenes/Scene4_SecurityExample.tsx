import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, FileText } from 'lucide-react';

export const Scene4_SecurityExample: React.FC = () => {

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SECURITY VULNERABILITY AUDIT" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-4xl font-mono text-red-500 mb-16 underline underline-offset-8">مثال أمني حقيقي</h2>

                <div className="flex flex-col gap-10 w-full max-w-4xl">
                    <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-2xl relative">
                        <div className="absolute top-4 right-4 text-red-500/10 animate-pulse"><ShieldAlert className="w-10 h-10" /></div>
                        <div className="flex items-center gap-6 mb-4">
                            <FileText className="w-10 h-10 text-yellow-400" />
                            <span className="text-3xl font-mono text-white opacity-60">config.php</span>
                        </div>
                        <div className="text-center">
                            <span className="text-5xl font-mono font-black text-red-500 tracking-[0.2em] shadow-lg">-rw-rw-rw-</span>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-white text-center leading-relaxed mt-6 drop-shadow-lg">
                        أي شخص على النظام يمكنه قراءته. <br /> <span className="text-red-500 font-bold decoration-red-500 underline underline-offset-10">وهنا تحدث الكارثة.</span>
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
