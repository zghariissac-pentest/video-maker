import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { FolderTree, Terminal, HardDrive } from 'lucide-react';

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1]);
    const scale = spring({ frame: frame - 10, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] text-white font-sans flex items-center justify-center p-10" dir="rtl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 flex flex-col items-center w-full max-w-5xl bg-green-500/5 border border-green-500/10 rounded-[3rem] p-24 shadow-2xl" style={{ opacity, transform: `scale(${scale})` }}>
                <div className="grid grid-cols-2 gap-8 mb-16">
                    <div className="w-40 h-40 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center border-2 border-green-500/30 shadow-[0_0_60px_rgba(34,197,94,0.15)]">
                        <FolderTree className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="w-40 h-40 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center border-2 border-green-500/30 shadow-[0_0_60px_rgba(34,197,94,0.15)]">
                        <HardDrive className="w-24 h-24 text-green-500 opacity-60" />
                    </div>
                </div>

                <h1 className="text-7xl font-black mb-6 tracking-tighter text-white">Linux Basics Ep 2</h1>
                <p className="text-4xl text-green-400 font-bold mb-10 text-center leading-tight">كيف ينظم Linux ملكاته داخليًا؟</p>

                <div className="flex gap-4 items-center bg-green-500/10 px-8 py-4 rounded-full border border-green-500/20">
                    <Terminal className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-mono tracking-widest uppercase opacity-80">Filesystem Structure</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
