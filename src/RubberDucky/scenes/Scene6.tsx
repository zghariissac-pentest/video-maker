import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { Layers, Database, Timer, ShieldOff, Wifi, Rocket, Cpu } from 'lucide-react';

export const Scene6: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    const startAdvanced = 400;
    const startFinal = 720;

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="MODERN EVOLUTION & ADVANCED ATTACKS" showCorners={false} />

            <div className="z-20 w-full max-w-[950px] flex flex-col items-center text-center px-10">

                {/* Phase 1: Modern Versions Improvements */}
                <Sequence from={0} durationInFrames={startAdvanced}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="النسخ الحديثة أضافت:"
                            className="text-3xl text-white mb-10 dir-rtl"
                        />

                        <div className="grid grid-cols-2 gap-6 w-full items-center">
                            {[
                                { text: "دعم USB Composite Devices", icon: <Layers className="text-blue-400" /> },
                                { text: "إمكانية تخزين Payloadات متعددة", icon: <Database className="text-green-400" /> },
                                { text: "تحكم أكثر تقدماً في التوقيت", icon: <Timer className="text-yellow-400" /> },
                                { text: "Obfuscation في السكربتات", icon: <ShieldOff className="text-red-400" /> }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10"
                                    style={{
                                        opacity: spr(20 + i * 30),
                                        transform: `scale(${spr(20 + i * 30)})`
                                    }}
                                >
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="text-lg text-white/90 dir-rtl text-right flex-1">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 2: Advanced Networking Over USB */}
                <Sequence from={startAdvanced} durationInFrames={startFinal - startAdvanced}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="وبعض الأجهزة المشابهة تدمج:"
                            className="text-3xl text-white mb-10 dir-rtl"
                        />

                        <div
                            className="p-10 bg-blue-500/10 border-2 border-blue-500/40 rounded-3xl flex flex-col items-center max-w-[700px]"
                            style={{ transform: `scale(${spr(startAdvanced + 20)})` }}
                        >
                            <Wifi size={80} className="text-blue-400 mb-6 animate-pulse" />
                            <GlitchText text="Networking over USB" className="text-4xl font-bold text-blue-400 mb-4" />
                            <div className="text-xl text-blue-300/60 font-mono mb-4">(RNDIS / CDC Ethernet)</div>
                            <SmoothWriteText
                                delay={startAdvanced + 80}
                                text="لإنشاء قناة اتصال إضافية"
                                className="text-2xl text-white dir-rtl"
                            />
                        </div>
                    </div>
                </Sequence>

                {/* Phase 3: The Ultimate Platform */}
                <Sequence from={startFinal}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div
                            className="mb-12 relative flex gap-8 items-center"
                            style={{ transform: `translateY(${interpolate(frame - startFinal, [0, 40], [50, 0], { extrapolateRight: 'clamp' })}px)`, opacity: spr(startFinal) }}
                        >
                            <div className="flex flex-col items-center gap-2 opacity-40">
                                <Cpu size={80} className="text-white" />
                                <span className="font-mono text-xs">Keyboard Injection</span>
                            </div>
                            <Rocket size={50} className="text-green-500 rotate-90" />
                            <div className="flex flex-col items-center gap-2">
                                <Rocket size={100} className="text-green-500" />
                                <span className="font-mono text-xs text-green-500">Attack Platform</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <SmoothWriteText text="وهنا ننتقل من مجرد Keyboard Injection" className="text-3xl text-white/70 dir-rtl" />
                            <div style={{ opacity: spr(startFinal + 80) }}>
                                <GlitchText text="إلى منصة هجوم مصغرة." className="text-6xl font-black text-green-500 dir-rtl shadow-[0_0_30px_rgba(34,197,94,0.3)]" />
                            </div>
                        </div>
                    </div>
                </Sequence>

            </div>
        </AbsoluteFill>
    );
};
