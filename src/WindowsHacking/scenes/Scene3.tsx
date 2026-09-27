import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { SpaceBackground, CleanText, ProcessBox, InfoCard, GearIcon, FileIcon } from '../components/WindowsTheme';

const SERVICES_DESCRIPTION = "في ويندوز، الخدمات (Services) تعمل بصلاحيات عالية وغالبًا عند الإقلاع.";
const VULNERABILITY = "إذا كان هناك Service بإعدادات خاطئة أو مسار ملف قابل للتعديل من مستخدم عادي، يمكن استبدال الملف بآخر خبيث.";
const EXPLOITATION = "عند إعادة التشغيل، يعمل الملف بصلاحيات SYSTEM. لا يوجد Exploit، فقط سوء إعداد.";
const MONITORING = "ما يجب مراقبته:\n• خدمات بصلاحيات SYSTEM ومسارات غير محمية\n• تغييرات غير متوقعة في ملفات الخدمات";

export const Scene3: React.FC = () => {
    return (
        <AbsoluteFill>
            <SpaceBackground />

            <Series>
                {/* Intro Title */}
                <Series.Sequence durationInFrames={150}>
                    <AbsoluteFill className="flex flex-col items-center justify-center">
                        <CleanText text="Windows Services – باب التنفيذ الدائم" />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* What are Services */}
                <Series.Sequence durationInFrames={300}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="flex items-center gap-8">
                            <GearIcon active className="scale-[1.5]" />
                            <ProcessBox label="SYSTEM SERVICES" active />
                        </div>
                        <InfoCard
                            title="خدمات النظام"
                            content={SERVICES_DESCRIPTION}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* The Vulnerability */}
                <Series.Sequence durationInFrames={400}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="flex items-center gap-12">
                            <FileIcon type="safe" label="ORIGINAL.EXE" />
                            <div className="text-4xl text-red-500 font-bold animate-bounce">➡</div>
                            <FileIcon type="malicious" label="MALICIOUS.EXE" />
                        </div>
                        <InfoCard
                            title="الثغرة: سوء الإعداد"
                            content={VULNERABILITY}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* The Execution (SYSTEM Privs) */}
                <Series.Sequence durationInFrames={350}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="relative">
                            <div className="w-64 h-24 bg-red-600/20 border-4 border-red-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                                <span className="text-white font-black text-4xl tracking-widest">SYSTEM PRIVILEGES</span>
                            </div>
                            <div className="absolute -top-6 -right-6 text-5xl">⚡</div>
                        </div>
                        <InfoCard
                            title="التنفيذ بصلاحيات عالية"
                            content={EXPLOITATION}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Tools & Monitoring */}
                <Series.Sequence durationInFrames={450}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-12 px-20">
                        <div className="flex gap-8">
                            <div className="px-10 py-6 bg-blue-600/20 border border-blue-400 rounded-2xl backdrop-blur-md">
                                <span className="text-white font-mono text-4xl font-bold">WinPEAS</span>
                            </div>
                            <div className="px-10 py-6 bg-blue-600/20 border border-blue-400 rounded-2xl backdrop-blur-md">
                                <span className="text-white font-mono text-4xl font-bold">PowerUp</span>
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
