import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Pin, CheckCircle2 } from 'lucide-react';

export const MetadataGeolocation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const startText2 = 120;
    const startZoom = 150;
    const startMatch = 240;

    const zoomProgress = spring({
        frame: frame - startZoom,
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    const matchSpr = spring({
        frame: frame - startMatch,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    return (
        <AbsoluteFill className="bg-[#020205] justify-center items-center overflow-hidden">
            <MetadataSpace />

            {/* MAIN IMAGE CONTAINER */}
            <div className="relative z-10 flex flex-col items-center gap-12">

                {/* 1. NARRATIVE TEXT (PHASE 1) */}
                <div
                    className="text-center px-10"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [0, 20, startText2 - 10, startText2], [0, 1, 1, 0])
                    }}
                >
                    <h2 className="text-6xl font-black text-white leading-tight">
                        وأحيانًا، <span className="text-cyan-400 underline decoration-4">الخلفية</span> وحدها <br />
                        يمكن أن تكشف المكان بدقة.
                    </h2>
                </div>

                {/* 2. THE LANDSCAPE IMAGE */}
                <div
                    className="relative p-1 bg-white/10 border border-white/20 rounded-[3rem] shadow-2xl overflow-hidden"
                    style={{
                        transform: `scale(${interpolate(zoomProgress, [0, 1], [1, 1.2])}) translateX(${interpolate(zoomProgress, [0, 1], [0, -100])}px)`
                    }}
                >
                    <div className="relative w-[800px] h-[550px] overflow-hidden rounded-[2.8rem]">
                        <Img
                            src={staticFile('aesthetic, landscape, view, Budapest, outside.jpg')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transform: `scale(${interpolate(zoomProgress, [0, 1], [1, 2.5])}) translate(${0}%, ${interpolate(zoomProgress, [0, 1], [0, -15])}%)`
                            }}
                        />

                        {/* Analysis Grid Overlay */}
                        <div className="absolute inset-0 border border-cyan-500/20 pointer-events-none">
                            <div className="w-full h-full opacity-30 bg-[linear-gradient(90deg,transparent_49%,rgba(34,211,238,0.2)_50%,transparent_51%)] bg-[length:40px_100%]" />
                        </div>

                        {/* Scanner / Target on Bridge */}
                        {frame > startZoom && (
                            <div
                                className="absolute z-20 border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    width: 140,
                                    height: 100,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: interpolate(zoomProgress, [0.5, 1], [0, 1])
                                }}
                            >
                                <div className="absolute -top-10 bg-cyan-500 px-2 py-0.5 rounded text-[8px] font-black text-black font-mono">BRIDGE_IDENTIFIED</div>
                                <div className="absolute inset-x-[-20%] h-px bg-cyan-400/50" />
                                <div className="absolute inset-y-[-20%] w-px bg-cyan-400/50" />
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. NARRATIVE TEXT (PHASE 2) */}
                <div
                    className="text-center px-10 max-w-4xl"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [startText2, startText2 + 20], [0, 1])
                    }}
                >
                    <h2 className="text-5xl font-black text-white leading-tight">
                        مبنى، <span className="text-cyan-400 font-black">جسر</span>، أو حتى تفاصيل صغيرة <br />
                        يمكن أن تربط الصورة بموقع حقيقي.
                    </h2>
                </div>
            </div>

            {/* 4. MATCH POPUP */}
            {frame > startMatch && (
                <div
                    className="absolute z-50 right-32 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10"
                    style={{
                        transform: `translateX(${interpolate(matchSpr, [0, 1], [100, 0])}px)`,
                        opacity: matchSpr
                    }}
                >
                    <div className="bg-black/80 backdrop-blur-3xl border-2 border-cyan-500 p-10 rounded-[4rem] flex flex-col items-center gap-6 shadow-[0_0_150px_rgba(34,211,238,0.4)]">
                        <div className="flex gap-1 w-24 h-16 rounded overflow-hidden shadow-2xl">
                            <div className="flex-1 bg-[#CE2939]" />
                            <div className="flex-1 bg-white" />
                            <div className="flex-1 bg-[#477050]" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono text-cyan-400 font-black tracking-widest uppercase mb-1">Architecture_Match</span>
                            <div className="text-white text-5xl font-black italic tracking-tighter uppercase leading-none">Budapest</div>
                            <div className="text-cyan-500 text-xl font-bold font-mono mt-2">SZÉCHENYI BRIDGE</div>
                        </div>
                        <CheckCircle2 size={48} className="text-cyan-400 mt-4 animate-pulse" />
                    </div>
                </div>
            )}

            {/* Background HUD */}
            <div className="absolute top-10 left-10 flex flex-col gap-2 opacity-30">
                <div className="flex items-center gap-4">
                    <Pin size={20} className="text-cyan-500" />
                    <span className="text-xs font-mono text-white font-black tracking-[0.5em] uppercase">Structural_Analysis_Node</span>
                </div>
            </div>

        </AbsoluteFill>
    );
};
