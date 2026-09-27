import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { FileText, Activity, Share2, HardDrive } from 'lucide-react';

export const Scene4_EverythingIsFile: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Main Title Phrase (0-5s)
    const titleOpacity = interpolate(frame, [0, 15, 140, 150], [0, 1, 1, 0]);
    const titleScale = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });

    // Components (5-15s) - frames 150-450
    const componentsOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="ENGINEERING_PRINCIPLE: EVERYTHING_IS_A_FILE" />

            <div
                className="z-20 flex flex-col items-center justify-center h-full px-12 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* PART 1: THE PRINCIPLE PREACHING */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center px-12"
                    style={{
                        opacity: titleOpacity,
                        transform: `scale(${titleScale})`
                    }}
                >
                    <div className="bg-green-500/5 border-2 border-green-500/20 p-12 rounded-[4rem] backdrop-blur-xl shadow-[0_0_100px_rgba(34,197,94,0.1)]">
                        <FileText className="w-24 h-24 text-green-500 mb-8 mx-auto animate-pulse" />
                        <h2 className="text-4xl font-black text-white mb-6">
                            في Linux يوجد مبدأ هندسي قوي:
                        </h2>
                        <div className="inline-block px-12 py-5 bg-green-500 rounded-2xl">
                            <h3 className="text-5xl font-black text-black tracking-tighter uppercase px-2">
                                Everything is a File
                            </h3>
                        </div>
                    </div>
                </div>

                {/* PART 2: THE EVIDENCE */}
                <div
                    className="flex flex-col items-center w-full"
                    style={{ opacity: componentsOpacity }}
                >
                    <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
                        {/* Device Node */}
                        <div
                            className="flex items-center gap-8 bg-blue-900/10 border border-blue-500/20 p-8 rounded-[2rem] w-full"
                            style={{
                                transform: `translateX(${(1 - spring({ frame: frame - 170, fps: FPS })) * 50}px)`,
                                opacity: spring({ frame: frame - 170, fps: FPS })
                            }}
                        >
                            <div className="p-5 rounded-2xl bg-blue-500/20">
                                <HardDrive className="w-12 h-12 text-blue-400" />
                            </div>
                            <div className="flex-1 text-right">
                                <h4 className="text-3xl font-bold mb-2">الأجهزة Devices</h4>
                                <span className="text-xl font-mono text-blue-400/70">تتواجد داخل <span className="text-green-400">/dev</span></span>
                            </div>
                        </div>

                        {/* Process Node */}
                        <div
                            className="flex items-center gap-8 bg-purple-900/10 border border-purple-500/20 p-8 rounded-[2rem] w-full"
                            style={{
                                transform: `translateX(${(1 - spring({ frame: frame - 220, fps: FPS })) * 50}px)`,
                                opacity: spring({ frame: frame - 220, fps: FPS })
                            }}
                        >
                            <div className="p-5 rounded-2xl bg-purple-500/20">
                                <Activity className="w-12 h-12 text-purple-400" />
                            </div>
                            <div className="flex-1 text-right">
                                <h4 className="text-3xl font-bold mb-2">العمليات Processes</h4>
                                <span className="text-xl font-mono text-purple-400/70">معلوماتها داخل <span className="text-green-400">/proc</span></span>
                            </div>
                        </div>

                        {/* Network Node */}
                        <div
                            className="flex items-center gap-8 bg-red-900/10 border border-red-500/20 p-8 rounded-[2rem] w-full"
                            style={{
                                transform: `translateX(${(1 - spring({ frame: frame - 270, fps: FPS })) * 50}px)`,
                                opacity: spring({ frame: frame - 270, fps: FPS })
                            }}
                        >
                            <div className="p-5 rounded-2xl bg-red-500/20">
                                <Share2 className="w-12 h-12 text-red-400" />
                            </div>
                            <div className="flex-1 text-right">
                                <h4 className="text-3xl font-bold mb-2">الشبكة Network</h4>
                                <span className="text-xl font-mono text-red-400/70">لها تمثيل كملفات Sockets داخل النظام.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
