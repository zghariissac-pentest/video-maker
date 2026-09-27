import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { FolderTree, Layers, Terminal } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // First part: Recap philosophical difference (0-5s)
    const recapOpacity = interpolate(frame, [0, 10, 140, 150], [0, 1, 1, 0]);
    const recapSlide = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Second part: Transition to Filesystem (5-10s)
    const fsOpacity = interpolate(frame, [150, 160], [0, 1], { extrapolateRight: 'clamp' });
    const fsSlide = spring({ frame: frame - 160, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: LINUX_BASICS_EP2" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-16 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* PART 1: RECAP */}
                <div
                    className="absolute inset-x-0 top-[35%] flex flex-col items-center px-12"
                    style={{
                        opacity: recapOpacity,
                        transform: `translateY(${(1 - recapSlide) * 30}px)`
                    }}
                >
                    <div className="bg-green-500/10 border border-green-500/20 p-10 rounded-[2.5rem] backdrop-blur-xl">
                        <Layers className="w-16 h-16 text-green-500/50 mb-6 mx-auto" />
                        <p className="text-3xl font-bold leading-relaxed">
                            في الفيديو السابق فهمنا أن Linux مختلف في البنية.
                        </p>
                    </div>
                </div>

                {/* PART 2: THE NEXT STEP */}
                <div
                    className="flex flex-col items-center gap-10"
                    style={{
                        opacity: fsOpacity,
                        transform: `translateY(${(1 - fsSlide) * 30}px)`
                    }}
                >
                    <div className="flex items-center gap-6 mb-4">
                        <Terminal className="w-12 h-12 text-green-400 opacity-60" />
                        <div className="h-10 w-[2px] bg-green-500/30 rotate-12" />
                        <FolderTree className="w-20 h-20 text-green-400" />
                    </div>

                    <div className="max-w-3xl">
                        <p className="text-4xl font-black mb-8 leading-tight">
                            الآن سنبدأ بأهم شيء لفهمه فعليًا:
                        </p>
                        <div className="inline-block px-10 py-6 bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)] rounded-2xl transform -rotate-1">
                            <h2 className="text-5xl font-black text-black tracking-tighter">الـ Filesystem</h2>
                        </div>
                    </div>
                </div>

            </div>

            {/* Dynamic background particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-500/20 rounded-full"
                        style={{
                            left: `${(i * 20 + frame * 0.1) % 100}%`,
                            top: `${(i * 30 + frame * 0.05) % 100}%`,
                            boxShadow: '0 0 10px #22c55e'
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};
