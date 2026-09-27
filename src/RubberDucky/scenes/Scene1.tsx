import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { CyberBackground, HUD, GlitchText, SmoothWriteText } from '../../HackingSkills/components/HackingTheme';
import { Usb, ShieldAlert, Cpu, Terminal } from 'lucide-react';

export const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = (delay: number) => spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 }
    });

    const duckyScale = spr(30);
    const hackIconOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const hackIconScale = spr(150);

    return (
        <AbsoluteFill className="bg-[#050505] flex items-center justify-center">
            <CyberBackground />
            <HUD title="CASE STUDY: RUBBER DUCKY" showCorners={false} />

            <div className="z-20 flex flex-col items-center w-full max-w-[800px] text-center px-10">
                {/* Real Rubber Ducky Image */}
                <div
                    style={{ transform: `scale(${duckyScale})`, opacity: duckyScale }}
                    className="mb-10 relative"
                >
                    <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full" />
                    <Img
                        src={staticFile("assets/malicious_usb.png")}
                        className="w-72 h-72 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] px-4"
                    />
                </div>

                {/* First Line - Glitch Effect (Title/Intro) */}
                <GlitchText
                    text="كلنا رأينا جهاز الـ Rubber Ducky."
                    className="text-4xl font-bold text-green-500 mb-6 dir-rtl"
                />

                {/* Sub-text - Smooth Writable Effect */}
                <SmoothWriteText
                    delay={60}
                    text="USB صغير… يتم توصيله بالحاسوب… وبعد ثوانٍ يبدأ “الاختراق”."
                    className="text-2xl text-green-400/80 mb-12 dir-rtl min-h-[3rem]"
                />

                {/* Icons */}
                <div
                    className="flex gap-8 mb-12"
                    style={{ opacity: hackIconOpacity, transform: `scale(${hackIconScale})` }}
                >
                    <ShieldAlert size={60} className="text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                    <Terminal size={60} className="text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                    <Cpu size={60} className="text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    <Usb size={60} className="text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]" />
                </div>

                {/* Questions - Smooth Writable Effect */}
                <div className="flex flex-col gap-4">
                    <SmoothWriteText
                        delay={200}
                        text="لكن السؤال الحقيقي ليس ماذا يفعل…"
                        className="text-3xl font-semibold text-white/90 dir-rtl min-h-[3.5rem]"
                    />

                    <SmoothWriteText
                        delay={240}
                        text="بل: كيف تم بناؤه أصلاً؟"
                        className="text-4xl font-black text-green-500 dir-rtl min-h-[4rem]"
                    />
                </div>
            </div>

            {/* Decorative vertical lines */}
            <div className="absolute left-20 top-0 bottom-0 w-[1px] bg-green-500/5" />
            <div className="absolute right-20 top-0 bottom-0 w-[1px] bg-green-500/5" />
        </AbsoluteFill>
    );
};
