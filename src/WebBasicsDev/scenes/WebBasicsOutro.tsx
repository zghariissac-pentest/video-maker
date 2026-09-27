import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });

    const exit = spring({
        frame: frame - 160, fps, config: { damping: 12 }
    });

    const scale = interpolate(entry, [0, 1], [0.9, 1]);
    const floatY = Math.sin(frame / 30) * 10;

    // -- TEXT DATA --
    const line1 = "إذا كنت تبدأ… ابدأ من هنا.";
    const line2 = "هذه ليست كل الحماية… لكنها الأساس.";
    const line3 = "وبدونها… موقعك مجرد بداية سهلة لأي مهاجم.";

    const words1 = line1.split(" ");
    const words2 = line2.split(" ");
    const words3 = line3.split(" ");

    return (
        <AbsoluteFill style={{
            background: '#010103',
            overflow: 'hidden',
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #0a0a20 0%, #010103 100%)' }} />

            {/* DARKER OVERLAY ON EXIT */}
            <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: exit, zIndex: 100 }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 50,
                opacity: interpolate(entry, [0, 1], [0, 1]),
                transform: `scale(${scale}) translateY(${floatY}px)`,
            }}>

                {/* FINAL PROTECTIVE SHIELD (Looping from Intro) */}
                <div style={{
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: 'rgba(255, 215, 0, 0.03)',
                    border: '2px solid #FFD700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 60px rgba(255, 215, 0, 0.2)',
                    position: 'relative',
                }}>
                    <svg viewBox="0 0 24 24" width="120" height="120" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))' }}>
                        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
                    </svg>
                    <div style={{ position: 'absolute', inset: -20, border: '1px solid rgba(255, 215, 0, 0.1)', borderRadius: '50%', animation: 'spin 15s linear infinite' }} />
                </div>

                {/* FINAL ARABIC MESSAGE */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1100 }}>

                    {/* Line 1: Starting... Start here */}
                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (20 + i * 4), fps, config: { damping: 15 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 60, fontWeight: 700, color: '#FFF',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [25, 0])}px)`,
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>

                    {/* Line 2: Not all protection... but foundation */}
                    <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center', gap: 15 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (50 + i * 4), fps, config: { damping: 15 } });
                            const isKey = w === "الحماية…" || w === "الأساس.";
                            return (
                                <span key={i} style={{
                                    fontSize: isKey ? 75 : 55, fontWeight: 800, color: isKey ? '#4db8ff' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [25, 0])}px)`,
                                    textShadow: isKey ? '0 0 30px rgba(74, 184, 255, 0.3)' : 'none',
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [12, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>

                    {/* Line 3: Final warning (Start here impact) */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 20 }}>
                        {words3.map((w, i) => {
                            const wordS = spring({ frame: frame - (90 + i * 5), fps, config: { stiffness: 120, damping: 12 } });
                            const isDanger = w === "مهاجم." || w === "سهلة" || w === "بداية";
                            const isRed = w === "مهاجم.";

                            return (
                                <span key={i} style={{
                                    fontSize: isRed ? 100 : 70, fontWeight: 900,
                                    color: isRed ? '#ff3b30' : isDanger ? '#FFD700' : 'white',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [40, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isRed ? '0 0 60px rgba(255, 59, 48, 0.5)' : 'none',
                                    filter: `blur(${interpolate(wordS, [0, 1], [20, 0])}px)`,
                                    display: 'inline-block'
                                }}>{w}</span>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ENDING GLOW / BOTTOM ACCENT */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                width: 600 * entry,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                opacity: 0.4,
            }} />
        </AbsoluteFill>
    );
};
