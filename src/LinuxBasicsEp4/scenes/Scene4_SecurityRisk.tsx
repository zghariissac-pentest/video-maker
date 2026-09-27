import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldAlert, ShieldCheck, Lock, Skull } from 'lucide-react';

export const Scene4_SecurityRisk: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    return (
        <AbsoluteFill className="bg-[#050505] overflow-hidden">
            <CyberBackground />
            <HUD title="PRIVILEGE_ESCALATION_ANALYSIS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-12 text-center" dir="rtl">

                {/* Header Section */}
                <div
                    className="flex flex-col items-center mb-16"
                    style={{ opacity: interpolate(frame, [10, 20], [0, 1]) }}
                >
                    <div className="relative mb-10">
                        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 scale-150 rounded-full animate-pulse" />
                        <Skull className="w-24 h-24 text-red-500 relative z-10" />
                    </div>
                    <GlitchText
                        text="SECURITY_RISK"
                        className="text-5xl font-black text-red-500 tracking-[0.2em] uppercase italic"
                    />
                </div>

                {/* Warning Content */}
                <div
                    className="bg-red-950/20 border border-red-500/20 p-10 rounded-3xl w-full max-w-2xl mb-14 text-right backdrop-blur-md relative"
                    style={{
                        opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' }),
                        transform: `scale(${spring({ frame: frame - 30, fps: 30 })})`
                    }}
                >
                    <div className="flex items-center gap-6 mb-8 text-red-500">
                        <ShieldAlert className="w-12 h-12 animate-bounce" />
                        <span className="text-3xl font-black font-mono uppercase tracking-widest text-red-500">ROOT PROCESS ANALYSIS</span>
                    </div>
                    <p className="text-3xl text-white font-bold leading-relaxed tracking-tight">
                        أي عملية تعمل بصلاحيات <span className="text-red-500 underline underline-offset-8 decoration-4 decoration-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]">root</span> وبها ثغرة، تعطي المهاجم سيطرة كاملة على النظام.
                    </p>

                    {/* Glowing pulse effect */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-red-500 animate-pulse" />
                </div>

                {/* Sub-points for security */}
                <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                    <SecurityOp icon={<ShieldCheck className="w-8 h-8" />} label="Least Privilege" delay={60} frame={frame} />
                    <SecurityOp icon={<Lock className="w-8 h-8" />} label="Isolation" delay={80} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const SecurityOp: React.FC<{ icon: React.ReactNode; label: string; delay: number; frame: number }> = ({ icon, label, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
    const slide = spring({ frame: frame - delay, fps: 30, config: { damping: 10 } });

    return (
        <div
            className="flex flex-col items-center gap-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
            style={{
                opacity,
                transform: `translateY(${(1 - slide) * 30}px)`
            }}
        >
            <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                {icon}
            </div>
            <div className="text-xl font-mono text-green-500 uppercase font-black tracking-widest">
                {label}
            </div>
        </div>
    );
};
