import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { GhostNetwork, OnionTransition } from '../components/PrivacyTheme';
import { Info, Zap } from 'lucide-react';

const TimelineSession: React.FC<{
    index: number,
    total: number,
    isLinked: boolean,
    linkProgress: number
}> = ({ index, total, isLinked, linkProgress }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - (20 + index * 4),
        fps,
        config: { damping: 14, stiffness: 60 }
    });

    const timelineWidth = 1000;
    const x = (index / (total - 1)) * timelineWidth - timelineWidth / 2;

    return (
        <div
            className="absolute flex flex-col items-center"
            style={{
                left: '50%', top: '50%',
                transform: `translate(-50%, -50%) translateX(${x}px) scale(${entrance})`,
                opacity: entrance
            }}
        >
            {/* Session Block */}
            <div
                className={`w-32 h-16 rounded-[1.2rem] border-2 transition-colors duration-700 ${isLinked ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 bg-white/[0.02]'}`}
            >
                <div className="w-full h-1 bg-white/5 mt-4" />
                {isLinked && (
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-[1.2rem]" />
                )}
            </div>

            {/* Connection Line to Center Hub */}
            {isLinked && (
                <div
                    className="absolute bottom-16 w-[2px] bg-red-500/40 origin-bottom"
                    style={{
                        height: 200 * linkProgress,
                        transform: `rotate(${interpolate(x, [-500, 500], [20, -20])}deg)`,
                        opacity: linkProgress
                    }}
                />
            )}

            <span className="text-white/10 font-mono text-[9px] mt-6 tracking-widest uppercase font-bold">
                frag_0x{index}
            </span>
        </div>
    );
};

export const Privacy1RealInsight: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── TIMING ───────────────────────────────────────────
    const leakStart = 100;
    const connectStart = 140;

    // ─── ANIMATION VALUES ─────────────────────────────────
    const masterEntrance = spring({ frame, fps, config: { damping: 16 } });

    // The "Red Dot" / Leak Point
    const flashLeak = spring({ frame: frame - leakStart, fps, config: { damping: 12 } });

    // Full connection progress
    const connection = interpolate(frame, [connectStart, connectStart + 40], [0, 1], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp'
    });

    const sessionCount = 5;

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                className="w-full h-full flex flex-col items-center justify-center relative"
                style={{ opacity: masterEntrance, transform: `scale(${interpolate(masterEntrance, [0, 1], [0.98, 1])})` }}
            >
                {/* 1. THE RED LEAK POINT (PHASE 2) */}
                <div
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
                    style={{
                        transform: `translate(-50%, -100%) scale(${flashLeak})`,
                        opacity: flashLeak
                    }}
                >
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)]">
                        <Zap size={32} className="text-red-500" />
                    </div>
                    <span className="text-red-500 font-mono text-[10px] uppercase font-black tracking-[0.4em]">Primary_Identifier</span>
                </div>

                {/* 2. THE DISCONNECTED TIMELINE (PHASE 1) */}
                <div className="relative w-full h-40 mt-32">
                    {/* Horizontal Axis Base */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1200px] h-0.5 bg-white/[0.03] -translate-y-1/2" />

                    {/* Segments */}
                    {Array.from({ length: sessionCount }).map((_, i) => (
                        <TimelineSession
                            key={i}
                            index={i}
                            total={sessionCount}
                            isLinked={frame > connectStart}
                            linkProgress={connection}
                        />
                    ))}

                    {/* Integrated Connection Line */}
                    {frame > connectStart && (
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 h-1 bg-red-500/40 -translate-y-1/2 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                            style={{
                                width: interpolate(connection, [0, 1], [0, 1100]),
                                opacity: connection
                            }}
                        />
                    )}
                </div>

                {/* Arabic Narrative Text */}
                <div
                    className="absolute bottom-40 text-center space-y-12 z-40"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                    <OnionTransition startFrame={20} duration={25}>
                        <p className="text-[50px] text-white/90 font-bold leading-relaxed tracking-tight">
                            في الواقع، لا يتم تعقّبك خطوة بخطوة.<br />
                            <span className="text-white/30 italic">لا أحد يراقب كل حركة تقوم بها.</span>
                        </p>
                    </OnionTransition>

                    <OnionTransition startFrame={130} duration={25}>
                        <h2 className="text-[56px] text-red-500 font-black leading-tight tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
                            لكن يتم ربط الجلسات…<br />
                            عندما تظهر إشارة واحدة حقيقية.
                        </h2>
                    </OnionTransition>
                </div>

            </div>

            {/* Subtle HUD Branding */}
            <div className="absolute top-16 left-16 flex items-center gap-4 opacity-10">
                <Info size={14} className="text-white" />
                <span className="text-white font-mono text-[9px] tracking-[0.8em] uppercase font-black">Analytical_Insight</span>
            </div>

        </AbsoluteFill>
    );
};
