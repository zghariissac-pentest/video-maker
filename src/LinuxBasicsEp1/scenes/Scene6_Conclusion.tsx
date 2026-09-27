import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Cpu, Box, Share2, Terminal } from 'lucide-react';

export const Scene6_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Philosophy (0-7s)
    const part1Opacity = interpolate(frame, [0, 10, 200, 210], [0, 1, 1, 0]);
    const part1Scale = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Part 2: Logical Concepts (7-15s)
    const part2Opacity = interpolate(frame, [210, 220], [0, 1], { extrapolateRight: 'clamp' });
    const conceptSlide = spring({ frame: frame - 220, fps: FPS, config: { damping: 12 } });

    const concepts = [
        { icon: Cpu, label: "Processes" },
        { icon: Box, label: "Memory" },
        { icon: Share2, label: "Networking" }
    ];

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: CONCLUSION" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-12 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Part 1: The REAL Linux */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-10"
                    style={{ opacity: part1Opacity, transform: `scale(${part1Scale})` }}
                >
                    <div className="bg-green-500/10 border border-green-500/30 p-12 rounded-[3rem] backdrop-blur-xl shadow-[0_0_80px_rgba(34,197,94,0.1)]">
                        <Terminal className="w-20 h-20 text-green-400 mb-8 mx-auto" />
                        <h2 className="text-4xl font-black mb-6 leading-tight">
                            Linux ليس فقط نظام تشغيل مختلف.
                        </h2>
                        <p className="text-2xl text-green-400/80 leading-relaxed font-bold">
                            هو بيئة تعطيك فهم حقيقي لكيف يعمل الكمبيوتر من الداخل.
                        </p>
                    </div>
                </div>

                {/* Part 2: Logical Concepts */}
                <div
                    className="flex flex-col items-center gap-12"
                    style={{ opacity: part2Opacity }}
                >
                    <div
                        className="bg-green-950/20 border-r-8 border-green-500 p-8 rounded-2xl max-w-2xl backdrop-blur-md mb-10"
                        style={{ transform: `translateX(${(1 - conceptSlide) * 50}px)` }}
                    >
                        <p className="text-3xl font-black leading-relaxed">
                            وإذا فهمت هذا الأساس، ستصبح بقية المفاهيم منطقية جداً:
                        </p>
                    </div>

                    <div className="flex gap-8">
                        {concepts.map((item, i) => (
                            <div
                                key={i}
                                className="bg-green-500/5 border border-green-500/20 p-8 rounded-[2rem] flex flex-col items-center w-48"
                                style={{
                                    transform: `translateY(${(1 - spring({ frame: frame - 240 - i * 20, fps: FPS })) * 40}px)`,
                                    opacity: spring({ frame: frame - 240 - i * 20, fps: FPS })
                                }}
                            >
                                <item.icon className="w-12 h-12 text-green-500 mb-4" />
                                <span className="text-xl font-mono font-bold tracking-tighter text-green-300">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="mt-12"
                        style={{
                            opacity: interpolate(frame, [380, 400], [0, 1], { extrapolateRight: 'clamp' }),
                            transform: `scale(${spring({ frame: frame - 380, fps: FPS })})`
                        }}
                    >
                        <GlitchText
                            text="END_OF_EPISODE_01"
                            className="text-2xl font-mono text-green-500/40 tracking-[0.5em]"
                        />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
