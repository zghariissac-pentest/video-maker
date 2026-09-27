import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Audio,
    staticFile,
} from 'remotion';
import { COLORS, Scanlines, StaticVignette, CyberBackground } from '../components/CyberTheme';

// Single self-contained user card
const UserCard: React.FC<{
    x: number; y: number;
    color: string;
    opacity: number;
    scale: number;
    label: string;
    results: string[];
}> = ({ x, y, color, opacity, scale, label, results }) => (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity,
        pointerEvents: 'none',
    }}>
        {/* Avatar circle */}
        <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `${color}18`,
            border: `2px solid ${color}`,
            boxShadow: `0 0 25px ${color}70, inset 0 0 20px ${color}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Avatar body */}
            <div style={{ position: 'absolute', width: 42, height: 42, borderRadius: '50%', background: color, top: 18, opacity: 0.9 }} />
            <div style={{ position: 'absolute', width: 80, height: 58, borderRadius: '50% 50% 0 0', background: color, bottom: -5, opacity: 0.9 }} />
            {/* Scanlines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)' }} />
        </div>

        {/* Label */}
        <div style={{ color, fontSize: 14, fontFamily: 'monospace', opacity: 0.8 }}>{label}</div>

        {/* Search result card */}
        <div style={{
            width: 240,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${color}40`,
            borderRadius: 10,
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
        }}>
            {results.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif' }}>{r}</div>
                </div>
            ))}
        </div>
    </div>
);

export const CyberAssumption: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const breakPoint = 140;

    // Phase 1: icons appear one by one
    const icon1In = spring({ frame: frame - 10, fps, config: { stiffness: 80 } });
    const icon2In = spring({ frame: frame - 35, fps, config: { stiffness: 80 } });
    const icon3In = spring({ frame: frame - 60, fps, config: { stiffness: 80 } });

    // Phase 2: Breakpoint
    const breakShot = spring({ frame: frame - breakPoint, fps, config: { stiffness: 200, damping: 11 } });
    const chaos = interpolate(breakShot, [0, 1], [0, 1]);

    // Text
    const line1 = "نحن نفترض أن الإنترنت ثابت…";
    const line2 = "نفس النتائج، نفس الترتيب، نفس المعلومات للجميع.";
    const line3 = "لكن الواقع مختلف.";

    // Cards data
    const cards = [
        {
            color: COLORS.secondary,
            label: 'USER_A / 0xB4',
            results: ['How to start coding', 'Free Python course', 'Beginner bootcamp']
        },
        {
            color: COLORS.primary,
            label: 'USER_B / 0xF2',
            results: ['Advanced exploit dev', 'Buffer overflow guide', 'CTF tools 2024']
        },
        {
            color: COLORS.accent,
            label: 'USER_C / 0x7E',
            results: ['Buy iPhone 16', 'Best deals online', 'Discount code 50%']
        }
    ];

    // PHASE 1: 3 cards in a tight horizontal row (same results)
    // PHASE 2: they scatter outward with different results
    const p1Positions = [
        { x: -280, y: 0 },
        { x: 0, y: 0 },
        { x: 280, y: 0 },
    ];
    const p2Offsets = [
        { x: -350, y: -200 },
        { x: 0, y: 250 },
        { x: 350, y: -200 },
    ];

    const opacities = [icon1In, icon2In, icon3In];
    const scaleIns = [icon1In, icon2In, icon3In];

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <CyberBackground />
            <AbsoluteFill style={{ background: 'rgba(0,0,0,0.65)' }} />

            {/* SFX */}
            <Audio src={staticFile('assets/cyber/sfx/swoosh.mp3')} startFrom={0} volume={0.35} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={10} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={35} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={60} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/impact.mp3')} startFrom={140} volume={0.5} />

            {/* 1. USER NODES */}
            {cards.map((card, i) => {
                const scale = interpolate(scaleIns[i], [0, 1], [0.7, 1]);
                const baseX = interpolate(opacities[i], [0, 1], [0, p1Positions[i].x]);
                const baseY = interpolate(opacities[i], [0, 1], [0, p1Positions[i].y]);
                const finalX = baseX + p2Offsets[i].x * chaos;
                const finalY = baseY + p2Offsets[i].y * chaos;
                const op = opacities[i] * (1 - chaos * 0.3);

                const phase1Color = COLORS.secondary;

                return (
                    <UserCard
                        key={i}
                        x={finalX}
                        y={-100 + finalY}   // shift up to leave room for text
                        color={chaos > 0.5 ? card.color : phase1Color}
                        opacity={op}
                        scale={scale}
                        label={chaos > 0.5 ? card.label : 'USER_? / 0x??'}
                        results={chaos > 0.5 ? card.results : ['نفس النتيجة', 'نفس الترتيب', 'نفس المعلومات']}
                    />
                );
            })}

            {/* 2. LINE between phase-1 icons */}
            {[0, 1].map(i => (
                <div key={i} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '36%',
                    width: 280,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${COLORS.secondary}60, transparent)`,
                    transform: `translateX(${i === 0 ? '-100%' : '0%'})`,
                    opacity: interpolate(icon3In, [0, 1], [0, 1]) * (1 - chaos),
                    boxShadow: `0 0 5px ${COLORS.secondary}40`,
                }} />
            ))}

            {/* 3. TEXT */}
            <AbsoluteFill style={{
                direction: 'rtl',
                fontFamily: 'Cairo, sans-serif',
                textAlign: 'center',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 120,
                gap: 16,
            }}>
                {/* Stage 1 text */}
                <div style={{
                    opacity: interpolate(frame, [breakPoint - 10, breakPoint + 5], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                    position: 'absolute',
                    bottom: 120,
                }}>
                    <div style={{
                        fontSize: 52,
                        fontWeight: 800,
                        color: COLORS.secondary,
                        textShadow: `0 0 20px ${COLORS.secondary}70`,
                        opacity: interpolate(icon1In, [0, 1], [0, 1]),
                    }}>
                        {line1}
                    </div>
                    <div style={{
                        fontSize: 34,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.65)',
                        marginTop: 16,
                        opacity: interpolate(icon3In, [0, 1], [0, 1]),
                    }}>
                        {line2}
                    </div>
                </div>

                {/* Stage 2: REALITY BREAK */}
                <div style={{
                    position: 'absolute',
                    bottom: 180,
                    opacity: interpolate(frame, [breakPoint + 5, breakPoint + 25], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(breakShot, [0, 1], [0.75, 1])}) rotate(${interpolate(breakShot, [0, 1], [-6, 0])}deg)`,
                }}>
                    <div style={{
                        fontSize: 100,
                        fontWeight: 900,
                        color: COLORS.primary,
                        textShadow: `0 0 50px ${COLORS.primary}, 0 0 100px ${COLORS.primary}50`,
                        letterSpacing: -2,
                    }}>
                        {line3}
                    </div>
                </div>
            </AbsoluteFill>

            {/* HUD corner */}
            <div style={{
                position: 'absolute',
                top: 50,
                left: 50,
                color: COLORS.secondary,
                opacity: 0.25,
                fontSize: 12,
                fontFamily: 'monospace',
                lineHeight: 1.8,
            }}>
                FILTER_BUBBLE_ANALYSIS<br />
                NODES_DETECTED: 03<br />
                SYNC: {interpolate(frame, [0, 140], [0, 100], { extrapolateRight: 'clamp' }).toFixed(0)}%
            </div>

            <StaticVignette />
            <Scanlines />
        </AbsoluteFill>
    );
};
