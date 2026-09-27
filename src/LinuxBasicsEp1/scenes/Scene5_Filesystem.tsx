import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { HardDrive, FolderTree, FileText, Cpu, Network, Zap } from 'lucide-react';

export const Scene5_Filesystem: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Overall scene opacity
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Windows vs Linux (0-6s)
    const comparisonOpacity = interpolate(frame, [0, 10, 170, 180], [0, 1, 1, 0]);
    const winSpring = spring({ frame: frame - 10, fps: FPS, config: { damping: 12 } });
    const linSpring = spring({ frame: frame - 40, fps: FPS, config: { damping: 12 } });

    // Everything is a file (6-12s)
    const fileOpacity = interpolate(frame, [180, 190, 350, 360], [0, 1, 1, 0]);
    const everythingScale = spring({ frame: frame - 190, fps: FPS, config: { stiffness: 100 } });

    // Final Punchline (12-15s)
    const punchOpacity = interpolate(frame, [360, 380], [0, 1], { extrapolateRight: 'clamp' });
    const punchY = spring({ frame: frame - 360, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: FILESYSTEM_STRUCTURE" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="4: Filesystem Structure"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* Comparison Part */}
                <div style={{ opacity: comparisonOpacity, position: 'absolute', top: '35%', width: '100%', padding: '0 3rem' }}>
                    <div className="flex justify-center gap-10 w-full max-w-5xl mx-auto">
                        {/* Windows Drives */}
                        <div
                            className="flex-1 bg-blue-900/10 border border-blue-500/20 p-8 rounded-3xl backdrop-blur-md"
                            style={{ transform: `translateX(${(1 - winSpring) * -50}px)`, opacity: winSpring }}
                        >
                            <HardDrive className="w-16 h-16 text-blue-400 mb-6 mx-auto opacity-50" />
                            <h3 className="text-3xl font-bold text-blue-400 mb-4">Windows</h3>
                            <p className="text-2xl font-mono mb-2">C:\ | D:\</p>
                            <p className="text-lg opacity-60">تقسيمات متعددة مرتبطة بالأقراص الفيزيائية.</p>
                        </div>

                        {/* Linux Root */}
                        <div
                            className="flex-1 bg-green-900/10 border border-green-500/20 p-8 rounded-3xl backdrop-blur-md"
                            style={{ transform: `scale(${linSpring})`, opacity: linSpring }}
                        >
                            <FolderTree className="w-16 h-16 text-green-500 mb-6 mx-auto" />
                            <h3 className="text-3xl font-bold text-green-400 mb-4">Linux</h3>
                            <p className="text-4xl font-black text-green-300 font-mono mb-2">/ (Root)</p>
                            <p className="text-lg opacity-80">شجرة واحدة تبدأ من الجذر مهما تعددت الأقراص.</p>
                        </div>
                    </div>
                </div>

                {/* Everything is a File Part */}
                <div style={{ opacity: fileOpacity, position: 'absolute', top: '30%', width: '100%' }}>
                    <div
                        className="max-w-4xl mx-auto bg-green-500/5 border border-green-500/10 p-12 rounded-[3.5rem] backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.5)]"
                        style={{ transform: `scale(${everythingScale})` }}
                    >
                        <h2 className="text-5xl font-black text-green-400 mb-12">Everyting is a <span className="underline decoration-green-500/50">File</span></h2>

                        <div className="grid grid-cols-3 gap-8">
                            {[
                                { icon: Cpu, label: "Devices", desc: "/dev/sda" },
                                { icon: Zap, label: "Processes", desc: "/proc/1" },
                                { icon: Network, label: "Network", desc: "Sockets" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-green-500/10 p-8 rounded-2xl border border-green-500/20 flex flex-col items-center"
                                    style={{
                                        opacity: spring({ frame: frame - 210 - i * 15, fps: FPS }),
                                        transform: `translateY(${(1 - spring({ frame: frame - 210 - i * 15, fps: FPS })) * 20}px)`
                                    }}
                                >
                                    <item.icon className="w-12 h-12 text-green-400 mb-4" />
                                    <h4 className="text-xl font-bold mb-1">{item.label}</h4>
                                    <p className="text-xs font-mono text-green-500/50 tracking-widest">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Punchline */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl z-30 px-10"
                    style={{ opacity: punchOpacity, pointerEvents: punchOpacity > 0.5 ? 'auto' : 'none' }}
                >
                    <div
                        className="p-16 border-2 border-green-500/20 rounded-[4rem] bg-green-950/10 relative overflow-hidden"
                        style={{ transform: `translateY(${(1 - punchY) * 50}px)` }}
                    >
                        {/* Matrix Grid Background for the card */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <FileText className="w-20 h-20 text-green-400 mb-8 mx-auto" />
                        <p className="text-4xl leading-relaxed text-white font-black">
                            وهذا يجعل النظام موحدًا وبسيطًا هندسيًا.
                        </p>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
