import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const Privacy1TheMistake: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 18, stiffness: 50 }
    });

    const mastery = interpolate(frame, [0, 40], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                style={{
                    transform: `scale(${interpolate(mastery, [0, 1], [0.98, 1])})`,
                    opacity: mastery
                }}
                className="w-full h-full flex flex-col items-center justify-center gap-24 py-10 relative z-10"
            >

                {/* Visual: Clean & Minimal "Mistake" Viewer */}
                <div className="relative">
                    <div className="absolute -top-6 -right-6 bg-red-600/20 border border-red-500/40 px-3 py-1 rounded-full backdrop-blur-3xl z-30 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] text-red-500 font-mono font-black uppercase tracking-widest italic">Leak Detected</span>
                    </div>

                    <GlassPanel className="w-[850px] p-16 border-white/5 bg-black/40 rounded-[4rem] shadow-2xl relative overflow-hidden">
                        <div
                            className="absolute left-0 w-full h-[1px] bg-red-500/20 opacity-40 z-10"
                            style={{ top: `${interpolate(frame % 100, [0, 100], [0, 100])}%` }}
                        />

                        <div className="flex flex-col gap-14">
                            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                                <div className="flex flex-col">
                                    <span className="text-white text-2xl font-black font-mono tracking-tight italic">POST /audit/sync</span>
                                    <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold mt-1">Real_Identity_Leak</span>
                                </div>
                                <ShieldAlert className="text-red-500/40" size={32} />
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-red-500/40 font-mono text-xs font-black uppercase tracking-widest">Authorization Header</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-4 h-1 bg-red-500/20 rounded-full" />
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-red-500/[0.03] border-2 border-red-500/20 p-8 rounded-[2.5rem] relative group overflow-hidden">
                                    {frame > 120 && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-[shimmer_2s_infinite]" />
                                    )}

                                    <div className="text-red-500 text-3xl font-black font-mono tracking-tighter leading-tight break-all uppercase italic">
                                        Bearer <span className="text-white underline decoration-red-500/40 underline-offset-8">eyJhbGciOiJIUzI1Ni...XUzI1NiJ9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassPanel>
                </div>

                {/* Arabic Text: Snapier Animations */}
                <div className="text-center space-y-12 max-w-[1400px]" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <OnionTransition startFrame={25} duration={25}>
                        <p className="text-[52px] text-white/90 font-bold leading-relaxed tracking-tight">
                            لكن المشكلة لم تكن في هذه الجلسة…<br />
                            <span className="text-white/40">بل في طلب واحد فقط.</span>
                        </p>
                    </OnionTransition>

                    <OnionTransition startFrame={130} duration={25}>
                        <div className="relative pt-6 inline-block">
                            <div className="absolute -inset-10 bg-red-600/5 blur-3xl rounded-full" />
                            <h2 className="text-[54px] text-red-500 font-black tracking-tight leading-tight relative">
                                {"طلب يحتوي على معلومة حقيقية…\nToken، أو Header، أو VPN Bypass."}
                            </h2>
                        </div>
                    </OnionTransition>
                </div>

            </div>

            <div className="absolute bottom-16 left-16 flex items-center gap-4 opacity-10">
                <AlertCircle size={14} className="text-white" />
                <span className="text-white font-mono text-[9px] tracking-[1em] uppercase font-black">Vulnerability_Report</span>
            </div>

        </AbsoluteFill>
    );
};
