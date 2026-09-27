import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { User, Users, Globe, Eye, Pencil, Zap } from 'lucide-react';

const PermissionLevel: React.FC<{ icon: any, label: string, delay: number, color: string }> = ({ icon: Icon, label, delay, color }) => {
    const frame = useCurrentFrame();
    const show = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    return (
        <div
            className={`flex flex-col items-center gap-2 transform`}
            style={{
                opacity: show,
                transform: `translateY(${(1 - show) * 20}px)`
            }}
        >
            <div className={`p-4 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
                <Icon className={`w-10 h-10 text-${color}-400`} />
            </div>
            <span className={`text-xl font-bold text-${color}-400`}>{label}</span>
        </div>
    );
};

export const Scene3_Permissions: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Levels (0-8s)
    const levelsOpacity = interpolate(frame, [0, 10, 230, 240], [0, 1, 1, 0]);

    // Part 2: Types (8-15s) - frames 240-450
    const typesOpacity = interpolate(frame, [240, 250, 440, 450], [0, 1, 1, 0]);

    // Part 3: Example (15-30s) - frames 450-900
    const exampleOpacity = interpolate(frame, [450, 460], [0, 1], { extrapolateRight: 'clamp' });
    const terminalSlide = spring({ frame: frame - 470, fps: FPS, config: { damping: 15 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SECURITY_PROTOCOL: PERMISSION_MATRIX" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="2 — نظام الصلاحيات"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* PART 1: 3 LEVELS */}
                <div style={{ opacity: levelsOpacity, position: 'absolute', top: '35%', width: '100%' }}>
                    <p className="text-3xl font-bold mb-12">كل ملف في Linux له 3 مستويات صلاحية:</p>
                    <div className="flex justify-center gap-24">
                        <PermissionLevel icon={User} label="Owner" delay={20} color="green" />
                        <PermissionLevel icon={Users} label="Group" delay={60} color="yellow" />
                        <PermissionLevel icon={Globe} label="Others" delay={100} color="red" />
                    </div>
                </div>

                {/* PART 2: 3 TYPES */}
                <div style={{ opacity: typesOpacity, position: 'absolute', top: '35%', width: '100%' }}>
                    <p className="text-3xl font-bold mb-12">وكل مستوى لديه 3 أنواع صلاحيات:</p>
                    <div className="flex flex-col gap-6 max-w-md mx-auto">
                        {[
                            { icon: Eye, label: "Read (r)", color: "blue" },
                            { icon: Pencil, label: "Write (w)", color: "green" },
                            { icon: Zap, label: "Execute (x)", color: "yellow" }
                        ].map((item, i) => {
                            const show = spring({ frame: frame - 260 - i * 20, fps: FPS });
                            return (
                                <div key={i} className={`flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-xl px-10 transform`} style={{ opacity: show, transform: `translateX(${(1 - show) * 30}px)` }}>
                                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                                    <span className="text-2xl font-black">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* PART 3: PRACTICAL EXAMPLE */}
                <div style={{ opacity: exampleOpacity, position: 'absolute', top: '25%', width: '100%', padding: '0 4rem' }}>
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <h2 className="text-3xl font-black text-green-500 mb-10">مثال عملي:</h2>

                        {/* THE TERMINAL */}
                        <div
                            className="w-full bg-black border border-white/20 rounded-2xl shadow-2xl overflow-hidden mb-12"
                            style={{ transform: `translateY(${(1 - terminalSlide) * 40}px)` }}
                        >
                            <div className="bg-white/10 px-6 py-2 flex items-center gap-2 border-b border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="text-xs font-mono opacity-40 mr-auto">bash — 1080x1920</span>
                            </div>
                            <div className="p-8 text-left font-mono text-2xl" dir="ltr">
                                <div className="flex gap-4 mb-6">
                                    <span className="text-green-500">$</span>
                                    <span>ls -l file.txt</span>
                                </div>
                                <div className="bg-green-500/5 p-6 rounded-xl border border-green-500/20">
                                    <span className="text-white">-</span>
                                    <span className="text-green-400 font-black">rwx</span>
                                    <span className="text-yellow-400 font-black">r-x</span>
                                    <span className="text-red-500/40 font-black">---</span>
                                    <span className="text-white/60 ml-6">1 user group 1024 Mar 1 file.txt</span>
                                </div>
                            </div>
                        </div>

                        {/* EXPLANATION BREAKDOWN */}
                        <div className="grid grid-cols-1 gap-6 w-full max-w-2xl mt-4">
                            {[
                                { level: "Owner", perm: "rwx", desc: "كامل الصلاحيات (قراءة، كتابة، تنفيذ)", color: "green", delay: 650 },
                                { level: "Group", perm: "r-x", desc: "قراءة وتنفيذ فقط (لا يمكنه التعديل)", color: "yellow", delay: 720 },
                                { level: "Others", perm: "---", desc: "لا يملكون أي صلاحية دخول", color: "red", opacity: 40, delay: 790 }
                            ].map((item, i) => {
                                const show = spring({ frame: frame - item.delay, fps: FPS });
                                return (
                                    <div key={i} className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl text-right" dir="rtl" style={{ opacity: show, transform: `translateX(${(1 - show) * 30}px)` }}>
                                        <div className={`w-16 text-center font-black text-2xl text-${item.color}-400 font-mono`}>{item.perm}</div>
                                        <div className="flex-1">
                                            <span className={`text-xl font-black text-${item.color}-400 mr-2`}>{item.level}:</span>
                                            <span className="text-lg opacity-80">{item.desc}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            className="mt-12 text-2xl font-black text-green-500/80 italic underline decoration-green-900 underline-offset-8"
                            style={{ opacity: interpolate(frame, [880, 900], [0, 1]) }}
                        >
                            هذا النموذج البسيط هو أساس أمان Linux.
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
