import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Fingerprint, Database, User, Cpu } from 'lucide-react';

export const Scene2_WhatIsProcess: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="PROCESS DATA STRUCTURE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-2xl font-mono text-green-500 mb-10 uppercase tracking-[0.4em] opacity-60">-- DEFINITION --</h2>

                <div className="flex flex-col gap-4 w-full max-w-xl">
                    <ProcessStat icon={<Fingerprint className="w-5 h-5" />} label="PID" value="معرّف العملية الفريد" delay={5} frame={frame} />
                    <ProcessStat icon={<Database className="w-5 h-5" />} label="MEMORY" value="حجز مساحة في الذاكرة" delay={15} frame={frame} />
                    <ProcessStat icon={<User className="w-5 h-5" />} label="OWNER" value="المستخدم المشغل للعملية" delay={25} frame={frame} />
                    <ProcessStat icon={<Cpu className="w-5 h-5" />} label="CPU" value="استهلاك موارد المعالج" delay={35} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const ProcessStat: React.FC<{ icon: React.ReactNode; label: string; value: string; delay: number; frame: number }> = ({ icon, label, value, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-xl" style={{ opacity }}>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500 border border-green-500/10">{icon}</div>
            <div className="flex-grow text-right">
                <div className="text-xs font-mono text-green-500/50 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-xl text-white font-bold">{value}</div>
            </div>
        </div>
    );
};
