import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { Fingerprint, Cpu } from 'lucide-react';

export const MetadataFingerprint: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const startDeepDive = 60;
    const startPattern = 180;

    const zoomProgress = spring({
        frame: frame - startDeepDive,
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    const patternOpacity = interpolate(frame, [startPattern, startPattern + 30], [0, 0.6]);

    return (
        <AbsoluteFill className="bg-[#050508] justify-center items-center overflow-hidden">
            <MetadataSpace />

            {/* MAIN CONTENT */}
            <div className="z-10 flex flex-col items-center gap-16 w-full">

                {/* 1. NARRATIVE TEXT: PHASE 1 */}
                <div
                    className="text-center px-10"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [0, 20, startDeepDive - 10, startDeepDive], [0, 1, 1, 0])
                    }}
                >
                    <h2 className="text-7xl font-black text-white italic tracking-tighter">
                        وهناك مستوى <span className="text-cyan-400 underlines decoration-4">أعمق</span> من ذلك...
                    </h2>
                </div>

                {/* 2. PIXEL ZOOM STAGE */}
                <div className="relative group">
                    <div
                        className="relative p-2 bg-white/5 border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden"
                        style={{
                            transform: `scale(${interpolate(zoomProgress, [0, 1], [1, 0.9])})`,
                            boxShadow: `0 0 100px rgba(34,211,238,${interpolate(zoomProgress, [0, 1], [0, 0.2])})`
                        }}
                    >
                        <div className="relative w-[700px] h-[500px] overflow-hidden rounded-[3.5rem]">
                            <Img
                                src={staticFile('jpg')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: `scale(${interpolate(zoomProgress, [0, 1], [1, 20])}) translate(${interpolate(zoomProgress, [0, 1], [0, -10])}%, ${interpolate(zoomProgress, [0, 1], [0, -15])}%)`
                                }}
                            />

                            {/* Pixel Grid Overlay (Calculated feel) */}
                            {frame > startDeepDive && (
                                <div
                                    className="absolute inset-0 z-20 pointer-events-none opacity-20"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.4) 1px, transparent 1px)',
                                        backgroundSize: '20px 20px',
                                        opacity: interpolate(zoomProgress, [0, 1], [0, 0.4])
                                    }}
                                />
                            )}

                            {/* NOISE PATTERN (The Fingerprint) */}
                            {frame > startPattern && (
                                <div
                                    className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                                    style={{
                                        opacity: patternOpacity,
                                        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")`,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* HUD Scanlines */}
                    <div
                        className="absolute inset-0 border-2 border-cyan-400 rounded-[4rem] z-40 pointer-events-none"
                        style={{ opacity: interpolate(frame, [startDeepDive, startDeepDive + 20], [0, 0.2]) }}
                    />
                </div>

                {/* 3. NARRATIVE TEXT: PHASE 2 */}
                <div
                    className="text-center px-10 max-w-5xl"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [startDeepDive, startDeepDive + 20], [0, 1])
                    }}
                >
                    <h2 className="text-5xl font-black text-white leading-tight">
                        {frame < startPattern ? (
                            <>
                                كل كاميرا تترك <span className="text-cyan-400">بصمة خفيفة</span> داخل الصورة، <br />
                                تُعرف بنمط <span className="text-white border-b-4 border-cyan-500">حساس الكاميرا (PRNU).</span>
                            </>
                        ) : (
                            <>
                                هذه البصمة لا تُرى بسهولة، <br />
                                لكنها موجودة <span className="text-yellow-500 italic">داخل البكسلات</span> نفسها.
                            </>
                        )}
                    </h2>
                </div>
            </div>

            {/* Fingerprint Side HUD */}
            {frame > startPattern && (
                <div
                    className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6"
                    style={{ opacity: interpolate(frame, [startPattern, startPattern + 15], [0, 1]) }}
                >
                    <div className="p-6 bg-cyan-400/10 border-2 border-cyan-400 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-pulse">
                        <Fingerprint size={60} className="text-cyan-400" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase">Sensor_Unique_ID</span>
                        <div className="text-white font-mono text-xl font-bold tracking-widest">#S-7729-AZ</div>
                    </div>
                </div>
            )}

            {/* Decorative Corner Stats */}
            <div className="absolute right-10 bottom-10 flex items-center gap-4 opacity-20">
                <Cpu size={24} className="text-white" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-white tracking-widest uppercase">Pixel_Noise_Analysis</span>
                    <div className="w-24 h-0.5 bg-white/20 mt-1"><div className="w-4/5 h-full bg-white" /></div>
                </div>
            </div>

        </AbsoluteFill>
    );
};
