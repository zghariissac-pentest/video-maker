import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing, Img, staticFile } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { MapPin, Calendar, Camera, Maximize, ShieldCheck, Activity } from 'lucide-react';

const CleanInfoItem: React.FC<{ icon: React.ReactNode, value: string, delay: number }> = ({ icon, value, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

    return (
        <div
            className="flex flex-col items-center gap-3"
            style={{
                opacity: spr,
                transform: `translateY(${interpolate(spr, [0, 1], [20, 0])}px) scale(${interpolate(spr, [0, 1], [0.8, 1])})`
            }}
        >
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                {icon}
            </div>
            <span className="text-white font-mono text-sm font-bold tracking-tight">{value}</span>
        </div>
    );
};

export const MetadataHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scanStart = 30;
    const infoStart = 60;

    const scanProgress = interpolate(frame - scanStart, [0, 40], [0, 1], {
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <AbsoluteFill className="bg-[#050508] flex flex-col justify-center items-center font-sans">
            <MetadataSpace />

            {/* Main Stage */}
            <div className="relative flex flex-col items-center z-10">

                {/* 1. THE IMAGE (Minimalist) */}
                <div className="relative mb-12">
                    <div
                        className="p-1 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-[2.5rem]"
                        style={{
                            boxShadow: `0 0 80px rgba(34,211,238,${interpolate(frame, [scanStart, scanStart + 20], [0, 0.15])})`
                        }}
                    >
                        <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10">
                            <Img
                                src={staticFile('Apu Apustaja.jpg')}
                                style={{ width: 600, height: 600, objectFit: 'cover' }}
                            />

                            {/* Simple Ultra-Clean Scanline */}
                            {frame > scanStart && (
                                <div
                                    className="absolute left-0 w-full z-10"
                                    style={{
                                        top: `${scanProgress * 100}%`,
                                        height: 2,
                                        background: '#22d3ee',
                                        boxShadow: '0 0 15px #22d3ee, 0 0 30px #22d3ee'
                                    }}
                                />
                            )}

                            {/* Tint Overlay as scan happens */}
                            <div
                                className="absolute inset-0 bg-cyan-500/5 transition-opacity duration-500"
                                style={{ opacity: frame > scanStart ? 1 : 0 }}
                            />
                        </div>
                    </div>

                    {/* Corner Markers (Minimal) */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/50" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-400/50" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-400/50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-400/50" />
                </div>

                {/* 2. THE TEXT (Clean & Centered) */}
                <div
                    className="text-center mb-16"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: spring({ frame, fps }),
                        transform: `translateY(${interpolate(spring({ frame, fps }), [0, 1], [10, 0])}px)`
                    }}
                >
                    <h1 className="text-7xl font-black text-white leading-tight tracking-tight">
                        كيفية الحصول على المعلومات <br />
                        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">من هذه الصورة؟</span>
                    </h1>
                </div>

                {/* 3. THE INFO GRID (Clean Icons) */}
                <div className="flex gap-12">
                    <CleanInfoItem icon={<MapPin size={24} />} value="Tokyo, JP" delay={infoStart} />
                    <CleanInfoItem icon={<Calendar size={24} />} value="15 MAR 2024" delay={infoStart + 10} />
                    <CleanInfoItem icon={<Camera size={24} />} value="iPhone 15 PM" delay={infoStart + 20} />
                    <CleanInfoItem icon={<Maximize size={24} />} value="48.0 MP" delay={infoStart + 30} />
                </div>
            </div>

            {/* Subtle System HUD elements */}
            <div className="absolute top-10 left-10 opacity-30 flex items-center gap-4">
                <ShieldCheck className="text-cyan-500" size={20} />
                <span className="text-[10px] font-mono text-white tracking-[0.5em] font-black uppercase">Secure_Analysis</span>
            </div>

            <div className="absolute bottom-10 right-10 opacity-30 flex items-center gap-4">
                <span className="text-[10px] font-mono text-white tracking-[0.5em] font-black uppercase">System_Live</span>
                <Activity className="text-cyan-500" size={20} />
            </div>

            {/* Background Grain/Noise for premium feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </AbsoluteFill>
    );
};
