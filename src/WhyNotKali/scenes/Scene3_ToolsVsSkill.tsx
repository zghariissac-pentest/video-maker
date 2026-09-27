import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';

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

const ToolBadge: React.FC<{ name: string; delay: number }> = ({ name, delay }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame - delay, [0, 15], [0, 1]);
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    return (
        <div
            className="px-6 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-mono text-xl backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            style={{ opacity, transform: `scale(${scale})` }}
        >
            {name}
        </div>
    );
};

export const Scene3_ToolsVsSkill: React.FC = () => {
    const frame = useCurrentFrame();

    const commandText = "sqlmap -u target.com";
    const typingProgress = Math.min(commandText.length, Math.floor(Math.max(0, frame - 100) / 2));
    const mistakeOpacity = interpolate(frame, [160, 180], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#050505] font-['Cairo']">
            <CyberBackground isStatic />
            <HUD title="ANALYSIS: TOOL RELIANCE vs UNDERSTANDING" />

            <div className="z-20 flex flex-col justify-center h-full px-24">
                {/* Intro Section */}
                <div className="mb-12" dir="rtl">
                    <ArabicGlitchText
                        text="Kali يأتي محمّلًا بأكثر من 600 أداة جاهزة:"
                        className="text-4xl text-white font-bold mb-8"
                    />
                    <div className="flex flex-wrap gap-4 justify-start">
                        <ToolBadge name="Metasploit" delay={20} />
                        <ToolBadge name="Burp Suite" delay={35} />
                        <ToolBadge name="Wireshark" delay={50} />
                        <ToolBadge name="sqlmap" delay={65} />
                    </div>
                </div>

                {/* Special Command Visual */}
                <div className="my-12 relative">
                    <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-3xl" />
                    <div className="relative bg-[#0d1117]/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <span className="ml-4 font-mono text-xs text-white/30 tracking-widest uppercase">root@kali: ~</span>
                        </div>
                        {/* Terminal Body */}
                        <div className="p-8 font-mono text-3xl">
                            <div className="flex items-center gap-4">
                                <span className="text-blue-500">➜</span>
                                <span className="text-gray-400">~</span>
                                <div className="text-green-400 flex">
                                    {commandText.slice(0, typingProgress)}
                                    {frame % 20 < 10 && <span className="w-3 h-8 bg-green-400/80 ml-1" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The "But..." Section */}
                <div className="space-y-6" dir="rtl">
                    <ArabicGlitchText
                        text="لكن تنفيذ هذا الأمر..."
                        className="text-3xl text-blue-400 font-bold"
                        delay={140}
                    />

                    <div className="flex flex-col gap-4" style={{ opacity: mistakeOpacity }}>
                        <div className="flex items-center gap-6 text-2xl text-gray-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
                            <p>لا يعني أنك تفهم <span className="text-white font-bold">SQL Injection</span>.</p>
                        </div>
                        <div className="flex items-center gap-6 text-2xl text-gray-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500/60" />
                            <p>ولا يعني أنك تدرك كيف تُبنى <span className="text-white font-bold">HTTP Requests</span>.</p>
                        </div>
                        <div className="flex items-center gap-6 text-2xl text-gray-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500/40" />
                            <p>ولا كيف يتفاعل الخادم مع استعلامات قاعدة البيانات.</p>
                        </div>
                    </div>
                </div>

                {/* Final Impact Text */}
                <div
                    className="mt-16 text-center"
                    style={{
                        opacity: interpolate(frame, [250, 270], [0, 1]),
                        transform: `scale(${interpolate(frame, [250, 270], [0.95, 1])})`
                    }}
                >
                    <div className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent border-r-4 border-blue-500 backdrop-blur-md">
                        <ArabicGlitchText
                            text="تشغيل الأداة لا يساوي فهم التقنية."
                            className="text-5xl font-bold text-white mb-4"
                            delay={270}
                        />
                        <ArabicGlitchText
                            text="والأمن السيبراني ليس ضغط أزرار."
                            className="text-3xl text-gray-400"
                            delay={320}
                        />
                    </div>
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
        </AbsoluteFill>
    );
};
