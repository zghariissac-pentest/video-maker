import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Terminal, Shield, Network, Lock, Globe } from 'lucide-react';

const ArabicGlitchText: React.FC<{ text: string; className?: string; delay?: number; dir?: 'rtl' | 'ltr' }> = ({ text, className, delay = 0, dir = 'rtl' }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);

    if (progress <= 0) return null;

    const chars = "أبتثجحخدذرزسشصضطظعغفقكلمنهوي";
    const scrambled = text.split('').map((char, i) => {
        if (progress > i * 1.5 + 20) return char;
        if (progress > i * 1.5) return chars[Math.floor(random(frame + i) * chars.length)];
        return "";
    }).join('');

    return (
        <div className={className} dir={dir}>
            {scrambled}
            {progress < text.length * 1.5 + 20 && (
                <span className="inline-block w-[0.15em] h-[1em] bg-blue-500/20 animate-pulse mr-1" />
            )}
        </div>
    );
};

const ConceptItem: React.FC<{ icon: React.FC<any>, text: string, delay: number, color: string }> = ({ icon: Icon, text, delay, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slide = spring({
        frame: frame - delay,
        fps,
        config: {
            damping: 16,
            stiffness: 70
        }
    });

    const opacity = interpolate(frame - delay, [0, 20], [0, 1]);

    return (
        <div
            className="flex items-center gap-6 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-4"
            style={{
                transform: `translateX(${(1 - slide) * 100}px)`,
                opacity,
                borderRight: `4px solid ${color}`
            }}
            dir="rtl">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon size={32} color={color} />
            </div>
            <span className="text-3xl font-bold text-white tracking-wide font-mono">{text}</span>
        </div>
    );
}

export const Scene2_CoreConcept: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505] font-['Cairo']">
            <CyberBackground isStatic />
            <HUD title="CORE PHILOSOPHY: SPECIALIZED ENVIRONMENT" />

            <div className="z-20 flex flex-col justify-center h-full px-24">
                {/* Header Section */}
                <div className="mb-12 border-r-8 border-blue-500 pr-10" dir="rtl">
                    <ArabicGlitchText
                        text="الفكرة الأساسية"
                        className="text-4xl text-blue-400 font-bold mb-4 font-['Changa']"
                    />
                    <ArabicGlitchText
                        text="Kali Linux ليس نظامًا صُمم لتعليم المبتدئين."
                        className="text-5xl text-white font-bold mb-4"
                        delay={20}
                    />
                    <div className="flex items-center gap-4">
                        <Shield className="text-red-500 animate-pulse" size={40} />
                        <ArabicGlitchText
                            text="إنه توزيعة متخصصة في Penetration Testing."
                            className="text-4xl text-gray-400 font-medium"
                            delay={40}
                        />
                    </div>
                </div>

                {/* Requirements Grid */}
                <div className="mt-8">
                    <ArabicGlitchText
                        text="بمعنى أنه يفترض أنك تمتلك مسبقًا فهمًا واضحًا لـ:"
                        className="text-3xl text-gray-400 mb-8 font-bold"
                        delay={60}
                        dir="rtl" />

                    <div className="flex flex-col items-end">
                        <ConceptItem icon={Terminal} text="Linux Fundamentals" delay={80} color="#3b82f6" />
                        <ConceptItem icon={Network} text="Networking Basics" delay={95} color="#8b5cf6" />
                        <ConceptItem icon={Globe} text="TCP/IP & HTTP Protocol" delay={110} color="#06b6d4" />
                        <ConceptItem icon={Lock} text="File Permissions" delay={125} color="#10b981" />
                    </div>
                </div>

                {/* Closing Warning */}
                <div
                    className="mt-12 p-8 bg-red-900/20 border border-red-500/30 rounded-3xl backdrop-blur-xl"
                    style={{
                        opacity: interpolate(frame, [150, 160], [0, 1]),
                        transform: `translateY(${interpolate(frame, [150, 160], [20, 0])}px)`
                    }}
                    dir="rtl">
                    <p className="text-3xl font-bold text-white leading-relaxed">
                        إن لم تكن هذه المفاهيم واضحة لديك،<br />
                        <span className="text-red-400">فأنت تستخدم أدوات دون أن تفهم آلية عملها.</span>
                    </p>
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/5 blur-[180px] rounded-full pointer-events-none" />
        </AbsoluteFill>
    );
};
