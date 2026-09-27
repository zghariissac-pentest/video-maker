import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { Lock, ShieldX, Globe, UserCheck, Key, ThumbsUp, Lightbulb } from 'lucide-react';

export const Scene5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    const startPrerequisites = 300;
    const startConclusion = 650;

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="BOUNDARIES & CORE PHILOSOPHY" showCorners={false} />

            <div className="z-20 w-full max-w-[950px] flex flex-col items-center text-center px-10">

                {/* Phase 1: Limitations */}
                <Sequence from={0} durationInFrames={startPrerequisites}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="mb-10" style={{ transform: `scale(${spr(0)})` }}>
                            <ShieldX size={80} className="text-red-500 mb-4" />
                            <GlitchText text="Rubber Ducky لا يتجاوز:" className="text-4xl font-bold text-white dir-rtl" />
                        </div>

                        <div className="flex flex-col gap-4 w-full items-center">
                            {[
                                { text: "BitLocker إن كان الجهاز مغلقاً", icon: <Lock size={24} /> },
                                { text: "FileVault", icon: <Lock size={24} /> },
                                { text: "Full Disk Encryption", icon: <Lock size={24} /> }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 bg-red-500/10 p-5 rounded-2xl border border-red-500/30 w-[550px]"
                                    style={{
                                        opacity: spr(40 + i * 30),
                                        transform: `translateX(${interpolate(frame - (40 + i * 30), [0, 20], [30, 0], { extrapolateRight: 'clamp' })}px)`
                                    }}
                                >
                                    <div className="text-red-500 shrink-0">{item.icon}</div>
                                    <span className="text-xl text-red-100 dir-rtl text-right flex-1">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-12 p-6 border-t border-white/10 flex items-center gap-4"
                            style={{ opacity: spr(200) }}
                        >
                            <Globe size={30} className="text-blue-400" />
                            <SmoothWriteText text="ولا يخترق نظاماً عن بُعد." className="text-2xl text-blue-300 dir-rtl" />
                        </div>
                    </div>
                </Sequence>

                {/* Phase 2: Prerequisites */}
                <Sequence from={startPrerequisites} durationInFrames={startConclusion - startPrerequisites}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="هو يعتمد بالكامل على:"
                            className="text-3xl text-white mb-10 dir-rtl"
                        />

                        <div className="flex flex-col gap-6 w-full items-center">
                            {[
                                { text: "جلسة مستخدم مفتوحة", icon: <UserCheck className="text-green-500" />, delay: 0 },
                                { text: "صلاحيات متاحة", icon: <Key className="text-yellow-500" />, delay: 40 },
                                { text: "ثقة النظام بأجهزة الإدخال", icon: <ThumbsUp className="text-blue-500" />, delay: 80 }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 w-[600px]"
                                    style={{
                                        opacity: spr(startPrerequisites + item.delay),
                                        transform: `scale(${spr(startPrerequisites + item.delay)})`
                                    }}
                                >
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="text-2xl text-white dir-rtl text-right flex-1">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 3: The Philosophy */}
                <Sequence from={startConclusion}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div
                            className="mb-12 relative"
                            style={{ transform: `scale(${spr(startConclusion + 20)})` }}
                        >
                            <div className="absolute inset-x-[-100px] inset-y-[-50px] bg-green-500/10 blur-3xl rounded-full" />
                            <div className="p-10 bg-green-500/10 border-2 border-green-500 rounded-full relative z-10">
                                <Lightbulb size={100} className="text-green-500" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <GlitchText text="قوته ليست في التعقيد،" className="text-5xl font-bold text-white dir-rtl" />
                            <div style={{ opacity: spr(startConclusion + 100) }}>
                                <GlitchText text="بل في بساطة الفكرة." className="text-6xl font-black text-green-500 dir-rtl" />
                            </div>
                        </div>
                    </div>
                </Sequence>

            </div>
        </AbsoluteFill>
    );
};
