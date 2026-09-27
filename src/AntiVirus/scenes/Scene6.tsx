import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, ContentCard, ShieldIcon, KeyIcon, NetworkIcon, ToolIcon, FloatingParticle, LightEffectTitle } from '../components/AntiVirusTheme';

export const Scene6: React.FC = () => {
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
                    color={i % 2 === 0 ? "#fbbf24" : "#60a5fa"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10 gap-12">

                {/* Conclusion Header */}
                <div style={{
                    opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [10, 30], [20, 0], { extrapolateLeft: 'clamp' })}px)`
                }}>
                    <LightEffectTitle text="الخلاصة:" delay={0} />
                </div>

                {/* Point 1: Traditional AV limitation */}
                <div style={{
                    opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [40, 60], [20, 0], { extrapolateLeft: 'clamp' })}px)`
                }}>
                    <ContentCard
                        delay={40}
                        icon={<ShieldIcon size={80} color="#3b82f6" />}
                        className="max-w-4xl border-blue-500/20 bg-blue-500/5"
                    >
                        Anti-Virus يمكنه إيقاف الكثير من البرمجيات التقليدية،
                    </ContentCard>
                </div>

                {/* Point 2: Modern attack vectors */}
                <div className="flex flex-col items-center gap-8" style={{
                    opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [100, 120], [20, 0], { extrapolateLeft: 'clamp' })}px)`
                }}>
                    <p className="text-3xl text-white/70 font-[Cairo] text-center">لكن الهجمات الحديثة تعتمد أكثر على:</p>

                    <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
                        <ContentCard
                            delay={140}
                            title="Credentials"
                            icon={<KeyIcon size={60} color="#fbbf24" />}
                            className="bg-black/60 border-yellow-500/20 py-8"
                        >
                            <span className="text-2xl">سرقة <br /> الهويات</span>
                        </ContentCard>

                        <ContentCard
                            delay={180}
                            title="Lateral"
                            icon={<NetworkIcon size={60} color="#60a5fa" />}
                            className="bg-black/60 border-blue-500/20 py-8"
                        >
                            <span className="text-2xl">التحرك <br /> الجانبي</span>
                        </ContentCard>

                        <ContentCard
                            delay={220}
                            title="LOLBins"
                            icon={<ToolIcon size={60} color="#94a3b8" />}
                            className="bg-black/60 border-gray-500/20 py-8"
                        >
                            <span className="text-2xl text-white/50">Living-Off-The-Land</span>
                        </ContentCard>
                    </div>
                </div>

                {/* Final Branding / Visual Note */}
                <div style={{
                    opacity: interpolate(frame, [300, 320], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [300, 320], [20, 0], { extrapolateLeft: 'clamp' })}px)`
                }} className="mt-8">
                    <p className="text-4xl font-bold text-center text-blue-400 font-[Cairo] drop-shadow-blue">
                        كن حذرًا، فالحماية ليست مجرد برنامج تثبته!
                    </p>
                </div>

            </div>

            {/* Final Fade out to Black */}
            <AbsoluteFill style={{
                backgroundColor: 'black',
                opacity: interpolate(frame, [370, 400], [0, 1], { extrapolateLeft: 'clamp' }),
                pointerEvents: 'none'
            }} />

            {/* Vignette */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,1)] opacity-90" />
        </AbsoluteFill>
    );
};
