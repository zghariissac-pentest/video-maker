import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';

export const Scene1_Intro: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="USER ACCESS CONTROL" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <GlitchText
                    text="Linux Basics Ep 3"
                    className="text-4xl md:text-5xl font-mono text-white mb-6 uppercase"
                />
                <GlitchText
                    text="Users & Permissions"
                    className="text-5xl md:text-7xl font-mono text-green-500 font-bold uppercase tracking-widest mb-10"
                    delay={30}
                />
                <div className="h-1 w-32 bg-green-500 rounded-full" />
            </div>
        </AbsoluteFill>
    );
};
