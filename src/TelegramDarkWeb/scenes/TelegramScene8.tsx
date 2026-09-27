import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Search, ListChecks, Globe, Fingerprint, History, Hourglass, Map, Database } from 'lucide-react';

export const TelegramScene8: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade out first part to show conclusion
    const exitPart1 = spring({ frame: frame - 320, fps, config: { damping: 14 } });

    // Intro setup
    const introSlide = spring({ frame: frame - 20, fps, config: { damping: 14 } });
    const introOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });

    // The 4 Data Categories
    const data1Pop = spring({ frame: frame - 80, fps, config: { damping: 12 } });
    const data2Pop = spring({ frame: frame - 120, fps, config: { damping: 12 } });
    const data3Pop = spring({ frame: frame - 160, fps, config: { damping: 12 } });
    const data4Pop = spring({ frame: frame - 200, fps, config: { damping: 12 } });

    // Conclusion Setup
    const conclusionEnter = spring({ frame: frame - 340, fps, config: { damping: 14 } });
    const conclusionOpacity = interpolate(conclusionEnter, [0, 1], [0, 1]);

    // Background floating data dots logic
    const float1 = interpolate(frame, [0, 500], [0, 200]);
    const float2 = interpolate(frame, [0, 500], [0, -150]);

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Dark elegant grid background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at top right, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at bottom left, rgba(79,70,229,0.15) 0%, transparent 50%)'
                }}
            />

            {/* --- PART 1: THE INVESTIGATION LIST --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-10"
                style={{
                    opacity: interpolate(exitPart1, [0, 1], [1, 0]),
                    transform: `translateX(${interpolate(exitPart1, [0, 1], [0, 200])}px)`,
                    pointerEvents: frame > 300 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col gap-12 w-full max-w-[900px]">

                    {/* Header Phrase */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(introSlide, [0, 1], [30, 0])}px)`,
                            opacity: introOpacity
                        }}
                        className="flex flex-col items-center gap-6 mb-8"
                    >
                        <Search size={80} className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                        <span className="text-5xl text-gray-300 font-bold">بينما <span className="text-blue-400">جهة التحقيق…</span></span>
                        <span className="text-5xl text-gray-300 font-bold">تعتمد على تحليل بيانات مثل:</span>
                    </div>

                    {/* Checkbox List Panel */}
                    <div className="flex flex-col gap-6 w-full">

                        {/* 1. سجلات الاتصال */}
                        <div style={{ transform: `scale(${data1Pop})`, opacity: interpolate(data1Pop, [0, 1], [0, 1]) }} className="flex items-center gap-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-3xl">
                            <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex justify-center items-center text-blue-400">
                                <Database size={32} />
                            </div>
                            <span className="text-4xl text-blue-100 font-medium">سجلات الاتصال</span>
                        </div>

                        {/* 2. IP Logs */}
                        <div style={{ transform: `scale(${data2Pop})`, opacity: interpolate(data2Pop, [0, 1], [0, 1]) }} className="flex items-center gap-8 bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-3xl w-[90%] self-end">
                            <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex justify-center items-center text-indigo-400">
                                <Globe size={32} />
                            </div>
                            <span className="text-4xl text-indigo-100 font-bold" dir="ltr">IP logs</span>
                        </div>

                        {/* 3. أنماط السلوك */}
                        <div style={{ transform: `scale(${data3Pop})`, opacity: interpolate(data3Pop, [0, 1], [0, 1]) }} className="flex items-center gap-8 bg-purple-900/20 border border-purple-500/30 p-6 rounded-3xl">
                            <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex justify-center items-center text-purple-400">
                                <Fingerprint size={32} />
                            </div>
                            <span className="text-4xl text-purple-100 font-medium">أنماط السلوك</span>
                        </div>

                        {/* 4. تسلسل الأحداث */}
                        <div style={{ transform: `scale(${data4Pop})`, opacity: interpolate(data4Pop, [0, 1], [0, 1]) }} className="flex items-center gap-8 bg-cyan-900/20 border border-cyan-500/30 p-6 rounded-3xl w-[90%] self-end">
                            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex justify-center items-center text-cyan-400">
                                <History size={32} className={frame > 220 ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
                            </div>
                            <span className="text-4xl text-cyan-100 font-medium">وتسلسل الأحداث الزمنية.</span>
                        </div>

                    </div>
                </div>
            </AbsoluteFill>

            {/* --- PART 2: THE CONCLUSION (IT TAKES TIME) --- */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20"
                style={{
                    opacity: conclusionOpacity,
                    pointerEvents: frame < 320 ? 'none' : 'auto'
                }}
            >
                <div className="flex flex-col items-center gap-16 w-full max-w-[900px]">

                    {/* Time Concept Group */}
                    <div
                        className="relative flex justify-center items-center mb-12"
                        style={{ transform: `scale(${interpolate(conclusionEnter, [0, 1], [0.5, 1])})` }}
                    >
                        {/* Sandclock spinning to imply passage of frustrating time */}
                        <Hourglass size={180} color="#facc15" className="absolute z-10" style={{ transform: `rotate(${interpolate(frame, [350, 500], [0, 180])}deg)`, filter: 'drop-shadow(0 0 40px rgba(250,204,21,0.6))' }} />

                        {/* Multiple Sources / Countries flowing in */}
                        <Map size={80} color="#60a5fa" className="absolute -left-32 -top-12 z-0" style={{ transform: `translateY(${float1}px)`, opacity: 0.5 }} />
                        <Map size={60} color="#34d399" className="absolute -right-32 top-8 z-0" style={{ transform: `translateY(${float2}px)`, opacity: 0.5 }} />
                        <Globe size={100} color="#c084fc" className="absolute right-12 -bottom-24 z-0" style={{ opacity: 0.3 }} />
                        <Globe size={90} color="#f472b6" className="absolute -left-20 -bottom-16 z-0" style={{ opacity: 0.3 }} />

                        {/* Circular ring placeholder */}
                        <div className="w-[300px] h-[300px] border border-dashed border-gray-600 rounded-full flex justify-center items-center animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute w-[400px] h-[400px] border border-gray-800 rounded-full flex justify-center items-center animate-[spin_30s_linear_infinite_reverse]"></div>
                    </div>

                    {/* Explanatory text */}
                    <div
                        style={{
                            transform: `translateY(${interpolate(conclusionEnter, [0, 1], [50, 0])}px)`,
                            fontSize: '55px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: '1.6'
                        }}
                    >
                        <span className="text-yellow-400 text-6xl text-shadow-lg shadow-yellow-500/50 block mb-6">وهذه العملية تحتاج وقتًا،</span>
                        <span className="text-gray-300 block mb-2">لأن البيانات تأتي من <span className="text-blue-400">مصادر متعددة</span>،</span>
                        <span className="text-gray-400">وأحيانًا من <span className="text-cyan-400">دول مختلفة</span>.</span>
                    </div>

                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
