import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, staticFile, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Terminal, Package, Settings, Share2, CheckCircle } from 'lucide-react';

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

const PathCard: React.FC<{ icon: React.FC<any>, text: string, delay: number, color: string }> = ({ icon: Icon, text, delay, color }) => {
    const frame = useCurrentFrame();

    const scale = spring({
        frame: frame - delay,
        fps: 30,
        config: { damping: 12, stiffness: 90 }
    });

    const opacity = interpolate(frame - delay, [0, 15], [0, 1]);

    return (
        <div
            className="flex items-center gap-6 px-10 py-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md mb-6 w-full max-w-3xl"
            style={{
                transform: `scale(${scale})`,
                opacity,
                borderLeft: `4px solid ${color}`
            }}
            dir="rtl"
        >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-900/80 shadow-2xl">
                <Icon size={36} color={color} />
            </div>
            <span className="text-3xl font-bold text-white">{text}</span>
        </div>
    );
}

export const Scene5_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#050505] font-['Cairo']">
            <CyberBackground isStatic />
            <HUD title="CONCLUSION: THE LOGICAL PATH" />

            <div className="z-20 flex flex-col justify-center h-full px-24">
                {/* Header Section */}
                <div className="mb-12 border-r-8 border-green-500 pr-10" dir="rtl" style={{ opacity: titleOpacity }}>
                    <ArabicGlitchText
                        text="البديل المنطقي"
                        className="text-5xl text-green-500 font-bold mb-6 font-['Changa']"
                    />
                    <div className="flex items-center gap-10">
                        <ArabicGlitchText
                            text="ابدأ بتوزيعة عامة مثل:"
                            className="text-4xl text-white font-bold"
                            delay={30}
                        />
                        <div className="flex gap-6 items-center">
                            <div className="flex flex-col items-center gap-2">
                                <Img src={staticFile("assets/distros/ubuntu.svg")} className="w-20 h-20 drop-shadow-[0_0_15px_rgba(233,75,34,0.4)]" />
                                <span className="text-xl font-mono text-[#E94B22]">Ubuntu</span>
                            </div>
                            <span className="text-2xl text-gray-500">أو</span>
                            <div className="flex flex-col items-center gap-2">
                                <Img src={staticFile("assets/distros/debian.svg")} className="w-20 h-20 drop-shadow-[0_0_15px_rgba(168,0,56,0.4)]" />
                                <span className="text-xl font-mono text-[#A80038]">Debian</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The "Learn" List */}
                <div className="flex flex-col items-end w-full mb-12">
                    <ArabicGlitchText
                        text="تعلّم:"
                        className="text-4xl text-gray-400 font-bold mb-8 w-full text-right"
                        delay={60}
                    />
                    <PathCard icon={Terminal} text="Bash Scripting" delay={80} color="#10b981" />
                    <PathCard icon={Package} text="Package Management" delay={100} color="#3b82f6" />
                    <PathCard icon={Settings} text="أساسيات System Administration" delay={120} color="#8b5cf6" />
                    <PathCard icon={Share2} text="مفاهيم Networking من الجذور" delay={140} color="#06b6d4" />
                </div>

                {/* Final Professional Transition */}
                <div
                    className="mt-12 p-10 bg-green-500/10 border border-green-500/30 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden"
                    style={{
                        opacity: interpolate(frame, [220, 240], [0, 1]),
                        transform: `translateY(${interpolate(frame, [220, 240], [30, 0])}px)`
                    }}
                    dir="rtl"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <CheckCircle size={100} className="text-green-500" />
                    </div>

                    <p className="text-4xl font-bold text-white leading-[1.8] relative z-10">
                        عندها، عندما تنتقل إلى Kali،<br />
                        <span className="text-green-400 text-5xl">ستستخدمه بوعي احترافي، لا بحماس سطحي.</span>
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
                </div>
            </div>

            {/* Aesthetic Lighting */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-600/5 blur-[200px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none" />

            {/* Success Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                    style={{
                        left: `${random(i) * 100}%`,
                        top: `${random(i + 1) * 100}%`,
                        opacity: interpolate(frame, [240, 300], [0, 1]),
                        transform: `scale(${random(i) * 3})`,
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};
