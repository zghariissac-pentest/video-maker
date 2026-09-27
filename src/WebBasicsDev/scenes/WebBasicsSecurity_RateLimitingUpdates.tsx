import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsSecurity_RateLimitingUpdates: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });

    const updatePhase = spring({
        frame: frame - 60, fps, config: { damping: 12 }
    });

    // -- TEXT DATA --
    const title = "6. Rate Limiting + التحديثات";
    const line1 = "حدد عدد الطلبات لتقليل الهجمات،";
    const line2 = "وحدث مكتباتك دائمًا لتجنب الثغرات المعروفة.";

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

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a001a 0%, #010103 100%)' }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 50,
                opacity: interpolate(entry, [0, 1], [0, 1]),
            }}>

                {/* ⏱️ RATE LIMITING & UPDATES VISUALIZATION */}
                <div style={{
                    width: 650,
                    height: 380,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: 40,
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 30,
                    gap: 20,
                    overflow: 'hidden',
                }}>
                    <div style={{ height: 35, display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ec4899' }} />
                        <div style={{ fontSize: 13, color: '#ec4899', fontWeight: 900, letterSpacing: 2 }}>TRAFFIC CONTROL & MAINTENANCE</div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: 20, alignItems: 'center' }}>
                        {/* Rate Limiting Viz (Counter) */}
                        <div style={{
                            flex: 1,
                            height: '100%',
                            background: 'rgba(236, 72, 153, 0.05)',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <div style={{ fontSize: 14, color: '#ec4899', fontWeight: 700, marginBottom: 10 }}>REQUESTS / SEC</div>
                            <div style={{ fontSize: 60, fontWeight: 900, color: '#fff' }}>
                                {interpolate(frame % 30, [0, 29], [0, 100]) > 90 ? '429' : '20'}
                            </div>
                            <div style={{ fontSize: 10, color: frame % 30 > 25 ? '#ff3b30' : '#4db8ff' }}>
                                {frame % 30 > 25 ? 'RATE LIMIT EXCEEDED' : 'TRAFFIC STABLE'}
                            </div>
                        </div>

                        {/* Package Update Viz */}
                        <div style={{
                            flex: 1,
                            height: '100%',
                            background: 'rgba(74, 184, 255, 0.05)',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <div style={{ fontSize: 14, color: '#4db8ff', fontWeight: 700, marginBottom: 10 }}>LIBRARIES</div>
                            <div style={{
                                width: 100, height: 100, borderRadius: '50%', background: 'rgba(74, 184, 255, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative',
                            }}>
                                <svg viewBox="0 0 24 24" width="50" height="50" fill={updatePhase > 0.8 ? '#4db8ff' : '#aaa'} style={{
                                    transform: `rotate(${interpolate(frame, [40, 100], [0, 360])}deg)`,
                                    transition: 'fill 0.5s',
                                }}>
                                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                                </svg>
                            </div>
                            <div style={{ marginTop: 10, fontSize: 10, color: updatePhase > 0.8 ? '#34c759' : '#ffcc00' }}>
                                {updatePhase > 0.8 ? 'ALL PACKAGES UPDATED' : 'CHECKING FOR SECURITY UPDATES...'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARABIC TEXT REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1000 }}>
                    <h2 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        color: '#ec4899',
                        margin: '0 0 30px 0',
                        textShadow: '0 0 40px rgba(236, 72, 153, 0.3)',
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
                            const isBlue = w === "مكتباتك" || w === "الثغرات";
                            const isBold = w === "دائمًا" || w === "تجنب";

                            return (
                                <span key={i} style={{
                                    fontSize: standsAt(w) ? 75 : 60, fontWeight: 900,
                                    color: isBlue ? '#4db8ff' : isBold ? '#ec4899' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [35, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isBold ? '0 0 40px rgba(236, 72, 153, 0.3)' : 'none',
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

const standsAt = (word: string) => ["مكتباتك", "الثغرات", "دائمًا", "تجنب"].includes(word);
