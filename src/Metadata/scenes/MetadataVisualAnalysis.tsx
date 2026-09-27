import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, Easing } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Sun, Target, Ruler, Navigation, Search } from 'lucide-react';

const AnalysisCallout: React.FC<{ label: string, value: string, delay: number, x: number, y: number }> = ({ label, value, delay, x, y }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });

    return (
        <div className="absolute z-50 flex items-center gap-6" style={{ left: x, top: y, opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [30, 0])}px)` }}>
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
            <div className="bg-black/80 backdrop-blur-3xl border-l-4 border-cyan-500 p-5 rounded-r-2xl shadow-2xl min-w-[200px]">
                <div className="text-[10px] text-cyan-400/60 font-black uppercase tracking-[0.3em] mb-1">{label}</div>
                <div className="text-white font-mono text-2xl font-bold tracking-tighter">{value}</div>
            </div>
        </div>
    );
};

// A crosshair that moves to a target position
const AnalysisPointer: React.FC<{ x: number, y: number, delay: number, label: string }> = ({ x, y, delay, label }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

    return (
        <div
            className="absolute z-40 flex flex-col items-center gap-2"
            style={{ left: x, top: y, opacity: spr, transform: `translate(-50%, -50%) scale(${spr})` }}
        >
            <div className="relative w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="absolute w-20 h-px bg-cyan-400/30" />
                <div className="absolute h-20 w-px bg-cyan-400/30" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
            </div>
            <div className="bg-cyan-500 px-2 py-0.5 rounded text-[8px] font-black text-black font-mono tracking-widest">{label}</div>
        </div>
    );
};

export const MetadataVisualAnalysis: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    const startAnalysis = 45;
    const startPoint1 = 70;
    const startPoint2 = 130;
    const startSun = 200;

    // Smooth entry for the image container
    const entryProgress = spring({ frame, fps, config: { damping: 15, stiffness: 60 } });

    return (
        <AbsoluteFill className="bg-[#020205] flex flex-col justify-center items-center font-sans overflow-hidden">
            <MetadataSpace />

            {/* STABLE INTERACTIVE CONTAINER */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-12">

                {/* 1. NARRATIVE TEXT: CLEAN FADE & SLIDE */}
                <div
                    className="text-center px-10 max-w-6xl"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: entryProgress,
                        transform: `translateY(${interpolate(entryProgress, [0, 1], [30, 0])}px)`
                    }}
                >
                    <h1 className="text-7xl font-black text-white leading-tight">
                        حتى بدون <span className="text-cyan-400">بيانات مخفية</span>... <br />
                        يمكن تحليل محتوى الصورة مباشرة.
                    </h1>
                </div>

                {/* 2. CENTRAL IMAGE (Fixed Location, High-End Feel) */}
                <div className="relative">
                    <div
                        className="relative p-1 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-[3.5rem] shadow-[0_0_100px_rgba(34,211,238,0.1)]"
                        style={{ transform: `scale(${interpolate(entryProgress, [0, 1], [0.95, 1])})` }}
                    >
                        <div className="relative rounded-[3.2rem] overflow-hidden border border-white/10 group">
                            <Img
                                src={staticFile('jpg')}
                                style={{ width: 650, height: 650, objectFit: 'cover' }}
                            />

                            {/* Scanning Overlay (Subtle) */}
                            <div
                                className="absolute inset-0 bg-cyan-500/5 transition-opacity"
                                style={{ opacity: frame > startAnalysis ? 1 : 0 }}
                            />
                        </div>
                    </div>

                    {/* HUD ACCENTS (Stable) */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-[4rem]" />
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b-2 border-r-2 border-cyan-500/40 rounded-br-[4rem]" />

                    {/* 3. ANALYSIS TARGETS (The "Effects to Explain") */}
                    <AnalysisPointer x={150} y={150} label="POINT_SOURCE" delay={startPoint1} />
                    <AnalysisPointer x={450} y={500} label="SHADOW_TRACK" delay={startPoint2} />

                    {/* VECTOR LINES */}
                    <svg className="absolute inset-0 z-30 pointer-events-none">
                        <line
                            x1="150" y1="150" x2="450" y2="500"
                            stroke="#22d3ee" strokeWidth="2" strokeDasharray="10 10"
                            style={{
                                opacity: interpolate(frame, [startPoint2, startPoint2 + 30], [0, 0.4]),
                                strokeDashoffset: frame * 2
                            }}
                        />
                    </svg>
                </div>

                {/* 4. CALLOUTS (Clean & Stabilized) */}
                <AnalysisCallout x={width / 2 + 450} y={height / 2 - 200} label="Solar Azimuth" value="158.4°" delay={startPoint1 + 20} />
                <AnalysisCallout x={width / 2 + 450} y={height / 2} label="Sun Elevation" value="44.2°" delay={startPoint2 + 20} />
                <AnalysisCallout x={width / 2 + 450} y={height / 2 + 200} label="Calculated Time" value="13:12 PM" delay={startSun} />

                {/* 5. DYNAMIC SUN HUD */}
                {frame > startSun && (
                    <div
                        className="absolute left-20 bottom-20 flex flex-col items-center gap-8 bg-black/60 p-10 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl"
                        style={{ opacity: spring({ frame: frame - startSun, fps }) }}
                    >
                        <div className="relative">
                            <Sun size={80} className="text-yellow-400" />
                            <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-[0.4em]">Celestial_Nav</span>
                            <span className="text-white font-black italic text-4xl">ACTIVE</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Corner HUD Data */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20 text-white font-mono gap-1">
                <Search size={24} />
                <span className="text-[10px] tracking-widest uppercase">Visual_Analytics // v4.2</span>
                <span className="text-[8px] tracking-[0.6em] uppercase">Processing...</span>
            </div>

        </AbsoluteFill>
    );
};
