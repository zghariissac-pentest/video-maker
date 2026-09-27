import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { SpaceBackground, CleanText, ProcessBox, InfoCard, ClockIcon, GearIcon } from '../components/WindowsTheme';

const TASKS_DESCRIPTION = "ويندوز يسمح بإنشاء مهام مجدولة لتنفيذ أوامر في وقت معين.";
const ACTIONS = "المهاجم يمكنه إنشاء مهمة جديدة أو تعديل واحدة موجودة لتنفيذ كود عند تسجيل الدخول.";
const PERSISTENCE = "هذه طريقة شائعة للحفاظ على الاستمرارية (Persistence) داخل النظام بصمت.";
const MONITORING = "ما يجب مراقبته:\n• مهام مجدولة غير معروفة\n• مهام تعمل بصلاحيات عالية بدون مبرر";

export const Scene4: React.FC = () => {
    return (
        <AbsoluteFill>
            <SpaceBackground />

            <Series>
                {/* Intro Title */}
                <Series.Sequence durationInFrames={150}>
                    <AbsoluteFill className="flex flex-col items-center justify-center">
                        <CleanText text="Scheduled Tasks – تنفيذ بصمت" />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* What are Tasks */}
                <Series.Sequence durationInFrames={300}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="flex items-center gap-8 relative">
                            <ClockIcon className="scale-[1.8]" />
                            <div className="absolute -top-10 -right-10">
                                <GearIcon active className="scale-75" />
                            </div>
                        </div>
                        <InfoCard
                            title="المهام المجدولة"
                            content={TASKS_DESCRIPTION}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Persistence concept */}
                <Series.Sequence durationInFrames={400}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="relative w-full max-w-xl h-40 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-dashed border-blue-500/20 rounded-[2rem] animate-[spin_20s_linear_infinite]" />
                            <ProcessBox label="BACKDOOR.EXE" active className="relative z-10" />
                            <div className="absolute -bottom-8 text-blue-400 font-mono text-xl animate-pulse">00:00:00 → EXECUTE</div>
                        </div>
                        <InfoCard
                            title="التنفيذ والاستمرارية"
                            content={ACTIONS}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Silence & Background */}
                <Series.Sequence durationInFrames={300}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-16 px-20">
                        <div className="flex items-center justify-center">
                            <div className="text-9xl opacity-20 filter blur-sm">🤫</div>
                            <div className="absolute text-5xl font-mono text-blue-400 tracking-widest uppercase">Silent Execution</div>
                        </div>
                        <InfoCard
                            title="الحفاظ على الاستمرارية"
                            content={PERSISTENCE}
                        />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Tools & Monitoring */}
                <Series.Sequence durationInFrames={450}>
                    <AbsoluteFill className="flex flex-col items-center justify-center gap-12 px-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="px-12 py-8 bg-white/5 border-2 border-blue-500 rounded-3xl backdrop-blur-xl">
                                <span className="text-white font-mono text-5xl font-black italic tracking-tighter">schtasks.exe</span>
                            </div>
                            <span className="text-blue-400 font-mono text-lg uppercase tracking-[0.3em]">Native Windows Tool</span>
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
