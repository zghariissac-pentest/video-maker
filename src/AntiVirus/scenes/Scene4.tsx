import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, ContentCard, TerminalIcon, ToolIcon, MemoryIcon, FloatingParticle } from '../components/AntiVirusTheme';

export const Scene4: React.FC = () => {
    const frame = useCurrentFrame();

    const tools = ["PowerShell", "WMI", "rundll32", "mshta"];

    return (
        <AbsoluteFill className="overflow-hidden">
            <SpaceBackground />

            {/* Ambient Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 35}
                    x={`${(i * 13) % 100}%`}
                    y={`${(i * 7) % 100}%`}
                    color={i % 2 === 0 ? "#60a5fa" : "#34d399"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10 gap-12">

                {/* Phase 1: Explanation (No file dropped) */}
                {frame < 200 && (
                    <div style={{
                        opacity: interpolate(frame, [180, 200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        transform: `translateY(${interpolate(frame, [180, 200], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <ContentCard
                            delay={10}
                            icon={<MemoryIcon size={120} color="#34d399" />}
                            className="max-w-4xl border-emerald-500/20"
                        >
                            في هذا النوع من الهجمات، <br />
                            <span className="text-red-400 font-bold text-4xl underline decoration-red-500/30 underline-offset-8">لا يتم إسقاط ملف خبيث على القرص أصلًا.</span>
                        </ContentCard>
                    </div>
                )}

                {/* Phase 2: System Tools (The "Instead") */}
                {frame >= 100 && frame < 350 && (
                    <div className="flex flex-col items-center gap-10"
                        style={{
                            opacity: interpolate(frame, [330, 350], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        }}
                    >
                        <ContentCard
                            delay={100}
                            className="max-w-3xl border-blue-500/20 bg-blue-500/5 py-6"
                        >
                            <span className="text-blue-300 font-bold text-3xl">بدلًا من ذلك يتم استخدام أدوات موجودة في النظام مثل:</span>
                        </ContentCard>

                        <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
                            {tools.map((tool, i) => (
                                <div
                                    key={tool}
                                    style={{
                                        opacity: interpolate(frame, [120 + i * 20, 140 + i * 20], [0, 1], { extrapolateLeft: 'clamp' }),
                                        transform: `translateY(${interpolate(frame, [120 + i * 20, 140 + i * 20], [20, 0], { extrapolateLeft: 'clamp' })}px)`,
                                    }}
                                    className="bg-black/80 border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-4 shadow-xl"
                                >
                                    <TerminalIcon size={40} color="#60a5fa" />
                                    <span className="text-3xl font-mono text-white font-bold tracking-tight">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Phase 3: LOLBins Reveal */}
                {frame >= 350 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ContentCard
                            delay={350}
                            title="Living Off The Land"
                            icon={<ToolIcon size={180} color="#94a3b8" className="animate-pulse" />}
                            className="max-w-4xl border-white/20 shadow-white/5"
                        >
                            هذه الأدوات تُعرف في الأمن السيبراني باسم <br />
                            <span className="text-blue-400 font-black text-7xl block my-6 drop-shadow-blue">LOLBins</span>
                            <span className="text-white/60 text-3xl block">— Living Off The Land Binaries —</span>
                        </ContentCard>
                    </div>
                )}

            </div>

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,1)] opacity-90" />
        </AbsoluteFill>
    );
};
