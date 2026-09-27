import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { Cpu, Save, Clock, Binary, Zap, ShieldAlert } from 'lucide-react';

export const Scene3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    const startMCU = 210;
    const startPacket = 420;
    const startVerdict = 720;

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="INTERNAL ARCHITECTURE & PROTOCOL" showCorners={false} />

            <div className="z-20 w-full max-w-[950px] flex flex-col items-center text-center px-10">

                {/* Phase 1: Internal Components */}
                <Sequence from={0} durationInFrames={startMCU}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="داخلياً، الجهاز ليس معقداً. يتكون غالباً من:"
                            className="text-3xl text-white mb-10 dir-rtl"
                        />

                        <div className="grid grid-cols-2 gap-6 w-full max-w-[800px]">
                            {[
                                { text: "Microcontroller (USB Mode)", icon: <Cpu className="text-blue-400" />, delay: 20 },
                                { text: "Flash Memory (Payload)", icon: <Save className="text-green-400" />, delay: 50 },
                                { text: "Crystal Oscillator (Timing)", icon: <Clock className="text-purple-400" />, delay: 80 },
                                { text: "Custom Firmware", icon: <Binary className="text-yellow-400" />, delay: 110 }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl"
                                    style={{
                                        opacity: spr(item.delay),
                                        transform: `scale(${spr(item.delay)})`
                                    }}
                                >
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="text-lg font-mono text-white/90 text-left">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 2: The MCU Role */}
                <Sequence from={startMCU} durationInFrames={startPacket - startMCU}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <GlitchText text="الميكروكنترولر هو العنصر الحاسم." className="text-4xl font-bold text-green-500 mb-8 dir-rtl" />

                        <div className="flex flex-col gap-4 w-full items-center">
                            {[
                                "تهيئة USB Stack",
                                "تقديم نفسه كـ HID Keyboard",
                                "إرسال HID Reports تحتوي على Keycodes"
                            ].map((text, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-green-500/10 p-4 rounded-xl border border-green-500/30 w-[550px]"
                                    style={{
                                        opacity: spr(startMCU + (i * 30)),
                                        transform: `translateX(${interpolate(frame - (startMCU + (i * 30)), [0, 20], [20, 0], { extrapolateRight: 'clamp' })}px)`
                                    }}
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-2xl text-green-100 dir-rtl flex-1">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Sequence>

                {/* Phase 3: Binary Packet */}
                <Sequence from={startPacket} durationInFrames={startVerdict - startPacket}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <SmoothWriteText
                            text="كل ضغطة مفتاح ليست نصاً… بل Packet ثنائي يحتوي:"
                            className="text-2xl text-white/70 mb-10 dir-rtl"
                        />

                        <div className="flex gap-4">
                            {[
                                { title: "Modifier", sub: "Byte 0", hex: "0x02", color: "bg-blue-500" },
                                { title: "Reserved", sub: "Byte 1", hex: "0x00", color: "bg-gray-600" },
                                { title: "Keycodes", sub: "Bytes 2-7", hex: "[ 0x04, 0x00... ]", color: "bg-green-500" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                    style={{ transform: `translateY(${interpolate(frame - (startPacket + i * 20), [0, 30], [50, 0], { extrapolateRight: 'clamp' })}px)`, opacity: spr(startPacket + i * 20) }}
                                >
                                    <div className={`${item.color} p-4 rounded-t-xl w-44 text-black font-bold uppercase`}>{item.title}</div>
                                    <div className="bg-white/10 p-4 rounded-b-xl w-44 border-x border-b border-white/20">
                                        <div className="text-xs text-white/40 mb-1">{item.sub}</div>
                                        <div className="font-mono text-green-400">{item.hex}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-blue-400 font-mono text-xl" style={{ opacity: spr(startPacket + 120) }}>
                            SYSTEM RECEPTION: [ KEY_A ] FROM KEYBOARD
                        </div>
                    </div>
                </Sequence>

                {/* Phase 4: Final Verdict */}
                <Sequence from={startVerdict}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="mb-12 flex gap-8">
                            <div className="flex flex-col items-center gap-4" style={{ opacity: spr(startVerdict + 20) }}>
                                <ShieldAlert size={60} className="text-red-500" />
                                <div className="text-red-500 font-bold">NO EXPLOIT</div>
                            </div>
                            <div className="flex flex-col items-center gap-4" style={{ opacity: spr(startVerdict + 50) }}>
                                <Zap size={60} className="text-yellow-500" />
                                <div className="text-yellow-500 font-bold">LEGIT PROTOCOL</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {[
                                "لا يوجد Exploit.",
                                "لا يوجد تجاوز لذاكرة.",
                                "فقط استخدام صحيح للبروتوكول."
                            ].map((text, i) => (
                                <SmoothWriteText
                                    key={i}
                                    delay={startVerdict + 100 + (i * 40)}
                                    text={text}
                                    className={`text-4xl font-black dir-rtl ${i === 2 ? 'text-green-500' : 'text-white'}`}
                                />
                            ))}
                        </div>
                    </div>
                </Sequence>

            </div>
        </AbsoluteFill>
    );
};
