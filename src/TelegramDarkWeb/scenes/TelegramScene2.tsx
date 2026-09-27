import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Img, staticFile } from 'remotion';
import { BrainCircuit, Ghost, Search, Network, Eye, Layers, ShieldAlert, Cpu } from 'lucide-react';

export const TelegramScene2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Part 1
    const p1Scale = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const p1Opacity = interpolate(frame, [10, 20, 80, 100], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

    // Part 2
    const p2Scale = spring({ frame: frame - 100, fps, config: { damping: 14 } });
    const p2Opacity = interpolate(frame, [100, 110, 180, 200], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

    // Part 3
    const p3TextSlide = spring({ frame: frame - 200, fps, config: { damping: 14 } });
    const p3Opacity = interpolate(frame, [200, 210, 310, 320], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

    // P3 Icons springs
    const toolsPop1 = spring({ frame: frame - 220, fps, config: { damping: 12 } });
    const toolsPop2 = spring({ frame: frame - 235, fps, config: { damping: 12 } });
    const toolsPop3 = spring({ frame: frame - 250, fps, config: { damping: 12 } });
    const toolsPop4 = spring({ frame: frame - 265, fps, config: { damping: 12 } });

    // Part 4
    const p4Scale = spring({ frame: frame - 320, fps, config: { damping: 12 } });
    const p4Opacity = interpolate(frame, [320, 330], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Phase 1: Not Geniuses */}
            <AbsoluteFill className="justify-center items-center font-bold" style={{ opacity: p1Opacity }}>
                <div style={{ transform: `scale(${p1Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <div className="relative">
                        <BrainCircuit size={150} color="#00e5ff" />
                        {/* Red X over the brain */}
                        <div
                            className="absolute inset-0 flex justify-center items-center text-red-500 font-black"
                            style={{
                                fontSize: '180px',
                                opacity: interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp' }),
                                transform: `rotate(-10deg) scale(${spring({ frame: frame - 40, fps })})`
                            }}
                        >
                            ✗
                        </div>
                    </div>
                    <div style={{ fontSize: '60px', color: '#e0e0e0', textAlign: 'center' }}>
                        الجواب ليس لأنهم عباقرة خارقين…
                    </div>
                </div>
            </AbsoluteFill>

            {/* Phase 2: Not Completely Hidden */}
            <AbsoluteFill className="justify-center items-center font-bold" style={{ opacity: p2Opacity }}>
                <div style={{ transform: `scale(${p2Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <div className="relative flex justify-center items-center">
                        <Ghost size={160} color="#a855f7" />
                        <div
                            className="absolute inset-0 flex justify-center items-center text-red-500 font-black"
                            style={{
                                fontSize: '200px',
                                opacity: interpolate(frame, [130, 140], [0, 1], { extrapolateRight: 'clamp' }),
                                transform: `rotate(10deg) scale(${spring({ frame: frame - 130, fps })})`
                            }}
                        >
                            ✗
                        </div>
                    </div>
                    <div style={{ fontSize: '60px', color: '#e0e0e0', textAlign: 'center' }}>
                        ولا لأنهم مختفون بشكل كامل.
                    </div>
                </div>
            </AbsoluteFill>

            {/* Phase 3: Real world digital analysis Tools */}
            <AbsoluteFill className="justify-center items-center font-bold px-12" style={{ opacity: p3Opacity }}>
                <div
                    style={{
                        transform: `translateY(${interpolate(p3TextSlide, [0, 1], [50, -100])}px)`,
                        fontSize: '55px',
                        color: '#ffffff',
                        textAlign: 'center',
                        lineHeight: '1.5'
                    }}
                >
                    في الواقع… كثير منهم يتم تتبعهم فعلاً عبر <span className="text-cyan-400">أدوات تحليل رقمية</span>.
                </div>

                {/* Tools Network */}
                <div
                    className="absolute top-[55%] w-full max-w-[800px] flex justify-center gap-12"
                    dir="ltr"
                >
                    {/* Tool 1 */}
                    <div style={{ transform: `scale(${toolsPop1})`, opacity: interpolate(toolsPop1, [0, 1], [0, 1]) }} className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-cyan-900/40 border border-cyan-500/50 flex justify-center items-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            <Img src={staticFile('wireshark.svg')} style={{ width: '50px', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <span className="text-xl font-mono text-cyan-200">Wireshark</span>
                    </div>

                    {/* Tool 2 */}
                    <div style={{ transform: `scale(${toolsPop2})`, opacity: interpolate(toolsPop2, [0, 1], [0, 1]) }} className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-purple-900/40 border border-purple-500/50 flex justify-center items-center shadow-[0_0_30px_rgba(168,85,247,0.3)] mt-12">
                            <Img src={staticFile('splunk.svg')} style={{ width: '50px', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <span className="text-xl font-mono text-purple-200">Splunk</span>
                    </div>

                    {/* Tool 3 */}
                    <div style={{ transform: `scale(${toolsPop3})`, opacity: interpolate(toolsPop3, [0, 1], [0, 1]) }} className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-emerald-900/40 border border-emerald-500/50 flex justify-center items-center shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                            <Img src={staticFile('kalilinux.svg')} style={{ width: '50px', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <span className="text-xl font-mono text-emerald-200">Kali Linux</span>
                    </div>

                    {/* Tool 4 */}
                    <div style={{ transform: `scale(${toolsPop4})`, opacity: interpolate(toolsPop4, [0, 1], [0, 1]) }} className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-rose-900/40 border border-rose-500/50 flex justify-center items-center shadow-[0_0_30px_rgba(244,63,94,0.3)] mt-12">
                            <Img src={staticFile('palantir.svg')} style={{ width: '50px', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <span className="text-xl font-mono text-rose-200">Palantir</span>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Phase 4: Problem is deeper */}
            <AbsoluteFill className="justify-center items-center font-bold" style={{ opacity: p4Opacity }}>
                <div style={{ transform: `scale(${p4Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                    <ShieldAlert
                        size={180}
                        color="#ef4444"
                        style={{ filter: 'drop-shadow(0px 0px 40px rgba(239,68,68,0.7))' }}
                    />
                    <div
                        style={{
                            fontSize: '75px',
                            color: '#ef4444',
                            textAlign: 'center',
                            textShadow: '0 0 30px rgba(239,68,68,0.8)'
                        }}
                    >
                        لكن المشكلة أعمق من ذلك
                    </div>
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
