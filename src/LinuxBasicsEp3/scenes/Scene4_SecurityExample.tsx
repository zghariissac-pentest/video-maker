import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Database, Unlock, Search, ShieldAlert, Key } from 'lucide-react';

export const Scene4_SecurityExample: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: The Scenario (0-6s)
    const scenarioOpacity = interpolate(frame, [0, 10, 170, 180], [0, 1, 1, 0]);
    const scenarioScale = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Part 2: The Disaster (6-14s)
    const disasterOpacity = interpolate(frame, [180, 200, 410, 420], [0, 1, 1, 0]);
    const permSlide = spring({ frame: frame - 200, fps: FPS, config: { damping: 12 } });

    // Part 3: Pentesting insight (14-20s)
    const pentestOpacity = interpolate(frame, [420, 440], [0, 1], { extrapolateRight: 'clamp' });
    const searchScale = spring({ frame: frame - 440, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_AUDIT: PERMISSION_VULNERABILITY" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="3 — مثال أمني حقيقي"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* PART 1: THE SCENARIO */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center px-12"
                    style={{
                        opacity: scenarioOpacity,
                        top: '35%',
                        transform: `scale(${scenarioScale})`
                    }}
                >
                    <div className="bg-blue-950/20 border border-blue-500/30 p-10 rounded-[3rem] backdrop-blur-xl flex items-center gap-10 max-w-2xl px-12">
                        <div className="p-6 bg-blue-500/20 rounded-2xl relative">
                            <Database className="w-16 h-16 text-blue-400" />
                            <Key className="w-8 h-8 text-yellow-400 absolute -bottom-2 -right-2 animate-bounce" />
                        </div>
                        <div className="text-right flex-1">
                            <h3 className="text-3xl font-black mb-2 text-blue-300 italic">Configuration File</h3>
                            <p className="text-2xl font-bold leading-relaxed">تخيل أن هناك ملف إعدادات يحتوي على <span className="text-yellow-400">كلمة مرور</span> قاعدة بيانات.</p>
                        </div>
                    </div>
                </div>

                {/* PART 2: THE DISASTER */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center px-12"
                    style={{
                        opacity: disasterOpacity,
                        top: '30%'
                    }}
                >
                    <p className="text-3xl font-bold mb-10">إذا كانت صلاحياته هكذا:</p>

                    <div
                        className="bg-red-500 px-12 py-8 rounded-3xl shadow-[0_0_80px_rgba(239,68,68,0.4)] mb-12 flex items-center gap-6 border-4 border-red-300 animate-pulse"
                        style={{ transform: `scale(${permSlide})` }}
                    >
                        <Unlock className="w-16 h-16 text-black" />
                        <span className="text-7xl font-mono font-black text-black tracking-tighter">-rw-rw-rw-</span>
                    </div>

                    <div
                        className="flex flex-col items-center gap-6"
                        style={{ opacity: interpolate(frame, [250, 275], [0, 1]) }}
                    >
                        <div className="flex items-center gap-6 bg-red-950/40 border border-red-500/30 p-8 rounded-2xl">
                            <ShieldAlert className="w-12 h-12 text-red-500" />
                            <p className="text-3xl font-black text-red-100 italic">
                                أي شخص على النظام يمكنه قراءته!
                            </p>
                        </div>
                        <h2 className="text-6xl font-black text-red-500 mt-6 tracking-widest uppercase">
                            وهنا تحدث الكارثة.
                        </h2>
                    </div>
                </div>

                {/* PART 3: PENTEST INSIGHT */}
                <div
                    className="flex flex-col items-center gap-10 max-w-3xl w-full mt-10"
                    style={{ opacity: pentestOpacity }}
                >
                    <div className="h-[2px] w-full bg-green-500/20 mb-4" />

                    <div className="flex items-center gap-10 bg-green-950/10 border border-green-500/20 p-10 rounded-[3rem] w-full text-right" dir="rtl">
                        <div className="p-8 bg-green-500/20 rounded-3xl relative overflow-hidden" style={{ transform: `scale(${searchScale})` }}>
                            <Search className="w-16 h-16 text-green-400 relative z-10" />
                            <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-green-500 mb-4">في اختبار الاختراق:</h3>
                            <p className="text-2xl font-bold leading-relaxed opacity-90">
                                فحص الصلاحيات الضعيفة هو من <span className="text-green-400 underline decoration-green-900 underline-offset-8">أول الأشياء</span> التي يتم تحليلها للوصول لهدف أكبر.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
