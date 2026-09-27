import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { ElegantBackground, SmoothText, ElegantCard, ELEGANT_COLORS } from '../components/ElegantTheme';
import { Phone, ShieldWarning, IdentificationCard, Target, Broadcast, UserCircle } from 'phosphor-react';
import { loadFont } from "@remotion/google-fonts/Outfit";

const { fontFamily } = loadFont();

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // SCENE TIMELINE (Slower, 10s total)
    const t0 = 0;   // Question
    const t1 = 90;  // Denial
    const t2 = 135; // Definition
    const t3 = 200; // Pivot Warning (The Hook/End)

    return (
        <AbsoluteFill className="p-24 flex flex-col items-center justify-center bg-[#0a0a0b]" style={{ fontFamily }}>
            <ElegantBackground />

            {/* 1. THE QUESTION (0.0s - 3.0s) */}
            <div
                className={`z-30 text-right w-full max-w-4xl space-y-4 ${frame >= t3 ? 'hidden' : ''}`}
                dir="rtl"
                style={{ opacity: interpolate(frame, [t1 - 10, t1], [1, 0], { extrapolateRight: 'clamp' }) }}
            >
                <div className="flex items-center gap-4 justify-end mb-4">
                    <div className="w-12 h-[2px] bg-blue-500/50" />
                    <span className="text-xl font-medium tracking-[0.3em] uppercase text-blue-500">Security Inquiry</span>
                </div>

                <SmoothText
                    text="هل يمكن اختراقك من "
                    delay={t0}
                    size="text-7xl"
                    className="leading-none text-white font-black"
                />
                <SmoothText
                    text="رقم هاتفك فقط؟"
                    delay={t0 + 15}
                    size="text-7xl"
                    color={ELEGANT_COLORS.primary}
                    className="leading-none font-black"
                />

                <div className="mt-16 flex justify-end" style={{ opacity: spring({ frame: frame - 40, fps: 30 }) }}>
                    <div className="p-10 bg-blue-500/5 border border-blue-500/10 rounded-[40px] shadow-2xl backdrop-blur-md">
                        <Phone size={100} weight="thin" color={ELEGANT_COLORS.primary} />
                    </div>
                </div>
            </div>

            {/* 2. THE REALITY CARDS (3.0s - 6.5s) */}
            <div className={`z-40 text-right w-full max-w-4xl space-y-10 ${frame >= t1 && frame < t3 ? 'visible' : 'hidden'}`} dir="rtl">
                {/* Status indicator */}
                <div className="flex items-center justify-end gap-3 mb-6 opacity-40">
                    <span className="text-xs font-mono uppercase tracking-widest text-white">Analysis: Phase_01</span>
                    <div className="w-12 h-px bg-white" />
                </div>

                <ElegantCard delay={t1} color={ELEGANT_COLORS.danger} className="w-full">
                    <div className="flex items-center gap-10">
                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
                            <ShieldWarning size={60} weight="duotone" color={ELEGANT_COLORS.danger} />
                        </div>
                        <div className="text-right">
                            <div className="text-red-500 font-bold tracking-widest text-sm mb-2 uppercase">Reality Check</div>
                            <h2 className="text-4xl font-extrabold text-white leading-tight">
                                مبدئياً: من المستحيل اختراقك مباشرة!
                            </h2>
                        </div>
                    </div>
                </ElegantCard>

                <ElegantCard delay={t2} color={ELEGANT_COLORS.primary} className="w-full">
                    <div className="flex items-center gap-10">
                        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                            <UserCircle size={60} weight="duotone" color={ELEGANT_COLORS.primary} />
                        </div>
                        <div className="text-right">
                            <div className="text-blue-500 font-bold tracking-widest text-sm mb-2 uppercase">Protocol Definition</div>
                            <h2 className="text-4xl font-extrabold text-white leading-tight">
                                رقم الهاتف هو مجرد Identifier داخل الشبكة وليس ثغرة أمنية.
                            </h2>
                        </div>
                    </div>
                </ElegantCard>
            </div>

            {/* 3. THE HOOK (6.5s - 10.0s) */}
            <div
                className={`z-50 text-center flex flex-col items-center justify-center h-full w-full ${frame >= t3 ? 'visible' : 'hidden'}`}
            >
                <div className="animate-pulse mb-8" style={{ transform: `scale(${interpolate(frame, [t3, t3 + 30], [0.8, 1], { extrapolateRight: 'clamp' })})` }}>
                    <Target size={120} color={ELEGANT_COLORS.warning} weight="duotone" />
                </div>

                <h2
                    className="text-6xl font-black text-white leading-tight tracking-tighter text-center max-w-4xl"
                    dir="rtl"
                >
                    لكن... يمكن استخدامه <br />
                    <span className="text-[#f59e0b]">كنقطة انطلاق</span> <br />
                    لهجوم معقد.
                </h2>

                <div className="mt-20 w-1/2 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#f59e0b] opacity-40 shadow-[0_0_20px_#f59e0b99]"
                        style={{ width: `${interpolate(frame, [t3, t3 + 100], [0, 100], { extrapolateRight: 'clamp' })}%` }} />
                </div>
            </div>

            {/* Technical Footer Detail */}
            <div className="absolute left-20 bottom-20 z-30 opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono leading-tight uppercase text-white tracking-widest">
                    REVISION: 4.2.0-A<br />
                    SYSTEM: MOBILE_SEC_ANALYSIS<br />
                    DATE: {new Date().toISOString().split('T')[0]}
                </div>
            </div>
        </AbsoluteFill>
    );
};
