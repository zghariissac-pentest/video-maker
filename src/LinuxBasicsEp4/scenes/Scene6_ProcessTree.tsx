import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Network, GitGraph, Search, ShieldAlert, Bug, ArrowUpRight, Terminal } from 'lucide-react';

export const Scene6_ProcessTree: React.FC = () => {
    const frame = useCurrentFrame();

    // Stages
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Hierarchy (0-7s)
    const part1Opacity = interpolate(frame, [0, 10, 200, 210], [0, 1, 1, 0]);

    // Part 3: Pentest Analysis (7-20s)
    const part2Opacity = interpolate(frame, [210, 220], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_ARCH: PROCESS_TREE_ANALYSIS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🌳 HEADER */}
                <div className="absolute top-24 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                        <Network className="w-5 h-5 text-green-500" />
                        <span className="text-xl font-black text-green-500 tracking-wider">🌳 شجرة العمليات</span>
                    </div>
                </div>

                {/* PART 1: HIERARCHY & PSTREE */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: part1Opacity }}
                >
                    <div className="flex flex-col items-center gap-8 mb-12">
                        <div className="flex items-center gap-12">
                            <HierarchyNode label="Parent Process" icon={<GitGraph className="w-8 h-8" />} delay={20} frame={frame} />
                            <ArrowUpRight className="w-10 h-10 text-green-500/40 rotate-90" />
                            <HierarchyNode label="Child Processes" icon={<Network className="w-8 h-8" />} delay={50} frame={frame} isChild />
                        </div>
                        <p className="text-3xl font-bold text-white/80 mt-4 leading-relaxed">
                            كل عملية لها <span className="text-green-500 italic">Parent</span> وممكن أن تنشئ <span className="text-green-500 italic">Children</span>.
                        </p>
                    </div>

                    <div
                        className="w-full max-w-2xl bg-black border-2 border-green-500/30 p-8 rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.1)] mb-6"
                        style={{ transform: `scale(${spring({ frame: frame - 100, fps: 30 })})` }}
                    >
                        <p className="text-2xl font-mono text-green-500/60 mb-4 italic">يمكنك رؤية الشجرة عبر :</p>
                        <div className="flex items-center gap-6 justify-center">
                            <Terminal className="w-10 h-10 text-green-500" />
                            <span className="text-5xl font-mono font-black text-white">$ pstree</span>
                        </div>
                    </div>
                </div>

                {/* PART 2: PENETRATION TESTING UTILITY */}
                <div
                    className="flex flex-col items-center gap-10 w-full max-w-4xl"
                    style={{ opacity: part2Opacity }}
                >
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <GlitchText
                            text="في اختبارات الاختراق :"
                            className="text-4xl font-black text-red-500 uppercase italic tracking-widest"
                        />
                        <p className="text-2xl text-white/60 font-medium">تحليل شجرة العمليات يساعد في :</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 w-full">
                        <AnalysisPoint
                            icon={<Bug className="w-8 h-8" />}
                            text="اكتشاف الـ Backdoors"
                            delay={240}
                            frame={frame}
                            color="red"
                        />
                        <AnalysisPoint
                            icon={<Search className="w-8 h-8" />}
                            text="معرفة العمليات المشبوهة"
                            delay={270}
                            frame={frame}
                            color="yellow"
                        />
                        <AnalysisPoint
                            icon={<ShieldAlert className="w-8 h-8" />}
                            text="تتبع الـ Privilege Escalation"
                            delay={300}
                            frame={frame}
                            color="green"
                        />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};

const HierarchyNode: React.FC<{ label: string; icon: React.ReactNode; delay: number; frame: number; isChild?: boolean }> = ({ label, icon, delay, frame, isChild }) => {
    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 10 } });

    return (
        <div
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 ${isChild ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/20'}`}
            style={{
                opacity: entrance,
                transform: `scale(${entrance}) translateY(${(1 - entrance) * 20}px)`
            }}
        >
            <div className={`p-4 rounded-xl ${isChild ? 'bg-green-500/20 text-green-500' : 'bg-white/10 text-white'}`}>
                {icon}
            </div>
            <span className="text-xl font-black font-mono tracking-tight">{label}</span>
        </div>
    );
};

const AnalysisPoint: React.FC<{ icon: React.ReactNode; text: string; delay: number; frame: number; color: string }> = ({ icon, text, delay, frame, color }) => {
    const colorClasses: Record<string, string> = {
        red: 'bg-red-500/10 border-red-500/30 text-red-500',
        yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
        green: 'bg-green-500/10 border-green-500/30 text-green-500'
    };

    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div
            className={`flex items-center gap-8 p-7 rounded-[2.5rem] border-2 w-full backdrop-blur-md ${colorClasses[color]}`}
            style={{
                opacity,
                transform: `translateX(${(1 - entrance) * -60}px) rotate(${(1 - entrance) * -2}deg)`
            }}
        >
            <div className="p-4 bg-white/10 rounded-2xl">
                {icon}
            </div>
            <p className="text-3xl font-black text-white text-right flex-grow italic">{text}</p>
        </div>
    );
};
