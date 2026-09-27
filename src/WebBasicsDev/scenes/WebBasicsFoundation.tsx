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

export const WebBasicsFoundation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- FAST ANIMATIONS --
    const entry = spring({
        frame: frame - 5,
        fps,
        config: { stiffness: 200, damping: 15 } // Fast and snappy
    });

    const scale = interpolate(entry, [0, 1], [0.8, 1]);
    const opacity = interpolate(entry, [0, 1], [0, 1]);

    // -- TEXT DATA --
    const line1 = "هذه ليست أشياء متقدمة…";
    const line2 = "هذه نقطة البداية لأي موقع يريد أن يكون آمنًا";

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

            {/* 1. LAYER: AMBIENT DEPTH (Cyan/Secure theme) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, #0a1a1a 0%, #010103 100%)',
            }} />

            {/* 2. LAYER: WORLD MAP CYBER (Faded Background) */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 1 }}>
                <Img src={staticFile('assets/world_map_cyber.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 3. LAYER: CENTER GLOW */}
            <div style={{
                position: 'absolute',
                width: 700,
                height: 700,
                background: 'radial-gradient(circle, rgba(74, 184, 255, 0.08) 0%, transparent 70%)',
                zIndex: 2,
            }} />

            {/* 4. LAYER: MAIN CONTENT */}
            <div style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 40,
                opacity,
                transform: `scale(${scale})`,
            }}>

                {/* FOUNDATION ICON (CSS Checklist / Blueprint style) */}
                <div style={{
                    width: 380,
                    height: 240,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 24,
                    border: '1px solid rgba(74, 184, 255, 0.2)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <div style={{ height: 35, background: 'rgba(74, 184, 255, 0.1)', display: 'flex', alignItems: 'center', padding: '0 15px', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4db8ff' }} />
                        <div style={{ flex: 1, height: 2, background: 'rgba(74, 184, 255, 0.1)', borderRadius: 1 }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            width: 110,
                            height: 110,
                            borderRadius: '50%',
                            background: 'rgba(74, 184, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            {/* Checkmark Foundation Icon */}
                            <svg viewBox="0 0 24 24" width="65" height="65" fill="#4db8ff" style={{ filter: 'drop-shadow(0 0 20px rgba(74, 184, 255, 0.6))' }}>
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                            </svg>
                            {/* Blueprint Lines */}
                            <div style={{ position: 'absolute', width: 200, height: 1, background: 'rgba(74, 184, 255, 0.1)', transform: 'rotate(45deg)' }} />
                            <div style={{ position: 'absolute', width: 200, height: 1, background: 'rgba(74, 184, 255, 0.1)', transform: 'rotate(-45deg)' }} />
                        </div>
                    </div>
                </div>

                {/* TEXT WITH SNAPPY REVEAL (ARABIC) */}
                <div style={{ direction: 'rtl', textAlign: 'center', maxWidth: 900 }}>

                    {/* Line 1: Not advanced... */}
                    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', gap: 10 }}>
                        {words1.map((w, i) => {
                            const wordS = spring({ frame: frame - (15 + i * 3), fps, config: { stiffness: 200, damping: 20 } });
                            return (
                                <span key={i} style={{
                                    fontSize: 45, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                                    opacity: wordS, transform: `translateY(${interpolate(wordS, [0, 1], [15, 0])}px)`,
                                    display: 'inline-block'
                                }}>{w}</span>
                            );
                        })}
                    </div>

                    {/* Line 2: The Starting Point (CORE FOCUS) */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 18 }}>
                        {words2.map((w, i) => {
                            const wordS = spring({ frame: frame - (40 + i * 4), fps, config: { stiffness: 250, damping: 15 } });
                            const isCore = w === "البداية" || w === "نقطة" || w === "آمنًا";
                            const isSafe = w === "آمنًا";

                            return (
                                <span key={i} style={{
                                    fontSize: isCore ? 85 : 70,
                                    fontWeight: 900,
                                    color: isSafe ? '#4db8ff' : '#FFFFFF',
                                    opacity: wordS,
                                    transform: `translateY(${interpolate(wordS, [0, 1], [30, 0])}px) scale(${interpolate(wordS, [0, 1], [0.9, 1])})`,
                                    textShadow: isSafe ? '0 0 40px rgba(74, 184, 255, 0.5)' : 'none',
                                    display: 'inline-block',
                                    filter: `blur(${interpolate(wordS, [0, 1], [10, 0])}px)`,
                                }}>{w}</span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* QUICK SWIPE EFFECT */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                transform: `translateX(${interpolate(frame, [0, 30], [-100, 100])}%)`,
                zIndex: 5,
            }} />
        </AbsoluteFill>
    );
};
