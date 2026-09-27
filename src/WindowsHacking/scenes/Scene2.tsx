import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate } from 'remotion';
import { SpaceBackground, CleanText, ProcessBox, DataHash, InfoCard } from '../components/WindowsTheme';

const LSASS_DESCRIPTION = "في ويندوز، عملية اسمها LSASS مسؤولة عن إدارة المصادقة وتخزين بيانات الجلسات.";
const LSASS_STORAGE = "يتم حفظ معلومات حساسة في الذاكرة، مثل Password Hash أو Kerberos Tickets.";
const EXPLOITATION = "إذا حصل مهاجم على صلاحيات مرتفعة، يمكنه قراءة ذاكرة LSASS واستخراج البيانات، وهنا تبدأ الحركة الجانبية.";
const MONITORING = "ما يجب مراقبته:\n• محاولات الوصول غير الطبيعية إلى LSASS\n• تعطيل Credential Guard\n• تشغيل أدوات تصحيح الذاكرة";

export const Scene2: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill>
            <SpaceBackground />

            <Series>
                {/* Intro Title - Perfectly Centered */}
                <Series.Sequence durationInFrames={150}>
                    <AbsoluteFill className="flex flex-col items-center justify-center">
                        <CleanText text="1️⃣ LSASS – سر كلمات المرور" />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* What is LSASS - Enhanced with Scanning Effect */}
                <Series.Sequence durationInFrames={300}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="relative group">
                            <ProcessBox label="LSASS.EXE" active />
                            {/* Scanning beam animation */}
                            <div
                                className="absolute -inset-4 border-2 border-blue-500/50 rounded-2xl opacity-0"
                                style={{
                                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                    opacity: interpolate(frame % 60, [0, 30, 60], [0, 0.5, 0])
                                }}
                            />
                        </div>

                        <InfoCard
                            title="ما هي LSASS؟"
                            content={LSASS_DESCRIPTION}
                        />

                        {/* Background Data Stream */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <DataHash
                                    key={i}
                                    hash={Math.random().toString(16).substring(2, 10).toUpperCase()}
                                    delay={i * 5}
                                    className="absolute"
                                    style={{
                                        left: `${(i * 153.45) % 100}%`,
                                        top: `${(i * 267.89) % 100}%`,
                                        fontSize: '14px',
                                        transform: `translateY(${Math.sin(frame / 20 + i) * 20}px)`
                                    }}
                                />
                            ))}
                        </div>
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Stored Data - Enhanced Visuals */}
                <Series.Sequence durationInFrames={300}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="flex gap-12 relative">
                            {/* Animated Connection Lines */}
                            <div className="w-40 h-40 bg-blue-600/10 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-blue-400 shadow-[0_0_30px_rgba(0,189,242,0.2)]">
                                <span className="text-white font-bold text-5xl mb-2">Hash</span>
                                <div className="w-12 h-1 bg-blue-400/50 rounded-full" />
                            </div>
                            <div className="flex items-center text-4xl text-blue-400 font-bold px-4">+</div>
                            <div className="w-40 h-40 bg-blue-600/10 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-blue-400 shadow-[0_0_30px_rgba(0,189,242,0.2)]">
                                <span className="text-white font-bold text-5xl mb-2">Ticket</span>
                                <div className="w-12 h-1 bg-blue-400/50 rounded-full" />
                            </div>
                        </div>
                        <InfoCard
                            title="ماذا تخزن؟"
                            content={LSASS_STORAGE}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Exploitation - More Intense Animation */}
                <Series.Sequence durationInFrames={350}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="relative">
                            <div className="w-56 h-56 bg-red-600/10 rounded-full border-2 border-red-500/50 flex items-center justify-center">
                                <div className="w-40 h-40 bg-red-600/20 rounded-full border-4 border-red-500 animate-pulse flex items-center justify-center">
                                    <span className="text-red-500 text-7xl">⚡</span>
                                </div>
                            </div>
                            {/* Pulse rings */}
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="absolute inset-0 border border-red-500/30 rounded-full"
                                    style={{
                                        transform: `scale(${1 + (frame % (30 * i)) / 30})`,
                                        opacity: 1 - (frame % (30 * i)) / 30
                                    }}
                                />
                            ))}
                        </div>
                        <InfoCard
                            title="الاستغلال والحركة الجانبية"
                            content={EXPLOITATION}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Mimikatz & Monitoring - High Quality */}
                <Series.Sequence durationInFrames={400}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-12 px-20">
                        <div className="flex items-center gap-8 bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
                            <div className="text-8xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🐱</div>
                            <div className="flex flex-col">
                                <h2 className="text-6xl font-black text-white font-mono tracking-tighter">MIMIKATZ</h2>
                                <div className="h-1.5 bg-blue-500 w-full mt-2 rounded-full" />
                            </div>
                        </div>
                        <InfoCard
                            title="المراقبة والدفاع"
                            content={MONITORING}
                        />
                    </AbsoluteFill>
                </Series.Sequence>
            </Series>

            <AbsoluteFill className="pointer-events-none shadow-[inset_0_0_250px_rgba(0,0,0,0.9)]" />
        </AbsoluteFill>
    );
};
