import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, ContentCard, DatabaseIcon, ComparisonIcon, WarningIcon, FloatingParticle } from '../components/AntiVirusTheme';

export const Scene2: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="overflow-hidden">
            <SpaceBackground />

            {/* Ambient Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 30}
                    x={`${(i * 11) % 100}%`}
                    y={`${(i * 17) % 100}%`}
                    color={i % 2 === 0 ? "#60a5fa" : "#facc15"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10 gap-12">

                {/* Section 1: Database Comparison */}
                {frame < 220 && (
                    <div style={{
                        opacity: interpolate(frame, [200, 215], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        transform: `translateX(${interpolate(frame, [200, 215], [0, -100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <ContentCard
                            delay={10}
                            title="Signature Comparison"
                            icon={<div className="flex gap-8 items-center">
                                <DatabaseIcon size={120} color="#60a5fa" />
                                <ComparisonIcon size={80} color="#facc15" className="animate-pulse" />
                            </div>}
                            className="max-w-4xl border-blue-500/20"
                        >
                            أي أن البرنامج يقارن الملفات الموجودة في النظام مع <br />
                            <span className="text-blue-400 font-bold">Malware Signatures</span> محفوظة في قاعدة بيانات.
                        </ContentCard>
                    </div>
                )}

                {/* Section 2: Detection Result */}
                {frame >= 100 && frame < 220 && (
                    <div style={{
                        opacity: interpolate(frame, [200, 215], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        transform: `translateX(${interpolate(frame, [200, 215], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <ContentCard
                            delay={100}
                            className="max-w-3xl border-green-500/20 shadow-green-500/5"
                        >
                            إذا تطابق التوقيع مع برمجية خبيثة معروفة، <br />
                            <span className="text-green-400 font-bold text-4xl">يتم اكتشافها فورا. ✅</span>
                        </ContentCard>
                    </div>
                )}

                {/* Section 3: The Real Problem (Attacker behavior) */}
                {frame >= 220 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ContentCard
                            delay={220}
                            title="The Big Problem"
                            icon={<WarningIcon size={150} color="#f87171" className="animate-bounce-slow" />}
                            className="max-w-4xl border-red-500/30 shadow-red-500/10"
                        >
                            المشكلة أن المهاجمين نادرا ما <br />
                            <span className="text-red-400 font-black text-5xl">يستخدمون نفس الملف مرتين. ⚠️</span>
                        </ContentCard>
                    </div>
                )}

            </div>

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)] opacity-90" />
        </AbsoluteFill>
    );
};
