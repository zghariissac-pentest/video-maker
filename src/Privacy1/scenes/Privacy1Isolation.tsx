import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { GhostNetwork, OnionTransition } from '../components/PrivacyTheme';

export const Privacy1Isolation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 60 }
    });

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                style={{
                    transform: `scale(${interpolate(entrance, [0, 1], [0.98, 1])})`,
                    opacity: entrance
                }}
                className="flex flex-col items-center gap-20"
            >
                <div className="relative">
                    <div className="absolute -inset-10 bg-green-500/5 blur-3xl rounded-full" />

                    <div className="relative bg-green-500/5 border-2 border-green-500/30 px-16 py-8 rounded-[3rem] shadow-[0_0_100px_rgba(34,197,94,0.1)]">
                        <span className="text-green-500 text-6xl font-black font-mono tracking-[0.25em] uppercase italic">
                            Isolated Session
                        </span>
                    </div>
                </div>

                <div
                    className="text-center max-w-[1200px]"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                    <OnionTransition startFrame={25} duration={25}>
                        <p className="text-[56px] text-white font-black leading-tight tracking-tight">
                            لا يوجد ما يربطها بأي جلسة سابقة أو هوية حقيقية.
                        </p>
                    </OnionTransition>
                </div>
            </div>

            <div className="absolute bottom-24 flex gap-4 opacity-20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Verification: 100%</span>
            </div>
        </AbsoluteFill>
    );
};
