import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { ShieldCheck } from 'lucide-react';

export const Scene3_Security: React.FC = () => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();
    const FPS = config.fps;

    // Animations
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const slideIn = spring({ frame: frame - 20, fps: FPS, config: { damping: 10 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: SECURITY_MODEL" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="mb-8"
                    style={{ opacity, transform: `scale(${interpolate(frame, [0, 60], [0.95, 1])})` }}
                >
                    <GlitchText
                        text="SECURITY MODEL"
                        className="text-4xl font-mono text-green-500 mb-4 tracking-tighter"
                    />
                    <div className="text-xl opacity-80 leading-relaxed mb-6">
                        في Windows، الصلاحيات غالبا تدار بطريقة مركزية ومرتبطة بالحساب.
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
                    <div
                        className="bg-green-900/10 border border-green-500/20 p-8 rounded-2xl backdrop-blur-md"
                        style={{ opacity: spring({ frame: frame - 40, fps: FPS }), transform: `translateY(${(1 - slideIn) * 50}px)` }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <ShieldCheck className="w-12 h-12 text-green-400 mr-4" />
                            <h3 className="text-2xl font-bold text-green-400">Linux Model: UGO</h3>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg font-mono border border-green-500/10">
                            <div className="flex justify-between items-center mb-6 px-4 py-3 bg-green-500/10 rounded-md border border-green-500/20">
                                <span className="text-green-400">User</span>
                                <span className="text-green-400">Group</span>
                                <span className="text-green-400">Others</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-green-900/40 p-4 rounded border border-green-500/10">
                                    <div className="text-lg font-bold mb-2">r - w - x</div>
                                    <div className="text-xs opacity-50 uppercase tracking-widest">4 - 2 - 1</div>
                                </div>
                                <div className="bg-green-900/40 p-4 rounded border border-green-500/10">
                                    <div className="text-lg font-bold mb-2">r - w - -</div>
                                    <div className="text-xs opacity-50 uppercase tracking-widest">Read Write</div>
                                </div>
                                <div className="bg-green-900/40 p-4 rounded border border-green-500/10">
                                    <div className="text-lg font-bold mb-2">r - - -</div>
                                    <div className="text-xs opacity-50 uppercase tracking-widest">Read Only</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-12 text-xl italic opacity-60 font-mono"
                    style={{ opacity: interpolate(frame, [250, 280], [0, 1]) }}
                >
                    هذا النموذج يجعل الأمن جزءًا من بنية النظام، وليس مجرد إضافة.
                </div>
            </div>
        </AbsoluteFill>
    );
};
