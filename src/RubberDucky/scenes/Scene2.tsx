import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { FileSearch, Settings, Share2, Keyboard, Monitor, ShieldCheck, Zap } from 'lucide-react';

export const Scene2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    // Timings
    const startDescriptors = 90;
    const startHID = 360;
    const startOS = 540;
    const startEndpoint = 750;

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="TECHNICAL PROCESS: USB ENUMERATION" showCorners={false} />

            <div className="z-20 w-full max-w-[950px] flex flex-col items-center text-center px-10">

                {/* Phase 1: Enumeration Intro */}
                <Sequence from={0} durationInFrames={startDescriptors}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="أي جهاز USB يمر بمرحلة تسمى:"
                            className="text-3xl text-white mb-8 dir-rtl"
                        />
                        <GlitchText
                            delay={30}
                            text="USB Enumeration"
                            className="text-6xl font-black text-green-500"
                        />
                    </div>
                </Sequence>

                {/* Phase 2: Descriptors */}
                <Sequence from={startDescriptors} durationInFrames={startHID - startDescriptors}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="خلالها يقدّم الجهاز ما يُعرف بـ:"
                            className="text-2xl text-white/70 mb-8 dir-rtl"
                        />

                        <div className="flex flex-col gap-6 w-full items-center">
                            {[
                                { label: "Device Descriptor", icon: <FileSearch className="text-blue-400" />, delay: 20 },
                                { label: "Configuration Descriptor", icon: <Settings className="text-purple-400" />, delay: 60 },
                                { label: "Interface Descriptor", icon: <Share2 className="text-orange-400" />, delay: 100 }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-xl w-[500px]"
                                    style={{
                                        opacity: spr(startDescriptors + item.delay),
                                        transform: `scale(${spr(startDescriptors + item.delay)})`
                                    }}
                                >
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="text-2xl font-mono text-green-400 text-left">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 3: HID Class */}
                <Sequence from={startHID} durationInFrames={startOS - startHID}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="Rubber Ducky يعرّف نفسه كـ:"
                            className="text-3xl text-white mb-8 dir-rtl"
                        />
                        <div
                            className="p-10 bg-green-500/10 border-2 border-green-500 rounded-3xl flex flex-col items-center"
                            style={{ transform: `scale(${spr(startHID + 20)})` }}
                        >
                            <Keyboard size={100} className="text-green-500 mb-6" />
                            <GlitchText text="HID Class Device" className="text-5xl font-bold text-green-500 mb-2" />
                            <div className="text-xl text-green-300/60 font-mono">(Human Interface Device)</div>
                        </div>
                    </div>
                </Sequence>

                {/* Phase 4: Why HID? */}
                <Sequence from={startOS} durationInFrames={startEndpoint - startOS}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="السبب في اختيار HID تحديداً:"
                            className="text-3xl text-white/60 mb-10 dir-rtl"
                        />
                        <div className="flex flex-col gap-6 w-full items-center">
                            {[
                                { text: "مدعوم Native في أنظمة مثل Windows و Linux و macOS", icon: <Monitor size={28} />, delay: 0 },
                                { text: "لا يحتاج تعريفات خارجية", icon: <Zap size={28} />, delay: 40 },
                                { text: "يُعتبر جهاز إدخال موثوق", icon: <ShieldCheck size={28} />, delay: 80 }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 bg-green-500/5 p-6 rounded-2xl border border-green-500/20 w-[600px]"
                                    style={{
                                        opacity: spr(startOS + item.delay),
                                        transform: `translateX(${interpolate(frame - (startOS + item.delay), [0, 20], [30, 0], { extrapolateRight: 'clamp' })}px)`
                                    }}
                                >
                                    <div className="text-green-500 shrink-0">{item.icon}</div>
                                    <span className="text-xl text-green-100 dir-rtl text-right flex-1">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 5: Interrupt Endpoint */}
                <Sequence from={startEndpoint}>
                    <div className="flex flex-col items-center justify-center h-full w-full text-center">
                        <div className="relative mb-12">
                            <div className="absolute inset-x-[-100px] inset-y-[-50px] bg-blue-500/10 blur-3xl rounded-full" />
                            <div className="p-8 bg-blue-500/20 border border-blue-500/40 rounded-full relative z-10">
                                <Monitor size={120} className="text-blue-400" />
                            </div>
                            <div
                                className="absolute left-1/2 -top-20 -translate-x-1/2 flex flex-col items-center gap-2"
                                style={{ opacity: interpolate(frame, [startEndpoint + 40, startEndpoint + 60], [0, 1]) }}
                            >
                                <div className="w-1 h-20 bg-gradient-to-t from-blue-500 to-transparent" />
                                <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">Interrupt Endpoint</div>
                            </div>
                        </div>

                        <SmoothWriteText
                            delay={startEndpoint + 20}
                            text="بمجرد اكتمال Enumeration، النظام ينشئ قناة اتصال Interrupt Endpoint"
                            className="text-2xl text-blue-200 mb-6 dir-rtl"
                        />
                        <SmoothWriteText
                            delay={startEndpoint + 80}
                            text="مخصصة لاستقبال تقارير الإدخال (Input Reports)."
                            className="text-2xl text-blue-100 mb-12 dir-rtl"
                        />

                        <div style={{ transform: `scale(${spr(startEndpoint + 140)})`, opacity: spr(startEndpoint + 140) }}>
                            <GlitchText text="وهنا يبدأ التنفيذ." className="text-6xl font-black text-red-500 dir-rtl mt-4 shadow-red-500/20" />
                        </div>
                    </div>
                </Sequence>

            </div>
        </AbsoluteFill>
    );
};
