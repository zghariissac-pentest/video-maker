import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Brain } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SYSTEM MEMORY AUDIT" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl" style={{ opacity }}>
                <div className="p-5 bg-green-500/10 rounded-3xl border border-green-500/20 mb-8 inline-block shadow-[0_0_50px_rgba(34,197,94,0.05)]">
                    <Brain className="w-16 h-16 text-green-500" />
                </div>
                <GlitchText
                    text="Linux Basics Ep 5"
                    className="text-4xl font-mono text-white mb-6 uppercase tracking-[0.2em]"
                />
                <GlitchText
                    text="Memory Management"
                    className="text-6xl font-mono text-green-500 font-bold uppercase tracking-widest mb-10"
                    delay={25}
                />
                <div className="h-1 w-32 bg-green-500/20 rounded-full" />
            </div>
        </AbsoluteFill>
    );
};
