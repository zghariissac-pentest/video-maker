import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Terminal as TerminalIcon, CheckCircle2, Search } from 'lucide-react';

const TerminalLine: React.FC<{ text: string, delay: number, isCommand?: boolean }> = ({ text, delay, isCommand }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });

    // Typing effect for command
    const charCount = Math.floor(interpolate(frame - delay, [0, 40], [0, text.length], { extrapolateRight: 'clamp' }));
    const displayedText = isCommand ? text.slice(0, charCount) : text;

    if (frame < delay) return null;

    return (
        <div className="flex gap-4 font-mono text-xl mb-2" style={{ opacity: isCommand ? 1 : spr }}>
            <span className={isCommand ? "text-cyan-400" : "text-white/40"}>{isCommand ? ">" : " "}</span>
            <span className={isCommand ? "text-white" : "text-cyan-300"}>
                {displayedText}
                {isCommand && charCount < text.length && frame % 10 < 5 && (
                    <span className="w-2 h-5 bg-cyan-400 inline-block ml-1" />
                )}
            </span>
        </div>
    );
};

export const MetadataTerminal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const terminalStart = 80;
    const terminalSpr = spring({
        frame: frame - terminalStart,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const lines = [
        { text: "ExifTool Version Number         : 12.40", delay: 140 },
        { text: "File Name                       : Apu Apustaja.jpg", delay: 150 },
        { text: "File Size                       : 142 KiB", delay: 160 },
        { text: "Camera Model Name               : iPhone 15 Pro Max", delay: 170 },
        { text: "Create Date                     : 2024:03:15 17:42:01", delay: 180 },
        { text: "GPS Latitude                    : 35 deg 41' 22.20\" N", delay: 190 },
        { text: "GPS Longitude                   : 139 deg 41' 30.12\" E", delay: 200 },
    ];

    return (
        <AbsoluteFill className="bg-[#050508] justify-center items-center overflow-hidden">
            <MetadataSpace />

            <div className="flex flex-col items-center gap-12 w-full max-w-5xl">

                {/* NARRATIVE TEXT */}
                <div
                    className="text-center px-10 relative z-20"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0.4])
                    }}
                >
                    <h2 className="text-6xl font-black text-white leading-tight">
                        يمكن استخراج هذه المعلومات <span className="text-cyan-400">بسهولة</span><br />
                        باستخدام أدوات مثل <span className="text-white border-b-4 border-cyan-500">ExifTool</span>
                    </h2>
                </div>

                {/* TERMINAL WINDOW */}
                <div
                    className="w-full bg-black/60 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-[0_0_100px_rgba(34,211,238,0.1)] relative z-20"
                    style={{
                        opacity: terminalSpr,
                        transform: `translateY(${interpolate(terminalSpr, [0, 1], [40, 0])}px) scale(${interpolate(terminalSpr, [0, 1], [0.95, 1])})`
                    }}
                >
                    {/* Title Bar */}
                    <div className="bg-white/5 px-8 py-4 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                        </div>
                        <div className="flex items-center gap-2 text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
                            <TerminalIcon size={12} />
                            root@cyber_lab: ~/images
                        </div>
                        <div className="w-12 h-px bg-white/10" />
                    </div>

                    {/* Content */}
                    <div className="p-10 min-h-[400px]">
                        <TerminalLine
                            text={'exiftool "Apu Apustaja.jpg"'}
                            delay={terminalStart + 20}
                            isCommand
                        />

                        <div className="mt-8">
                            {lines.map((line, i) => (
                                <TerminalLine key={i} text={line.text} delay={line.delay} />
                            ))}
                        </div>

                        {/* Scanner Glow */}
                        {frame > 140 && (
                            <div
                                className="absolute bottom-10 right-10 flex items-center gap-4 text-cyan-400 animate-pulse"
                                style={{ opacity: interpolate(frame, [140, 160], [0, 1]) }}
                            >
                                <CheckCircle2 size={24} />
                                <span className="font-mono text-sm font-black uppercase tracking-widest">Extraction_Complete</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Subtext */}
                <div
                    className="flex items-center gap-4 opacity-30 mt-8"
                    style={{ opacity: interpolate(frame, [100, 120], [0, 0.3]) }}
                >
                    <Search size={20} className="text-cyan-500" />
                    <span className="text-white font-mono text-xs uppercase tracking-[0.2em]">Analyzing bit-streams for metadata fragments...</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
