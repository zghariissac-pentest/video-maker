import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { FolderTree, HardDrive, Cpu, Network } from 'lucide-react';

export const Scene4_Filesystem: React.FC = () => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();
    const FPS = config.fps;

    // Animations
    const translateY = spring({ frame: frame - 20, fps: FPS, config: { damping: 10 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden">
            <CyberBackground />
            <HUD title="SYSTEM_INFO: FILESYSTEM_PHILOSOPHY" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <div
                    className="mb-8"
                    style={{ opacity: interpolate(frame, [0, 30], [0, 1]), transform: `translateY(${(1 - translateY) * 50}px)` }}
                >
                    <GlitchText
                        text="FILESYSTEM PHILOSOPHY"
                        className="text-4xl font-mono text-green-500 mb-4 tracking-tighter"
                    />
                    <div className="text-xl opacity-80 leading-relaxed mb-6">
                        Windows يستخدم تقسيمات مثل C:\ و D:.
                        <br />
                        Linux يستخدم شجرة واحدة تبدأ من Root /.
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
                    <div
                        className="bg-green-900/10 border border-green-500/20 p-8 rounded-2xl backdrop-blur-md"
                        style={{ opacity: interpolate(frame, [60, 90], [0, 1]) }}
                    >
                        <div className="flex flex-col items-center mb-8">
                            <FolderTree className="w-12 h-12 text-green-400 mb-4" />
                            <h3 className="text-2xl font-bold text-green-400">Everything is a File</h3>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex flex-col items-center p-4 bg-green-900/40 rounded border border-green-500/10">
                                <HardDrive className="w-8 h-8 text-green-400/80 mb-2" />
                                <div className="text-xs font-mono">/dev/sda1</div>
                                <div className="text-[10px] opacity-40 mt-1 uppercase">Devices</div>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-green-900/40 rounded border border-green-500/10">
                                <Cpu className="w-8 h-8 text-green-400/80 mb-2" />
                                <div className="text-xs font-mono">/proc/cpuinfo</div>
                                <div className="text-[10px] opacity-40 mt-1 uppercase">Processes</div>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-green-900/40 rounded border border-green-500/10">
                                <Network className="w-8 h-8 text-green-400/80 mb-2" />
                                <div className="text-xs font-mono">/etc/networks</div>
                                <div className="text-[10px] opacity-40 mt-1 uppercase">Network</div>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-green-900/40 rounded border border-green-500/10">
                                <Activity className="w-8 h-8 text-green-400/80 mb-2" />
                                <div className="text-xs font-mono">/var/log/syslog</div>
                                <div className="text-[10px] opacity-40 mt-1 uppercase">Logs</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-12 text-xl italic opacity-60 font-mono"
                    style={{ opacity: interpolate(frame, [250, 280], [0, 1]) }}
                >
                    وهذا يجعل النظام موحدا وبسيطا هندسيا.
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Activity: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);
