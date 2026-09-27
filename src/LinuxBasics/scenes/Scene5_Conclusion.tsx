import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { BrainCircuit, Rocket } from 'lucide-react';

export const Scene5_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();
    const FPS = config.fps;

    // Animations
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const scale = spring({ frame: frame - 15, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: CONCLUSION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="mb-8"
                    style={{ opacity, transform: `scale(${scale})` }}
                >
                    <div className="flex justify-center mb-12">
                        <BrainCircuit className="w-24 h-24 text-green-500 animate-pulse" />
                    </div>

                    <GlitchText
                        text="LINUX BASICS"
                        className="text-5xl font-mono text-green-500 mb-8 tracking-widest font-bold"
                    />

                    <div className="text-2xl space-y-6 max-w-3xl leading-relaxed">
                        <p>Linux ليس فقط نظام تشغيل مختلف. هو بيئة تعطيك فهم حقيقي لكيف يعمل الكمبيوتر من الداخل.</p>
                        <p className="opacity-80">وإذا فهمت هذا الأساس، ستصبح بقية المفاهيم— Processes، Memory، Networking منطقية جدا.</p>
                    </div>
                </div>

                <div
                    className="mt-12 flex items-center gap-4 text-green-500/60 font-mono tracking-widest uppercase"
                    style={{ opacity: interpolate(frame, [150, 180], [0, 1]) }}
                >
                    <Rocket className="w-6 h-6" />
                    <span>System Ready for Ep 2</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
