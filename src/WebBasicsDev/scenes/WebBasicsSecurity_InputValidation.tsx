import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsSecurity_InputValidation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });

    const filterPhase = spring({
        frame: frame - 50, fps, config: { damping: 12 }
    });

    // -- TEXT DATA --
    const title = "2. التحقق من المدخلات";
    const line1 = "أي مدخلات من المستخدم يجب التحقق منها،";
    const line2 = "لأن الهجمات غالبًا تبدأ من بيانات بسيطة.";

    const words1 = line1.split(" ");
    const words2 = line2.split(" ");

    return (
        <AbsoluteFill style={{
            background: '#010103',
            overflow: 'hidden',
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a0a20 0%, #010103 100%)' }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 60,
                opacity: interpolate(entry, [0, 1], [0, 1]),
            }}>

                {/* 🔒 INPUT VALIDATION ANIMATION */}
                <div style={{
                    width: 600,
                    height: 300,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 36,
                    border: '1px solid rgba(168, 85, 247, 0.1)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 40,
                    gap: 30,
                    position: 'relative',
                }}>
                    {/* Input Field Visualization */}
                    <div style={{
                        height: 60,
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 16,
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 20px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Malicious Payload Typing */}
                        <div style={{
                            fontSize: 22,
                            fontFamily: 'monospace',
                            color: interpolate(filterPhase, [0.5, 1], [1, 0]) > 0 ? '#ff4d4d' : '#888',
                            opacity: interpolate(frame, [10, 40], [0, 1])
                        }}>
                            {frame < 30 ? '<sc' : frame < 40 ? '<script>' : '<script>alert(1)</script>'}
                            {frame % 20 < 10 && '|'}
                        </div>

                        {/* Validation Barrier */}
                        <div style={{
                            position: 'absolute',
                            right: interpolate(filterPhase, [0, 1], [-100, 400]),
                            height: '100%',
                            width: 10,
                            background: '#a855f7',
                            boxShadow: '0 0 30px #a855f7',
                            zIndex: 10,
                            opacity: filterPhase,
                        }} />
                    </div>

                    {/* Result Status */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
                        <div style={{
                            padding: '10px 25px',
                            borderRadius: 12,
                            border: '1px solid #ff4d4d',
                            color: '#ff4d4d',
                            fontSize: 18,
                            fontWeight: 700,
                            opacity: frame > 20 && frame < 80 ? 1 : 0.2,
                            transform: `scale(${frame > 20 && frame < 80 ? 1.1 : 1})`,
                            transition: 'all 0.3s'
                        }}>DATA ENTRY</div>

                        <div style={{
                            padding: '10px 25px',
                            borderRadius: 12,
                            border: `1px solid ${filterPhase > 0.8 ? '#34c759' : '#555'}`,
                            color: filterPhase > 0.8 ? '#34c759' : '#555',
                            fontSize: 18,
                            fontWeight: 700,
                            opacity: filterPhase > 0.8 ? 1 : 0.2,
                            transform: `scale(${filterPhase > 0.8 ? 1.1 : 1})`,
                        }}>SANITIZED</div>
                    </div>

                    {/* Shield Icon appearing after sanitization */}
                    <div style={{
                        position: 'absolute',
                        right: 40,
                        bottom: 30,
                        opacity: filterPhase,
                        transform: `scale(${filterPhase}) rotate(${interpolate(filterPhase, [0, 1], [-45, 0])}deg)`,
                    }}>
                        <svg viewBox="0 0 24 24" width="60" height="60" fill="#a855f7">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z" />
                        </svg>
                    </div>
                </div>

                {/* ARABIC TEXT REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1000 }}>
                    {/* Title */}
                    <h2 style={{
                        fontSize: 80,
                        fontWeight: 900,
                        color: '#a855f7',
                        margin: '0 0 40px 0',
                        opacity: spring({ frame: frame - 10, fps }),
                        transform: `scale(${spring({ frame: frame - 10, fps })})`,
                        textShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
                    }}>
                        {title}
                    </h2>

                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (40 + i * 4), fps, config: { damping: 15 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 55, fontWeight: 700, color: 'white',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px)`,
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (80 + i * 4), fps, config: { damping: 15 } });
                            const isDanger = w === "الهجمات" || w === "بسيطة.";
                            return (
                                <span key={i} style={{
                                    fontSize: standsAt(w) ? 70 : 60, fontWeight: 900,
                                    color: isDanger ? '#ff4d4d' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px)`,
                                    textShadow: isDanger ? '0 0 30px rgba(255, 77, 77, 0.3)' : 'none',
                                    filter: `blur(${interpolate(wordS, [0, 1], [15, 0])}px)`,
                                    display: 'inline-block'
                                }}>{w}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const standsAt = (word: string) => ["الهجمات", "بيانات", "بسيطة."].includes(word);
