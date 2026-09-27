import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ArabicGlitchText } from '../components/ArabicGlitchText';
import { Tor } from 'developer-icons';

export const Intro: React.FC = () => {
    return (
        <AbsoluteFill className="bg-black">
            <CyberBackground />
            <HUD title="TOP SECRET - TOR + VPN" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-20 text-center gap-12">
                <div className="bg-green-500/10 p-10 rounded-3xl border border-green-500/30 flex flex-col items-center shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                    <Tor size={200} className="text-green-500 mb-8 animate-pulse" />
                    <div className="flex gap-4 items-center">
                        <div className="w-20 h-1 bg-green-500/50" />
                        <div className="text-green-500 font-mono text-2xl tracking-widest">VPN + TOR</div>
                        <div className="w-20 h-1 bg-green-500/50" />
                    </div>
                </div>

                <ArabicGlitchText
                    text="استخدام Tor و VPN لا يجعلك غير مرئي…"
                    className="text-6xl font-bold text-white mb-4"
                />
                <ArabicGlitchText
                    text="وإليك السبب."
                    className="text-5xl text-green-500 font-bold"
                    delay={60}
                />
            </div>
        </AbsoluteFill>
    );
};
