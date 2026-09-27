import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random, Easing } from 'remotion';
import { GhostNetwork, OnionTransition } from '../components/PrivacyTheme';
import { ShieldAlert } from 'lucide-react';
import { Google, Facebook, Instagram, WhatsApp } from 'developer-icons';

const ConnectionNode: React.FC<{
    icon: React.ElementType,
    label: string,
    color: string,
    index: number,
    total: number
}> = ({ icon: Icon, label, color, index, total }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const startTime = 15 + index * 3;
    const pullStart = 50;

    // Entrance: Elegant fade and scale
    const entrance = spring({
        frame: frame - startTime,
        fps,
        config: { damping: 15, stiffness: 60 }
    });

    // Smooth Pull: Using custom easing for professional flow
    const pullProgress = interpolate(frame, [pullStart, pullStart + 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1)
    });

    const radius = interpolate(pullProgress, [0, 1], [420, 160]);
    const angleBase = (index * (360 / total) - 90) * (Math.PI / 180);

    const x = Math.cos(angleBase) * radius;
    const y = Math.sin(angleBase) * radius;

    // Subtle floating animation while waiting to pull
    const float = Math.sin(frame / 20 + index) * (1 - pullProgress) * 10;

    return (
        <div
            className="absolute flex flex-col items-center gap-6"
            style={{
                left: '50%', top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y + float}px) scale(${entrance})`,
                opacity: entrance
            }}
        >
            {/* Clean Brand Card */}
            <div
                className="w-32 h-32 rounded-[2.5rem] bg-white flex items-center justify-center relative shadow-2xl"
                style={{
                    boxShadow: `0 15px 45px ${color}33`,
                    border: `1px solid ${color}22`
                }}
            >
                <div style={{ transform: `scale(${interpolate(pullProgress, [0.8, 1], [1, 0.9])})` }}>
                    <Icon size={72} />
                </div>
                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-transparent rounded-[2.5rem]" />
            </div>

            {/* Clean Monospace Label */}
            <div
                className="bg-black/60 px-5 py-2 rounded-full border border-white/5 backdrop-blur-xl"
                style={{ opacity: 1 - pullProgress * 0.8 }}
            >
                <span className="text-white/60 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                    {label}
                </span>
            </div>

            {/* Minimalist Connection Line */}
            <svg className="absolute top-16 left-16 overflow-visible pointer-events-none">
                <line
                    x1={0} y1={0}
                    x2={-x} y2={-y}
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="10 20"
                    opacity={interpolate(pullProgress, [0.2, 0.6], [0, 0.3])}
                />
            </svg>
        </div>
    );
};

export const Privacy1Request: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const masterEntrance = spring({ frame, fps, config: { damping: 14 } });
    const masterPull = interpolate(frame, [50, 90], [0, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' });

    // Minimalist Glitch at the end
    const isGlitching = frame > 112 && frame < 120;
    const shake = isGlitching ? (random(frame) - 0.5) * 10 : 0;

    const nodes = [
        { icon: Google, label: 'Search', color: '#4285F4' },
        { icon: Facebook, label: 'Social', color: '#1877F2' },
        { icon: Instagram, label: 'Photos', color: '#E4405F' },
        { icon: WhatsApp, label: 'Chat', color: '#25D366' },
    ];

    return (
        <AbsoluteFill className="bg-[#050505] justify-center items-center font-sans overflow-hidden">
            <GhostNetwork />

            <div
                className="w-full h-full flex flex-col items-center justify-center relative"
                style={{
                    transform: `scale(${interpolate(masterEntrance, [0, 1], [0.95, 1])}) translate(${shake}px, ${shake}px)`,
                    opacity: masterEntrance
                }}
            >
                {/* Clean Central Hub */}
                <div className="relative z-20 mb-32">
                    <div className="w-48 h-48 rounded-full bg-red-600/5 border border-red-500/20 flex items-center justify-center relative">
                        <ShieldAlert size={80} className="text-red-500/80" />

                        {/* Smooth Orbiting Pulse */}
                        <div
                            className="absolute -inset-4 border border-red-500/20 rounded-full animate-pulse"
                            style={{ transform: `scale(${interpolate(masterPull, [0, 1], [1, 1.2])})` }}
                        />
                        <div className="absolute -inset-12 border border-white/5 rounded-full opacity-50" />
                    </div>

                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-64">
                        <span className="text-red-500/40 font-mono text-[9px] font-black tracking-[0.8em] uppercase">
                            Identification
                        </span>
                    </div>
                </div>

                {/* Nodes Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {nodes.map((node, i) => (
                        <ConnectionNode
                            key={i}
                            {...node}
                            index={i}
                            total={nodes.length}
                        />
                    ))}
                </div>

                {/* Arabic Text: Clean & Impactful */}
                <div
                    className="absolute bottom-56 text-center space-y-12 z-30"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                    <OnionTransition startFrame={20} duration={40}>
                        <h1 className="text-8x font-black text-white leading-tight tracking-tight">
                            ثم… طلب واحد فقط…
                        </h1>
                    </OnionTransition>

                    <OnionTransition startFrame={65} duration={40}>
                        <p className="text-7xl text-red-500 font-black tracking-tighter">
                            ربط كل شيء.
                        </p>
                    </OnionTransition>
                </div>
            </div>

            {/* Clean Breach Alert */}
            {isGlitching && (
                <AbsoluteFill className="bg-red-600/10 z-50 flex items-center justify-center backdrop-blur-md">
                    <div className="flex flex-col items-center gap-6">
                        <ShieldAlert size={100} className="text-red-500" />
                        <span className="text-red-500 text-6xl font-black font-mono tracking-tighter uppercase">BREACH_DETECTED</span>
                    </div>
                </AbsoluteFill>
            )}

            {/* Hard Cut */}
            {frame >= 120 && <AbsoluteFill className="bg-black z-[200]" />}

        </AbsoluteFill>
    );
};
