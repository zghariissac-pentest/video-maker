import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { MetadataSpace } from '../components/MetadataSpace';
import { ShieldAlert, Lock, Fingerprint } from 'lucide-react';

export const MetadataOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
    const lockSpr = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 80 } });

    return (
        <AbsoluteFill className="bg-[#050508] justify-center items-center overflow-hidden">
            <MetadataSpace />

            <div className="z-10 flex flex-col items-center gap-16">

                {/* FINAL LOCK ICON */}
                <div className="relative">
                    <div
                        className="p-10 rounded-full border-2 border-cyan-500/40 bg-cyan-500/5 relative"
                        style={{ transform: `scale(${spr})` }}
                    >
                        <ShieldAlert size={100} className="text-cyan-400" />

                        {/* Animated Ring */}
                        <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-20" />
                    </div>

                    <div
                        className="absolute -bottom-4 -right-4 p-4 bg-red-500 rounded-2xl shadow-2xl"
                        style={{ transform: `scale(${lockSpr}) rotate(-10deg)` }}
                    >
                        <Lock size={32} className="text-white" />
                    </div>
                </div>

                {/* FINAL NARRATIVE */}
                <div
                    className="text-center px-10"
                    dir="rtl"
                    style={{
                        fontFamily: 'Cairo, sans-serif',
                        opacity: interpolate(frame, [0, 20], [0, 1])
                    }}
                >
                    <h2 className="text-7xl font-black text-white leading-tight mb-4">
                        انتبه لما <span className="text-red-500">تشاركه</span>...
                    </h2>
                    <p className="text-4xl font-bold text-white/60">
                        فالصورة تخفي أكثر مما تراه عيناك.
                    </p>
                </div>

                {/* PROTOCOL SIGN-OFF */}
                <div
                    className="mt-12 flex items-center gap-4 opacity-40"
                    style={{ opacity: interpolate(frame, [80, 100], [0, 0.4]) }}
                >
                    <Fingerprint size={24} className="text-cyan-500" />
                    <span className="text-xl font-mono text-white font-black tracking-[0.6em] uppercase">Protocol // Privacy_Audit_Complete</span>
                </div>
            </div>

            {/* Scanning Lines (Final Fade out) */}
            <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black"
                style={{ opacity: interpolate(frame, [120, 150], [0, 1]) }}
            />
        </AbsoluteFill>
    );
};
