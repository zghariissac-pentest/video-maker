import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { BrainCircuit, Rocket, Terminal } from 'lucide-react';

export const Scene5_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1]);
    const scale = spring({ frame: frame - 10, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] text-white font-sans flex items-center justify-center p-10" dir="rtl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 flex flex-col items-center w-full max-w-5xl bg-[#0d0d0d] border-2 border-green-500/10 rounded-[3rem] p-24 shadow-2xl overflow-hidden relative" style={{ opacity, transform: `scale(${scale})` }}>
                <div className="absolute top-0 right-0 w-full h-1/2 bg-green-500/5 blur-[80px] -z-10 rounded-full" />

                <div className="w-48 h-48 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center border-2 border-green-500/30 mb-14 shadow-[0_0_80px_rgba(34,197,94,0.15)] bg-blur-lg">
                    <BrainCircuit className="w-24 h-24 text-green-500 animate-pulse" />
                </div>

                <h2 className="text-6xl font-black mb-10 text-center tracking-tighter">إذا فهمت أين يوجد كل شيء…</h2>

                <div className="bg-[#111111] p-12 rounded-[2.5rem] border-2 border-green-500/10 shadow-inner w-full text-center relative overflow-hidden mb-16">
                    <div className="absolute top-2 left-6 opacity-20"><Terminal className="w-12 h-12 text-green-500" /></div>
                    <p className="text-5xl text-green-400 font-black leading-tight">
                        تصبح قادرًا على تحليل النظام <br /> بدل استخدامه فقط.
                    </p>
                </div>

                <div className="flex items-center gap-10 bg-[#161616] px-14 py-8 rounded-[2.5rem] border-2 border-green-500/10 w-full justify-center shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                        <Rocket className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-3xl text-white opacity-40 font-black uppercase tracking-widest mb-2">الحلقة القادمة</span>
                        <span className="text-5xl text-green-400 font-extrabold tracking-tight">Users & Permissions</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
