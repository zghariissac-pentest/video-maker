import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import { Shield, Lock, Eye, Fingerprint, Link as LinkIcon } from 'lucide-react';

const HookClimax: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ─── TIMING ───────────────────────────────────────────
    const setupStart = 0;
    const text1Start = 10;
    const text2Start = 35;
    const twistStart = 70;
    const linkStart = 85;
    const mergeStart = 100;
    const endScene = 160;

    if (frame > endScene) return null;

    // ─── SPRINGS ──────────────────────────────────────────
    const twistProgress = spring({
        frame: frame - twistStart,
        fps,
        config: { damping: 15, stiffness: 120 }
    });

    const mergeProgress = spring({
        frame: frame - mergeStart,
        fps,
        config: { damping: 18, stiffness: 60 }
    });

    const linkProgress = interpolate(frame, [linkStart, mergeStart], [0, 1], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateRight: 'clamp'
    });

    // ─── LAYOUT ───────────────────────────────────────────
    const initialSplit = 280;
    const splitX = interpolate(mergeProgress, [0, 1], [initialSplit, 0]);
    const masterScale = interpolate(twistProgress, [0, 1], [1, 2.8]);
    const panelOpacity = interpolate(mergeProgress, [0.4, 0.9], [1, 0], { extrapolateRight: 'clamp' });

    // Shake on impact
    const shakeIntensity = interpolate(frame, [mergeStart, mergeStart + 15], [8, 0], { extrapolateRight: 'clamp' });
    const shake = Math.sin(frame * 4) * shakeIntensity;

    return (
        <AbsoluteFill
            className="justify-center items-center"
            style={{
                transform: `translateX(${shake}px) translateY(${shake}px)`,
                opacity: interpolate(frame, [endScene - 10, endScene], [1, 0])
            }}
        >
            <div className="absolute inset-0 bg-black z-0" />
            <GhostNetwork />

            {/* THE TWO SESSIONS (SETUP) */}
            <div
                className="w-full h-full flex items-center justify-center p-20"
                style={{ transform: `scale(${interpolate(mergeProgress, [0, 1], [masterScale, 1])})` }}
            >
                {/* Session A (VPN) */}
                <div
                    className="absolute"
                    style={{ transform: `translateX(${-splitX}px)`, opacity: panelOpacity }}
                >
                    <GlassPanel className="w-[420px] h-[360px] border-white/5 bg-black/40 rounded-[3.5rem] p-10 flex flex-col items-center justify-center gap-8 shadow-2xl overflow-hidden">
                        <Fingerprint size={64} className={frame > twistStart ? "text-red-500" : "text-cyan-400 opacity-30"} />
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-white/20 font-mono text-[8px] uppercase font-black tracking-[0.5em]">Identity_A</span>
                            <span className="text-cyan-400/80 font-mono text-[10px] uppercase font-bold tracking-widest italic">Encrypted Session</span>
                        </div>
                        <div className={`p-5 rounded-2xl w-full transition-colors duration-300 ${frame > twistStart ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/5 border border-white/5'}`}>
                            <span className="text-white/30 font-mono text-[10px] break-all">TOKEN: <span className={frame > twistStart ? "text-red-500 font-black" : "text-white/80 font-bold"}>eyJhbGciOiJIUzI1...</span></span>
                        </div>
                    </GlassPanel>
                </div>

                {/* Session B (REAL) */}
                <div
                    className="absolute"
                    style={{ transform: `translateX(${splitX}px)`, opacity: panelOpacity }}
                >
                    <GlassPanel className="w-[420px] h-[360px] border-white/5 bg-black/40 rounded-[3.5rem] p-10 flex flex-col items-center justify-center gap-8 shadow-2xl overflow-hidden">
                        <Fingerprint size={64} className={frame > twistStart ? "text-red-500" : "text-white/10"} />
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-white/20 font-mono text-[8px] uppercase font-black tracking-[0.5em]">Identity_B</span>
                            <span className="text-white/20 font-mono text-[10px] uppercase font-bold tracking-widest italic">Real Identity</span>
                        </div>
                        <div className={`p-5 rounded-2xl w-full transition-colors duration-300 ${frame > twistStart ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/5 border border-white/5'}`}>
                            <span className="text-white/30 font-mono text-[10px] break-all">TOKEN: <span className={frame > twistStart ? "text-red-500 font-black" : "text-white/80 font-bold"}>eyJhbGciOiJIUzI1...</span></span>
                        </div>
                    </GlassPanel>
                </div>

                {/* SUDDEN LINE OF CONNECTION */}
                {frame > linkStart && frame < mergeStart + 5 && (
                    <svg className="absolute inset-0 z-10 overflow-visible">
                        <line
                            x1={width / 2 - splitX} y1={height / 2 + 50}
                            x2={width / 2 + splitX} y2={height / 2 + 50}
                            stroke="#EF4444"
                            strokeWidth={interpolate(linkProgress, [0, 1], [2, 12])}
                            strokeDasharray="20 10"
                            style={{ filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.6))' }}
                        />
                    </svg>
                )}

                {/* CLIMAX: Flash and Identity Merge */}
                {frame > mergeStart && (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-white" style={{ opacity: interpolate(frame, [mergeStart, mergeStart + 12], [0.8, 0]) }} />

                        <div
                            className="bg-black/60 border-4 border-red-500 p-20 rounded-[5.5rem] flex flex-col items-center gap-12 shadow-[0_0_200px_rgba(239,68,68,0.4)] backdrop-blur-3xl"
                            style={{ transform: `scale(${interpolate(frame, [mergeStart, mergeStart + 10], [0.5, 1], { easing: Easing.out(Easing.back(1.5)) })})` }}
                        >
                            <LinkIcon size={140} className="text-red-500" />
                            <div className="text-center space-y-4">
                                <h2 className="text-white text-8xl font-black italic tracking-tighter">IDENTITY LINKED</h2>
                                <div className="h-1.5 w-full bg-red-500/50 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ARABIC NARRATIVE OVERLAY */}
            <div
                className="absolute bottom-40 text-center space-y-12 z-40 transition-opacity duration-300"
                style={{ fontFamily: 'Cairo, sans-serif', opacity: interpolate(frame, [mergeStart + 5, mergeStart + 15], [1, 0]) }}
                dir="rtl"
            >
                <OnionTransition startFrame={text1Start} duration={25}>
                    <h1 className="text-[140px] font-black text-white leading-none tracking-tighter drop-shadow-[0_40px_100px_rgba(0,0,0,1)]">
                        VPN…
                    </h1>
                </OnionTransition>

                <OnionTransition startFrame={text2Start} duration={25}>
                    <div className="inline-block bg-black/20 backdrop-blur-xl px-16 py-6 rounded-[3rem] border border-white/5">
                        <p className="text-6xl text-cyan-400 font-black tracking-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            جلسة نظيفة… كل شيء صحيح.
                        </p>
                    </div>
                </OnionTransition>

                {frame > twistStart && (
                    <div className="flex justify-center mt-12">
                        <div className="bg-red-500 px-6 py-2 rounded-lg transform -skew-x-12 animate-pulse">
                            <span className="text-black font-black text-2xl tracking-[0.2em]">LEAK_DETECTED</span>
                        </div>
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};

export const Privacy1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const introFrame = frame - 160;
    const introEntrance = spring({
        frame: introFrame,
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <HookClimax />

            {/* TECHNICAL SYSTEM REVEAL (POST-HOOK) */}
            {frame >= 160 && (
                <div
                    style={{
                        transform: `scale(${interpolate(introEntrance, [0, 1], [0.99, 1])})`,
                        opacity: introEntrance
                    }}
                    className="w-full h-full flex flex-col items-center justify-center gap-24 relative z-10"
                >
                    <GhostNetwork />
                    <GlassPanel className="w-[950px] h-[620px] flex flex-col overflow-hidden border-white/10 bg-black/60 shadow-2xl rounded-[4rem]">
                        <div className="px-12 py-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/40" />
                                <div className="w-3.5 h-3.5 rounded-full bg-white/10" />
                                <div className="w-3.5 h-3.5 rounded-full bg-white/10" />
                            </div>
                            <span className="text-xs font-mono text-white/20 tracking-[0.8em] uppercase font-black">Audit_Terminal // 0xAF4</span>
                        </div>

                        <div className="flex-1 p-20 flex flex-col justify-center items-center gap-16">
                            <div className="flex flex-col items-center gap-6">
                                <Shield size={100} className="text-cyan-500 opacity-40" />
                                <h2 className="text-white text-6xl font-black tracking-tight italic">Privacy Protocol</h2>
                            </div>
                            <div className="flex gap-20 py-10 border-y border-white/5 w-full justify-center bg-white/[0.01]">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-[11px] text-white/20 font-black uppercase tracking-[0.3em]">Isolation</span>
                                    <span className="text-cyan-400 font-black text-2xl uppercase tracking-widest italic">Enabled</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-[11px] text-white/20 font-black uppercase tracking-[0.3em]">Status</span>
                                    <span className="text-green-500 font-black text-2xl uppercase tracking-widest italic">Clear</span>
                                </div>
                            </div>
                        </div>
                    </GlassPanel>

                    <div className="text-center space-y-12" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
                        <OnionTransition startFrame={180} duration={25}>
                            <h1 className="text-[130px] font-black text-white leading-none tracking-tighter drop-shadow-[0_20px_80px_rgba(0,0,0,1)]">
                                VPN…
                            </h1>
                        </OnionTransition>
                        <OnionTransition startFrame={220} duration={25}>
                            <div className="inline-block relative">
                                <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full" />
                                <p className="text-6xl text-white/90 font-black tracking-tight relative z-10">
                                    جلسة نظيفة… كل شيء صحيح.
                                </p>
                            </div>
                        </OnionTransition>
                    </div>
                </div>
            )}

            {/* Corner System HUD: Extremely subtle */}
            <div className="absolute top-20 right-20 flex items-center gap-6 opacity-10">
                <div className="w-1.5 h-16 bg-gradient-to-b from-white to-transparent" />
                <span className="text-white font-mono text-[10px] tracking-[1.5em] font-black uppercase">Cyber_Protocol</span>
            </div>
        </AbsoluteFill>
    );
};
