import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Shield, ShieldCheck, User, Users, Globe, Edit3, Eye, Play } from 'lucide-react';

export const Scene4_Security: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Windows vs Linux Intro (0-4s)
    const winOpacity = interpolate(frame, [0, 10, 110, 120], [0, 1, 1, 0]);
    const linOpacity = interpolate(frame, [120, 130], [0, 1], { extrapolateRight: 'clamp' });

    // Permission Model (4-8s)
    const modelSlide = spring({ frame: frame - 130, fps: FPS, config: { damping: 12 } });

    // Final Punchline (8-10s)
    const punchOpacity = interpolate(frame, [240, 260], [0, 1], { extrapolateRight: 'clamp' });
    const punchScale = spring({ frame: frame - 240, fps: FPS, config: { stiffness: 100 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: SECURITY_MODEL" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="3: Security Model"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* Windows Context */}
                <div style={{ opacity: winOpacity, position: 'absolute', top: '40%', width: '100%' }}>
                    <div className="max-w-3xl mx-auto bg-blue-900/10 border border-blue-500/20 p-10 rounded-3xl backdrop-blur-md">
                        <Shield className="w-16 h-16 text-blue-400 mb-6 mx-auto opacity-50" />
                        <h3 className="text-4xl font-bold text-blue-400 mb-4">Windows</h3>
                        <p className="text-2xl leading-relaxed">في Windows، الصلاحيات غالبًا تُدار بطريقة مركزية ومرتبطة بالحساب.</p>
                    </div>
                </div>

                {/* Linux Model */}
                <div style={{ opacity: linOpacity, position: 'absolute', top: '25%', width: '100%', padding: '0 2rem' }}>
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-4xl font-black text-green-500 mb-12">Linux Permission Model</h3>

                        <div className="grid grid-cols-3 gap-6 mb-12">
                            {[
                                { icon: User, label: "User", color: "text-green-400" },
                                { icon: Users, label: "Group", color: "text-green-500" },
                                { icon: Globe, label: "Others", color: "text-green-600" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-green-500/5 border border-green-500/20 p-8 rounded-2xl flex flex-col items-center"
                                    style={{
                                        transform: `translateY(${(1 - spring({ frame: frame - 140 - i * 10, fps: FPS })) * 30}px)`,
                                        opacity: spring({ frame: frame - 140 - i * 10, fps: FPS })
                                    }}
                                >
                                    <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                                    <span className="text-2xl font-bold font-mono">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl flex justify-around items-center"
                            style={{
                                transform: `scale(${modelSlide})`,
                                opacity: modelSlide
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <Eye className="w-8 h-8 text-green-400" />
                                <span className="text-3xl font-black font-mono">READ</span>
                            </div>
                            <div className="w-[1px] h-10 bg-green-500/30" />
                            <div className="flex items-center gap-3">
                                <Edit3 className="w-8 h-8 text-yellow-400" />
                                <span className="text-3xl font-black font-mono">WRITE</span>
                            </div>
                            <div className="w-[1px] h-10 bg-green-500/30" />
                            <div className="flex items-center gap-3">
                                <Play className="w-8 h-8 text-red-500" />
                                <span className="text-3xl font-black font-mono">EXECUTE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Punchline */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl z-30 px-10"
                    style={{ opacity: punchOpacity, pointerEvents: punchOpacity > 0.5 ? 'auto' : 'none' }}
                >
                    <div
                        className="p-12 border-2 border-green-500/40 rounded-[3rem] bg-green-950/20 shadow-[0_0_80px_rgba(34,197,94,0.15)] max-w-2xl"
                        style={{ transform: `scale(${punchScale})` }}
                    >
                        <ShieldCheck className="w-24 h-24 text-green-400 mb-8 mx-auto" />
                        <p className="text-4xl leading-relaxed text-white font-bold mb-6">
                            هذا النموذج يجعل الأمن جزءًا من بنية النظام، وليس مجرد إضافة.
                        </p>
                        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
