import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { HardDrive, Folder, FileText, Cpu, User, Terminal } from 'lucide-react';

const TreeLine: React.FC<{ length: number; vertical?: boolean; delay: number }> = ({ length, vertical, delay }) => {
    const frame = useCurrentFrame();
    const progress = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    return (
        <div
            className="bg-green-500/30 absolute"
            style={{
                width: vertical ? '2px' : `${length * progress}px`,
                height: vertical ? `${length * progress}px` : '2px',
                boxShadow: '0 0 10px rgba(34,197,94,0.2)'
            }}
        />
    );
};

export const Scene2_Basics: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Windows Part (0-6s)
    const winOpacity = interpolate(frame, [0, 10, 170, 180], [0, 1, 1, 0]);
    const winSlide = spring({ frame: frame - 10, fps: FPS, config: { damping: 15 } });

    // Linux Root Intro (6-20s)
    const linOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: 'clamp' });
    const rootScale = spring({ frame: frame - 200, fps: FPS, config: { damping: 12 } });

    // Tree development (10s+) - frames 300+
    const treeOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: FILESYSTEM_BASICS" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="1 — الفكرة الأساسية"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* WINDOWS PART */}
                <div style={{ opacity: winOpacity, position: 'absolute', top: '35%', width: '100%' }}>
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <div className="flex gap-8 mb-10" style={{ transform: `translateY(${(1 - winSlide) * 50}px)` }}>
                            <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center w-48 transition-all">
                                <HardDrive className="w-16 h-16 text-blue-400 mb-4" />
                                <span className="text-3xl font-black font-mono">C:\</span>
                            </div>
                            <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center w-48 opacity-60">
                                <HardDrive className="w-12 h-12 text-blue-400/50 mb-4" />
                                <span className="text-2xl font-black font-mono">D:\</span>
                            </div>
                        </div>
                        <p className="text-3xl font-bold leading-relaxed mb-6">في Windows عندك أقراص منفصلة...</p>
                        <div
                            className="bg-red-500/20 text-red-400 border border-red-500/40 px-10 py-4 rounded-full font-black text-2xl"
                            style={{ opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp' }), transform: `scale(${spring({ frame: frame - 90, fps: FPS })})` }}
                        >
                            في Linux لا يوجد هذا المفهوم.
                        </div>
                    </div>
                </div>

                {/* LINUX PART */}
                <div style={{ opacity: linOpacity, position: 'absolute', top: '25%', width: '100%' }}>
                    <div className="max-w-5xl mx-auto flex flex-col items-center">
                        <p className="text-3xl font-bold mb-10">كل شيء يبدأ من نقطة واحدة اسمها:</p>

                        {/* ROOT NODE */}
                        <div
                            className="bg-green-500 p-8 rounded-[2rem] shadow-[0_0_60px_rgba(34,197,94,0.4)] mb-16 relative z-10"
                            style={{ transform: `scale(${rootScale})` }}
                        >
                            <h2 className="text-7xl font-black text-black font-mono flex items-center gap-4">
                                Root <span className="text-8xl opacity-60">/</span>
                            </h2>
                        </div>

                        {/* FILESYSTEM TREE */}
                        <div
                            className="w-full h-80 relative"
                            style={{ opacity: treeOpacity }}
                        >
                            {/* Vertical Line from Root */}
                            <div className="absolute left-1/2 -top-16 -translate-x-1/2">
                                <TreeLine length={60} vertical delay={320} />
                            </div>

                            {/* Horizontal Line connecting branches */}
                            <div className="absolute left-[15%] right-[15%] top-12">
                                <TreeLine length={800} delay={350} />
                            </div>

                            {/* Branches */}
                            <div className="flex justify-between w-full px-4 mt-12">
                                {[
                                    { icon: Terminal, label: "/bin", color: "text-green-400" },
                                    { icon: Cpu, label: "/dev", color: "text-blue-400" },
                                    { icon: Folder, label: "/etc", color: "text-yellow-400" },
                                    { icon: User, label: "/home", color: "text-purple-400" },
                                    { icon: FileText, label: "/var", color: "text-red-400" }
                                ].map((node, i) => {
                                    const nodeDelay = 400 + i * 20;
                                    const nodeSpring = spring({ frame: frame - nodeDelay, fps: FPS, config: { stiffness: 100 } });

                                    return (
                                        <div key={i} className="flex flex-col items-center relative gap-4" style={{ transform: `scale(${nodeSpring})`, opacity: nodeSpring }}>
                                            {/* Branch line */}
                                            <div className="absolute -top-[2px] left-1/2 -translate-x-1/2">
                                                <TreeLine length={40} vertical delay={nodeDelay - 10} />
                                            </div>

                                            <div className="bg-green-950/40 border border-green-500/20 p-6 rounded-2xl backdrop-blur-sm mt-10 hover:border-green-500/50 transition-all">
                                                <node.icon className={`w-10 h-10 ${node.color} mb-3 mx-auto`} />
                                                <span className="text-xl font-mono font-bold tracking-tighter">{node.label}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Definition Box */}
                            <div
                                className="mt-20 inline-block bg-green-500/10 border border-green-500/30 px-12 py-5 rounded-full"
                                style={{
                                    opacity: interpolate(frame, [520, 550], [0, 1], { extrapolateRight: 'clamp' }),
                                    transform: `translateY(${(1 - spring({ frame: frame - 520, fps: FPS })) * 20}px)`
                                }}
                            >
                                <p className="text-xl font-mono text-green-400 tracking-widest uppercase">
                                    Hierarchical Filesystem Structure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
