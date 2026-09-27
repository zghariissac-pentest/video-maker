import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from 'remotion';

export const WebBasicsHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- ANIMATIONS --
    const entry = spring({
        frame: frame - 10,
        fps,
        config: { stiffness: 100, damping: 14 }
    });

    const scale = interpolate(entry, [0, 1], [0.85, 1], { extrapolateRight: 'clamp' });
    const contentOpacity = interpolate(entry, [0, 1], [0, 1]);
    const floatY = Math.sin(frame / 25) * 10;

    // Background Cameos (Security stuff icons)
    const icons = [
        { src: 'assets/burpsuite.svg', top: '15%', left: '10%', rot: -15, scale: 1 },
        { src: 'assets/exploitdb.png', bottom: '15%', left: '12%', rot: 10, scale: 1 },
        { src: 'assets/fbi_logo.png', top: '45%', left: '5%', rot: 5, scale: 0.8 },
    ];

    // -- TEXT DATA --
    const line1 = "إذا كنت تبدأ في تطوير موقع…";
    const line2 = "ابدأ بهذه الأساسيات الأمنية";
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

            {/* 1. LAYER: AMBIENT DEPTH */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, #0a0a1a 0%, #010103 100%)',
            }} />

            {/* 2. LAYER: SECURITY ICONS BACKGROUND (Inspired by your "Each Video" request) */}
            {icons.map((icon, i) => {
                const iconEntry = spring({
                    frame: frame - (20 + i * 5),
                    fps,
                    config: { damping: 20 }
                });
                const iconFloat = Math.sin((frame + i * 10) / 40) * 8;
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        top: icon.top,
                        left: icon.left,
                        right: icon.right,
                        bottom: icon.bottom,
                        width: 140,
                        height: 140,
                        opacity: interpolate(iconEntry, [0, 1], [0, 0.12]),
                        transform: `rotate(${icon.rot}deg) scale(${icon.scale * iconEntry}) translateY(${iconFloat}px)`,
                        filter: 'grayscale(100%) brightness(150%) blur(1px)',
                        zIndex: 1,
                    }}>
                        <Img src={staticFile(icon.src)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                );
            })}

            {/* 3. LAYER: CENTER GLOW */}
            <div style={{
                position: 'absolute',
                width: 900,
                height: 900,
                background: 'radial-gradient(circle, rgba(74, 144, 226, 0.08) 0%, transparent 70%)',
                opacity: contentOpacity,
                zIndex: 2,
            }} />

            {/* 4. LAYER: MAIN CONTENT */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 70,
                opacity: contentOpacity,
                transform: `scale(${scale}) translateY(${floatY}px)`,
            }}>

                {/* REFINED GLASS BROWSER */}
                <div style={{
                    width: 500,
                    height: 330,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 36,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    <div style={{ height: 44, background: 'rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                        <div style={{ marginLeft: 15, flex: 1, height: 22, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 11, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                            <div style={{ width: 6, height: 6, background: '#FFD700', borderRadius: '50%', marginRight: 8 }} />
                            <div style={{ width: 120, height: 4, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            width: 130,
                            height: 130,
                            borderRadius: '50%',
                            background: 'rgba(255, 215, 0, 0.04)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <svg viewBox="0 0 24 24" width="75" height="75" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.4))' }}>
                                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
                            </svg>
                            <div style={{
                                position: 'absolute',
                                inset: -8,
                                border: '2px solid rgba(255, 215, 0, 0.1)',
                                borderRadius: '50%',
                                opacity: interpolate(Math.sin(frame / 8), [-1, 1], [0.2, 0.6]),
                            }} />
                        </div>
                    </div>
                </div>

                {/* TEXT WITH BLUR REVEAL */}
                <div style={{ direction: 'rtl', textAlign: 'center' }}>
                    <div style={{ marginBottom: 25, display: 'flex', justifyContent: 'center', gap: 15 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (25 + i * 3), fps, config: { damping: 15 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 60, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [25, 0])}px)`,
                                    display: 'inline-block', filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`
                                }}>{w}</span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (50 + i * 4), fps, config: { stiffness: 120, damping: 12 } });
                            const isSec = i >= words2.length - 1; // "الأمنية"
                            return (
                                <span key={i} style={{
                                    fontSize: 90, fontWeight: 900,
                                    color: isSec ? '#FFD700' : 'white',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [35, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isSec ? '0 0 50px rgba(255, 215, 0, 0.5)' : 'none',
                                    filter: `blur(${interpolate(wordS, [0, 1], [15, 0])}px)`,
                                    display: 'inline-block'
                                }}>{w} {isSec ? '🛡️' : ''}</span>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* PROGRESS LINE */}
            <div style={{
                position: 'absolute',
                bottom: 120,
                width: 450,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' }),
            }} />
        </AbsoluteFill>
    );
};
