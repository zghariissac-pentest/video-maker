import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, ShieldCheck, Lock } from 'lucide-react';

export const Scene4_SecurityRisk: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="PRIVILEGE ESCALATION VIRTUALIZATION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="bg-red-500/5 border border-red-500/10 p-8 rounded-2xl w-full max-w-2xl mb-10 text-right"
                    style={{ opacity: interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' }) }}
                >
                    <div className="flex items-center gap-4 mb-4 text-red-500">
                        <ShieldAlert className="w-8 h-8" />
                        <span className="text-xl font-mono font-bold uppercase tracking-wider">Security Risk: Root Process</span>
                    </div>
                    <p className="text-xl text-white font-bold leading-relaxed">
                        أي عملية تعمل بصلاحيات <span className="text-red-500 underline underline-offset-8">root</span> وبها ثغرة، تعطي المهاجم سيطرة كاملة على النظام.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <SecurityOption icon={<ShieldCheck className="w-5 h-5" />} label="Least Privilege" delay={25} frame={frame} />
                    <SecurityOption icon={<Lock className="w-5 h-5" />} label="Isolation" delay={35} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const SecurityOption: React.FC<{ icon: React.ReactNode; label: string; delay: number; frame: number }> = ({ icon, label, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div className="flex items-center gap-3 bg-green-500/5 border border-green-500/10 p-4 rounded-xl" style={{ opacity }}>
            <div className="text-green-500">{icon}</div>
            <div className="text-sm font-mono text-green-500 uppercase tracking-widest">{label}</div>
        </div>
    );
};
