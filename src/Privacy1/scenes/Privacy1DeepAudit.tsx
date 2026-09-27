import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import { ShieldCheck, Globe, Lock } from 'lucide-react';

const AuditLine: React.FC<{ text: string, startFrame: number, fontSize?: string, color?: string }> = ({ text, startFrame, fontSize = "text-5xl", color = "text-white/80" }) => {
    return (
        <OnionTransition startFrame={startFrame} duration={25}>
            <p className={`${fontSize} ${color} font-bold leading-relaxed tracking-tight`}>
                {text}
            </p>
        </OnionTransition>
    );
};

export const Privacy1DeepAudit: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 45 }
    });

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                style={{
                    transform: `scale(${interpolate(entrance, [0, 1], [0.98, 1])})`,
                    opacity: entrance
                }}
                className="w-full h-full flex flex-col items-center justify-center gap-32 py-20"
            >
                <div className="flex gap-24 items-center justify-center">
                    <GlassPanel className="w-[850px] p-16 border-white/5 bg-black/40 rounded-[4rem] shadow-2xl relative">
                        <div className="flex flex-col gap-16">
                            <div className="flex items-center justify-between border-b border-white/5 pb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                                    <span className="text-white/40 font-mono text-xs tracking-[0.6em] uppercase font-black">Audit Sequence</span>
                                </div>
                                <span className="text-white/20 font-mono text-[10px] uppercase">Node: Isolated</span>
                            </div>

                            <div className="grid grid-cols-2 gap-16">
                                <div className="flex flex-col gap-4">
                                    <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Connection State</span>
                                    <div className="flex items-center gap-5">
                                        <Globe className="text-cyan-400" size={32} />
                                        <div className="flex flex-col">
                                            <span className="text-white text-3xl font-black font-mono">104.28.14.212</span>
                                            <span className="text-cyan-500/40 text-[10px] font-bold uppercase tracking-widest mt-1">Virtual Gateway</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Authentication</span>
                                    <div className="flex items-center gap-5">
                                        <Lock className="text-red-500/60" size={32} />
                                        <div className="flex flex-col">
                                            <span className="text-white text-3xl font-black font-mono uppercase">NONE</span>
                                            <span className="text-red-500/30 text-[10px] font-bold uppercase tracking-widest mt-1">Safe Execution</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-500/5 border border-cyan-500/20 py-8 rounded-[2.5rem] flex items-center justify-center gap-6">
                                <ShieldCheck className="text-cyan-400" size={32} />
                                <span className="text-cyan-400 font-black text-2xl uppercase tracking-[0.4em]">Isolated Environment</span>
                            </div>
                        </div>
                    </GlassPanel>
                </div>

                <div className="text-center space-y-12 max-w-[1400px]" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <AuditLine
                        text="بدون تسجيل دخول، بدون Cookies، جلسة جديدة بالكامل."
                        startFrame={35}
                    />
                    <AuditLine
                        text="IP مختلف، Network مختلف، وبيئة تبدو منفصلة تمامًا."
                        startFrame={110}
                    />
                    <div className="pt-8">
                        <AuditLine
                            text="لا يوجد أي identifier مباشر داخل الطلب، ولا أي شيء يمكن ربطه بهويتك."
                            startFrame={200}
                            fontSize="text-7xl"
                            color="text-white font-black drop-shadow-[0_20px_40px_rgba(0,0,0,1)]"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-16 right-16 opacity-10">
                <span className="text-white font-mono text-[9px] tracking-[1.5em] uppercase font-black">Secure_Protocol_V.01</span>
            </div>
        </AbsoluteFill>
    );
};
