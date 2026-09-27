import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Monitor, Cpu, ShieldCheck } from 'lucide-react';

export const Scene4_EverythingIsFile: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] text-white font-sans overflow-hidden p-10" dir="rtl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 flex flex-col items-center h-full w-full bg-[#0d0d0d] border-2 border-green-500/10 rounded-[3rem] p-16 shadow-2xl">
                <header className="text-center mb-10" style={{ opacity: slideUp, transform: `translateY(${(1 - slideUp) * -50}px)` }}>
                    <h2 className="text-6xl font-black mb-4 tracking-tighter uppercase font-mono">Everything is a File</h2>
                    <div className="h-2 w-48 bg-green-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mt-8">
                    <FeatureBox name="/dev" description="الأجهزة (Devices)" icon={<Monitor className="w-20 h-20 text-green-400" />} delay={30} frame={frame} fps={fps} />
                    <FeatureBox name="/proc" description="العمليات (Processes)" icon={<Cpu className="w-20 h-20 text-green-400" />} delay={50} frame={frame} fps={fps} />
                    <FeatureBox name="/net" description="معلومات الشبكة" icon={<Wifi className="w-20 h-20 text-green-400" />} delay={70} frame={frame} fps={fps} />
                </div>

                <div className="flex-grow flex flex-col justify-center mt-12 w-full max-w-7xl">
                    <div
                        className="bg-[#111111] border-2 border-green-500/10 p-14 rounded-[3.5rem] backdrop-blur-md flex items-center justify-center gap-14 shadow-[0_45px_100px_rgba(0,0,0,0.5)] overflow-hidden relative"
                        style={{ opacity: spring({ frame: frame - 120, fps, config: { damping: 12 } }), transform: `translateY(${interpolate(frame, [120, 150], [50, 0], { extrapolateLeft: 'clamp' })}px)` }}
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/5 blur-[80px] -z-10 rounded-full" />

                        <div className="w-32 h-32 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center border-2 border-green-500/20 shadow-lg">
                            <ShieldCheck className="w-16 h-16 text-green-400" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-5xl font-black text-green-400 tracking-tight mb-4">Unified Logic</h3>
                            <div className="text-3xl font-black opacity-80 leading-relaxed font-mono uppercase tracking-widest text-right">
                                System Administration <br /> & Penetration Testing
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const FeatureBox: React.FC<{ name: string; description: string; icon: React.ReactNode; delay: number; frame: number; fps: number }> = ({ name, description, icon, delay, frame, fps }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 10 } });
    const y = interpolate(frame, [delay, delay + 20], [50, 0], { extrapolateLeft: 'clamp' });

    return (
        <div
            className="flex flex-col items-center bg-green-500/5 border-2 border-blue-500/10 p-14 rounded-[2.5rem] shadow-xl relative"
            style={{ opacity: s, transform: `translateY(${y}px) scale(${1 + (1 - s) * -0.1})` }}
        >
            <div className="w-32 h-32 bg-[#0a0a0a] rounded-[2rem] flex items-center justify-center border-2 border-green-500/20 mb-8 shadow-inner group">
                {icon}
            </div>
            <div className="text-5xl font-mono text-green-500 font-extrabold mb-6 tracking-tighter bg-green-500/5 px-8 py-3 rounded-2xl border border-green-500/10">{name}</div>
            <p className="text-2xl font-black text-center opacity-80">{description}</p>
        </div>
    );
};

const Wifi: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 20h.01" /><path d="M17.41 15.59a7 7 0 0 0-10.82 0" /><path d="M22 11c-5.52-5.52-14.48-5.52-20 0" />
    </svg>
);
