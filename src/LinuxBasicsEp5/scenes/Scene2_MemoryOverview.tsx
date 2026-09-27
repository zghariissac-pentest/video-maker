import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Settings, Database, HardDrive, Shield, User, CheckCircle2, Activity, Info } from 'lucide-react';

export const Scene2_MemoryOverview: React.FC = () => {
    const frame = useCurrentFrame();

    // Entrance
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Memory Subdivisions (0-15s) - frames 0-450
    const part1Opacity = interpolate(frame, [0, 10, 430, 450], [0, 1, 1, 0]);

    // Part 2: Practical Commands (15-30s) - frames 450-900
    const part2Opacity = interpolate(frame, [450, 460], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: MEMORY_ARCHITECTURE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* PART 1: MEMORY SUBDIVISIONS */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: part1Opacity }}
                >
                    {/* ⚙️ HEADER */}
                    <div className="absolute top-24 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                            <Settings className="w-5 h-5 text-green-500 animate-spin-slow" />
                            <span className="text-xl font-black text-green-500 tracking-wider">⚙️ الذاكرة في Linux</span>
                        </div>
                    </div>

                    <p className="text-3xl font-bold mb-12">Linux يقسم الذاكرة إلى :</p>

                    <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
                        <MemoryType icon={<Database className="w-8 h-8" />} name="RAM" desc="الذاكرة الفعلية" delay={30} frame={frame} />
                        <MemoryType icon={<HardDrive className="w-8 h-8" />} name="Swap" desc="مساحة على القرص عند نفاد RAM" delay={60} frame={frame} />
                        <MemoryType icon={<Shield className="w-8 h-8" />} name="Kernel Space" desc="ذاكرة النظام الأساسية" delay={90} frame={frame} color="red" />
                        <MemoryType icon={<User className="w-8 h-8" />} name="User Space" desc="ذاكرة العمليات العادية" delay={120} frame={frame} color="blue" />
                    </div>
                </div>

                {/* PART 2: PRACTICAL EXAMPLE */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-10"
                    style={{ opacity: part2Opacity }}
                >
                    {/* 🧪 HEADER */}
                    <div className="absolute top-24 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                            <span className="text-xl font-black text-green-500 tracking-wider">🧪 مثال عملي</span>
                        </div>
                    </div>

                    <p className="text-3xl font-bold mb-8">أمر لمراقبة استهلاك الذاكرة :</p>

                    <div className="w-full max-w-3xl mb-12">
                        <TerminalWindow
                            command="free -h"
                            frame={frame}
                            startFrame={480}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full max-w-3xl mb-12">
                        <StatItem label="Total" delay={550} frame={frame} />
                        <StatItem label="Used" delay={570} frame={frame} />
                        <StatItem label="Free" delay={590} frame={frame} />
                        <StatItem label="Shared" delay={610} frame={frame} />
                        <StatItem label="Buffers" delay={630} frame={frame} />
                        <StatItem label="Cache" delay={650} frame={frame} />
                    </div>

                    <div className="w-full max-w-2xl bg-green-500/5 border border-green-500/20 p-6 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Activity className="w-10 h-10 text-green-500 animate-pulse" />
                            <div className="text-right">
                                <p className="text-xl font-bold">أو مراقبة كل عملية :</p>
                                <p className="text-3xl font-mono font-black text-green-500">$ top</p>
                            </div>
                        </div>
                        <Info className="w-8 h-8 text-green-500/30" />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};

const MemoryType: React.FC<{ icon: React.ReactNode; name: string; desc: string; delay: number; frame: number; color?: 'green' | 'red' | 'blue' }> = ({ icon, name, desc, delay, frame, color = 'green' }) => {
    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    const colorClass = color === 'red' ? 'text-red-500 border-red-500/20 bg-red-500/5' : color === 'blue' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' : 'text-green-500 border-green-500/20 bg-green-500/5';

    return (
        <div
            className={`flex items-center gap-6 p-6 rounded-2xl border ${colorClass} backdrop-blur-md`}
            style={{
                opacity: entrance,
                transform: `translateX(${(1 - entrance) * 60}px)`
            }}
        >
            <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
            <div className="text-right flex-grow">
                <span className="text-2xl font-black block">{name}</span>
                <span className="text-lg text-white/60">{desc}</span>
            </div>
            <CheckCircle2 className="w-6 h-6 opacity-20" />
        </div>
    );
};

const StatItem: React.FC<{ label: string; delay: number; frame: number }> = ({ label, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
    return (
        <div
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl"
            style={{ opacity }}
        >
            <span className="text-green-500 font-mono text-sm tracking-widest font-black block mb-1 uppercase opacity-60">{label}</span>
            <div className="h-1 w-full bg-green-500/20 rounded-full" />
        </div>
    );
};

const TerminalWindow: React.FC<{ command: string; frame: number; startFrame: number }> = ({ command, frame, startFrame }) => {
    const typingProgress = Math.max(0, frame - startFrame);
    const typedText = command.substring(0, Math.floor(typingProgress / 2));
    const showCursor = (Math.floor(frame / 10) % 2 === 0);

    return (
        <div className="relative bg-[#0d0d0d] border-2 border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)] px-10 py-8 rounded-3xl w-full group overflow-hidden">
            <div className="absolute top-4 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <div className="flex items-center gap-6 mt-4">
                <div className="text-green-500 font-mono text-4xl font-black">$</div>
                <div className="text-4xl font-mono text-white font-black tracking-tight flex items-center">
                    {typedText}
                    {showCursor && typingProgress < command.length * 2 && (
                        <div className="w-4 h-10 bg-green-500 ml-2 animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
};
