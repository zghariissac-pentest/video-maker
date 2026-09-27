import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { GhostNetwork, GlassPanel, OnionTransition } from '../components/PrivacyTheme';
import {
    ShieldAlert,
    Wifi,
    Globe,
    Unlock,
    Network,
    Terminal,
    AlertCircle,
    Fingerprint
} from 'lucide-react';
import { Tor } from 'developer-icons';

export const TorOnionScene: React.FC = () => {
    const frame = useCurrentFrame();
    const fps = 30;

    // Timing points
    const showNodes = frame > 60;
    const showVulnerabilities = frame > 300;
    const showOpsec = frame > 780;

    // Smooth Camera
    const cameraZ = interpolate(frame, [0, 900], [1, 1.05]);

    return (
        <AbsoluteFill className="justify-center items-center font-sans text-white overflow-hidden">
            <GhostNetwork />

            <div style={{ transform: `scale(${cameraZ})`, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Header - Minimalist */}
                <div className="absolute top-12 z-20">
                    <OnionTransition startFrame={10} duration={30}>
                        <div className="flex items-center gap-4 px-8 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            <Tor size={28} className="text-purple-400" />
                            <span className="text-2xl font-bold text-white tracking-widest uppercase" dir="rtl">ثانياً: آلية عمل TOR</span>
                        </div>
                    </OnionTransition>
                </div>

                {/* Main Content */}
                <div className="w-full h-full flex flex-col items-center justify-center pt-24 gap-12">

                    {/* Phase 1: Onion Diagram (Clean) */}
                    <div className="relative w-full h-1/3 flex items-center justify-center gap-16 px-20">
                        {/* Static Path Line */}
                        <div className="absolute w-[800px] h-px bg-white/10" />

                        {[
                            { name: "ENTRY", icon: Globe, color: "text-cyan-400", desc: "يعرف الـ IP الحقيقي" },
                            { name: "RELAY", icon: Network, color: "text-purple-400", desc: "عقدة وسطى" },
                            { name: "EXIT", icon: Unlock, color: "text-red-400", desc: "نقطة الخروج" }
                        ].map((node, i) => {
                            const nodePop = spring({ frame: frame - 60 - (i * 20), fps, config: { damping: 20 } });
                            const isVulnerable = (i === 0 || i === 2) && showVulnerabilities;

                            return (
                                <div
                                    key={i}
                                    className="relative z-10 flex flex-col items-center gap-4 p-8 bg-black/40 rounded-3xl border border-white/5 backdrop-blur-xl transition-colors duration-500"
                                    style={{
                                        transform: `scale(${nodePop})`,
                                        opacity: nodePop,
                                        borderColor: isVulnerable ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    <node.icon size={56} className={`${node.color}`} />
                                    <div className="text-center">
                                        <p className="text-[10px] font-mono tracking-[0.3em] opacity-30 mb-1">{node.name}</p>
                                        <p className="text-base font-bold text-white" dir="rtl">{node.desc}</p>
                                    </div>

                                    {/* Minimal Callouts */}
                                    {isVulnerable && (
                                        <OnionTransition duration={30}>
                                            <div className="absolute -bottom-20 w-40 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
                                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">
                                                    {i === 0 ? "IP EXPOSURE" : "UNSECURED"}
                                                </span>
                                            </div>
                                        </OnionTransition>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Phase 2: Leaks (Sleek Cards) */}
                    <div className="w-[1050px] flex flex-col items-center gap-8">
                        <OnionTransition startFrame={500} duration={40}>
                            <h2 className="text-3xl font-bold text-center" dir="rtl">
                                أي خطأ بسيط قد يكشف <span className="text-red-500 underline underline-offset-8">هويتك:</span>
                            </h2>
                        </OnionTransition>

                        <div className="flex gap-8 w-full justify-center">
                            {[
                                { title: "DNS LEAK", icon: Wifi },
                                { title: "WebRTC LEAK", icon: Terminal },
                                { title: "MISCONFIG", icon: AlertCircle }
                            ].map((leak, i) => {
                                const leakFrame = 540 + (i * 15);
                                const leakProgress = spring({ frame: frame - leakFrame, fps, config: { damping: 20 } });
                                if (frame < leakFrame) return null;
                                return (
                                    <div
                                        key={i}
                                        className="w-1/3 bg-white/5 border border-white/5 p-8 rounded-3xl flex flex-col items-center gap-4"
                                        style={{
                                            opacity: leakProgress,
                                            transform: `translateY(${interpolate(leakProgress, [0, 1], [20, 0])}px)`
                                        }}
                                    >
                                        <leak.icon size={48} className="text-red-500" />
                                        <h4 className="text-xl font-bold text-white font-mono">{leak.title}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Phase 3: Final Takeaway (Minimalist) */}
                    {showOpsec && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl">
                            <OnionTransition duration={60}>
                                <div className="flex flex-col items-center gap-12 text-center">
                                    <Fingerprint size={120} className="text-purple-400" />
                                    <div className="space-y-4">
                                        <h1 className="text-5xl font-medium text-white/60" dir="rtl">
                                            المشكلة الأكبر ليست في الأداة...
                                        </h1>
                                        <h1 className="text-8xl font-black text-purple-400" dir="rtl">
                                            بل في الـ OPSEC
                                        </h1>
                                    </div>
                                    <div className="px-6 py-2 border border-white/10 rounded-full">
                                        <p className="font-mono text-xs tracking-[0.5em] text-white/30 truncate">SECURITY IS A MINDSET</p>
                                    </div>
                                </div>
                            </OnionTransition>
                        </div>
                    )}

                </div>
            </div>

            {/* Corner Data (Minimal) */}
            <div className="absolute bottom-12 left-12 font-mono text-[10px] text-white/10 uppercase tracking-[0.5em]">
                Circuit ID: {Math.floor(frame * 1.5).toString(16)}
            </div>
        </AbsoluteFill>
    );
};
