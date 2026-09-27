import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, Fingerprint, Lock } from 'lucide-react';

export const Scene4_Security: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SECURITY DOMAIN ISOLATION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="bg-red-500/5 border border-red-500/20 p-10 rounded-3xl w-full max-w-3xl mb-10 text-right backdrop-blur-sm"
                    style={{ opacity: interpolate(frame, [10, 20], [0, 1]) }}
                >
                    <div className="flex items-center gap-6 mb-8 text-red-500">
                        <ShieldAlert className="w-12 h-12" />
                        <span className="text-3xl font-mono font-bold uppercase tracking-widest italic">Memory Restriction</span>
                    </div>
                    <p className="text-3xl text-white font-black leading-relaxed">
                        العمليات في <span className="text-red-500 font-mono italic underline underline-offset-8 decoration-red-500/30">User Space</span> لا تملك صلاحية الوصول للـ <span className="text-red-500 font-mono italic underline underline-offset-8 decoration-red-500/30">Kernel Memory</span>.
                    </p>
                </div>

                <div
                    className="flex justify-center flex-row-reverse gap-8 w-full max-w-2xl"
                    style={{ opacity: interpolate(frame, [30, 40], [0, 1]) }}
                >
                    <div className="flex items-center gap-4 bg-green-500/5 border border-green-500/20 p-6 rounded-2xl flex-1">
                        <Lock className="w-8 h-8 text-green-500" />
                        <span className="text-2xl font-mono text-green-500 font-black tracking-widest">ISOLATION</span>
                    </div>
                    <div className="flex items-center gap-4 bg-green-500/5 border border-green-500/20 p-6 rounded-2xl flex-1">
                        <Fingerprint className="w-8 h-8 text-green-500" />
                        <span className="text-2xl font-mono text-green-500 font-black tracking-widest">PRIVACY</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
