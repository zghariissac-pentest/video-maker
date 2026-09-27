import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Rocket, Activity, CheckCircle2 } from 'lucide-react';

export const Scene6_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 15], [0, 1]);
    const scale = spring({ frame: frame, fps: FPS, config: { damping: 10 } });

    return (
        <AbsoluteFill className="bg-[#050505] overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_EXIT_SEQUENCE" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-12 text-center" dir="rtl" style={{ opacity }}>

                {/* Completion Icon */}
                <div
                    className="mb-14 relative"
                    style={{ transform: `scale(${scale})` }}
                >
                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full animate-pulse" />
                    <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" />
                </div>

                <h2 className="text-3xl font-mono text-green-500/60 mb-8 uppercase tracking-[0.4em] font-black italic">-- MODULE COMPLETE --</h2>

                <p className="text-4xl font-black text-white text-center leading-[1.3] mb-16 max-w-2xl px-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    الـ Processes هي الروح التي تحرك النظام… <br />
                    <span className="text-green-500 font-bold italic tracking-tight">وفهمها هو مفتاح التحكم المطلق.</span>
                </p>

                {/* Next Episode Teaser */}
                <div
                    className="group flex items-center gap-10 bg-green-500/5 px-12 py-8 rounded-[2.5rem] border border-green-500/10 backdrop-blur-md hover:border-green-500/30 transition-all duration-300 transform hover:scale-105"
                    style={{
                        opacity: interpolate(frame, [60, 80], [0, 1]),
                        transform: `translateY(${(1 - spring({ frame: frame - 60, fps: 30 })) * 50}px)`
                    }}
                >
                    <div className="p-5 bg-green-500/10 rounded-3xl border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                        <Rocket className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xl text-white opacity-40 font-black uppercase mb-2 tracking-widest italic">الحلقة القادمة</span>
                        <div className="flex gap-4 items-center">
                            <GlitchText
                                text="Exploitation"
                                className="text-4xl text-green-500 font-black tracking-[0.1em] uppercase shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                                delay={80}
                            />
                            <Activity className="w-6 h-6 text-green-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Matrix rain effect simplified */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-center items-end pb-32">
                <div className="text-[10rem] font-black text-green-900 leading-none tracking-tighter italic">EXIT</div>
            </div>
        </AbsoluteFill>
    );
};
