import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
// No icons needed for this scene

export const Scene6_Concepts: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="ADVANCED MEMORY ARCHITECTURE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-3xl font-mono text-green-500 mb-12 uppercase tracking-[0.4em] opacity-60">-- CONCEPTS --</h2>

                <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
                    <ConceptItem label="Virtual Memory" desc="ذاكرة تخيلية لكل عملية" delay={10} frame={frame} />
                    <ConceptItem label="Memory Isolation" desc="عزل العمليات عن بعضها" delay={25} frame={frame} />
                    <ConceptItem label="Paging & Swapping" desc="تحسين الأداء وإدارة الموارد" delay={40} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const ConceptItem: React.FC<{ label: string; desc: string; delay: number; frame: number }> = ({ label, desc, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl" style={{ opacity }}>
            <div className="flex-grow text-right">
                <div className="text-2xl font-mono text-green-500 font-bold uppercase mb-1">{label}</div>
                <div className="text-2xl text-white font-black">{desc}</div>
            </div>
        </div>
    );
};
