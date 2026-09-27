import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldCheck, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export const Scene5_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Philosophy (0-5s) - frames 0-150
    const part1Opacity = interpolate(frame, [0, 10, 140, 150], [0, 1, 1, 0]);
    const part1Slide = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Part 2: Teaser (5-10s) - frames 150-300
    const part2Opacity = interpolate(frame, [150, 160], [0, 1], { extrapolateRight: 'clamp' });
    const teaserScale = spring({ frame: frame - 160, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="EPISODE_03: SECURITY_CONCLUSION" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-12 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* PART 1: PHILOSOPHY */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center px-12"
                    style={{
                        opacity: part1Opacity,
                        transform: `translateY(${(1 - part1Slide) * 40}px)`
                    }}
                >
                    <div className="bg-green-500/5 border border-green-500/20 p-12 rounded-[3.5rem] backdrop-blur-xl max-w-2xl">
                        <div className="flex justify-center gap-6 mb-8">
                            <ShieldAlert className="w-16 h-16 text-red-500/50" />
                            <ShieldCheck className="w-16 h-16 text-green-500" />
                        </div>
                        <p className="text-3xl font-light mb-6">
                            Linux ليس آمنًا لأنه <span className="text-red-400 italic">“مستحيل الاختراق”</span>.
                        </p>
                        <p className="text-4xl font-black text-green-400 leading-tight">
                            هو آمن لأن الصلاحيات واضحة ويمكن التحكم بها بدقة.
                        </p>
                    </div>
                </div>

                {/* PART 2: TEASER */}
                <div
                    className="flex flex-col items-center gap-12"
                    style={{
                        opacity: part2Opacity,
                        transform: `scale(${teaserScale})`
                    }}
                >
                    <div className="bg-green-950/20 border-r-8 border-green-500 p-8 rounded-2xl max-w-2xl backdrop-blur-md">
                        <p className="text-4xl font-black leading-relaxed">
                            وفي الحلقة القادمة سندخل أعمق:
                        </p>
                    </div>

                    <div className="bg-green-500 text-black px-16 py-10 rounded-3xl flex items-center gap-10 shadow-[0_0_80px_rgba(34,197,94,0.4)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Cpu className="w-20 h-20" />
                        <div className="flex flex-col items-start gap-1">
                            <GlitchText text="Processes" className="text-6xl font-black tracking-tighter" />
                            <span className="text-sm font-mono font-bold tracking-[0.3em] opacity-40 uppercase">System Integrity</span>
                        </div>
                    </div>

                    <div className="max-w-xl text-2xl font-bold opacity-80 italic">
                        كيف تعمل العمليات داخل النظام… وكيف يمكن استغلالها أمنيًا.
                    </div>

                    <div className="mt-8 flex items-center gap-4 animate-pulse opacity-40">
                        <span className="text-xl font-mono tracking-widest uppercase tracking-[0.5em]">Episode 04 Coming Soon</span>
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
