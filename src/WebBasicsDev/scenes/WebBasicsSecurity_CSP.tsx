import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsSecurity_CSP: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });

    // CSP logic viz
    const allowPhase = spring({
        frame: frame - 30, fps, config: { damping: 12 }
    });
    const blockPhase = spring({
        frame: frame - 60, fps, config: { damping: 12 }
    });

    // -- TEXT DATA --
    const title = "3. Content Security Policy";
    const line1 = "هذه السياسة تحدد ما يمكن تحميله داخل الصفحة،";
    const line2 = "وتقلل من خطر تنفيذ أكواد خبيثة.";

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

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #0a200a 0%, #010103 100%)' }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 50,
                opacity: interpolate(entry, [0, 1], [0, 1]),
            }}>

                {/* 🛡️ CSP VISUALIZATION (Whitelist vs Blocklist) */}
                <div style={{
                    width: 650,
                    height: 380,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: 40,
                    border: '1px solid rgba(52, 199, 89, 0.15)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 30,
                    gap: 20,
                }}>
                    <div style={{ height: 40, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34c759' }} />
                        <div style={{ fontSize: 14, color: '#34c759', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>CSP ACTIVE</div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: 20, alignItems: 'center' }}>
                        {/* Allowed Source */}
                        <div style={{
                            flex: 1,
                            height: '80%',
                            background: 'rgba(52, 199, 89, 0.05)',
                            borderRadius: 20,
                            border: '1px solid rgba(52, 199, 89, 0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: allowPhase,
                            transform: `scale(${allowPhase})`,
                        }}>
                            <div style={{ color: '#34c759', fontSize: 16, fontWeight: 700, marginBottom: 15 }}>TRUSTED.COM</div>
                            <svg viewBox="0 0 24 24" width="60" height="60" fill="#34c759" style={{ filter: 'drop-shadow(0 0 15px rgba(52, 199, 89, 0.4))' }}>
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(52, 199, 89, 0.6)' }}>ALLOWED (200 OK)</div>
                        </div>

                        {/* VS Center Guard */}
                        <div style={{ fontSize: 40, fontWeight: 900, color: 'rgba(255,255,255,0.1)' }}>VS</div>

                        {/* Blocked Source */}
                        <div style={{
                            flex: 1,
                            height: '80%',
                            background: 'rgba(255, 59, 48, 0.05)',
                            borderRadius: 20,
                            border: '1px solid rgba(255, 59, 48, 0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: blockPhase,
                            transform: `scale(${blockPhase})`,
                        }}>
                            <div style={{ color: '#ff3b30', fontSize: 16, fontWeight: 700, marginBottom: 15 }}>MALICIOUS.NET</div>
                            <svg viewBox="0 0 24 24" width="60" height="60" fill="#ff3b30" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 59, 48, 0.4))' }}>
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                            <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(255, 59, 48, 0.6)' }}>BLOCKED (CSP ERR)</div>
                        </div>
                    </div>

                    {/* The "Shield" Guardian */}
                    <div style={{
                        position: 'absolute',
                        top: -15,
                        right: -15,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: '#34c759',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(52, 199, 89, 0.5)',
                        opacity: entry,
                    }}>
                        <svg viewBox="0 0 24 24" width="40" height="40" fill="#fff">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                        </svg>
                    </div>
                </div>

                {/* ARABIC TEXT REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1000 }}>
                    <h2 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        color: '#34c759',
                        margin: '0 0 30px 0',
                        textShadow: '0 0 40px rgba(52, 199, 89, 0.3)',
                    }}>
                        {title}
                    </h2>

                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (30 + i * 4), fps, config: { damping: 15 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 55, fontWeight: 700, color: 'white',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px)`,
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 18 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (70 + i * 4), fps, config: { damping: 15 } });
                            const isGreen = w === "وتقلل" || w === "خطر";
                            const isDanger = w === "خبيثة.";

                            return (
                                <span key={i} style={{
                                    fontSize: standsAt(w) ? 75 : 65, fontWeight: 900,
                                    color: isGreen ? '#34c759' : isDanger ? '#ff3b30' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [35, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isGreen ? '0 0 40px rgba(52, 199, 89, 0.3)' : 'none',
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

const standsAt = (word: string) => ["خبيثة.", "تنفيذ", "أكواد"].includes(word);
