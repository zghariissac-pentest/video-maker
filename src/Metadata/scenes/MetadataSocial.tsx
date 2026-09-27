import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Facebook, Instagram, Twitter, MessageCircle, AlertTriangle, ShieldCheck, X } from 'lucide-react';

const PlatformCard: React.FC<{ icon: React.ReactNode, color: string, delay: number, isScrubbed: boolean }> = ({ icon, color, delay, isScrubbed }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
    const scrub = spring({ frame: frame - (delay + 60), fps, config: { damping: 15, stiffness: 60 } });

    return (
        <div
            className="flex flex-col items-center gap-6"
            style={{ opacity: entrance, transform: `scale(${entrance})` }}
        >
            <div
                className="w-32 h-32 rounded-[2.5rem] border-2 flex items-center justify-center relative overflow-hidden"
                style={{
                    backgroundColor: `${color}11`,
                    borderColor: isScrubbed ? `${color}44` : `${color}88`,
                    boxShadow: !isScrubbed ? `0 0 40px ${color}22` : 'none'
                }}
            >
                <div style={{ color }}>{icon}</div>

                {/* Scrubbing Overlay */}
                {isScrubbed && (
                    <div
                        className="absolute inset-0 bg-red-500/40 flex items-center justify-center backdrop-blur-[2px]"
                        style={{ opacity: scrub }}
                    >
                        <X size={60} className="text-white" />
                    </div>
                )}
            </div>
            {isScrubbed && (
                <div
                    className="bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30"
                    style={{ opacity: scrub }}
                >
                    <span className="text-[10px] font-mono text-red-500 font-black uppercase tracking-widest">Metadata_Cleared</span>
                </div>
            )}
        </div>
    );
};

export const MetadataSocial: React.FC = () => {
    const frame = useCurrentFrame();

    const startPlatforms = 40;
    const startScrub = 100;
    const startTruth = 220;

    const narrativeOpacity = interpolate(frame, [0, 20, 200, 220], [0, 1, 1, 0], { extrapolateLeft: 'clamp' });
    const truthOpacity = interpolate(frame, [startTruth, startTruth + 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#050508] justify-center items-center font-sans overflow-hidden">
            <MetadataSpace />

            {/* MAIN CONTENT CONTAINER */}
            <div className="flex flex-col items-center gap-24 z-10 w-full max-w-6xl">

                {/* 1. NARRATIVE TEXT (Phase 1) */}
                {frame < startTruth && (
                    <div
                        className="text-center px-10"
                        dir="rtl"
                        style={{ fontFamily: 'Cairo, sans-serif', opacity: narrativeOpacity }}
                    >
                        <h2 className="text-7xl font-black text-white leading-tight">
                            لكن معظم المنصات <br />
                            تقوم <span className="text-red-500">بحذف البيانات</span> تلقائيًا...
                        </h2>
                    </div>
                )}

                {/* 2. PLATFORM GRID */}
                <div className="flex gap-16 items-start">
                    <PlatformCard icon={<Facebook size={50} />} color="#1877F2" delay={startPlatforms} isScrubbed={frame > startScrub} />
                    <PlatformCard icon={<Instagram size={50} />} color="#E4405F" delay={startPlatforms + 10} isScrubbed={frame > startScrub + 10} />
                    <PlatformCard icon={<Twitter size={50} />} color="#1DA1F2" delay={startPlatforms + 20} isScrubbed={frame > startScrub + 20} />
                    <PlatformCard icon={<MessageCircle size={50} />} color="#25D366" delay={startPlatforms + 30} isScrubbed={frame > startScrub + 30} />
                </div>

                {/* 3. TRUTH REVEAL (Phase 2) */}
                {frame >= startTruth && (
                    <div
                        className="text-center px-10 flex flex-col items-center gap-8"
                        dir="rtl"
                        style={{ fontFamily: 'Cairo, sans-serif', opacity: truthOpacity }}
                    >
                        <div className="p-6 bg-yellow-500/10 border-2 border-yellow-500 rounded-full animate-bounce">
                            <AlertTriangle size={60} className="text-yellow-500" />
                        </div>
                        <h2 className="text-8xl font-black text-white leading-tight">
                            لكن هذا لا يعني أن <br />
                            المعلومات <span className="text-yellow-500 italic underline decoration-8">اختفت!</span>
                        </h2>
                        <p className="text-2xl text-white/40 font-mono tracking-[0.3em] font-black uppercase">Deep_Data_Retention // Active</p>
                    </div>
                )}
            </div>

            {/* Corner System Info */}
            <div className="absolute top-10 left-10 opacity-30 flex items-center gap-4">
                <ShieldCheck className="text-cyan-500" size={20} />
                <span className="text-[10px] font-mono text-white tracking-[0.5em] font-black uppercase">Security_Protocol_Active</span>
            </div>
        </AbsoluteFill>
    );
};
