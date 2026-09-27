import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ElegantBackground, ElegantCard } from '../components/ElegantTheme';
import {
    Cpu,
    PhoneCall,
    ChatCenteredText,
    Broadcast,
    CurrencyCircleDollar,
    Vault,
    Skull,
    ShieldWarning
} from 'phosphor-react';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

const VectorItem: React.FC<{
    Icon: any;
    text: string;
    delay: number;
    color: string;
}> = ({ Icon, text, delay, color }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 40, damping: 14 }
    });

    return (
        <div
            className="flex items-center gap-6 mb-6"
            style={{
                opacity: enter,
                transform: `translateX(${(1 - enter) * 20}px)`
            }}
        >
            <div
                className="p-4 rounded-2xl shrink-0"
                style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
            >
                <Icon size={32} weight="duotone" color={color} />
            </div>
            <div className="text-right flex-1" dir="rtl">
                <div className="text-2xl font-bold text-white tracking-tight">{text}</div>
            </div>
        </div>
    );
};

export const Scene4_Baseband: React.FC = () => {
    const frame = useCurrentFrame();

    // Timeline (25 Seconds Total)
    const t1 = 150;  // Vulnerability & Vectors
    const t2 = 360;  // The Reality (Cost, Intelligence)
    const t3 = 600;  // Myth Busting (Dark Web)

    return (
        <AbsoluteFill className="p-24 flex flex-col items-center justify-center bg-[#0a0a0b]" style={{ fontFamily }}>
            <ElegantBackground />

            {/* 1. INTRODUCTION (0 - 5s) */}
            <div
                className={`z-30 w-full max-w-5xl text-right space-y-6 ${frame >= t1 ? 'hidden' : 'visible'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t1 - 15, t1], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-6">
                    <div className="w-16 h-[2px] bg-purple-500/30" />
                    <span className="text-xl font-bold tracking-[0.4em] uppercase text-purple-400">Low-Level Analysis</span>
                </div>

                <h1 className="text-7xl font-black text-white leading-tight mb-8">
                    ثالثاً: <span className="text-purple-500">Baseband</span> & Zero-Click
                </h1>

                <div className="flex items-center gap-12 justify-end">
                    <div className="text-right">
                        <p className="text-3xl font-medium leading-relaxed text-gray-300">
                            الهاتف يحتوي على شريحة مستقلة تسمى:
                        </p>
                        <h2 className="text-5xl font-black text-white mt-4">Baseband Processor</h2>
                    </div>
                    <div className="p-10 bg-purple-500/5 border border-purple-500/20 rounded-[40px] shadow-2xl backdrop-blur-md">
                        <Cpu size={100} weight="thin" color="#a855f7" />
                    </div>
                </div>

                <div
                    className="mt-12 bg-white/5 border-r-4 border-purple-500 p-8 rounded-2xl inline-block"
                    style={{ opacity: spring({ frame: frame - 60, fps: 30 }) }}
                >
                    <p className="text-3xl font-bold text-gray-200">هي المسؤولة عن الاتصال بالشبكة الخلوية.</p>
                </div>
            </div>

            {/* 2. RCE VECTORS (5s - 12s) */}
            <div
                className={`z-40 w-full max-w-5xl ${frame >= t1 && frame < t2 ? 'visible' : 'hidden'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t2 - 15, t2], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex flex-col items-end gap-8">
                    <div className="text-right mb-12">
                        <h2 className="text-5xl font-black text-white mb-6">تنفيذ <span className="text-purple-500">RCE</span> عن بعد عبر:</h2>
                        <p className="text-xl text-gray-400 uppercase tracking-[0.3em]">Remote Code Execution Vectors</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
                        <VectorItem delay={t1 + 30} Icon={PhoneCall} text="مكالمة هاتفية" color="#a855f7" />
                        <VectorItem delay={t1 + 60} Icon={ChatCenteredText} text="رسالة خاصة معدلة" color="#a855f7" />
                        <VectorItem delay={t1 + 90} Icon={Broadcast} text="إشارات شبكة مشوهة" color="#a855f7" />
                    </div>
                </div>
            </div>

            {/* 3. THE REALITY (12s - 20s) */}
            <div
                className={`z-40 w-full max-w-6xl ${frame >= t2 && frame < t3 ? 'visible' : 'hidden'}`}
                style={{ opacity: interpolate(frame, [t3 - 15, t3], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-6 mb-16 justify-center">
                    <div className="h-[2px] w-24 bg-purple-500/20" />
                    <span className="text-purple-400 font-black tracking-widest uppercase text-xl">THE MARKET REALITY</span>
                    <div className="h-[2px] w-24 bg-purple-500/20" />
                </div>

                <div className="grid grid-cols-3 gap-8" dir="rtl">
                    <ElegantCard delay={t2 + 20} color="#a855f7" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <Vault size={60} weight="duotone" color="#a855f7" />
                            <p className="text-2xl font-black text-white">ثغرات Zero-Day</p>
                        </div>
                    </ElegantCard>
                    <ElegantCard delay={t2 + 45} color="#a855f7" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <CurrencyCircleDollar size={60} weight="duotone" color="#a855f7" />
                            <p className="text-2xl font-black text-white">تباع بملايين الدولارات</p>
                        </div>
                    </ElegantCard>
                    <ElegantCard delay={t2 + 70} color="#a855f7" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <ShieldWarning size={60} weight="duotone" color="#a855f7" />
                            <p className="text-2xl font-black text-white">تستخدمها جهات استخباراتية</p>
                        </div>
                    </ElegantCard>
                </div>
            </div>

            {/* 4. MYTH BUSTING (20s - 25s) */}
            <div
                className={`z-50 w-full max-w-4xl text-center ${frame >= t3 ? 'visible' : 'hidden'}`}
            >
                <ElegantCard delay={t3} color="#ef4444">
                    <div className="flex flex-col items-center gap-10 py-8" dir="rtl">
                        <div className="p-8 bg-red-500/10 rounded-full border border-red-500/20">
                            <Skull size={100} color="#ef4444" weight="duotone" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-white leading-relaxed">
                                ليست متاحة في “Dark Web” <br />
                                <span className="text-red-500">كما يروج البعض.</span>
                            </h3>
                            <p className="text-xl text-gray-400 mt-6 font-medium">Hype vs. Cyber-Intelligence Reality</p>
                        </div>
                    </div>
                </ElegantCard>
            </div>

            {/* Technical Detail */}
            <div className="absolute left-20 bottom-20 z-30 opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono leading-tight uppercase text-white tracking-[0.4em]">
                    Phase: Hardware_Exploitation <br />
                    Target: BASEBAND_PROCESSOR <br />
                    Status: EXTREME_RESTRICTED
                </div>
            </div>
        </AbsoluteFill>
    );
};
