import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Smartphone, Clock, Settings, MapPin, Database, Layers } from 'lucide-react';

const RevealIcon: React.FC<{ icon: React.ReactNode, label: string, delay: number }> = ({ icon, label, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });

    return (
        <div className="flex flex-col items-center gap-4" style={{ opacity: spr, transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])})` }}>
            <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                {icon}
            </div>
            <span className="text-white font-mono text-xs font-black uppercase tracking-widest text-center max-w-[100px]">{label}</span>
        </div>
    );
};

export const MetadataExplanation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings
    const layerSplitStart = 20;
    const text1Start = 10;
    const text2Start = 100;
    const iconsStart = 180;
    const text3Start = 200;

    const splitProgress = spring({
        frame: frame - layerSplitStart,
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    const layerOffset = interpolate(splitProgress, [0, 1], [0, 150]);
    const layerRotation = interpolate(splitProgress, [0, 1], [0, -25]);

    return (
        <AbsoluteFill className="bg-[#050508] justify-center items-center overflow-hidden">
            <MetadataSpace />

            {/* 3D LAYER STACK */}
            <div className="relative mb-20 z-20" style={{ transform: `perspective(1200px) rotateY(${layerRotation}deg)` }}>

                {/* Data Layer (Behind) */}
                <div
                    className="absolute inset-0 bg-cyan-950/40 border-2 border-cyan-500/40 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center justify-center gap-4 overflow-hidden"
                    style={{ transform: `translateX(${layerOffset}px)` }}
                >
                    <div className="absolute inset-0 opacity-20 pointer-events-none p-6 font-mono text-[8px] text-cyan-400 break-all leading-tight">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i}>0xFA{i}B2: FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 48 00 48 00 00 FF E1 21 FE 45 78 69 66 00 00 49 49 2A 00 08 00 00 00</div>
                        ))}
                    </div>
                    <Database size={80} className="text-cyan-400 relative z-10" />
                    <div className="bg-cyan-500/20 px-4 py-1 rounded text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] relative z-10">Hidden_Segment</div>
                </div>

                {/* Image Layer (Front) */}
                <div
                    className="relative p-1 bg-white/10 border border-white/20 rounded-[2.5rem] shadow-2xl"
                    style={{ transform: `translateX(${-layerOffset}px)` }}
                >
                    <Img
                        src={staticFile('Apu Apustaja.jpg')}
                        style={{ width: 500, height: 500, objectFit: 'cover', borderRadius: '2.2rem' }}
                    />
                    <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                        <Layers size={20} className="text-white" />
                    </div>
                </div>
            </div>

            {/* ARABIC NARRATIVE */}
            <div
                className="text-center px-20 relative z-30"
                dir="rtl"
                style={{ fontFamily: 'Cairo, sans-serif' }}
            >
                {/* Text 1: The Definition */}
                {frame >= text1Start && frame < text2Start && (
                    <div style={{ opacity: interpolate(frame, [text1Start, text1Start + 15, text2Start - 10, text2Start], [0, 1, 1, 0]) }}>
                        <h2 className="text-6xl font-black text-white leading-tight">
                            كل صورة رقمية تحتوي على <br />
                            <span className="text-cyan-400">طبقة مخفية</span> من البيانات تُسمى: <span className="p-2 bg-white text-black inline-block transform -skew-x-12">Metadata</span>
                        </h2>
                    </div>
                )}

                {/* Text 2: The Action */}
                {frame >= text2Start && frame < text3Start && (
                    <div style={{ opacity: interpolate(frame, [text2Start, text2Start + 15, text3Start - 10, text3Start], [0, 1, 1, 0]) }}>
                        <h2 className="text-6xl font-black text-white leading-tight">
                            هذه البيانات لا تظهر لك مباشرة، <br />
                            لكنها <span className="text-cyan-400 italic">تُسجَّل تلقائيًا</span> عند التقاط الصورة.
                        </h2>
                    </div>
                )}

                {/* Text 3: The Content & Icons */}
                {frame >= text3Start && (
                    <div className="flex flex-col items-center gap-16" style={{ opacity: interpolate(frame, [text3Start, text3Start + 15], [0, 1]) }}>
                        <h2 className="text-6xl font-black text-white leading-tight">
                            وتشمل أشياء مثل...
                        </h2>

                        <div className="flex gap-12">
                            <RevealIcon icon={<Smartphone size={40} />} label="نوع الجهاز" delay={iconsStart} />
                            <RevealIcon icon={<Clock size={40} />} label="الوقت والتاريخ" delay={iconsStart + 15} />
                            <RevealIcon icon={<Settings size={40} />} label="إعدادات الكاميرا" delay={iconsStart + 30} />
                            <RevealIcon icon={<MapPin size={40} />} label="الموقع الجغرافي" delay={iconsStart + 45} />
                        </div>
                    </div>
                )}
            </div>

            {/* Background Decorative HUD */}
            <div className="absolute top-10 right-10 flex items-center gap-4 opacity-20">
                <div className="h-px w-32 bg-cyan-500" />
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-[0.5em]">Analysis_Layer_02</span>
            </div>
        </AbsoluteFill>
    );
};
