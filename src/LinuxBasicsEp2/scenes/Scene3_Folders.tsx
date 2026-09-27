import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { User, Settings, Database, Binary, FileText, DatabaseZap, XCircle, CheckCircle2 } from 'lucide-react';

const FolderDetail: React.FC<{ icon: any, path: string, desc: string, delay: number, color: string }> = ({ icon: Icon, path, desc, delay, color }) => {
    const frame = useCurrentFrame();
    const show = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    return (
        <div
            className="flex items-center gap-8 bg-green-900/10 border border-green-500/20 p-8 rounded-[2rem] w-full max-w-2xl transform text-right"
            style={{
                opacity: show,
                transform: `translateX(${(1 - show) * 50}px)`
            }}
            dir="rtl"
        >
            <div className={`p-6 rounded-2xl bg-${color}-500/20 border border-${color}-500/30`}>
                <Icon className={`w-12 h-12 text-${color}-400`} />
            </div>
            <div className="flex-1">
                <h3 className="text-3xl font-mono font-black text-green-400 mb-2">{path}</h3>
                <p className="text-xl opacity-80">{desc}</p>
            </div>
        </div>
    );
};

export const Scene3_Folders: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Folders Showcase (0-20s) - frames 0-600
    const foldersOpacity = interpolate(frame, [0, 10, 580, 600], [0, 1, 1, 0]);

    // Comparison Part (20-35s) - frames 600-1050
    const comparisonOpacity = interpolate(frame, [600, 620], [0, 1], { extrapolateRight: 'clamp' });
    const winRegSlide = spring({ frame: frame - 630, fps: FPS, config: { damping: 12 } });
    const linConfSlide = spring({ frame: frame - 750, fps: FPS, config: { damping: 12 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: FOLDER_ORGANIZATION" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="2 — لماذا هذا التنظيم مهم؟"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* PART 1: FOLDERS SHOWCASE */}
                <div style={{ opacity: foldersOpacity, position: 'absolute', top: '30%', width: '100%' }}>
                    <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-10">
                        <FolderDetail icon={User} path="/home" desc="ملفات المستخدمين (الصور، المستندات، فيديوهات)." delay={20} color="green" />
                        <FolderDetail icon={Settings} path="/etc" desc="ملفات الإعدادات Configuration Files." delay={120} color="yellow" />
                        <FolderDetail icon={Database} path="/var" desc="البيانات المتغيرة مثل ملفات الـ Logs." delay={220} color="blue" />
                        <FolderDetail icon={Binary} path="/usr" desc="البرامج، المكتبات، ومعظم الأدوات." delay={320} color="red" />
                    </div>
                </div>

                {/* PART 2: THE REGISTRY VS TEXT FILE DIFFERENCE */}
                <div style={{ opacity: comparisonOpacity, position: 'absolute', top: '25%', width: '100%', padding: '0 4rem' }}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black text-green-500 mb-16">الفرق هنا مهم جدًا</h2>

                        <div className="grid grid-cols-1 gap-12">
                            {/* Windows Registry (The Bad Side) */}
                            <div
                                className="bg-red-950/20 border border-red-500/30 p-10 rounded-[3rem] backdrop-blur-md relative overflow-hidden"
                                style={{ transform: `translateX(${(1 - winRegSlide) * -100}px)`, opacity: winRegSlide }}
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <DatabaseZap className="w-32 h-32" />
                                </div>
                                <div className="flex items-center gap-6 mb-6">
                                    <XCircle className="w-12 h-12 text-red-500" />
                                    <h3 className="text-4xl font-bold text-red-400">Windows Registry</h3>
                                </div>
                                <p className="text-2xl leading-relaxed text-right opacity-80">
                                    Windows يخفي إعداداته داخل <span className="text-red-300 underline font-black italic">Registry معقدة</span>.
                                    يصعب فهمها أو تتبع التغييرات فيها بسهولة.
                                </p>
                            </div>

                            {/* Linux Text Files (The Good Side) */}
                            <div
                                className="bg-green-950/20 border border-green-500/30 p-10 rounded-[3rem] backdrop-blur-md relative overflow-hidden"
                                style={{ transform: `translateX(${(1 - linConfSlide) * 100}px)`, opacity: linConfSlide }}
                            >
                                <div className="absolute top-0 left-0 p-6 opacity-10">
                                    <FileText className="w-32 h-32" />
                                </div>
                                <div className="flex items-center gap-6 mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                    <h3 className="text-4xl font-bold text-green-400">Linux Text Files</h3>
                                </div>
                                <p className="text-2xl leading-relaxed text-right font-black">
                                    الإعدادات في Linux غالباً <span className="text-green-300">ملفات نصية واضحة</span> يمكنك قراءتها وتعديلها بسهولة.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
