import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, random } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Network, Globe, Cpu, Key, AlertCircle, ScanEye } from 'lucide-react';

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

const DeficiencyPoint: React.FC<{ icon: React.FC<any>, text: string, delay: number, color: string }> = ({ icon: Icon, text, delay, color }) => {
    const frame = useCurrentFrame();

    const slide = spring({
        frame: frame - delay,
        fps: 30,
        config: { damping: 14, stiffness: 60 }
    });

    const opacity = interpolate(frame - delay, [0, 20], [0, 1]);

    return (
        <div
            className="flex items-center gap-6 px-10 py-6 bg-red-950/20 border border-red-500/20 rounded-3xl backdrop-blur-md mb-6 w-full max-w-3xl"
            style={{
                transform: `translateX(${(1 - slide) * 150}px)`,
                opacity,
                boxShadow: `inset -10px 0 20px ${color}05`
            }}
            dir="rtl"
        >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-900/80 border border-white/5 shadow-xl">
                <Icon size={36} color={color} />
            </div>
            <span className="text-3xl font-bold text-gray-200">{text}</span>
        </div>
    );
}

export const Scene4_FalseCompetence: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#050505] font-['Cairo']">
            <CyberBackground isStatic />
            <HUD title="PSYCHOLOGICAL ANALYSIS: COMPETENCE GAP" />

            <div className="z-20 flex flex-col justify-center h-full px-24">
                {/* Main Heading */}
                <div className="mb-16 relative" dir="rtl" style={{ opacity: titleOpacity }}>
                    <div className="flex items-center gap-6 mb-6">
                        <ScanEye size={60} className="text-blue-500 animate-pulse" />
                        <ArabicGlitchText
                            text="استخدام Kali منذ البداية قد يمنحك شعورًا زائفًا بالكفاءة."
                            className="text-5xl font-bold text-white leading-tight"
                        />
                    </div>

                    <div className="flex items-center gap-4 mr-20">
                        <div className="w-12 h-[2px] bg-red-500/50" />
                        <ArabicGlitchText
                            text="قد تعتقد أنك أصبحت “هاكر”، بينما لا تستطيع:"
                            className="text-3xl text-gray-400 font-medium"
                            delay={40}
                        />
                    </div>
                </div>

                {/* The "Gaps" List */}
                <div className="flex flex-col items-end w-full">
                    <DeficiencyPoint
                        icon={Network}
                        text="إعداد شبكة محلية بشكل صحيح"
                        delay={80}
                        color="#ef4444"
                    />
                    <DeficiencyPoint
                        icon={Globe}
                        text="شرح آلية DNS Resolution"
                        delay={100}
                        color="#f87171"
                    />
                    <DeficiencyPoint
                        icon={Cpu}
                        text="إدارة العمليات داخل نظام لينكس"
                        delay={120}
                        color="#fca5a5"
                    />
                    <DeficiencyPoint
                        icon={Key}
                        text="التعامل مع صلاحيات الملفات بوعي كامل"
                        delay={140}
                        color="#fee2e2"
                    />
                </div>

                {/* Visual Accent: Warning Sign */}
                <div
                    className="absolute left-32 bottom-32 opacity-10"
                    style={{ transform: `scale(${interpolate(frame, [0, 540], [1, 1.2])})` }}
                >
                    <AlertCircle size={400} />
                </div>
            </div>

            {/* Aesthetic Lighting */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />
        </AbsoluteFill>
    );
};
