import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { ShieldCheck, UserCheck, Terminal, ArrowRight } from 'lucide-react';

export const Scene5_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Analysis (0-5s)
    const part1Opacity = interpolate(frame, [0, 10, 140, 150], [0, 1, 1, 0]);
    const part1Scale = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Part 2: Teaser (5-10s)
    const part2Opacity = interpolate(frame, [150, 160], [0, 1], { extrapolateRight: 'clamp' });
    const teaserSlide = spring({ frame: frame - 160, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="EPISODE_02: CONCLUSION" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-12 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Part 1: ANALYSIS CAPABILITY */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-10"
                    style={{ opacity: part1Opacity, transform: `scale(${part1Scale})` }}
                >
                    <div className="bg-green-500/10 border border-green-500/30 p-12 rounded-[3.5rem] backdrop-blur-xl">
                        <Terminal className="w-20 h-20 text-green-400 mb-8 mx-auto" />
                        <h2 className="text-4xl font-black mb-6 leading-tight">
                            إذا فهمت أين يوجد كل شيء…
                        </h2>
                        <p className="text-3xl text-green-400 leading-relaxed font-bold">
                            تصبح قادراً على تحليل النظام بدل استخدامه فقط.
                        </p>
                    </div>
                </div>

                {/* Part 2: TEASER */}
                <div
                    className="flex flex-col items-center gap-12"
                    style={{ opacity: part2Opacity }}
                >
                    <div
                        className="bg-green-950/20 border-r-8 border-green-500 p-8 rounded-2xl max-w-2xl backdrop-blur-md"
                        style={{ transform: `translateX(${(1 - teaserSlide) * 50}px)` }}
                    >
                        <p className="text-3xl font-black leading-relaxed">
                            وفي الحلقة القادمة سندخل في:
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-8 bg-green-500 px-12 py-8 rounded-[2.5rem] shadow-[0_0_60px_rgba(34,197,94,0.4)]"
                        style={{
                            transform: `scale(${spring({ frame: frame - 180, fps: FPS })})`,
                            opacity: spring({ frame: frame - 180, fps: FPS })
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <UserCheck className="w-14 h-14 text-black mb-2" />
                            <span className="text-black text-xs font-mono font-bold tracking-widest uppercase">Users</span>
                        </div>
                        <div className="w-[2px] h-16 bg-black/20" />
                        <div className="flex flex-col items-center">
                            <ShieldCheck className="w-14 h-14 text-black mb-2" />
                            <span className="text-black text-xs font-mono font-bold tracking-widest uppercase">Permissions</span>
                        </div>
                    </div>

                    <div
                        className="mt-8 flex items-center gap-4 animate-pulse opacity-40"
                        style={{ opacity: interpolate(frame, [240, 260], [0, 0.4], { extrapolateRight: 'clamp' }) }}
                    >
                        <span className="text-xl font-mono tracking-widest uppercase">Next Episode 03</span>
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
