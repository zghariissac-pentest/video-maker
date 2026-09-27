import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';

export const WebBasicsSecurity_HTTPS: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10, fps, config: { damping: 14 }
    });

    // Diagram phases
    const shieldPhase = spring({
        frame: frame - 40, fps, config: { damping: 12 }
    });

    const encryptionPhase = spring({
        frame: frame - 70, fps, config: { damping: 12 }
    });

    // -- TEXT DATA --
    const line1 = "أول شيء: استخدم HTTPS مع HSTS،";
    const line2 = "حتى تكون كل البيانات مشفرة ولا يمكن اعتراضها.";
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

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #0a0a20 0%, #010103 100%)' }} />

            {/* MAIN CONTENT AREA */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 50,
                opacity: interpolate(entry, [0, 1], [0, 1]),
            }}>

                {/* 🔒 CONNECTION DIAGRAM ANIMATION */}
                <div style={{
                    width: 700,
                    height: 350,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 60px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 40,
                    border: '1px solid rgba(74, 144, 226, 0.1)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                }}>

                    {/* PC / USER ICON */}
                    <div style={{ textAlign: 'center', zIndex: 5 }}>
                        <div style={{ width: 100, height: 100, borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg viewBox="0 0 24 24" width="50" height="50" fill="#fff">
                                <path d="M20 18H4v-1h16v1zm1-13v12H3V5h18zm-2 2H5v8h14V7z" />
                            </svg>
                        </div>
                        <div style={{ marginTop: 10, fontSize: 18, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>USER</div>
                    </div>

                    {/* CONNECTION LINE & PACKETS */}
                    <div style={{ flex: 1, position: 'relative', height: 4, background: 'rgba(255,255,255,0.05)', margin: '0 20px' }}>
                        {/* Moving Packets */}
                        {[0, 1, 2].map(i => {
                            const packetPos = (frame * 3 + i * 150) % 650;
                            const isEncrypted = encryptionPhase > 0.5;
                            return (
                                <div key={i} style={{
                                    position: 'absolute',
                                    left: (packetPos / 6.5) + '%',
                                    top: -12,
                                    width: 25,
                                    height: 25,
                                    borderRadius: 6,
                                    background: isEncrypted ? '#FFD700' : '#4db8ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 0 15px ${isEncrypted ? 'rgba(255,215,0,0.4)' : 'rgba(74,184,255,0.4)'}`,
                                    fontSize: 10,
                                    fontWeight: 900,
                                    transition: 'background 0.5s',
                                    opacity: packetPos > 600 ? 0 : 1,
                                }}>
                                    {isEncrypted ? '🔒' : 'A'}
                                </div>
                            );
                        })}
                    </div>

                    {/* CENTRAL PROTECTIVE SHIELD */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 140,
                        height: 140,
                        opacity: shieldPhase,
                        scale: shieldPhase,
                        zIndex: 10,
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'rgba(74, 184, 255, 0.1)',
                            border: '2px solid #4db8ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 40px rgba(74, 184, 255, 0.3)',
                        }}>
                            <svg viewBox="0 0 24 24" width="60" height="60" fill="#4db8ff">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            </svg>
                        </div>
                    </div>

                    {/* SERVER ICON */}
                    <div style={{ textAlign: 'center', zIndex: 5 }}>
                        <div style={{ width: 100, height: 100, borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg viewBox="0 0 24 24" width="50" height="50" fill="#4db8ff">
                                <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" />
                            </svg>
                        </div>
                        <div style={{ marginTop: 10, fontSize: 18, color: '#4db8ff', fontWeight: 700 }}>SERVER</div>
                    </div>
                </div>

                {/* ARABIC TEXT REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 1000 }}>
                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (20 + i * 4), fps, config: { damping: 15 } });
                            const isH = w === "HTTPS" || w === "HSTS،";
                            return (
                                <span key={i} style={{
                                    fontSize: 60, fontWeight: 800, color: isH ? '#FFD700' : '#FFF',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [25, 0])}px)`,
                                    textShadow: isH ? '0 0 30px rgba(255, 215, 0, 0.4)' : 'none',
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (70 + i * 4), fps, config: { damping: 15 } });
                            const isImpact = w === "مشفرة" || w === "اعتراضها.";
                            return (
                                <span key={i} style={{
                                    fontSize: isImpact ? 80 : 70, fontWeight: 900,
                                    color: isImpact ? '#4db8ff' : 'rgba(255,255,255,0.7)',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px)`,
                                    textShadow: isImpact ? '0 0 40px rgba(74, 184, 255, 0.3)' : 'none',
                                    filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`,
                                    display: 'inline-block'
                                }}>{w}</span>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* FLOWING CONNECTION PARTICLES */}
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 200, opacity: 0.1 }}>
                <svg width="100%" height="100%" viewBox="0 0 1000 200">
                    <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="#4db8ff" strokeWidth="2" strokeDasharray="10 20" />
                </svg>
            </div>
        </AbsoluteFill>
    );
};
