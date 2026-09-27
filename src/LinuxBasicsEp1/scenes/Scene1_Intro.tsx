import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Monitor, Cpu, Terminal, Layout } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const slideY = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    const text2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' });
    const text2Slide = spring({ frame: frame - 150, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: LINUX_BASICS_EP1" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-20 text-center" dir="rtl">
                {/* Header Section */}
                <div
                    className="mb-16"
                    style={{
                        opacity,
                        transform: `translateY(${(1 - slideY) * 50}px)`
                    }}
                >
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <Monitor className="w-16 h-16 text-blue-400 opacity-80" />
                        <div className="h-12 w-[2px] bg-green-500/30 rotate-12" />
                        <Terminal className="w-16 h-16 text-green-400" />
                    </div>

                    <GlitchText
                        text="Linux vs Windows"
                        className="text-6xl font-black text-green-500 mb-2 tracking-tighter"
                    />
                    <div className="text-2xl text-green-500/60 font-mono tracking-widest uppercase"> الفروقات الجوهرية </div>
                </div>

                {/* Main Quote 1 */}
                <div
                    className="max-w-4xl bg-green-950/20 border border-green-500/30 p-10 rounded-3xl backdrop-blur-xl mb-10 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
                    style={{
                        opacity,
                        transform: `scale(${interpolate(frame, [0, 60], [0.9, 1], { extrapolateRight: 'clamp' })})`
                    }}
                >
                    <p className="text-3xl leading-relaxed text-gray-100 font-bold">
                        بما أن أغلب الناس تستخدم Windows، فأفضل طريقة لفهم Linux هي معرفة الفرق في طريقة التفكير، وليس فقط الشكل.
                    </p>
                </div>

                {/* Main Quote 2 */}
                <div
                    className="flex items-center gap-8"
                    style={{
                        opacity: text2Opacity,
                        transform: `translateY(${(1 - text2Slide) * 30}px)`
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Layout className="w-10 h-10 text-red-400/50" />
                        <span className="text-xs font-mono text-red-400/40">INTERFACE</span>
                    </div>

                    <div className="text-4xl font-light text-green-400/80">
                        الفرق ليس في الواجهة…
                    </div>

                    <div className="h-10 w-[1px] bg-green-500/20" />

                    <div className="text-4xl font-black text-green-400">
                        الفرق في البنية والهندسة.
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Cpu className="w-10 h-10 text-green-400" />
                        <span className="text-xs font-mono text-green-400/40">ARCHITECTURE</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-8 h-1 bg-green-500/20 rounded-full"
                            style={{
                                opacity: interpolate(frame, [200 + i * 10, 230 + i * 10], [0, 1], { extrapolateRight: 'clamp' }),
                                backgroundColor: i === 4 ? '#22c55e' : undefined
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Matrix-like overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, black 100%)'
                }}
            />
        </AbsoluteFill>
    );
};
