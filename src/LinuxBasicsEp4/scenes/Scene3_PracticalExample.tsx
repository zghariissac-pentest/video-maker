import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Activity, Beaker, User, Fingerprint, Cpu, Database } from 'lucide-react';

export const Scene3_PracticalExample: React.FC = () => {
    const frame = useCurrentFrame();

    // Transition stages
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Part 1: Heading (0-3s)
    const headingOpacity = interpolate(frame, [0, 10, 80, 90], [0, 1, 1, 0]);

    // Part 2: ps aux (3-12s)
    const psAuxOpacity = interpolate(frame, [90, 100, 350, 360], [0, 1, 1, 0]);

    // Part 3: top (12-20s)
    const topOpacity = interpolate(frame, [360, 370], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_DIAGNOSTICS: PRACTICAL_ANALYSIS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-16 text-center" dir="rtl" style={{ opacity }}>

                {/* 🧪 HEADER */}
                <div
                    className="absolute top-24 flex flex-col items-center gap-2"
                    style={{ opacity: headingOpacity }}
                >
                    <div className="flex items-center gap-3 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                        <Beaker className="w-5 h-5 text-green-500" />
                        <span className="text-xl font-black text-green-500 tracking-wider">🧪 مثال عملي</span>
                    </div>
                </div>

                {/* PART 1: PS AUX SECTION */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-12"
                    style={{ opacity: psAuxOpacity }}
                >
                    <p className="text-3xl font-bold mb-10">لعرض العمليات الجارية:</p>

                    <div className="w-full max-w-3xl">
                        <TerminalWindow
                            command="ps aux"
                            frame={frame}
                            startFrame={110}
                        />
                    </div>

                    <div className="mt-14 grid grid-cols-4 gap-4 w-full max-w-2xl">
                        <StatLabel icon={<User className="w-5 h-5" />} label="USER" delay={180} frame={frame} />
                        <StatLabel icon={<Fingerprint className="w-5 h-5" />} label="PID" delay={200} frame={frame} />
                        <StatLabel icon={<Cpu className="w-5 h-5" />} label="CPU" delay={220} frame={frame} />
                        <StatLabel icon={<Database className="w-5 h-5" />} label="MEMORY" delay={240} frame={frame} />
                    </div>
                    <p
                        className="mt-10 text-2xl font-mono text-green-500/80 italic"
                        style={{ opacity: interpolate(frame, [260, 275], [0, 1]) }}
                    >
                        سترى معلومات تفصيلية عن كل عملية...
                    </p>
                </div>

                {/* PART 2: TOP SECTION */}
                <div
                    className="absolute inset-x-0 flex flex-col items-center justify-center px-12"
                    style={{ opacity: topOpacity }}
                >
                    <div className="flex flex-col items-center mb-10">
                        <div className="p-4 bg-green-500/10 rounded-full border border-green-500/30 mb-6 font-bold">أو استخدم:</div>
                        <TerminalWindow
                            command="top"
                            frame={frame}
                            startFrame={380}
                            isPulse
                        />
                    </div>

                    <div
                        className="bg-green-500/5 border border-green-400/20 p-8 rounded-3xl backdrop-blur-md flex items-center gap-6"
                        style={{
                            transform: `translateY(${spring({ frame: frame - 420, fps: 30 }) * -10}px)`,
                            opacity: interpolate(frame, [420, 435], [0, 1])
                        }}
                    >
                        <Activity className="w-12 h-12 text-green-500 animate-pulse" />
                        <p className="text-4xl font-black text-white italic">لمراقبة العمليات لحظياً</p>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};

const TerminalWindow: React.FC<{ command: string; frame: number; startFrame: number; isPulse?: boolean }> = ({ command, frame, startFrame, isPulse }) => {
    const typingProgress = Math.max(0, frame - startFrame);
    const typedText = command.substring(0, Math.floor(typingProgress / 2));
    const showCursor = (Math.floor(frame / 10) % 2 === 0);

    return (
        <div className={`relative bg-[#0d0d0d] border-2 ${isPulse ? 'border-green-500/40 shadow-[0_0_50px_rgba(34,197,94,0.15)] animate-pulse' : 'border-white/10 shadow-2xl'} px-10 py-8 rounded-[2rem] w-full group overflow-hidden`}>
            {/* Header / Traffic lights */}
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
                        <div className="w-4 h-10 bg-green-500 ml-2 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    )}
                </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </div>
    );
};

const StatLabel: React.FC<{ icon: React.ReactNode; label: string; delay: number; frame: number }> = ({ icon, label, delay, frame }) => {
    const entrance = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    return (
        <div
            className="flex flex-col items-center gap-3"
            style={{
                opacity,
                transform: `scale(${entrance})`
            }}
        >
            <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                {icon}
            </div>
            <span className="text-sm font-mono text-green-500/60 uppercase tracking-widest font-black leading-tight italic">{label}</span>
        </div>
    );
};
