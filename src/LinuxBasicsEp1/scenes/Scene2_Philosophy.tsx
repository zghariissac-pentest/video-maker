import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { MousePointer2, Terminal, Layers, Box } from 'lucide-react';

export const Scene2_Philosophy: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Windows Section (Starts at frame 0)
    const winSlide = spring({ frame: frame - 10, fps: FPS, config: { damping: 14 } });

    // Linux Section (Starts at frame 150 - approx 5s)
    const linuxSlide = spring({ frame: frame - 150, fps: FPS, config: { damping: 14 } });
    const linuxOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp' });

    // Conclusion Section (Starts at frame 400 - approx 13s)
    const conclOpacity = interpolate(frame, [400, 420], [0, 1], { extrapolateRight: 'clamp' });
    const conclY = spring({ frame: frame - 400, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: DESIGN_STRUCTURE" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >

                {/* Section Title */}
                <div className="mb-16">
                    <GlitchText
                        text="1: Design Structure"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                <div className="flex flex-col gap-12 w-full max-w-lg">
                    {/* Windows Block */}
                    <div
                        className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden"
                        style={{
                            opacity: 1,
                            transform: `translateX(${(1 - winSlide) * -100}%) scale(${interpolate(frame, [0, 100], [0.95, 1], { extrapolateRight: 'clamp' })})`
                        }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MousePointer2 className="w-32 h-32" />
                        </div>
                        <h3 className="text-3xl font-bold text-blue-400 mb-4 text-right">Windows</h3>
                        <p className="text-xl leading-relaxed text-right font-semibold">
                            صمم ليكون <span className="text-blue-300">User-Oriented System</span>.
                        </p>
                        <p className="text-lg opacity-70 text-right mt-2 font-light">
                            يركز على إخفاء التعقيد وتسهيل الاستخدام عبر GUI.
                        </p>
                    </div>

                    {/* Linux Block */}
                    <div
                        className="bg-green-900/10 border border-green-500/20 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden"
                        style={{
                            opacity: linuxOpacity,
                            transform: `translateX(${(1 - linuxSlide) * 100}%) scale(${interpolate(frame, [150, 250], [0.95, 1], { extrapolateRight: 'clamp' })})`
                        }}
                    >
                        <div className="absolute top-0 left-0 p-4 opacity-10">
                            <Terminal className="w-32 h-32" />
                        </div>
                        <h3 className="text-3xl font-bold text-green-400 mb-4 text-left" dir="ltr">Linux</h3>
                        <p className="text-xl leading-relaxed text-right font-semibold">
                            صُمم كنظام <span className="text-green-300">Engineer-Oriented</span>.
                        </p>
                        <p className="text-lg opacity-70 text-right mt-2 font-light">
                            يعطيك وصول مباشر للنظام نفسه عبر Shell.
                        </p>
                    </div>
                </div>

                {/* Final Punchline */}
                <div
                    className="mt-20 flex flex-col gap-6"
                    style={{
                        opacity: conclOpacity,
                        transform: `translateY(${(1 - conclY) * 50}px)`
                    }}
                >
                    <div className="flex items-center justify-center gap-10">
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-500/20 p-6 rounded-2xl border border-blue-500/30 mb-4 transition-all hover:bg-blue-500/30">
                                <Layers className="text-blue-400 w-14 h-14" />
                            </div>
                            <p className="text-2xl font-bold">في Windows، أنت تتعامل مع <span className="text-blue-400">واجهة</span>.</p>
                        </div>

                        <div className="h-16 w-[1px] bg-green-500/20 mt-10" />

                        <div className="flex flex-col items-center">
                            <div className="bg-green-500/20 p-6 rounded-2xl border border-green-500/30 mb-4 transition-all hover:bg-green-500/30">
                                <Box className="text-green-400 w-14 h-14" />
                            </div>
                            <p className="text-2xl font-bold">في Linux، أنت تتعامل مع <span className="text-green-400">النظام</span>.</p>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
