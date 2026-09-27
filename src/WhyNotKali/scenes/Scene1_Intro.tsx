import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';

const ArabicGlitchText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);

    if (progress <= 0) return null;

    // Arabic-ish scrambling characters
    const chars = "أبتثجحخدذرزسشصضطظعغفقكلمنهوي";
    const scrambled = text.split('').map((char, i) => {
        if (progress > i * 1.5 + 20) return char;
        if (progress > i * 1.5) return chars[Math.floor(random(frame + i) * chars.length)];
        return "";
    }).join('');

    return (
        <div className={className} dir="rtl">
            {scrambled}
            {progress < text.length * 1.5 + 20 && (
                <span className="inline-block w-[0.15em] h-[1em] bg-blue-500/20 animate-pulse mr-1" />
            )}
        </div>
    );
};

export const Scene1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const iconScale = spring({
        frame,
        fps,
        config: {
            damping: 15,
            stiffness: 80,
        },
    });

    const text1 = "إذا بدأت رحلتك في الأمن السيبراني باستخدام Kali Linux،";
    const text2 = "فمن المحتمل أنك بدأت من نقطة غير صحيحة.";

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground isStatic />
            <HUD title="ANALYSIS: KALI LINUX" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-20 text-center">
                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                        style={{
                            left: `${random(i) * 100}%`,
                            top: `${random(i + 1) * 100}%`,
                            transform: `scale(${random(i) * 2})`,
                            opacity: interpolate(frame, [0, 30], [0, 1]) * (random(i + 2) * 0.5),
                        }}
                    />
                ))}

                {/* Kali Icon Container */}
                <div
                    className="relative mb-16"
                    style={{
                        transform: `scale(${iconScale})`,
                        opacity
                    }}
                >
                    {/* Multi-layered Glow */}
                    <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full scale-150" />
                    <div className="absolute inset-0 bg-blue-400/5 blur-[40px] rounded-full scale-125 animate-pulse" />

                    {/* Icon with Premium Look */}
                    <div className="relative w-64 h-64 flex items-center justify-center p-8 bg-gradient-to-br from-[#1a1a1a]/90 to-[#050505]/90 backdrop-blur-xl border border-blue-500/30 rounded-[3rem] shadow-[0_0_60px_rgba(59,130,246,0.2)] ring-1 ring-white/10 group overflow-hidden">
                        {/* Internal Glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />

                        <div className="relative w-full h-full flex items-center justify-center">
                            <Img
                                src={staticFile("assets/distros/kalilinux.svg")}
                                className="w-44 h-44 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                            />
                        </div>

                        {/* Elegant Corner Accents */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-xl" />
                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-xl" />
                    </div>
                </div>

                <div className="flex flex-col gap-10 max-w-4xl relative">
                    <ArabicGlitchText
                        text={text1}
                        className="text-4xl md:text-5xl font-bold text-white/95 leading-[1.6] tracking-tight font-['Changa']"
                        delay={20}
                    />
                    <ArabicGlitchText
                        text={text2}
                        className="text-6xl md:text-7xl font-bold text-[#3b82f6] leading-[1.4] drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] font-['Cairo']"
                        delay={110}
                    />
                </div>
            </div>

            {/* Background Aesthetic Elements */}
            <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
        </AbsoluteFill>
    );
};
