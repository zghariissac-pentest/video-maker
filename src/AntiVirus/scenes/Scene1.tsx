import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { SpaceBackground, LightEffectTitle, ContentCard, ShieldIcon, SignatureIcon, FloatingParticle } from '../components/AntiVirusTheme';

export const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations for elements and layout shifts
    const titleUpSpring = spring({
        frame: frame - 60,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    // Move title up when content appears
    const titleTranslateY = interpolate(titleUpSpring, [0, 1], [0, -350]);
    const titleScale = interpolate(titleUpSpring, [0, 1], [1, 0.7]);

    return (
        <AbsoluteFill className="overflow-hidden">
            <SpaceBackground />

            {/* Ambient Floating Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 20}
                    x={`${(i * 7) % 100}%`}
                    y={`${(i * 13) % 100}%`}
                    color={i % 2 === 0 ? "#3b82f6" : "#ef4444"}
                />
            ))}

            <div className="flex flex-col items-center justify-center h-full w-full z-10">

                {/* Main Title - Always present but moves up */}
                <div style={{
                    transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
                    transition: 'transform 0.5s ease-out'
                }}>
                    <LightEffectTitle
                        text="لماذا Anti-Virus ليس كافيًا؟"
                        delay={10}
                    />
                </div>

                {/* Content Area */}
                <div className="absolute inset-0 flex items-center justify-center mt-60">

                    {/* First Explanation Card */}
                    {frame >= 60 && frame < 190 && (
                        <div className="absolute" style={{
                            opacity: interpolate(frame, [180, 190], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                            transform: `scale(${interpolate(frame, [180, 190], [1, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                        }}>
                            <ContentCard
                                delay={60}
                                icon={<ShieldIcon size={120} color="#3b82f6" />}
                                className="max-w-3xl"
                            >
                                الكثير يعتقد أن وجود Anti-Virus <br />
                                <span className="text-blue-400 font-bold">يعني أن النظام محمي بالكامل.</span>
                            </ContentCard>
                        </div>
                    )}

                    {/* Second Explanation Card */}
                    {frame >= 190 && (
                        <div className="absolute">
                            <ContentCard
                                delay={190}
                                title="Signature-Based Detection"
                                icon={<SignatureIcon size={120} color="#10b981" />}
                                className="max-w-4xl border-emerald-500/30"
                            >
                                لكن في الحقيقة، معظم مضادات الفيروسات <br />
                                تعتمد أساسا على ما يسمى
                                <span className="text-emerald-400 block mt-4 text-5xl">Signature-Based Detection</span>
                            </ContentCard>
                        </div>
                    )}

                </div>
            </div>

            {/* Vignette for cinematic look */}
            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)] opacity-80" />
        </AbsoluteFill>
    );
};
