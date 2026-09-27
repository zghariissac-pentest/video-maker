import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Lock, Unlock, Cpu, Zap, Activity } from 'lucide-react';

export const Scene3_Architecture: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Source Code (0-8s)
    const part1Opacity = interpolate(frame, [0, 10, 230, 240], [0, 1, 1, 0]);
    const winLockSlide = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });
    const linUnlockSlide = spring({ frame: frame - 60, fps: FPS, config: { damping: 12 } });

    // Part 2: Processes (8-18s) - frames 240-540
    const part2Opacity = interpolate(frame, [240, 250, 530, 540], [0, 1, 1, 0]);
    const pidSlide = spring({ frame: frame - 250, fps: FPS, config: { damping: 12 } });

    // Part 3: Low-Level Control (18-25s) - frames 540-750
    const part3Opacity = interpolate(frame, [540, 560], [0, 1], { extrapolateRight: 'clamp' });
    const zapScale = spring({ frame: frame - 560, fps: FPS, config: { stiffness: 200 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: ARCHITECTURE_CONTROL" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="2: System Architecture & Control"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* PART 1: SOURCE CODE */}
                <div style={{ opacity: part1Opacity, position: 'absolute', top: '35%', width: '100%', padding: '0 3rem' }}>
                    <div className="flex justify-center gap-12 w-full max-w-5xl mx-auto">
                        {/* Windows Closed Source */}
                        <div
                            className="flex-1 bg-red-900/10 border border-red-500/20 p-8 rounded-3xl backdrop-blur-md"
                            style={{ transform: `translateX(${(1 - winLockSlide) * -50}px)`, opacity: winLockSlide }}
                        >
                            <Lock className="w-16 h-16 text-red-500 mb-6 mx-auto opacity-50" />
                            <h3 className="text-3xl font-bold text-red-400 mb-4">Windows</h3>
                            <p className="text-xl font-bold text-red-300/80 mb-2">نظام مغلق المصدر Closed Source</p>
                            <p className="text-lg opacity-60">لا يمكنك رؤية كيف يعمل الـ Kernel أو تعديل مكوناته.</p>
                        </div>

                        {/* Linux Open Source */}
                        <div
                            className="flex-1 bg-green-900/10 border border-green-500/20 p-8 rounded-3xl backdrop-blur-md"
                            style={{ transform: `translateX(${(1 - linUnlockSlide) * 50}px)`, opacity: linUnlockSlide }}
                        >
                            <Unlock className="w-16 h-16 text-green-500 mb-6 mx-auto opacity-80" />
                            <h3 className="text-3xl font-bold text-green-400 mb-4">Linux</h3>
                            <p className="text-xl font-bold text-green-300 mb-2">Open Source</p>
                            <p className="text-lg opacity-80">الـ Kernel، الـ Modules، الإعدادات في /etc، كلها واضحة ويمكن تعديلها.</p>
                        </div>
                    </div>
                </div>

                {/* PART 2: PROCESSES */}
                <div style={{ opacity: part2Opacity, position: 'absolute', top: '30%', width: '100%', padding: '0 3rem' }}>
                    <div className="max-w-4xl mx-auto bg-green-950/10 border border-green-500/20 p-12 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
                        <Activity className="absolute -right-10 -top-10 w-64 h-64 text-green-500/5 rotate-12" />

                        <h3 className="text-4xl font-black text-green-500 mb-10 flex items-center justify-center gap-4">
                            <Cpu className="w-10 h-10" />
                            العمليات Processes
                        </h3>

                        <div className="grid grid-cols-1 gap-8 text-right">
                            <div
                                className="flex items-center gap-6 bg-green-500/5 p-6 rounded-2xl border-r-4 border-green-500"
                                style={{ transform: `translateX(${(1 - pidSlide) * 40}px)`, opacity: pidSlide }}
                            >
                                <div className="text-6xl font-mono text-green-500/20">01</div>
                                <p className="text-2xl leading-relaxed">في Linux يمكنك رؤية كل Process عبر <span className="text-green-400 font-mono">PID</span>.</p>
                            </div>

                            <div
                                className="flex items-center gap-6 bg-green-500/5 p-6 rounded-2xl border-r-4 border-green-500"
                                style={{
                                    transform: `translateX(${(1 - spring({ frame: frame - 300, fps: FPS })) * 40}px)`,
                                    opacity: spring({ frame: frame - 300, fps: FPS })
                                }}
                            >
                                <div className="text-6xl font-mono text-green-500/20">02</div>
                                <p className="text-2xl leading-relaxed">معرفة الـ <span className="text-green-400">Parent-Child relationship</span>.</p>
                            </div>

                            <div
                                className="flex items-center gap-6 bg-green-500/5 p-6 rounded-2xl border-r-4 border-green-500"
                                style={{
                                    transform: `translateX(${(1 - spring({ frame: frame - 350, fps: FPS })) * 40}px)`,
                                    opacity: spring({ frame: frame - 350, fps: FPS })
                                }}
                            >
                                <div className="text-6xl font-mono text-green-500/20">03</div>
                                <p className="text-2xl leading-relaxed">وإرسال Signals مثل <span className="text-red-400 font-mono">SIGTERM</span> أو <span className="text-red-600 font-mono font-bold italic">SIGKILL</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PART 3: LOW LEVEL CONTROL */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30"
                    style={{ opacity: part3Opacity, pointerEvents: part3Opacity > 0.5 ? 'auto' : 'none' }}
                >
                    <div
                        className="p-16 border-2 border-green-500/40 rounded-[4rem] bg-green-950/20 shadow-[0_0_100px_rgba(34,197,94,0.2)]"
                        style={{ transform: `scale(${zapScale})` }}
                    >
                        <Zap className="w-32 h-32 text-green-400 mb-8 mx-auto animate-pulse" />
                        <h2 className="text-6xl font-black text-white mb-6">Low-Level Control</h2>
                        <div className="h-1 w-48 bg-green-500 mx-auto rounded-full mb-8 shadow-[0_0_20px_#22c55e]" />
                        <p className="text-3xl text-green-400/80 font-mono">هذا مستوى تحكم منخفض المستوى</p>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
