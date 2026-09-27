import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, ContentCard, PolymorphicIcon, ObfuscationIcon, FilelessIcon, FloatingParticle } from '../components/AntiVirusTheme';

export const Scene3: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="overflow-hidden">
            <SpaceBackground />

            {/* Ambient Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 25}
                    x={`${(i * 9) % 100}%`}
                    y={`${(i * 19) % 100}%`}
                    color={i % 2 === 0 ? "#a855f7" : "#f472b6"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10 gap-16">

                {/* Phase 1: Techniques (Polymorphic & Obfuscation) */}
                {frame < 220 && (
                    <div style={{
                        opacity: interpolate(frame, [200, 215], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                        transform: `scale(${interpolate(frame, [200, 215], [1, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                    }}>
                        <div className="flex gap-10">
                            <ContentCard
                                delay={10}
                                title="Polymorphic Malware"
                                icon={<PolymorphicIcon size={100} color="#a855f7" className="animate-pulse" />}
                                className="w-[500px] border-purple-500/20"
                            >
                                تغيير شكل الكود في كل نسخة جديدة.
                            </ContentCard>

                            <ContentCard
                                delay={40}
                                title="Code Obfuscation"
                                icon={<ObfuscationIcon size={100} color="#f472b6" className="animate-bounce-slow" />}
                                className="w-[500px] border-pink-500/20"
                            >
                                تشفير وتضليل الكود ليصعب فهمه.
                            </ContentCard>
                        </div>

                        <div className="mt-12">
                            <ContentCard
                                delay={80}
                                className="max-w-4xl border-blue-500/20"
                            >
                                <span className="text-blue-300 font-bold">بالنسبة لمضاد الفيروسات،</span> <br />
                                هذا يبدو كملف جديد تمامًا وغير معروف.
                            </ContentCard>
                        </div>
                    </div>
                )}

                {/* Phase 2: Fileless Malware Highlight */}
                {frame >= 220 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <ContentCard
                            delay={220}
                            title="Fileless Malware"
                            icon={<FilelessIcon size={180} color="#fbbf24" />}
                            className="max-w-4xl border-yellow-500/40 shadow-yellow-500/10"
                        >
                            <span className="text-yellow-400 font-black text-6xl block mb-6">الأخطر من ذلك</span>
                            هو ما يتم تشغيله مباشرة في الذاكرة <br />
                            <span className="text-white/70 text-4xl mt-4 block">دون الحاجة لوجود ملف على القرص! 👻</span>
                        </ContentCard>
                    </div>
                )}

            </div>

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,1)] opacity-90" />
        </AbsoluteFill>
    );
};
