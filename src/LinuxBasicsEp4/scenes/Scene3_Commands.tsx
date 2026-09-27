import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Terminal, Activity, Monitor } from 'lucide-react';

export const Scene3_Commands: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    return (
        <AbsoluteFill className="bg-[#050505] overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_DIAGNOSTICS: COMMANDS" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-12" dir="rtl">
                <GlitchText
                    text="How to monitor them?"
                    className="text-4xl font-black text-green-500 mb-16 tracking-widest uppercase italic"
                    delay={10}
                />

                <div className="flex flex-col gap-6 w-full max-w-2xl">
                    <CommandBox
                        icon={<Terminal className="w-8 h-8" />}
                        cmd="ps aux"
                        desc="عرض شامل لكل العمليات في النظام، مع تفاصيل لـ CPU والذاكرة."
                        delay={30}
                        frame={frame}
                    />

                    <CommandBox
                        icon={<Activity className="w-8 h-8" />}
                        cmd="top / htop"
                        desc="مراقب العمليات اللحظي. يحدّث البيانات تلقائياً لمراقبة الاستهلاك."
                        delay={60}
                        frame={frame}
                    />

                    <CommandBox
                        icon={<Monitor className="w-8 h-8" />}
                        cmd="kill [PID]"
                        desc="إيقاف أو إنهاء أي عملية تسبب مشاكل أو استهلاك عالٍ."
                        delay={90}
                        frame={frame}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const CommandBox: React.FC<{ icon: React.ReactNode; cmd: string; desc: string; delay: number; frame: number }> = ({ icon, cmd, desc, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    return (
        <div
            className="group relative bg-[#0a0a0a] border border-green-500/10 p-8 rounded-3xl"
            style={{
                opacity,
                transform: `scale(${scale})`
            }}
        >
            <div className="flex items-center gap-6 mb-4">
                <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 border border-green-500/20 group-hover:bg-green-500/20 transition-all duration-300">
                    {icon}
                </div>
                <div className="font-mono text-3xl font-black text-white">$ {cmd}</div>
            </div>
            <p className="text-xl text-white/70 text-right leading-relaxed font-medium">
                {desc}
            </p>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
        </div>
    );
};
