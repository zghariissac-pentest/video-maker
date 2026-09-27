import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Users, Settings, Activity, FolderGit, FileText, CheckCircle, Terminal } from 'lucide-react';

export const Scene3_MainDirs: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideDown = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill className="bg-[#0a0a0a] text-white font-sans overflow-hidden p-10" dir="rtl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 flex flex-col items-center h-full w-full bg-[#0d0d0d] border-2 border-green-500/10 rounded-[3rem] p-16 shadow-2xl">
                <header className="text-center mb-10" style={{ opacity: slideDown, transform: `translateY(${(1 - slideDown) * -50}px)` }}>
                    <h2 className="text-6xl font-black tracking-tighter mb-4">أهم المجلدات</h2>
                    <div className="h-2 w-48 bg-green-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                </header>

                <div className="grid grid-cols-2 gap-8 w-full max-w-7xl mt-8">
                    <DirectoryTile name="/home" description="ملفات المستخدمين" icon={<Users className="w-16 h-16 text-green-400" />} delay={20} frame={frame} fps={fps} />
                    <DirectoryTile name="/etc" description="Configuration Files" icon={<Settings className="w-16 h-16 text-green-400" />} delay={35} frame={frame} fps={fps} />
                    <DirectoryTile name="/var" description="البيانات المتغيرة" icon={<Activity className="w-16 h-16 text-green-400" />} delay={50} frame={frame} fps={fps} />
                    <DirectoryTile name="/usr" description="البرامج والمكتبات" icon={<FolderGit className="w-16 h-16 text-green-400" />} delay={65} frame={frame} fps={fps} />
                </div>

                <div
                    className="mt-12 flex-grow w-full max-w-7xl bg-[#111111] border-2 border-green-500/10 p-12 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden"
                    style={{ opacity: spring({ frame: frame - 120, fps, config: { damping: 12 } }), transform: `translateY(${interpolate(frame, [120, 150], [50, 0], { extrapolateLeft: 'clamp' })}px)` }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] -z-10 rounded-full" />

                    <div className="flex items-center gap-10 mb-8">
                        <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center border-2 border-green-500/20 shadow-lg">
                            <FileText className="w-12 h-12 text-green-400" />
                        </div>
                        <h3 className="text-5xl font-black text-green-400 tracking-tight">Linux Config Style</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-[#050505] p-10 rounded-3xl border border-green-500/10 shadow-inner">
                            <div className="flex gap-4 items-center mb-6 border-b border-green-500/10 pb-4">
                                <Terminal className="w-8 h-8 text-green-400" />
                                <span className="text-xl font-mono text-green-400 opacity-60">/etc/ssh/sshd_config</span>
                            </div>
                            <p className="text-3xl font-black leading-relaxed">
                                ملفات نصية <span className="text-green-400">واضحة</span> يمكنك قراءتها وتعديلها بسهولة.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-6">
                            <p className="text-2xl font-bold opacity-60 leading-relaxed italic">
                                لا يخزن إعداداته داخل نظام مغلق مثل Registry في Windows.
                            </p>
                            <div className="bg-green-500/5 px-8 py-6 rounded-2xl border border-green-500/10 flex items-center gap-4 text-green-400 font-black text-3xl shadow-sm">
                                <CheckCircle className="w-10 h-10" />
                                <span>سيطرة حقيقية على النظام</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const DirectoryTile: React.FC<{ name: string; description: string; icon: React.ReactNode; delay: number; frame: number; fps: number }> = ({ name, description, icon, delay, frame, fps }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 10 } });
    const y = interpolate(frame, [delay, delay + 20], [50, 0], { extrapolateLeft: 'clamp' });

    return (
        <div
            className="flex items-center gap-10 bg-green-900/10 border-2 border-green-500/20 p-8 rounded-[2rem] shadow-xl w-full"
            style={{ opacity: s, transform: `translateY(${y}px) scale(${1 + (1 - s) * -0.05})` }}
        >
            <div className="w-28 h-28 bg-[#0a0a0a] rounded-[1.5rem] flex items-center justify-center border border-green-400/20 shadow-inner">
                {icon}
            </div>
            <div className="flex flex-col text-right">
                <div className="text-4xl font-mono text-green-500 font-black mb-4 tracking-tighter bg-green-500/5 px-6 py-2 rounded-xl inline-block">{name}</div>
                <div className="text-2xl opacity-60 font-black">{description}</div>
            </div>
        </div>
    );
};
