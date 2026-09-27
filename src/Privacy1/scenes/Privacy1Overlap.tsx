import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { GhostNetwork, OnionTransition } from '../components/PrivacyTheme';
import { Database, Globe, Clock, Fingerprint, Laptop } from 'lucide-react';

const DataPoint: React.FC<{ icon: React.ElementType, label: string, index: number, total: number, highlighted: boolean }> = ({ icon: Icon, label, index, total, highlighted }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const phaseStart = 80;

    // Smooth entrance
    const entrance = spring({
        frame: frame - (20 + index * 4),
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    // Elegant State Shift
    const shift = interpolate(frame, [phaseStart, phaseStart + 40], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' });

    const opacity = highlighted ? 1 : interpolate(shift, [0, 1], [1, 0.1]);
    const scale = highlighted ? interpolate(shift, [0, 1], [1, 1.1]) : 1;
    const yShift = highlighted ? interpolate(shift, [0, 1], [0, -40]) : 0;

    return (
        <div
            className="flex flex-col items-center gap-12"
            style={{
                opacity: entrance * opacity,
                transform: `scale(${entrance * scale}) translateY(${yShift}px)`,
            }}
        >
            {/* The Icon Node - Minimal & Sharp */}
            <div className={`relative w-24 h-24 rounded-[2rem] flex items-center justify-center border transition-colors duration-500 ${highlighted && frame > phaseStart ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                <Icon size={40} className={`transition-colors duration-500 ${highlighted && frame > phaseStart ? 'text-red-500' : 'text-white/20'}`} />

                {/* Tiny catchy dot below the icon */}
                <div className={`absolute -bottom-2 w-1.5 h-1.5 rounded-full ${highlighted && frame > phaseStart ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-white/10'}`} />
            </div>

            {/* Label - Monospace Minimal */}
            <div className="flex flex-col items-center">
                <span className={`text-[10px] font-mono font-black tracking-[0.4em] uppercase text-center transition-colors duration-500 ${highlighted && frame > phaseStart ? 'text-red-500' : 'text-white/10'}`}>
                    {label}
                </span>
                {highlighted && frame > phaseStart && (
                    <div className="h-0.5 bg-red-500 mt-2" style={{ width: interpolate(frame, [phaseStart, phaseStart + 20], [0, 60], { extrapolateRight: 'clamp' }) }} />
                )}
            </div>
        </div>
    );
};

export const Privacy1Overlap: React.FC = () => {
    const frame = useCurrentFrame();

    const mastery = interpolate(frame, [0, 40], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' });

    const signals = [
        { icon: Globe, label: 'Metadata', highlighted: false },
        { icon: Clock, label: 'Timing', highlighted: false },
        { icon: Database, label: 'Shared Token', highlighted: true },
        { icon: Fingerprint, label: 'Behavior', highlighted: false },
        { icon: Laptop, label: 'Distro', highlighted: false },
    ];

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                className="w-full h-full flex flex-col items-center justify-center gap-40 relative z-10"
                style={{ opacity: mastery, transform: `scale(${interpolate(mastery, [0, 1], [0.98, 1])})` }}
            >
                {/* Horizontal Spectrum View - Clean & Advanced */}
                <div className="flex gap-16 items-center justify-center px-20">
                    {signals.map((s, i) => (
                        <DataPoint key={i} {...s} index={i} total={signals.length} />
                    ))}
                </div>

                {/* Narrative Text - Perfectly Spaced */}
                <div
                    className="text-center space-y-12 max-w-[1400px]"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                    <OnionTransition startFrame={25} duration={25}>
                        <p className="text-[52px] text-white/80 font-bold leading-relaxed tracking-tight">
                            {"الأنظمة الحديثة لا تحتاج كل البيانات.\nنقطة overlap واحدة كافية."}
                        </p>
                    </OnionTransition>

                    <OnionTransition startFrame={110} duration={25}>
                        <div className="relative pt-6 inline-block">
                            <div className="absolute -inset-10 bg-red-600/5 blur-3xl rounded-full opacity-50" />
                            <h2 className="text-[58px] text-red-500 font-black leading-tight tracking-tighter relative">
                                {"Token مشترك، نمط متشابه، أو توقيت متقارب…\nكلها إشارات يمكن ربطها."}
                            </h2>
                        </div>
                    </OnionTransition>
                </div>
            </div>

            {/* Subtle Ticker */}
            <div className="absolute bottom-16 right-16 flex items-center gap-4 opacity-10">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
                <span className="text-white font-mono text-[9px] tracking-[0.8em] uppercase font-bold">Correlation_Analysis</span>
            </div>

        </AbsoluteFill>
    );
};
