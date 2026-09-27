import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import {
    Server,
    Smartphone,
    Eye,
    Fingerprint,
    Clock,
    Database,
    Gavel,
    Skull
} from 'lucide-react';

export const VPNRisksScene: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // Smooth sequence timing
    const tunnelProgress = spring({ frame: frame - 10, fps, config: { damping: 20 } });
    const showProviderView = frame > 120;
    const providerViewProgress = spring({ frame: frame - 130, fps, config: { damping: 20 } });
    const showRisks = frame > 360;

    return (
        <AbsoluteFill className="justify-center items-center font-sans text-white overflow-hidden">
            <GhostNetwork />

            {/* Top Status - Minimalist */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
                <OnionTransition startFrame={5} duration={30}>
                    <div className="px-8 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <span className="text-xl font-bold text-white tracking-widest uppercase" dir="rtl">أولاً: مخاطر الـ VPN</span>
                    </div>
                </OnionTransition>
            </div>

            {/* Main Content Area */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-16 pt-20 px-20">

                {/* Phase 1: The Tunnel (Clean & Smooth) */}
                <div className="relative flex items-center justify-center gap-40 w-full">
                    {/* Device Icon */}
                    <div className="z-10 bg-black/40 p-10 rounded-3xl border border-white/5 backdrop-blur-xl">
                        <Smartphone size={100} className="text-white/90" />
                        <p className="text-center text-[10px] mt-4 font-mono text-white/30 tracking-[0.4em]">SOURCE</p>
                    </div>

                    {/* Simple Data Tunnel */}
                    <div className="absolute w-[500px] h-[2px] bg-white/10 overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 shadow-[0_0_20px_#00E5FF]"
                            style={{ width: `${tunnelProgress * 100}%` }}
                        />
                        {/* Smooth moving data bits */}
                        {Array.from({ length: 6 }).map((_, i) => {
                            const progress = (frame * 4 + i * 80) % 500;
                            return (
                                <div
                                    key={i}
                                    className="absolute w-8 h-[2px] bg-cyan-300"
                                    style={{
                                        left: progress,
                                        opacity: interpolate(progress, [0, 50, 450, 500], [0, 1, 1, 0])
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Server Icon */}
                    <div className="z-10 bg-black/40 p-10 rounded-3xl border border-white/5 backdrop-blur-xl transition-colors duration-1000"
                        style={{ borderColor: showProviderView ? 'rgba(125, 70, 152, 0.3)' : 'rgba(255, 255, 255, 0.05)' }}
                    >
                        <Server size={100} className={`${showProviderView ? 'text-purple-400' : 'text-white/80'} transition-colors duration-1000`} />
                        <p className="text-center text-[10px] mt-4 font-mono text-white/30 tracking-[0.4em]">VPN_SERVER</p>
                    </div>
                </div>

                {/* Clean Wording */}
                <div className="h-24 text-center z-10" style={{ opacity: interpolate(frame, [25, 45], [0, 1]) }}>
                    <h2 className="text-4xl font-medium leading-tight" dir="rtl">
                        الـ <span className="text-cyan-400">VPN</span> ينشئ نفقاً مشفراً
                        <br />
                        لكنه لا يخفي هويتك عن <span className="text-purple-400">مزود الخدمة</span>
                    </h2>
                </div>

                {/* Phase 2: Visibility (Simplified Grid) */}
                <GlassPanel
                    className="w-[1100px] h-[400px] p-12 flex flex-col items-center gap-10"
                    style={{
                        opacity: providerViewProgress,
                        transform: `translateY(${interpolate(providerViewProgress, [0, 1], [40, 0])}px)`,
                        borderColor: showRisks ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div className="flex items-center gap-4 text-white/60 mb-2">
                        <Eye size={36} />
                        <h3 className="text-3xl font-bold" dir="rtl">بياناتك المكشوفة للمزود:</h3>
                    </div>

                    <div className="flex justify-around w-full gap-12">
                        {[
                            { icon: Fingerprint, label: "Real IP Address", color: "text-cyan-400" },
                            { icon: Clock, label: "Time Stamps", color: "text-purple-400" },
                            { icon: Database, label: "Metadata", color: "text-white/60" }
                        ].map((item, i) => {
                            const itemPop = spring({ frame: frame - 150 - (i * 20), fps, config: { damping: 20 } });
                            return (
                                <div key={i} className="flex flex-col items-center gap-6 w-1/3"
                                    style={{
                                        transform: `scale(${interpolate(itemPop, [0, 1], [0.9, 1])})`,
                                        opacity: itemPop,
                                    }}
                                >
                                    <item.icon size={64} className={item.color} />
                                    <span className="text-xl font-medium tracking-tight whitespace-nowrap">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Final Minimalist Warning */}
                    {showRisks && (
                        <div className="absolute inset-0 bg-red-950/20 backdrop-blur-xl flex items-center justify-center rounded-3xl p-10">
                            <OnionTransition duration={40}>
                                <div className="flex flex-col items-center gap-6">
                                    <div className="flex gap-10">
                                        <Database size={40} className="text-red-500" />
                                        <Skull size={40} className="text-red-500" />
                                        <Gavel size={40} className="text-red-500" />
                                    </div>
                                    <h2 className="text-5xl font-black text-red-500" dir="rtl">
                                        الحقيقة: هويتك لا تزال مرتبطة بك.
                                    </h2>
                                </div>
                            </OnionTransition>
                        </div>
                    )}
                </GlassPanel>

            </div>

            {/* Minimalist HUD */}
            <div className="absolute bottom-12 left-12 font-mono text-[10px] text-white/10 uppercase tracking-[0.5em]">
                Secure Protocol: v2.4
            </div>
        </AbsoluteFill>
    );
};
