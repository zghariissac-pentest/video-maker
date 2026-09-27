import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsSecurity_Monitoring: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });


    // -- TEXT DATA --
    const title = "5. التسجيل والمراقبة";
    const line1 = "بدون تسجيل ومراقبة…";
    const line2 = "قد يتم اختراق موقعك دون أن تلاحظ";

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

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a1a00 0%, #010103 100%)' }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 50,
                opacity: interpolate(entry, [0, 1], [0, 1]),
            }}>

                {/* 🛰️ MONITORING DASHBOARD VISUALIZATION */}
                <div style={{
                    width: 620,
                    height: 380,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: 40,
                    border: '1px solid rgba(255, 204, 0, 0.15)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 30,
                    gap: 15,
                    overflow: 'hidden',
                }}>
                    {/* Header with Pulse */}
                    <div style={{ height: 35, display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{
                            width: 10, height: 10, borderRadius: '50%', background: '#ffcc00',
                            opacity: interpolate(Math.sin(frame / 6), [-1, 1], [0.3, 1]),
                        }} />
                        <div style={{ fontSize: 13, color: '#ffcc00', fontWeight: 900, letterSpacing: 2 }}>SECURITY LOGS: ACTIVE MONITORING</div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: 20 }}>
                        {/* Terminal Logs */}
                        <div style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', borderRadius: 15, padding: 15, fontFamily: 'monospace', fontSize: 11, color: '#ffcc00', overflow: 'hidden' }}>
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} style={{
                                    marginBottom: 4,
                                    opacity: interpolate(frame - (i * 5), [20, 40], [0, 1]),
                                    transform: `translateY(${interpolate(frame - (i * 5), [20, 40], [10, 0])}px)`
                                }}>
                                    [SEC-LOG-0{i}] {i % 3 === 0 ? 'ALERT: REQ FROM BLOCKED IP' : 'INFO: HANDSHAKE OK'}
                                </div>
                            ))}
                        </div>

                        {/* Radar Visualization */}
                        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: 160,
                                height: 160,
                                borderRadius: '50%',
                                border: '1px solid rgba(255, 204, 0, 0.2)',
                                position: 'relative',
                            }}>
                                {/* Sweeping Radar Hand */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '50%',
                                    height: 2,
                                    background: 'linear-gradient(90deg, rgba(255, 204, 0, 0.8), transparent)',
                                    transformOrigin: '0% 50%',
                                    transform: `rotate(${frame * 4}deg)`,
                                }} />
                                {/* Warning blips */}
                                <div style={{
                                    position: 'absolute',
                                    top: '30%',
                                    left: '70%',
                                    width: 6,
                                    height: 6,
                                    background: '#ff3b30',
                                    borderRadius: '50%',
                                    opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0, 1]),
                                    boxShadow: '0 0 10px #ff3b30',
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARABIC TEXT REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1000 }}>
                    <h2 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        color: '#ffcc00',
                        margin: '0 0 30px 0',
                        textShadow: '0 0 40px rgba(255, 204, 0, 0.3)',
                    }}>
                        {title}
                    </h2>

                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (30 + i * 4), fps, config: { damping: 15 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 55, fontWeight: 700, color: 'rgba(255,255,255,0.8)',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px)`,
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 18 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (70 + i * 4), fps, config: { damping: 15 } });
                            const isDanger = w === "اختراق" || w === "تلاحظ";
                            const isAmber = w === "موقعك";

                            return (
                                <span key={i} style={{
                                    fontSize: standsAt(w) ? 75 : 65, fontWeight: 900,
                                    color: isDanger ? '#ff3b30' : isAmber ? '#ffcc00' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [35, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isDanger ? '0 0 40px rgba(255, 59, 48, 0.3)' : 'none',
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

const standsAt = (word: string) => ["اختراق", "تلاحظ", "موقعك"].includes(word);
