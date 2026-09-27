import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { UserX, Network, Terminal, Settings, Megaphone, Store } from 'lucide-react';

export const TelegramScene3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // The entire text block slides up and fades out around frame 300 to make room for the big network grid
    const textGroupExit = spring({ frame: frame - 280, fps, config: { damping: 14 } });
    const textGroupOpacity = interpolate(frame, [290, 310], [1, 0], { extrapolateRight: 'clamp' });

    // Text 1: First thing...
    const t1Slide = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const t1Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Text 2: Not a single person
    const t2Slide = spring({ frame: frame - 60, fps, config: { damping: 14 } });
    const t2Opacity = interpolate(frame, [60, 70], [0, 1], { extrapolateRight: 'clamp' });

    // Text 3: Distributed System
    const t3Slide = spring({ frame: frame - 120, fps, config: { damping: 14 } });
    const t3Opacity = interpolate(frame, [120, 130], [0, 1], { extrapolateRight: 'clamp' });

    // Part 4: Roles breakdown
    const p4Opacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: 'clamp' });

    // Roles Springs
    const role1 = spring({ frame: frame - 310, fps, config: { damping: 12 } }); // Developers
    const role2 = spring({ frame: frame - 330, fps, config: { damping: 12 } }); // Operators
    const role3 = spring({ frame: frame - 350, fps, config: { damping: 12 } }); // Marketers
    const role4 = spring({ frame: frame - 370, fps, config: { damping: 12 } }); // Intermediary

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Subtle background tech texture to prevent empty voids */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#444 2px, transparent 2px)',
                    backgroundSize: '40px 40px',
                    transform: `translateY(${interpolate(frame, [0, 500], [0, 100])}px)`
                }}
            />

            {/* ---------------- TEXT SECION (Frames 0 - 300) ---------------- */}
            <AbsoluteFill
                className="justify-center items-center px-12 pb-24 z-10"
                style={{
                    opacity: textGroupOpacity,
                    transform: `translateY(${interpolate(textGroupExit, [0, 1], [0, -200])}px) scale(${interpolate(textGroupExit, [0, 1], [1, 0.8])})`
                }}
            >
                {/* Line 1 */}
                <div
                    style={{
                        opacity: t1Opacity,
                        transform: `translateY(${interpolate(t1Slide, [0, 1], [30, 0])}px)`,
                        fontSize: '55px',
                        color: '#a3a3a3',
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}
                >
                    أول شيء يجب أن تفهمه…
                </div>

                {/* Line 2 */}
                <div
                    style={{
                        opacity: t2Opacity,
                        transform: `scale(${interpolate(t2Slide, [0, 1], [0.9, 1])}) translateY(${interpolate(t2Slide, [0, 1], [30, 0])}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '80px'
                    }}
                >
                    <UserX size={100} color="#ef4444" style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.4))' }} />
                    <div style={{ fontSize: '65px', color: '#e0e0e0', textAlign: 'center' }}>
                        أنت لا تتعامل مع <span className="text-red-400">شخص واحد.</span>
                    </div>
                </div>

                {/* Line 3 */}
                <div
                    style={{
                        opacity: t3Opacity,
                        transform: `scale(${interpolate(t3Slide, [0, 1], [0.9, 1])}) translateY(${interpolate(t3Slide, [0, 1], [30, 0])}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }}
                >
                    <Network size={120} color="#00e5ff" style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.4))' }} />
                    <div style={{ fontSize: '70px', color: '#00e5ff', textAlign: 'center', fontWeight: 900, textShadow: '0 0 30px rgba(0,229,255,0.3)' }}>
                        بل مع نظام كامل موزع.
                    </div>
                </div>
            </AbsoluteFill>

            {/* ---------------- ROLES NETWORK SECION (Frames 300+) ---------------- */}
            <AbsoluteFill className="justify-center items-center font-bold px-12 z-20 pt-12" style={{ opacity: p4Opacity }}>

                {/* Central Core Connection Node */}
                <div
                    className="absolute z-0 flex justify-center items-center opacity-60"
                    style={{ transform: `scale(${interpolate(role1, [0, 1], [0, 1])})` }}
                >
                    <div className="w-[12px] h-[750px] bg-gradient-to-b from-cyan-500/80 via-purple-500/80 to-rose-500/80 blur-sm rounded-full absolute"></div>
                    <div className="w-[12px] h-[750px] bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-rose-500/40 rounded-full absolute"></div>
                </div>

                <div className="w-full max-w-[900px] flex flex-col gap-24 z-10">
                    {/* Developers */}
                    <div style={{ transform: `translateX(${interpolate(role1, [0, 1], [150, 0])}px)`, opacity: interpolate(role1, [0, 1], [0, 1]) }} className="flex items-center gap-10 bg-black/60 p-6 rounded-3xl border border-cyan-500/30 backdrop-blur-md">
                        <div className="w-32 h-32 shrink-0 rounded-3xl bg-cyan-900/60 border-2 border-cyan-400 flex justify-center items-center text-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                            <Terminal size={70} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-5xl text-cyan-3w00 mb-2 text-cyan-300 shadow-cyan-300/50" style={{ textShadow: '0 0 20px currentColor' }}>مطوّرون</span>
                            <span className="text-3xl text-gray-300 font-medium">بناء الأدوات، وتطوير البرمجيات الخبيثة.</span>
                        </div>
                    </div>

                    {/* Operators */}
                    <div style={{ transform: `translateX(${interpolate(role2, [0, 1], [-150, 0])}px)`, opacity: interpolate(role2, [0, 1], [0, 1]) }} className="flex items-center flex-row-reverse gap-10 bg-black/60 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md self-end w-full max-w-[85%]">
                        <div className="w-32 h-32 shrink-0 rounded-3xl bg-purple-900/60 border-2 border-purple-400 flex justify-center items-center text-purple-300 shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                            <Settings size={70} />
                        </div>
                        <div className="flex flex-col text-left items-end">
                            <span className="text-5xl mb-2 text-purple-300 shadow-purple-300/50" style={{ textShadow: '0 0 20px currentColor' }}>مشغّلون</span>
                            <span className="text-3xl text-gray-300 font-medium text-right">إدارة الخوادم والبنية التحتية للهجمات.</span>
                        </div>
                    </div>

                    {/* Marketers */}
                    <div style={{ transform: `translateX(${interpolate(role3, [0, 1], [150, 0])}px)`, opacity: interpolate(role3, [0, 1], [0, 1]) }} className="flex items-center gap-10 bg-black/60 p-6 rounded-3xl border border-emerald-500/30 backdrop-blur-md">
                        <div className="w-32 h-32 shrink-0 rounded-3xl bg-emerald-900/60 border-2 border-emerald-400 flex justify-center items-center text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.5)]">
                            <Megaphone size={70} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-5xl mb-2 text-emerald-300 shadow-emerald-300/50" style={{ textShadow: '0 0 20px currentColor' }}>مسوّقون</span>
                            <span className="text-3xl text-gray-300 font-medium">الترويج وبيع الخدمات في المنتديات.</span>
                        </div>
                    </div>

                    {/* Intermediaries */}
                    <div style={{ transform: `translateX(${interpolate(role4, [0, 1], [-150, 0])}px)`, opacity: interpolate(role4, [0, 1], [0, 1]) }} className="flex items-center flex-row-reverse gap-10 bg-black/60 p-6 rounded-3xl border border-rose-500/30 backdrop-blur-md self-end w-full max-w-[85%]">
                        <div className="w-32 h-32 shrink-0 rounded-3xl bg-rose-900/60 border-2 border-rose-400 flex justify-center items-center text-rose-300 shadow-[0_0_40px_rgba(244,63,94,0.5)]">
                            <Store size={70} />
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-5xl mb-2 text-rose-300 shadow-rose-300/50" style={{ textShadow: '0 0 20px currentColor' }}>حسابات وسيطة</span>
                            <span className="text-3xl text-gray-300 font-medium leading-relaxed">تعمل كواجهة لغسيل الأموال وتحويلات مجهولة.</span>
                        </div>
                    </div>

                </div>

            </AbsoluteFill>

        </AbsoluteFill>
    );
};
