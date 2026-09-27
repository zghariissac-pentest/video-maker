import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import {
    ShieldCheck,
    Target,
    Lock
} from 'lucide-react';
import { Tor } from 'developer-icons';

export const ConclusionScene: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // Timing
    const showThreatModel = frame > 120; // 4s
    const globalProgress = spring({ frame, fps, config: { damping: 20 } });
    const threatModelProgress = spring({ frame: frame - 130, fps, config: { damping: 20 } });

    // Smooth Camera
    const cameraScale = interpolate(frame, [0, 300], [1, 1.05]);

    return (
        <AbsoluteFill className="justify-center items-center font-sans text-white overflow-hidden">
            <GhostNetwork />

            <div style={{ transform: `scale(${cameraScale})`, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                {/* Header Section: The Reality Check */}
                <div className="w-full max-w-[900px] flex flex-col items-center gap-12 px-10">

                    {/* Icons Row: Tools vs Reality */}
                    <div className="flex items-center gap-12" style={{ opacity: globalProgress, transform: `translateY(${interpolate(globalProgress, [0, 1], [20, 0])}px)` }}>
                        <div className="flex flex-col items-center gap-3">
                            <ShieldCheck size={80} className="text-cyan-400" />
                            <span className="text-[10px] font-mono tracking-[0.3em] opacity-40">VPN_TOOL</span>
                        </div>
                        <div className="text-white/20 text-4xl font-light font-mono">+</div>
                        <div className="flex flex-col items-center gap-3">
                            <Tor size={80} className="text-purple-400" />
                            <span className="text-[10px] font-mono tracking-[0.3em] opacity-40">TOR_TOOL</span>
                        </div>
                    </div>

                    {/* Primary Conclusion Message */}
                    <OnionTransition startFrame={30} duration={40}>
                        <div className="text-center space-y-6">
                            <h1 className="text-4xl font-bold leading-relaxed" dir="rtl">
                                الـ <span className="text-cyan-400">VPN</span> و <span className="text-purple-400">TOR</span> هما أدوات لتقليل <span className="text-orange-400">Risk</span>،
                                <br />
                                وليسا <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Anonymity Guarantee</span>.
                            </h1>
                        </div>
                    </OnionTransition>

                    {/* Threat Model & OPSEC Section */}
                    {showThreatModel && (
                        <div className="w-full flex flex-col items-center gap-10 mt-8" style={{ opacity: threatModelProgress, transform: `translateY(${interpolate(threatModelProgress, [0, 1], [30, 0])}px)` }}>
                            <div className="h-px w-[200px] bg-white/10" />

                            <div className="flex gap-16 justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <Target size={56} className="text-white/60" />
                                    <h3 className="text-xl font-bold text-white/80" dir="rtl">Threat Model واضح</h3>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Lock size={56} className="text-white/60" />
                                    <h3 className="text-xl font-bold text-white/80" dir="rtl">Operational Security</h3>
                                </div>
                            </div>

                            <GlassPanel className="w-full py-8 border-white/10 bg-white/5">
                                <p className="text-2xl text-center text-white/40 font-mono tracking-widest italic uppercase">
                                    Security is a Process, not a Product.
                                </p>
                            </GlassPanel>
                        </div>
                    )}

                </div>
            </div>

            {/* Final Corner Label */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/10 uppercase tracking-[0.8em] whitespace-nowrap">
                End of Transmission // Remain Vigilant
            </div>
        </AbsoluteFill>
    );
};
