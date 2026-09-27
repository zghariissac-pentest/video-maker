import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { UserX, UserPlus, MegaphoneOff, Link, ShieldAlert, Fingerprint } from 'lucide-react';

export const TelegramScene6: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade out first part to show the conclusion
    const exitPart1 = spring({ frame: frame - 250, fps, config: { damping: 14 } });

    // Top Row: Accounts (Enters frame 20)
    const card1Enter = spring({ frame: frame - 20, fps, config: { damping: 14 } });
    const card1Swap = spring({ frame: frame - 80, fps, config: { damping: 14 } });

    // Bottom Row: Channels (Enters frame 100)
    const card2Enter = spring({ frame: frame - 100, fps, config: { damping: 14 } });
    const card2Swap = spring({ frame: frame - 160, fps, config: { damping: 14 } });

    // Conclusion (Enters frame 280)
    const conclusionEnter = spring({ frame: frame - 280, fps, config: { damping: 14 } });
    const conclusionPop = spring({ frame: frame - 320, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Elegant dark radial glow backgrop */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    background: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 60%)'
                }}
            />

            {/* --- PART 1: ACCOUNTS & CHANNELS CYCLE --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-10"
                style={{
                    opacity: interpolate(exitPart1, [0, 1], [1, 0]),
                    transform: `scale(${interpolate(exitPart1, [0, 1], [1, 1.1])})`,
                    pointerEvents: frame > 250 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col gap-12 w-full max-w-[900px]">

                    {/* Accounts Card */}
                    <div
                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex items-center justify-between relative overflow-hidden shadow-2xl"
                        style={{
                            transform: `translateX(${interpolate(card1Enter, [0, 1], [200, 0])}px)`,
                            opacity: interpolate(card1Enter, [0, 1], [0, 1])
                        }}
                    >
                        {/* Progress line connecting them aesthetically */}
                        <div className="absolute top-1/2 left-24 right-24 h-1 bg-gradient-to-r from-rose-500/30 to-emerald-500/30 -translate-y-1/2 z-0"></div>

                        {/* State 1: Closed */}
                        <div className="flex flex-col items-center gap-4 z-10 bg-black/40 p-4 rounded-2xl w-48">
                            <div className="w-20 h-20 bg-rose-500/20 rounded-full flex justify-center items-center border border-rose-500/50">
                                <UserX size={40} className="text-rose-500" />
                            </div>
                            <span className="text-2xl text-rose-300 font-bold">حساب يُغلق</span>
                        </div>

                        {/* Animated Transition Arrow */}
                        <div className="z-10 text-gray-500" style={{ opacity: interpolate(card1Swap, [0, 1], [0, 1]) }}>
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center animate-spin">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* State 2: Spawns (Minutes later) */}
                        <div
                            className="flex flex-col items-center gap-4 z-10 bg-black/40 p-4 rounded-2xl w-48"
                            style={{
                                opacity: interpolate(card1Swap, [0, 1], [0, 1]),
                                transform: `scale(${interpolate(card1Swap, [0, 1], [0.8, 1])})`
                            }}
                        >
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex justify-center items-center border border-emerald-500/50">
                                <UserPlus size={40} className="text-emerald-500" />
                            </div>
                            <span className="text-2xl text-emerald-300 font-bold">يُنشأ خلال دقائق</span>
                        </div>
                    </div>

                    {/* Channels Card */}
                    <div
                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex items-center justify-between relative overflow-hidden shadow-2xl"
                        style={{
                            transform: `translateX(${interpolate(card2Enter, [0, 1], [-200, 0])}px)`,
                            opacity: interpolate(card2Enter, [0, 1], [0, 1])
                        }}
                    >
                        {/* Progress line */}
                        <div className="absolute top-1/2 left-24 right-24 h-1 bg-gradient-to-r from-orange-500/30 to-cyan-500/30 -translate-y-1/2 z-0"></div>

                        {/* State 1: Channel Deleted */}
                        <div className="flex flex-col items-center gap-4 z-10 bg-black/40 p-4 rounded-2xl w-48">
                            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex justify-center items-center border border-orange-500/50">
                                <MegaphoneOff size={40} className="text-orange-500" />
                            </div>
                            <span className="text-2xl text-orange-300 font-bold">قناة تُحذف</span>
                        </div>

                        {/* Animated Transition Arrow */}
                        <div className="z-10 text-gray-500" style={{ opacity: interpolate(card2Swap, [0, 1], [0, 1]) }}>
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center animate-spin">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* State 2: Restored */}
                        <div
                            className="flex flex-col items-center gap-4 z-10 bg-black/40 p-4 rounded-2xl w-48"
                            style={{
                                opacity: interpolate(card2Swap, [0, 1], [0, 1]),
                                transform: `scale(${interpolate(card2Swap, [0, 1], [0.8, 1])})`
                            }}
                        >
                            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex justify-center items-center border border-cyan-500/50">
                                <Link size={40} className="text-cyan-400" />
                            </div>
                            <span className="text-2xl text-cyan-300 font-bold text-center">تُعاد بروابط جديدة</span>
                        </div>
                    </div>

                </div>
            </AbsoluteFill>

            {/* --- PART 2: THE TECHNICAL CONCLUSION --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20"
                style={{
                    opacity: interpolate(conclusionEnter, [0, 1], [0, 1]),
                    pointerEvents: frame < 250 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col items-center gap-16 w-full max-w-[900px]">

                    {/* Setup Text */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(conclusionEnter, [0, 1], [50, 0])}px)`,
                            fontSize: '45px',
                            color: '#a3a3a3',
                            fontWeight: 'bold'
                        }}
                    >
                        والسبب التقني هنا بسيط:
                    </div>

                    {/* Central Identity Graphic */}
                    <div
                        className="relative flex justify-center items-center"
                        style={{ transform: `scale(${interpolate(conclusionPop, [0, 1], [0.5, 1])})` }}
                    >
                        <div className="w-48 h-48 rounded-full bg-rose-900/20 flex justify-center items-center border-4 border-dashed border-rose-500/30">
                            <Fingerprint size={100} className="text-rose-500/50" />
                        </div>

                        {/* Shield Error Overlay */}
                        <div className="absolute inset-0 m-auto flex justify-center items-center drop-shadow-[0_0_30px_rgba(244,63,94,0.6)] text-rose-500">
                            <ShieldAlert size={140} />
                        </div>
                    </div>

                    {/* The punchline text */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(conclusionPop, [0, 1], [30, 0])}px)`,
                            opacity: interpolate(conclusionPop, [0, 1], [0, 1]),
                            fontSize: '60px',
                            fontWeight: '900',
                            textAlign: 'center',
                            lineHeight: '1.4'
                        }}
                    >
                        إنشاء الحسابات <span className="text-gray-400 font-normal">في هذه المنصات</span><br />
                        <span className="text-rose-500" style={{ textShadow: '0 0 40px rgba(244,63,94,0.4)' }}>لا يتطلب تحققًا قويًا من الهوية</span>
                    </div>

                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
