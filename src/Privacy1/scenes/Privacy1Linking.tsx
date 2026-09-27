import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import { Fingerprint, Link as LinkIcon, Share2 } from 'lucide-react';

export const Privacy1Linking: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ─── TIMING ───────────────────────────────────────────
    const linkStart = 70;
    const mergeStart = 130;

    // ─── ANIMATION VALUES ─────────────────────────────────
    const linkProgress = spring({
        frame: frame - linkStart,
        fps,
        config: { damping: 14, stiffness: 60 }
    });

    const mergeProgress = spring({
        frame: frame - mergeStart,
        fps,
        config: { damping: 16, stiffness: 40 }
    });

    // Split state: panels apart
    const initialSplitDelta = 300;
    const splitDelta = interpolate(mergeProgress, [0, 1], [initialSplitDelta, 0]);
    const panelOpacity = interpolate(mergeProgress, [0.3, 0.8], [1, 0], { extrapolateRight: 'clamp' });
    const panelScale = interpolate(mergeProgress, [0, 1], [1, 0.8]);

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div className="w-full h-full flex flex-col items-center justify-center relative">

                {/* 1. THE SPLIT SCREEN VIEW */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* Panel Left: Anonymous Session */}
                    <div
                        className="absolute"
                        style={{
                            transform: `translateX(${-splitDelta}px) scale(${panelScale})`,
                            opacity: panelOpacity
                        }}
                    >
                        <GlassPanel className="w-[450px] h-[350px] border-cyan-500/20 bg-cyan-500/[0.03] rounded-[3.5rem] flex flex-col items-center justify-center gap-8 p-12">
                            <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                <Fingerprint size={56} className="text-cyan-400 opacity-50" />
                            </div>
                            <div className="text-center">
                                <span className="text-cyan-400 font-mono text-[10px] uppercase font-black tracking-[0.6em]">Session_A</span>
                                <h3 className="text-white text-xl font-bold mt-2">Isolated State</h3>
                            </div>
                        </GlassPanel>
                    </div>

                    {/* Panel Right: Known Identity */}
                    <div
                        className="absolute"
                        style={{
                            transform: `translateX(${splitDelta}px) scale(${panelScale})`,
                            opacity: panelOpacity
                        }}
                    >
                        <GlassPanel className="w-[450px] h-[350px] border-red-500/20 bg-red-500/[0.03] rounded-[3.5rem] flex flex-col items-center justify-center gap-8 p-12">
                            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
                                <Fingerprint size={56} className="text-red-400 opacity-50" />
                            </div>
                            <div className="text-center">
                                <span className="text-red-400 font-mono text-[10px] uppercase font-black tracking-[0.6em]">Identity_B</span>
                                <h3 className="text-white text-xl font-bold mt-2">Real Profile</h3>
                            </div>
                        </GlassPanel>
                    </div>

                    {/* 2. THE CONNECTING LINES (PHASE 2) */}
                    {frame > linkStart && frame < mergeStart + 20 && (
                        <svg className="absolute inset-0 pointer-events-none z-10 overflow-visible">
                            <line
                                x1={width / 2 - splitDelta} y1={height / 2}
                                x2={width / 2 + splitDelta} y2={height / 2}
                                stroke="#EF4444"
                                strokeWidth={interpolate(linkProgress, [0, 1], [0, 6])}
                                strokeDasharray="15 15"
                                opacity={interpolate(linkProgress, [0.2, 0.8], [0, 0.6])}
                            />
                            {/* Connection Hub */}
                            <circle
                                cx={width / 2} cy={height / 2}
                                r={interpolate(linkProgress, [0.3, 1], [0, 50])}
                                fill="#EF444411"
                                stroke="#EF444466"
                                strokeWidth="1"
                            />
                            <g style={{ transform: `translate(${width / 2}px, ${height / 2}px) scale(${linkProgress})` }}>
                                <Share2 size={30} className="text-red-500" style={{ transform: 'translate(-15px, -15px)' }} />
                            </g>
                        </svg>
                    )}

                    {/* 3. THE MERGED IDENTITY (PHASE 3) */}
                    <div
                        className="absolute"
                        style={{
                            transform: `scale(${interpolate(mergeProgress, [0, 1], [0.8, 1])})`,
                            opacity: mergeProgress
                        }}
                    >
                        <GlassPanel className="w-[700px] h-[550px] border-red-500/40 bg-red-500/[0.05] rounded-[5rem] flex flex-col items-center justify-center gap-12 p-20 shadow-[0_0_150px_rgba(239,68,68,0.2)]">
                            <div className="relative">
                                <div className="absolute -inset-10 bg-red-500/20 blur-3xl rounded-full" />
                                <LinkIcon size={120} className="text-red-500 relative z-10" />
                            </div>
                            <div className="text-center space-y-4">
                                <div className="bg-red-500/20 px-8 py-2 rounded-full border border-red-500/40 inline-block mb-4">
                                    <span className="text-red-500 font-black text-sm uppercase tracking-[0.8em]">Identity Linked</span>
                                </div>
                                <h2 className="text-white text-7xl font-black tracking-tighter uppercase italic">MERGE_COMPLETE</h2>
                            </div>
                        </GlassPanel>
                    </div>

                </div>

                {/* Arabic Technical Narrative */}
                <div
                    className="absolute bottom-40 text-center space-y-12 z-40"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                    <OnionTransition startFrame={15} duration={25}>
                        <p className="text-5xl text-white/90 font-bold leading-relaxed tracking-tight">
                            في هذه اللحظة…<br />
                            النظام لا يرى جلستين منفصلتين.
                        </p>
                    </OnionTransition>

                    <OnionTransition startFrame={linkStart + 20} duration={25}>
                        <h2 className="text-6xl text-red-500 font-black leading-tight tracking-tight drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
                            بل يرى نقطة مشتركة…<br />
                            يمكنه استخدامها للربط.
                        </h2>
                    </OnionTransition>
                </div>

            </div>
        </AbsoluteFill>
    );
};
