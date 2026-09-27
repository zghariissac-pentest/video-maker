import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { GhostNetwork, OnionTransition } from '../components/PrivacyTheme';
import { ShieldCheck, UserX, Zap } from 'lucide-react';
import { Tor } from 'developer-icons';

export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();

    // High Impact Animations
    const flashOpacity = interpolate(frame, [0, 5, 10, 15, 20], [0, 1, 0, 1, 0]); // Attention-grabbing glitch flash

    // Zooming Camera (Inward)
    const cameraScale = interpolate(frame, [0, 300], [1.1, 1]);

    return (
        <AbsoluteFill className="justify-center items-center font-sans text-white overflow-hidden bg-black">
            <GhostNetwork />

            {/* Initial Glitch Overlay (Brief) */}
            <div className="absolute inset-0 z-50 pointer-events-none bg-white/10" style={{ opacity: flashOpacity }} />

            <div style={{ transform: `scale(${cameraScale})`, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                {/* Visual Reveal: VPN + TOR with High-Impact Zoom */}
                <div className="flex items-center gap-12 mb-12">
                    <div className="flex flex-col items-center gap-4">
                        <OnionTransition startFrame={10} duration={20}>
                            <div className="relative">
                                <ShieldCheck size={140} className="text-[#00E5FF] drop-shadow-[0_0_40px_rgba(0,229,255,0.4)]" />
                                <div className="absolute inset-0 bg-cyan-400/20 blur-2xl animate-pulse" />
                            </div>
                        </OnionTransition>
                        <OnionTransition startFrame={15} duration={15}>
                            <p className="text-xs font-mono font-black tracking-[0.6em] text-cyan-400 uppercase">ENCRYPTED</p>
                        </OnionTransition>
                    </div>

                    <OnionTransition startFrame={30} duration={10}>
                        <div className="text-5xl font-thin text-white/20 animate-pulse">+</div>
                    </OnionTransition>

                    <div className="flex flex-col items-center gap-4">
                        <OnionTransition startFrame={40} duration={20}>
                            <div className="relative">
                                <Tor size={140} className="text-[#7D4698] drop-shadow-[0_0_40px_rgba(125,70,152,0.4)]" />
                                <div className="absolute inset-0 bg-purple-500/20 blur-2xl animate-pulse" />
                            </div>
                        </OnionTransition>
                        <OnionTransition startFrame={45} duration={15}>
                            <p className="text-xs font-mono font-black tracking-[0.6em] text-purple-400 uppercase">ANONYMOUS</p>
                        </OnionTransition>
                    </div>
                </div>

                {/* The "Hook" Text: Bold & Dynamic */}
                <div className="text-center space-y-8 flex flex-col items-center max-w-[1000px]">
                    <OnionTransition startFrame={60} duration={30}>
                        <h1 className="text-6xl font-black leading-tight tracking-tight italic" dir="rtl">
                            هل تعتقد أنك أصبحت <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">INVISIBLE</span> بالكامل؟
                        </h1>
                    </OnionTransition>

                    <OnionTransition startFrame={120} duration={30}>
                        <div className="h-1 w-48 bg-white/10 rounded-full" />
                    </OnionTransition>

                    <OnionTransition startFrame={160} duration={25}>
                        <div className="flex items-center gap-8 bg-white/5 border border-white/10 px-12 py-6 rounded-[2rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                            {/* Scanning Line overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]" />

                            <UserX className="text-red-500" size={64} />
                            <h2 className="text-5xl font-black tracking-tight" dir="rtl">
                                الحقيقة هي: <span className="text-red-500 underline underline-offset-[12px] decoration-red-500/40">لا.</span>
                            </h2>
                        </div>
                    </OnionTransition>
                </div>
            </div>

            {/* Cinematic Corner Accents */}
            <div className="absolute top-12 left-12 h-12 w-12 border-t-2 border-l-2 border-white/20" />
            <div className="absolute bottom-12 right-12 h-12 w-12 border-b-2 border-r-2 border-white/20" />

            <div className="absolute bottom-12 left-12 font-mono text-[10px] text-white/10 flex items-center gap-3">
                <Zap size={12} className="animate-pulse" />
                <span>ATTENTION_MODE: ACTIVE</span>
            </div>
        </AbsoluteFill>
    );
};
