import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Database, HardDrive, Shield, User } from 'lucide-react';

export const Scene2_Types: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="MEMORY SEGMENTATION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-3xl font-mono text-green-500 mb-12 uppercase tracking-[0.4em] opacity-60">-- MEMORY TYPES --</h2>

                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                    <MemoryCard icon={<Database className="w-8 h-8" />} label="RAM" desc="الذاكرة الفعلية" delay={10} frame={frame} />
                    <MemoryCard icon={<HardDrive className="w-8 h-8" />} label="Swap" desc="مساحة من القرص" delay={20} frame={frame} />
                    <MemoryCard icon={<Shield className="w-8 h-8" />} label="Kernel Space" desc="ذاكرة النظام" delay={30} frame={frame} />
                    <MemoryCard icon={<User className="w-8 h-8" />} label="User Space" desc="ذاكرة العمليات" delay={40} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const MemoryCard: React.FC<{ icon: React.ReactNode; label: string; desc: string; delay: number; frame: number }> = ({ icon, label, desc, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl" style={{ opacity }}>
            <div className="p-4 bg-green-500/10 rounded-xl text-green-500 border border-green-500/10">
                {icon}
            </div>
            <div className="text-right">
                <div className="text-xl font-mono text-green-500 font-bold uppercase mb-1 tracking-wider">{label}</div>
                <div className="text-2xl text-white font-black">{desc}</div>
            </div>
        </div>
    );
};
