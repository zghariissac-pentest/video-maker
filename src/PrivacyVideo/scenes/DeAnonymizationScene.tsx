import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import {
    Fingerprint,
    Activity,
    UserCircle,
    Monitor,
    Type,
    Maximize,
    ShieldAlert
} from 'lucide-react';

export const DeAnonymizationScene: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // Transition timing (Total 20s / 600 frames)
    const showCorrelation = frame > 210; // 7s
    const correlationProgress = spring({ frame: frame - 220, fps, config: { damping: 20 } });

    const showDeAnon = frame > 420; // 14s
    const deAnonProgress = spring({ frame: frame - 430, fps, config: { damping: 20 } });

    // Smooth camera pull-back
    const cameraScale = interpolate(frame, [0, 600], [1, 1.03]);

    return (
        <AbsoluteFill className="justify-center items-center font-sans text-white overflow-hidden">
            <GhostNetwork />

            <div style={{ transform: `scale(${cameraScale})`, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Minimal Header */}
                <div className="absolute top-12 z-20">
                    <OnionTransition startFrame={10} duration={30}>
                        <div className="px-8 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            <span className="text-xl font-bold text-white tracking-widest uppercase" dir="rtl">ثالثاً: كشف الهوية</span>
                        </div>
                    </OnionTransition>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-center gap-12 pt-20 px-20">

                    {/* Phase 1: Browser Fingerprinting (0-7s) */}
                    {!showCorrelation && (
                        <div className="flex flex-col items-center gap-10">
                            <OnionTransition duration={40}>
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative">
                                        <Fingerprint size={120} className="text-cyan-400" />
                                        <div className="absolute inset-0 animate-ping bg-cyan-400/10 rounded-full" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-center leading-relaxed" dir="rtl">
                                        تقنيات مثل <span className="text-cyan-400">Browser Fingerprinting</span>
                                        <br />
                                        تميز جهازك عبر تفاصيل دقيقة:
                                    </h2>
                                </div>
                            </OnionTransition>

                            <div className="flex gap-8 justify-center mt-4">
                                {[
                                    { icon: Monitor, label: "Canvas / Res" },
                                    { icon: Type, label: "System Fonts" },
                                    { icon: Maximize, label: "User Agent" }
                                ].map((item, i) => {
                                    const itemPop = spring({ frame: frame - 30 - (i * 20), fps, config: { damping: 20 } });
                                    return (
                                        <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center gap-3 w-40"
                                            style={{ transform: `scale(${itemPop})`, opacity: itemPop }}
                                        >
                                            <item.icon size={40} className="text-white/60" />
                                            <span className="text-xs font-mono tracking-tighter uppercase whitespace-nowrap">{item.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Phase 2: Traffic Correlation Attack (7-14s) */}
                    {showCorrelation && !showDeAnon && (
                        <div className="flex flex-col items-center gap-12" style={{ opacity: correlationProgress }}>
                            <div className="flex flex-col items-center gap-4">
                                <Activity size={80} className="text-purple-400" />
                                <h2 className="text-4xl font-bold" dir="rtl">Traffic Correlation Attack</h2>
                            </div>

                            <GlassPanel className="w-[900px] h-[300px] p-10 flex items-center justify-around gap-12">
                                {/* Visual correlation representation */}
                                <div className="flex flex-col gap-6 w-full">
                                    <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                        <div className="absolute h-full bg-cyan-400/40 w-1/4 animate-pulse" style={{ left: '10%' }} />
                                        <div className="absolute h-full bg-cyan-400/40 w-1/6 animate-pulse" style={{ left: '45%' }} />
                                        <div className="absolute h-full bg-cyan-400/40 w-1/5 animate-pulse" style={{ left: '75%' }} />
                                        <p className="absolute left-4 top-1 text-[8px] font-mono text-cyan-400">INPUT_FLOW</p>
                                    </div>
                                    <div className="flex justify-center flex-col items-center gap-2 opacity-40">
                                        <div className="w-px h-12 bg-white/20" />
                                        <span className="text-[10px] font-mono tracking-[0.5em]">TIMING_MATCH</span>
                                    </div>
                                    <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                        <div className="absolute h-full bg-purple-400/40 w-1/4 animate-pulse" style={{ left: '10%' }} />
                                        <div className="absolute h-full bg-purple-400/40 w-1/6 animate-pulse" style={{ left: '45%' }} />
                                        <div className="absolute h-full bg-purple-400/40 w-1/5 animate-pulse" style={{ left: '75%' }} />
                                        <p className="absolute left-4 top-1 text-[8px] font-mono text-purple-400">EXIT_FLOW</p>
                                    </div>
                                </div>
                            </GlassPanel>

                            <p className="text-2xl font-medium text-center text-white/80" dir="rtl">
                                يمكن لمهاجم عالمي ربط الـ <span className="text-purple-400">Timing</span> و <span className="text-purple-400">Packet Size</span> لمطابقة المصدر.
                            </p>
                        </div>
                    )}

                    {/* Phase 3: Self De-anonymization (14-20s) */}
                    {showDeAnon && (
                        <div className="flex flex-col items-center gap-10" style={{ transform: `scale(${deAnonProgress})`, opacity: deAnonProgress }}>
                            <div className="relative">
                                <UserCircle size={120} className="text-red-500" />
                                <div className="absolute -top-4 -right-4">
                                    <ShieldAlert size={48} className="text-red-500 animate-bounce" />
                                </div>
                            </div>

                            <div className="text-center space-y-6">
                                <h1 className="text-5xl font-bold leading-tight" dir="rtl">
                                    المخاطرة الحقيقية...
                                </h1>
                                <p className="text-3xl text-white/70 max-w-[800px] leading-relaxed" dir="rtl">
                                    إذا قمت بتسجيل الدخول إلى حسابك الشخصي أثناء استخدام TOR، فأنت قمت بعمل <span className="text-red-500 font-black">De-anonymization</span> بنفسك.
                                </p>
                            </div>

                            {/* Minimal UI Login Repr */}
                            <div className="bg-white/5 p-8 rounded-3xl border border-red-500/20 w-[400px] flex flex-col gap-4">
                                <div className="h-4 w-full bg-white/10 rounded-md" />
                                <div className="h-4 w-full bg-white/10 rounded-md" />
                                <div className="h-10 w-full bg-red-600/20 border border-red-500/40 rounded-md flex items-center justify-center font-bold text-red-400 uppercase text-xs">
                                    Identified User
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Corner ID */}
            <div className="absolute bottom-12 right-12 font-mono text-[10px] text-white/10 uppercase tracking-[0.5em]">
                Exposure Risk: High
            </div>
        </AbsoluteFill>
    );
};
