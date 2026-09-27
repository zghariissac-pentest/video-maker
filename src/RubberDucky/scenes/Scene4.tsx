import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { Code2, ArrowDown, ChevronRight, Save, Terminal, Clock, AlertTriangle, Monitor } from 'lucide-react';

export const Scene4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    const startPipeline = 180;
    const startExample = 420;
    const startTimeFactors = 720;

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="DUCKY SCRIPT & EXECUTION FLOW" showCorners={false} />

            <div className="z-20 w-full max-w-[950px] flex flex-col items-center text-center px-10">

                {/* Phase 1: Intro to Language */}
                <Sequence from={0} durationInFrames={startPipeline}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="Rubber Ducky يستخدم لغة عالية المستوى تسمى:"
                            className="text-3xl text-white mb-8 dir-rtl"
                        />
                        <GlitchText
                            delay={30}
                            text="Ducky Script"
                            className="text-7xl font-black text-green-500 mb-6"
                        />
                        <SmoothWriteText
                            delay={100}
                            text="لكن هذه اللغة ليست ما يُنفذ فعلياً."
                            className="text-2xl text-red-400 font-bold dir-rtl"
                        />
                    </div>
                </Sequence>

                {/* Phase 2: Transformation Pipeline */}
                <Sequence from={startPipeline} durationInFrames={startExample - startPipeline}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="المسار الحقيقي:"
                            className="text-2xl text-white/60 mb-8 dir-rtl"
                        />

                        <div className="flex flex-col items-center gap-4">
                            {[
                                { text: "Ducky Script", icon: <Code2 className="text-blue-400" /> },
                                { text: "Compiler (Keycode Sequences)", icon: <Terminal className="text-yellow-400" /> },
                                { text: "Flash Memory Storage", icon: <Save className="text-green-400" /> },
                                { text: "Firmware (HID Reports)", icon: <ChevronRight className="rotate-90 text-purple-400" /> }
                            ].map((item, i) => (
                                <React.Fragment key={i}>
                                    <div
                                        className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-xl w-[450px]"
                                        style={{
                                            opacity: spr(startPipeline + i * 40),
                                            transform: `scale(${spr(startPipeline + i * 40)})`
                                        }}
                                    >
                                        <div className="shrink-0">{item.icon}</div>
                                        <span className="text-xl font-mono text-white">{item.text}</span>
                                    </div>
                                    {i < 3 && (
                                        <ArrowDown
                                            size={20}
                                            className="text-white/20"
                                            style={{ opacity: spr(startPipeline + i * 40 + 20) }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 3: Logic Example */}
                <Sequence from={startExample} durationInFrames={startTimeFactors - startExample}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="مثال منطقي:"
                            className="text-3xl text-white mb-10 dir-rtl"
                        />

                        <div className="bg-black/60 border border-green-500/30 p-8 rounded-2xl w-[600px] text-left font-mono relative">
                            <div className="absolute top-4 right-4 text-green-500/30 text-xs">SOURCE.txt</div>
                            {[
                                { cmd: "DELAY", val: "500", color: "text-red-400", delay: 20 },
                                { cmd: "GUI", val: "r", color: "text-blue-400", delay: 60 },
                                { cmd: "STRING", val: "powershell", color: "text-white", delay: 100 },
                                { cmd: "ENTER", val: "", color: "text-yellow-400", delay: 140 }
                            ].map((line, i) => (
                                <div
                                    key={i}
                                    className="text-2xl mb-2"
                                    style={{ opacity: spr(startExample + line.delay) }}
                                >
                                    <span className={line.color}>{line.cmd}</span> {line.val}
                                </div>
                            ))}
                        </div>

                        <SmoothWriteText
                            delay={startExample + 200}
                            text="كل أمر يتحول إلى تسلسل زمني مضبوط بدقة ميلي ثانية."
                            className="text-xl text-green-400 mt-10 dir-rtl"
                        />
                    </div>
                </Sequence>

                {/* Phase 4: Time Factors */}
                <Sequence from={startTimeFactors}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="flex items-center gap-4 mb-10">
                            <Clock size={50} className="text-yellow-500 animate-pulse" />
                            <GlitchText text="عامل الزمن هنا حاسم" className="text-4xl font-bold text-white dir-rtl" />
                        </div>

                        <div className="flex flex-col gap-4 w-full items-center">
                            {[
                                { text: "وقت تحميل النظام", icon: <Monitor size={24} /> },
                                { text: "ظهور نافذة Run", icon: <Terminal size={24} /> },
                                { text: "استجابة PowerShell", icon: <Code2 size={24} /> }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 bg-red-500/5 p-5 rounded-xl border border-red-500/20 w-[550px]"
                                    style={{
                                        opacity: spr(startTimeFactors + i * 40),
                                        transform: `translateX(${interpolate(frame - (startTimeFactors + i * 40), [0, 20], [-20, 0], { extrapolateRight: 'clamp' })}px)`
                                    }}
                                >
                                    <div className="text-red-500 shrink-0">{item.icon}</div>
                                    <span className="text-xl text-red-100 dir-rtl text-right flex-1">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-12 flex items-center gap-3 text-red-500 font-bold"
                            style={{ opacity: spr(startTimeFactors + 160), transform: `scale(${spr(startTimeFactors + 160)})` }}
                        >
                            <AlertTriangle size={30} />
                            <span className="text-3xl dir-rtl">أي خطأ في التوقيت قد يفشل الهجوم.</span>
                        </div>
                    </div>
                </Sequence>

            </div>
        </AbsoluteFill>
    );
};
