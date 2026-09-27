import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ElegantBackground, ElegantCard } from '../components/ElegantTheme';
import {
    ShieldCheck,
    AppWindow,
    Lock,
    PhoneCall,
    FingerprintSimple
} from 'phosphor-react';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

const DefenseStep: React.FC<{
    Icon: any;
    text: string;
    sub: string;
    delay: number;
    color: string;
}> = ({ Icon, text, sub, delay, color }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 45, damping: 14 }
    });

    return (
        <div
            className="flex items-center gap-8 mb-8"
            style={{
                opacity: enter,
                transform: `translateX(${(1 - enter) * 20}px)`
            }}
        >
            <div
                className="p-5 rounded-3xl shrink-0"
                style={{ backgroundColor: `${color}10`, border: `2px solid ${color}20` }}
            >
                <Icon size={40} weight="duotone" color={color} />
            </div>
            <div className="text-right flex-1" dir="rtl">
                <div className="text-3xl font-black text-white leading-tight mb-2">{text}</div>
                <div className="text-xl text-gray-400 font-medium uppercase tracking-widest">{sub}</div>
            </div>
        </div>
    );
};

export const Scene5_Defense: React.FC = () => {
    const frame = useCurrentFrame();

    // Timeline (20 Seconds Total)
    const t1 = 120;  // Defense Step 1 (SMS 2FA)
    const t2 = 210;  // Defense Step 2 (SIM PIN)
    const t3 = 300;  // Defense Step 3 (VOIP)
    const t4 = 450;  // Final Message

    return (
        <AbsoluteFill className="p-24 flex flex-col items-center justify-center bg-[#0a0a0b]" style={{ fontFamily }}>
            <ElegantBackground />

            {/* 1. THE CONCLUSION (0-4s) */}
            <div
                className={`z-30 w-full max-w-5xl text-right space-y-6 ${frame >= t1 ? 'hidden' : 'visible'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t1 - 15, t1], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-8">
                    <div className="w-16 h-[2px] bg-green-500/50" />
                    <span className="text-xl font-bold tracking-[0.4em] uppercase text-green-500">Security Recommendation</span>
                </div>

                <h1 className="text-7xl font-black text-white leading-tight mb-12">
                    الخلاصة: رقم هاتفك هو <br /> <span className="text-green-500 italic">مفتاح رقمي</span>، حافظ عليه.
                </h1>

                <div className="flex justify-end" style={{ opacity: spring({ frame: frame - 40, fps: 30 }) }}>
                    <div className="p-10 bg-green-500/5 border border-green-500/10 rounded-[50px] backdrop-blur-md">
                        <ShieldCheck size={120} weight="duotone" color="#10b981" />
                    </div>
                </div>
            </div>

            {/* 2. THE STEPS (4s - 15s) */}
            <div
                className={`z-40 w-full max-w-4xl space-y-4 ${frame >= t1 && frame < t4 ? 'visible' : 'hidden'}`}
                style={{ opacity: interpolate(frame, [t4 - 15, t4], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-12" dir="rtl">
                    <h2 className="text-2xl font-black text-white/40 uppercase tracking-widest">خطوات الحماية:</h2>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="flex flex-col">
                    <DefenseStep
                        delay={t1}
                        Icon={AppWindow}
                        text="لا تستخدم SMS للـ 2FA"
                        sub="Use Authenticator Apps"
                        color="#10b981"
                    />
                    <DefenseStep
                        delay={t2}
                        Icon={Lock}
                        text="قُم بقفل شريحة الـ SIM بـ PIN"
                        sub="Enable SIM PIN Security"
                        color="#10b981"
                    />
                    <DefenseStep
                        delay={t3}
                        Icon={PhoneCall}
                        text="استخدم أرقاماً ثانوية للخدمات"
                        sub="Hide primary number"
                        color="#3b82f6"
                    />
                </div>
            </div>

            {/* 3. FINAL SIGN-OFF (15s - 20s) */}
            <div
                className={`z-50 w-full max-w-4xl text-center ${frame >= t4 ? 'visible' : 'hidden'}`}
            >
                <ElegantCard delay={t4} color="#3b82f6" className="bg-blue-500/5 border-blue-500/20">
                    <div className="flex flex-col items-center gap-10 py-10" dir="rtl">
                        <div className="relative">
                            <FingerprintSimple size={120} color="#3b82f6" weight="duotone" />
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-5xl font-black text-white leading-tight mb-6">
                                رقم هاتفك ليس مجرد رقم، <br />
                                <span className="text-blue-500 underline underline-offset-8">بل هو هويتك الرقمية.</span>
                            </h3>
                            <div className="flex items-center gap-4 justify-center mt-12 opacity-40">
                                <span className="text-sm font-mono tracking-widest">SECURITY STATUS: SECURED</span>
                                <ShieldCheck size={20} weight="fill" />
                            </div>
                        </div>
                    </div>
                </ElegantCard>
            </div>

            {/* Technical Detail */}
            <div className="absolute left-20 bottom-20 z-30 opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono leading-tight uppercase text-white tracking-[0.4em]">
                    End_Of_Report <br />
                    Session: 0xFF_COMPLETE <br />
                    Protection: ENABLED
                </div>
            </div>
        </AbsoluteFill>
    );
};
