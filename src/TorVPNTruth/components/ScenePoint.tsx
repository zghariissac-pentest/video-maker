import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ArabicGlitchText } from '../components/ArabicGlitchText';

interface ScenePointProps {
    title: string;
    subtitle?: string;
    description: string;
    Icon?: React.FC<{ size?: number; className?: string }>;
}

export const ScenePoint: React.FC<ScenePointProps> = ({ title, subtitle, description, Icon }) => {
    const frame = useCurrentFrame();

    const contentStart = 30;
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-black overflow-hidden">
            <CyberBackground />
            <HUD title={subtitle || "SECURITY ADVISORY"} />

            <div className="z-10 flex flex-col justify-center h-full px-24 text-right items-end" style={{ opacity }}>
                <div className="flex gap-8 items-center mb-12">
                    <ArabicGlitchText
                        text={title}
                        className="text-7xl font-bold text-green-500 uppercase tracking-tight"
                    />
                    {Icon && (
                        <div className="p-10 bg-green-500/10 border-2 border-green-500/50 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse">
                            <Icon size={120} className="text-green-500" />
                        </div>
                    )}
                </div>

                <div className="w-full max-w-5xl bg-gray-900/40 p-12 border-l-8 border-green-500/80 rounded-r-3xl backdrop-blur-md">
                    <ArabicGlitchText
                        text={description}
                        className="text-4xl leading-relaxed text-gray-100 font-bold"
                        delay={contentStart}
                    />
                </div>

                {/* Dynamic Binary Stream */}
                <div className="mt-12 overflow-hidden w-full flex gap-4 opacity-30 font-mono text-green-500 text-sm whitespace-nowrap">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                            {Array.from({ length: 40 }).map(() => random(frame + i) > 0.5 ? '1' : '0').join('')}
                        </div>
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
