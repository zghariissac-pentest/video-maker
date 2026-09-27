import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Fingerprint, LockKeyhole, KeyRound, ShieldAlert, FolderSearch } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Recap Filesystem (0-4s) - frames 0-120
    const part1Opacity = interpolate(frame, [0, 10, 110, 120], [0, 1, 1, 0]);
    const part1Slide = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Part 2: The Critical Question (4-10s) - frames 120-300
    const part2Opacity = interpolate(frame, [120, 130, 290, 300], [0, 1, 1, 0]);

    // Part 3: Title Reveal (10-14s) - frames 300-420
    const part3Opacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: 'clamp' });
    const part3Scale = spring({ frame: frame - 320, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_MODULE: USERS_AND_PERMISSIONS" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-16 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* PART 1: RECAP */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-12"
                    style={{
                        opacity: part1Opacity,
                        transform: `translateY(${(1 - part1Slide) * 30}px)`
                    }}
                >
                    <div className="flex items-center gap-6 mb-8">
                        <FolderSearch className="w-20 h-20 text-green-500/50" />
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-10 rounded-[2.5rem] backdrop-blur-md">
                        <p className="text-4xl font-bold leading-relaxed">
                            كما رأينا سابقًا، Linux منظم جدًا في ملفاته.
                        </p>
                    </div>
                </div>

                {/* PART 2: THE QUESTIONS */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center px-12"
                    style={{
                        opacity: part2Opacity
                    }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <ShieldAlert className="w-16 h-16 text-red-500 animate-pulse" />
                        <h2 className="text-4xl font-black text-white">لكن السؤال الأهم الآن:</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
                        <div
                            className="bg-red-950/20 border-r-4 border-red-500 p-6 rounded-xl flex items-center justify-between"
                            style={{
                                transform: `translateX(${(1 - spring({ frame: frame - 140, fps: FPS })) * 40}px)`,
                                opacity: spring({ frame: frame - 140, fps: FPS })
                            }}
                        >
                            <LockKeyhole className="w-10 h-10 text-red-500/60" />
                            <p className="text-3xl font-bold">من يملك هذه الملفات؟</p>
                        </div>
                        <div
                            className="bg-red-950/20 border-r-4 border-red-500 p-6 rounded-xl flex items-center justify-between"
                            style={{
                                transform: `translateX(${(1 - spring({ frame: frame - 180, fps: FPS })) * 40}px)`,
                                opacity: spring({ frame: frame - 180, fps: FPS })
                            }}
                        >
                            <KeyRound className="w-10 h-10 text-red-500/60" />
                            <p className="text-3xl font-bold text-red-100">ومن يملك صلاحية التعديل أو التنفيذ؟</p>
                        </div>
                    </div>
                </div>

                {/* PART 3: REVEAL */}
                <div
                    className="flex flex-col items-center gap-10"
                    style={{
                        opacity: part3Opacity,
                        transform: `scale(${part3Scale})`
                    }}
                >
                    <div className="relative">
                        <Fingerprint className="w-32 h-32 text-green-500 opacity-60 animate-pulse" />
                        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full" />
                    </div>

                    <div className="max-w-3xl">
                        <p className="text-3xl font-light mb-4">هنا ندخل إلى مفهوم:</p>
                        <div className="inline-block relative">
                            {/* Cyber Glow Background */}
                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20" />
                            <div className="relative px-12 py-8 bg-green-500 rounded-3xl border-2 border-green-300 transform -rotate-1 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                <GlitchText
                                    text="Users & Permissions"
                                    className="text-6xl font-black text-black tracking-tighter"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Dynamic background particles (Real Security Feeling) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-[8px] font-mono text-green-500/40"
                        style={{
                            left: `${(i * 12.5)}%`,
                            top: `${(i * 10 + frame * 0.2) % 100}%`,
                        }}
                    >
                        {Math.floor(Math.random() * 100000).toString(16).toUpperCase()}
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
