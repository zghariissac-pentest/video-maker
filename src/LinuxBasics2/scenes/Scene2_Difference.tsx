import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Database, HardDrive } from 'lucide-react';

export const Scene2_Difference: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideDown = spring({ frame, fps, config: { damping: 15 } });
    const slideLeft = spring({ frame: frame - 20, fps, config: { damping: 15 } });
    const slideRight = spring({ frame: frame - 35, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] text-white font-sans overflow-hidden p-10" dir="rtl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 flex flex-col items-center h-full w-full bg-[#0d0d0d] border-2 border-green-500/10 rounded-[3rem] p-16 shadow-2xl">
                <header className="text-center mb-16" style={{ opacity: slideDown, transform: `translateY(${(1 - slideDown) * -50}px)` }}>
                    <h2 className="text-6xl font-black mb-4 tracking-tighter">الفرق الجوهري</h2>
                    <div className="h-2 w-48 bg-green-500 mx-auto rounded-full border border-green-400/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                </header>

                <div className="grid grid-cols-2 gap-10 w-full max-w-7xl items-stretch h-full mb-10 overflow-hidden">
                    {/* Windows Column */}
                    <div className="flex flex-col items-center bg-blue-900/5 border-2 border-blue-500/20 p-12 rounded-[2.5rem] relative" style={{ opacity: slideLeft, transform: `translateX(${(1 - slideLeft) * -100}px)` }}>
                        <div className="w-40 h-40 bg-blue-500/10 rounded-[2rem] flex items-center justify-center border-2 border-blue-500/30 mb-10 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                            <Database className="w-24 h-24 text-blue-400" />
                        </div>
                        <h3 className="text-5xl font-black text-blue-400 mb-10 tracking-tight">Windows</h3>
                        <div className="flex flex-col gap-6 w-full max-w-md">
                            <div className="flex items-center gap-6 bg-blue-950/20 border border-blue-500/30 p-8 rounded-2xl shadow-lg">
                                <span className="text-5xl font-mono font-black text-blue-400">C:\</span>
                                <span className="text-2xl text-blue-400/80 font-bold italic">Os Drive</span>
                            </div>
                            <div className="flex items-center gap-6 bg-blue-950/20 border border-blue-500/30 p-8 rounded-2xl shadow-lg">
                                <span className="text-5xl font-mono font-black text-blue-400">D:\</span>
                                <span className="text-2xl text-blue-400/80 font-bold italic">User Data</span>
                            </div>
                            <p className="text-3xl text-center font-bold opacity-60 mt-10">أقراص وبيئات مستقلة</p>
                        </div>
                    </div>

                    {/* Linux Column */}
                    <div className="flex flex-col items-center bg-green-900/5 border-2 border-green-500/60 p-12 rounded-[2.5rem] active-column shadow-[0_0_40px_rgba(22,163,74,0.15)]" style={{ opacity: slideRight, transform: `translateX(${(1 - slideRight) * 100}px)` }}>
                        <div className="w-40 h-40 bg-green-500/10 rounded-[2rem] flex items-center justify-center border-2 border-green-500/10 mb-10 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                            <HardDrive className="w-24 h-24 text-green-400" />
                        </div>
                        <h3 className="text-5xl font-black text-green-400 mb-10 tracking-tight">Linux</h3>
                        <div className="flex-grow flex flex-col items-center justify-center w-full px-6">
                            <div className="w-full bg-green-500/10 border-2 border-green-500/30 p-14 rounded-[2.5rem] text-center shadow-lg transform hover:scale-[1.02] transition-all">
                                <div className="text-9xl font-mono text-green-500 font-extrabold mb-6 shadow-text">/</div>
                                <p className="text-5xl font-black tracking-tighter mb-4">Root Directory</p>
                                <p className="text-3xl font-bold text-green-400/80 mt-6 leading-relaxed bg-[#0a0a0a] py-4 rounded-xl shadow-inner border border-green-500/10">شجرة واحدة مترابطة</p>
                            </div>
                            <div className="mt-10 flex gap-4 text-green-500/60 font-mono text-xl italic uppercase tracking-widest font-bold">
                                <span>Hierarchical File System</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
