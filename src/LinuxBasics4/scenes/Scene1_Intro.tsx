import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Activity } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="SYSTEM PROCESS ANALYSIS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl" style={{ opacity }}>
                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 mb-8 inline-block">
                    <Activity className="w-12 h-12 text-green-500" />
                </div>
                <GlitchText
                    text="Linux Basics Ep 4"
                    className="text-3xl font-mono text-white mb-4 uppercase tracking-[0.2em]"
                />
                <GlitchText
                    text="Processes in Linux"
                    className="text-5xl font-mono text-green-500 font-bold uppercase tracking-widest mb-10"
                    delay={20}
                />
                <div className="h-0.5 w-24 bg-green-500/30 rounded-full" />
            </div>
        </AbsoluteFill>
    );
};
