import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Laptop, Terminal } from 'lucide-react';

export const Scene1_DesignPhilosophy: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const slideIn = spring({ frame: frame - 20, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: DESIGN_PHILOSOPHY" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="mb-12"
                    style={{ opacity, transform: `scale(${interpolate(frame, [0, 60], [0.8, 1], { extrapolateRight: 'clamp' })})` }}
                >
                    <GlitchText
                        text="Windows vs Linux"
                        className="text-4xl font-mono text-green-500 mb-4 tracking-wider"
                    />
                    <div className="text-2xl opacity-80 leading-relaxed mb-8">
                        معظم الناس يستخدموا Windows، ولهذا أفضل طريقة لفهم Linux هي معرفة الفروقات الأساسية بين النظامين.
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-4xl">
                    {/* Windows side */}
                    <div
                        className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-2xl backdrop-blur-md"
                        style={{ transform: `translateX(${(1 - slideIn) * -100}px)`, opacity: slideIn }}
                    >
                        <div className="flex flex-col items-center mb-6">
                            <Laptop className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-2xl font-bold text-blue-400">Windows</h3>
                        </div>
                        <p className="text-lg opacity-90 mb-4 font-bold">User-Oriented System</p>
                        <p className="text-sm opacity-70">إخفاء التعقيد وتسهيل الاستخدام عبر GUI.</p>
                    </div>

                    {/* Linux side */}
                    <div
                        className="bg-green-900/20 border border-green-500/30 p-8 rounded-2xl backdrop-blur-md"
                        style={{ transform: `translateX(${(1 - slideIn) * 100}px)`, opacity: slideIn }}
                    >
                        <div className="flex flex-col items-center mb-6">
                            <Terminal className="w-12 h-12 text-green-400 mb-4" />
                            <h3 className="text-2xl font-bold text-green-400">Linux</h3>
                        </div>
                        <p className="text-lg opacity-90 mb-4 font-bold">Engineer-Oriented</p>
                        <p className="text-sm opacity-70">وصول مباشر للنظام نفسه عبر Shell.</p>
                    </div>
                </div>

                <div
                    className="mt-12 text-xl italic opacity-60 font-mono"
                    style={{ opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp' }) }}
                >
                    في Windows، أنت تتعامل مع واجهة. | في Linux، أنت تتعامل مع النظام.
                </div>
            </div>
        </AbsoluteFill>
    );
};
