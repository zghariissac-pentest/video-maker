import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ElegantBackground, ElegantCard, ELEGANT_COLORS } from '../components/ElegantTheme';
import {
    LockLaminated,
    ShieldSlash,
    ShareNetwork,
    Calendar,
    Detective,
    MapPin
} from 'phosphor-react';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

const CapabilityRow: React.FC<{
    Icon: any;
    text: string;
    delay: number;
    color: string;
}> = ({ Icon, text, delay, color }) => {
    const frame = useCurrentFrame();
    const enter = spring({
        frame: frame - delay,
        fps: 30,
        config: { stiffness: 40, damping: 12 }
    });

    return (
        <div
            className="flex items-center gap-6 mb-6 w-full"
            style={{
                opacity: enter,
                transform: `translateX(${(1 - enter) * 20}px)`
            }}
        >
            <div
                className="p-3 rounded-2xl shrink-0"
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

export const Scene2_SS7: React.FC = () => {
    const frame = useCurrentFrame();

    // TIMELINE (25 Seconds Total)
    const t1 = 120;  // 1970s / Threat Model
    const t2 = 240;  // 2014 Research Reveal
    const t3 = 360;  // Capabilities List (Fast succession)
    const t4 = 540;  // Requirement Reveal
    const t5 = 660;  // Conclusion (State Level)

    return (
        <AbsoluteFill className="p-20 flex flex-col items-center justify-center bg-[#0a0a0b]" style={{ fontFamily }}>
            <ElegantBackground />

            {/* 1. INTRODUCTION (0 - 8s) */}
            <div
                className={`z-30 w-full max-w-5xl text-right space-y-6 ${frame >= t2 ? 'hidden' : 'visible'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t2 - 15, t2], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-6">
                    <div className="w-16 h-[2px] bg-blue-500/30" />
                    <span className="text-xl font-bold tracking-[0.4em] uppercase text-blue-500">Infrastructure Analysis</span>
                </div>

                <h1 className="text-7xl font-black text-white leading-tight mb-8">
                    أولاً: <span className="text-blue-500">SS7</span> – ثغرة الاتصالات
                </h1>

                <div style={{ opacity: spring({ frame: frame - 40, fps: 30 }) }}>
                    <p className="text-3xl font-medium leading-relaxed text-gray-300 max-w-4xl mr-auto">
                        بروتوكول <span className="text-white font-bold italic">Signaling System No.7</span> المسؤول عن توجيه المكالمات و الـ SMS عالمياً.
                    </p>
                </div>

                <div
                    className="mt-12 flex items-center gap-8 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-xl"
                    style={{ opacity: spring({ frame: frame - t1, fps: 30 }), transform: `translateY(${interpolate(frame, [t1, t1 + 20], [20, 0])}px)` }}
                >
                    <div className="p-6 bg-amber-500/10 rounded-3xl">
                        <Calendar size={60} weight="duotone" color="#f59e0b" />
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white mb-2 leading-tight">
                            تم تصميمه في سبعينات القرن الماضي
                        </p>
                        <p className="text-xl text-amber-500 font-mono tracking-widest uppercase">
                            No Modern Threat Model Concept.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. 2014 RESEARCH & CAPABILITIES (8s - 18s) */}
            <div
                className={`z-40 w-full max-w-5xl ${frame >= t2 && frame < t4 ? 'visible' : 'hidden'}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t4 - 15, t4], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-6 mb-12 justify-end">
                    <span className="text-blue-500/60 text-lg font-black tracking-widest uppercase">2014 RESEARCH REPORT</span>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
                </div>

                <h2 className="text-5xl font-black text-white mb-16 leading-tight">
                    باحثون أثبتوا إمكانية:
                </h2>

                <div className="grid grid-cols-1 gap-6 max-w-2xl">
                    <CapabilityRow
                        delay={t3}
                        Icon={MapPin}
                        text="تتبع موقع جهاز عبر الرقم"
                        color="#00f2ff"
                    />
                    <CapabilityRow
                        delay={t3 + 45}
                        Icon={ShieldSlash}
                        text="اعتراض رسائل الـ SMS"
                        color="#0ea5e9"
                    />
                    <CapabilityRow
                        delay={t3 + 90}
                        Icon={LockLaminated}
                        text="تجاوز الـ 2FA القائم على SMS"
                        color="#f59e0b"
                    />
                </div>
            </div>

            {/* 3. THE CONSTRAINT (18s - 25s) */}
            <div
                className={`z-50 w-full max-w-4xl text-center space-y-12 ${frame >= t4 ? 'visible' : 'hidden'}`}
            >
                <ElegantCard delay={t4} color={ELEGANT_COLORS.warning} className="relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500 opacity-20" />

                    <div className="flex flex-col items-center gap-8 py-4">
                        <div className="p-8 bg-amber-500/10 rounded-[40px] border-2 border-amber-500/20">
                            <ShareNetwork size={80} color="#f59e0b" weight="duotone" />
                        </div>

                        <div className="text-center" dir="rtl">
                            <h3 className="text-3xl font-black text-white mb-6 leading-relaxed">
                                لكن هذا يتطلب وصولاً لشبكة <span className="text-amber-500">Telecom</span> <br />
                                أو مزود خدمة مخترق.
                            </h3>

                            <div
                                className="mt-8 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl inline-block"
                                style={{ opacity: spring({ frame: frame - t5, fps: 30 }) }}
                            >
                                <div className="flex items-center gap-4 justify-center">
                                    <Detective size={32} color="#ef4444" weight="duotone" />
                                    <p className="text-2xl font-bold text-red-500 uppercase tracking-tighter">
                                        State-level surveillance ONLY
                                    </p>
                                </div>
                                <p className="text-lg text-gray-400 mt-2 font-medium">وليس هجوماً من شخص عادي.</p>
                            </div>
                        </div>
                    </div>
                </ElegantCard>
            </div>

            {/* Dynamic Status Detail */}
            <div className="absolute left-20 bottom-20 z-30 opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono leading-tight uppercase text-white tracking-[0.4em]">
                    Phase: Infrastrucure_Overview <br />
                    Protocol: SS7_SIG_STACK <br />
                    Status: Verified_2026
                </div>
            </div>
        </AbsoluteFill>
    );
};
