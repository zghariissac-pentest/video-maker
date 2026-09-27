import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ElegantBackground, ElegantCard, ELEGANT_COLORS } from '../components/ElegantTheme';
import {
    SimCard,
    UsersFour,
    Database,
    Eye,
    Key,
    CurrencyBtc,
    WarningCircle,
    Lock
} from 'phosphor-react';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

const MethodItem: React.FC<{
    Icon: any;
    text: string;
    delay: number;
    color: string;
}> = ({ Icon, text, delay, color }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 45, damping: 14 }
    });

    return (
        <div
            className="flex items-center gap-4 mb-4"
            style={{
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [10, 0])}px)`
            }}
        >
            <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
            >
                <Icon size={24} weight="duotone" color={color} />
            </div>
            <span className="text-xl font-bold text-gray-200">{text}</span>
        </div>
    );
};

export const Scene3_SimSwap: React.FC = () => {
    const frame = useCurrentFrame();

    // Timeline (25 Seconds Total)
    const t1 = 120;  // Methods (Social Engineering etc)
    const t2 = 270;  // Transition to Results
    const t4 = 630;  // Real World Context

    return (
        <AbsoluteFill className="p-24 flex flex-col items-center justify-center bg-[#0a0a0b]" style={{ fontFamily }}>
            <ElegantBackground />

            {/* 1. INTRODUCTION (0 - 4s) */}
            <div
                className={`z-30 w-full max-w-5xl text-right space-y-6 ${frame >= t2 ? 'hidden' : 'visible'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t2 - 15, t2], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-6">
                    <div className="w-16 h-[2px] bg-red-500/30" />
                    <span className="text-xl font-bold tracking-[0.4em] uppercase text-red-500">Critical Threat</span>
                </div>

                <h1 className="text-7xl font-black text-white leading-tight mb-4">
                    ثانياً: <span className="text-red-500">SIM Swapping</span>
                </h1>
                <p className="text-4xl text-gray-400 font-bold mb-12">الأخطر والواقعي تماماً.</p>

                <div className="flex justify-end mt-12 mb-16" style={{ opacity: spring({ frame: frame - 30, fps: 30 }) }}>
                    <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[50px] shadow-2xl backdrop-blur-md">
                        <SimCard size={120} weight="thin" color={ELEGANT_COLORS.danger} />
                    </div>
                </div>

                <div
                    className="bg-white/5 border-r-8 border-red-500 p-8 rounded-2xl inline-block"
                    style={{ opacity: spring({ frame: frame - 60, fps: 30 }) }}
                >
                    <p className="text-3xl font-black text-white leading-tight">
                        في هذا السيناريو... <br />
                        <span className="text-red-500">لا يتم اختراق هاتفك.</span>
                    </p>
                </div>
            </div>

            {/* 2. THE ATTACK METHODS (4s - 9s) */}
            <div
                className={`z-40 w-full max-w-5xl ${frame >= t1 && frame < t2 ? 'visible' : 'hidden'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t2 - 15, t2], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex flex-col items-end gap-8">
                    <div className="text-right">
                        <h2 className="text-5xl font-black text-white mb-6">بل يتم استغلال:</h2>
                        <h3 className="text-4xl font-bold text-red-500 mb-12">Identity Verification Weakness</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-2 bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-3xl w-full max-w-xl">
                        <div className="text-gray-400 font-mono text-sm mb-6 uppercase tracking-widest">Attacker Vectors:</div>
                        <MethodItem delay={t1 + 20} Icon={UsersFour} text="Social Engineering" color="#ef4444" />
                        <MethodItem delay={t1 + 40} Icon={Database} text="Data Breaches" color="#ef4444" />
                        <MethodItem delay={t1 + 60} Icon={Eye} text="OSINT Information" color="#ef4444" />
                    </div>
                </div>
            </div>

            {/* 3. CONSEQUENCES (9s - 21s) */}
            <div
                className={`z-40 w-full max-w-5xl ${frame >= t2 && frame < t4 ? 'visible' : 'hidden'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t4 - 15, t4], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-6 mb-12 justify-end">
                    <span className="text-red-500 font-black tracking-widest uppercase">IMPACT REPORT</span>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-red-500/20" />
                </div>

                <h2 className="text-6xl font-black text-white mb-16 leading-tight">
                    النتيجة المباشرة:
                </h2>

                <div className="grid grid-cols-3 gap-8">
                    <ElegantCard delay={t2 + 30} color="#ef4444" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <Lock size={60} weight="duotone" color="#ef4444" />
                            <p className="text-2xl font-black text-white">استلام رموز 2FA</p>
                        </div>
                    </ElegantCard>
                    <ElegantCard delay={t2 + 60} color="#ef4444" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <Key size={60} weight="duotone" color="#ef4444" />
                            <p className="text-2xl font-black text-white">إعادة تعيين كلمات المرور</p>
                        </div>
                    </ElegantCard>
                    <ElegantCard delay={t2 + 90} color="#ef4444" className="text-center p-12">
                        <div className="flex flex-col items-center gap-6">
                            <CurrencyBtc size={60} weight="duotone" color="#ef4444" />
                            <p className="text-2xl font-black text-white">اختراق حسابات Crypto</p>
                        </div>
                    </ElegantCard>
                </div>
            </div>

            {/* 4. REAL WORLD CONTEXT (21s - 25s) */}
            <div
                className={`z-50 w-full max-w-4xl text-center ${frame >= t4 ? 'visible' : 'hidden'}`}
            >
                <ElegantCard delay={t4} color={ELEGANT_COLORS.warning} className="bg-red-500/5 border-red-500/20">
                    <div className="flex flex-col items-center gap-8 py-6">
                        <div className="p-8 bg-red-500/10 rounded-full">
                            <WarningCircle size={80} color="#ef4444" weight="fill" />
                        </div>
                        <h3 className="text-4xl font-black text-white leading-relaxed" dir="rtl">
                            هذه حوادث موثقة حدثت لرواد أعمال <br />
                            ومستثمرين فعلياً بخسائر الملايين.
                        </h3>
                    </div>
                </ElegantCard>
            </div>

            {/* Technical Footer Detail */}
            <div className="absolute left-20 bottom-20 z-30 opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono leading-tight uppercase text-white tracking-[0.4em]">
                    Phase: Personal_Security <br />
                    Attack_Vector: SIM_HIJACKING <br />
                    Level: CRITICAL
                </div>
            </div>
        </AbsoluteFill>
    );
};
