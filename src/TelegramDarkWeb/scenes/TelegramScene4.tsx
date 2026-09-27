import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Database, ShieldAlert, Cpu, Network, Zap } from 'lucide-react';

export const TelegramScene4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text slides
    const t1Slide = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const t2Slide = spring({ frame: frame - 120, fps, config: { damping: 14 } });

    const t1Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });
    const t2Opacity = interpolate(frame, [120, 130], [0, 1], { extrapolateRight: 'clamp' });

    // Node interactions
    const nodePop = spring({ frame: frame - 20, fps, config: { damping: 12 } });

    // The node that fails (glitch out and drop down)
    const failNodeScale = interpolate(frame, [60, 75], [1, 0.8], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const failNodeDrop = interpolate(frame, [60, 90], [0, 200], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const failNodeOpacity = interpolate(frame, [60, 80], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // The remaining nodes repairing (pulsing and sliding together closely)
    const surviveScale = interpolate(frame, [140, 160], [1, 1.1], { extrapolateRight: 'clamp' });
    const repairShiftRight = interpolate(frame, [140, 170], [0, 120], { extrapolateRight: 'clamp' });
    const repairShiftLeft = interpolate(frame, [140, 170], [0, -120], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Subtile background tech grid */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    transform: `translateY(${interpolate(frame, [0, 300], [0, 100])}px)`
                }}
            />

            <AbsoluteFill className="justify-center items-center font-bold px-12">

                {/* Visual Grid representing the resilient network */}
                <div
                    className="absolute top-[20%] w-full max-w-[800px] flex justify-center items-center gap-[100px]"
                    dir="ltr"
                >
                    {/* Visual connection line across the network */}
                    <div
                        className="absolute h-[4px] bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 rounded-full z-0 transition-opacity"
                        style={{
                            width: '600px',
                            opacity: interpolate(frame, [20, 30], [0, 0.8]),
                            transform: `scaleX(${surviveScale})`
                        }}
                    ></div>

                    {/* Node 1: Left (Survives) */}
                    <div
                        style={{
                            transform: `scale(${nodePop * surviveScale}) translateX(${repairShiftRight}px)`,
                        }}
                        className="z-10 flex flex-col items-center gap-4"
                    >
                        <div className="w-28 h-28 rounded-2xl bg-cyan-900/40 border border-cyan-500 flex justify-center items-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                            <Cpu size={60} />
                        </div>
                    </div>

                    {/* Node 2: Middle (FAILS and drops) */}
                    <div
                        style={{
                            transform: `scale(${nodePop * failNodeScale}) translateY(${failNodeDrop}px)`,
                            opacity: failNodeOpacity,
                            filter: frame > 60 ? 'grayscale(100%) brightness(50%)' : 'none'
                        }}
                        className="z-10 flex flex-col items-center gap-4"
                    >
                        <div className="w-28 h-28 rounded-2xl bg-rose-900/40 border border-rose-500 flex justify-center items-center text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.5)] relative">
                            <Database size={60} />
                            {/* Warning glitch overlay */}
                            <div style={{ opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateRight: 'clamp' }) }} className="absolute inset-0 flex justify-center items-center bg-rose-500/30 rounded-2xl">
                                <ShieldAlert size={80} color="#ef4444" className="absolute -top-10" />
                            </div>
                        </div>
                    </div>

                    {/* Node 3: Right (Survives) */}
                    <div
                        style={{
                            transform: `scale(${nodePop * surviveScale}) translateX(${repairShiftLeft}px)`,
                        }}
                        className="z-10 flex flex-col items-center gap-4"
                    >
                        <div className="w-28 h-28 rounded-2xl bg-emerald-900/40 border border-emerald-500 flex justify-center items-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.5)] relative">
                            {/* Energy bolt indicating it took over the broken node's load */}
                            <div style={{ opacity: interpolate(frame, [150, 160], [0, 1]) }} className="absolute -top-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]">
                                <Zap size={40} />
                            </div>
                            <Network size={60} />
                        </div>
                    </div>
                </div>

                {/* Text Layout at bottom */}
                <div className="absolute bottom-[20%] flex flex-col items-center gap-12 w-full">
                    {/* Line 1 */}
                    <div
                        style={{
                            opacity: t1Opacity,
                            transform: `translateY(${interpolate(t1Slide, [0, 1], [30, 0])}px)`,
                            fontSize: '60px',
                            color: '#e0e0e0',
                            textAlign: 'center',
                            maxWidth: '900px',
                            lineHeight: '1.5'
                        }}
                    >
                        لهذا، حتى لو تم <span className="text-rose-400">إسقاط جزء من الشبكة…</span>
                    </div>

                    {/* Line 2 */}
                    <div
                        style={{
                            opacity: t2Opacity,
                            transform: `translateY(${interpolate(t2Slide, [0, 1], [30, 0])}px)`,
                            fontSize: '65px',
                            color: '#10b981', // Tailwind Emerald 500
                            textAlign: 'center',
                            maxWidth: '900px',
                            textShadow: '0 0 30px rgba(16,185,129,0.5)'
                        }}
                    >
                        يبقى باقي النظام يعمل بشكل طبيعي.
                    </div>
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};
