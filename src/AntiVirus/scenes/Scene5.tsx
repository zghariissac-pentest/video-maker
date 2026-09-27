import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, ContentCard, BehaviorIcon, EDRIcon, FloatingParticle, TerminalIcon } from '../components/AntiVirusTheme';

export const Scene5: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="overflow-hidden">
            <SpaceBackground />

            {/* Ambient Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 20}
                    x={`${(i * 17) % 100}%`}
                    y={`${(i * 11) % 100}%`}
                    color={i % 2 === 0 ? "#f43f5e" : "#22d3ee"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10 gap-16">

                {/* Phase 1: The Problem (Legitimate Tools) */}
                {frame < 220 && (
                    <div className="flex flex-col items-center gap-10"
                        style={{
                            opacity: interpolate(frame, [200, 220], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                            transform: `translateY(${interpolate(frame, [200, 220], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                        }}
                    >
                        <ContentCard
                            delay={10}
                            icon={<TerminalIcon size={100} color="#60a5fa" />}
                            className="max-w-4xl border-blue-500/20"
                        >
                            بما أنها أدوات شرعية داخل ويندوز، <br />
                            <span className="text-red-400 font-bold text-4xl">قد لا يعتبرها Anti-Virus نشاطًا خبيثًا.</span>
                        </ContentCard>

                        <ContentCard
                            delay={60}
                            className="max-w-3xl border-white/10 bg-white/5 py-4"
                        >
                            <span className="text-white/80 text-3xl">لهذا تعتمد أنظمة الحماية الحديثة على تقنيات إضافية مثل:</span>
                        </ContentCard>
                    </div>
                )}

                {/* Phase 2: Modern Solutions (Behavior & EDR) */}
                {frame >= 220 && (
                    <div className="flex flex-col items-center gap-12 w-full max-w-5xl">
                        <div className="grid grid-cols-2 gap-10 w-full">
                            <ContentCard
                                delay={220}
                                title="Behavior-Based"
                                icon={<BehaviorIcon size={120} color="#f43f5e" className="animate-pulse" />}
                                className="border-rose-500/30 shadow-rose-500/5 h-[400px]"
                            >
                                مراقبة السلوك <br />
                                <span className="text-rose-400 font-bold">بدل الاعتماد فقط على التوقيع.</span>
                            </ContentCard>

                            <ContentCard
                                delay={260}
                                title="EDR Systems"
                                icon={<EDRIcon size={120} color="#22d3ee" className="animate-bounce-slow" />}
                                className="border-cyan-500/30 shadow-cyan-500/5 h-[400px]"
                            >
                                <span className="text-cyan-400 font-bold block mb-2">Endpoint Detection & Response</span>
                                تراقب سلوك العمليات <br />
                                داخل النظام بشكل كامل.
                            </ContentCard>
                        </div>

                        <div style={{
                            opacity: interpolate(frame, [320, 340], [0, 1], { extrapolateLeft: 'clamp' }),
                            transform: `translateY(${interpolate(frame, [320, 340], [20, 0], { extrapolateLeft: 'clamp' })}px)`,
                        }}>
                            <ContentCard className="max-w-4xl border-white/20 bg-black/60">
                                <span className="text-white/90 text-3xl">هذه الأنظمة تكتشف التهديدات حتى لو كانت تستخدم أدوات النظام الشرعية.</span>
                            </ContentCard>
                        </div>
                    </div>
                )}

            </div>

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,1)] opacity-90" />
        </AbsoluteFill>
    );
};
