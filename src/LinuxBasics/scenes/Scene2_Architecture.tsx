import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Code, Activity } from 'lucide-react';

export const Scene2_Architecture: React.FC = () => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();
    const FPS = config.fps;

    // Animations
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const slideDown = spring({ frame: frame - 15, fps: FPS, config: { damping: 15 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: ARCHITECTURE_CONTROL" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="mb-8"
                    style={{ opacity, transform: `translateY(${(1 - slideDown) * -50}px)` }}
                >
                    <GlitchText
                        text="ARCHITECTURE & CONTROL"
                        className="text-4xl font-mono text-green-500 mb-4 tracking-tighter"
                    />
                    <div className="text-xl opacity-80 leading-relaxed mb-6">
                        Windows نظام مغلق المصد Closed Source. لا يمكنك رؤية كيف يعمل الـ Kernel أو تعديل مكوناته.
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-4xl relative">
                    <div
                        className="bg-green-900/10 border border-green-500/20 p-8 rounded-2xl backdrop-blur-md"
                        style={{ opacity: interpolate(frame, [45, 75], [0, 1]) }}
                    >
                        <div className="flex flex-col items-center mb-6">
                            <Code className="w-12 h-12 text-green-400 mb-4" />
                            <h3 className="text-2xl font-bold text-green-400">Linux Open Source</h3>
                        </div>
                        <p className="text-sm opacity-90 leading-loose">
                            الـ Kernel، الـ Modules، الإعدادات في
                            <span className="font-mono bg-green-900/40 px-2 py-1 mx-1 rounded text-green-300">/etc</span>
                            كلها واضحة ويمكن فهمها وتعديلها حسب الصلاحيات.
                        </p>
                    </div>

                    <div
                        className="bg-green-900/10 border border-green-500/20 p-8 rounded-2xl backdrop-blur-md"
                        style={{ opacity: interpolate(frame, [90, 120], [0, 1]) }}
                    >
                        <div className="flex flex-col items-center mb-6">
                            <Activity className="w-12 h-12 text-green-400 mb-4" />
                            <h3 className="text-2xl font-bold text-green-400">Low-Level Control</h3>
                        </div>
                        <div className="text-sm opacity-90 leading-loose text-left font-mono bg-black/40 p-4 rounded-lg overflow-hidden border border-green-500/10">
                            <div className="mb-2 text-green-500/80">$ ps -ef | pid, ppid, cmd</div>
                            <div className="mb-1 opacity-70">PID 1024  -&gt; 4501 | /usr/bin/bash</div>
                            <div className="mb-1 opacity-90 text-green-400">SIGTERM (Signal 15)</div>
                            <div className="mb-1 opacity-100 text-red-500 font-bold">SIGKILL (Signal 9)</div>
                            <div className="text-xs opacity-50 uppercase tracking-widest mt-2 animate-pulse">Parent-Child Relationship</div>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-12 text-xl italic opacity-60 font-mono"
                    style={{ opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateLeft: 'clamp' }) }}
                >
                    هذا مستوى تحكم منخفض المستوى Low-Level Control.
                </div>
            </div>
        </AbsoluteFill>
    );
};
