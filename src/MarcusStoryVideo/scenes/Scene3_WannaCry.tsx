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
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { AlertCircle, ShieldCheck } from 'lucide-react';

// Continent clusters for more accurate virus mapping
const CONTINENTS = [
    { name: 'NorthAmerica', x: [18, 38], y: [25, 45], count: 25 },
    { name: 'SouthAmerica', x: [32, 45], y: [60, 85], count: 15 },
    { name: 'Europe', x: [48, 58], y: [28, 42], count: 30 },
    { name: 'Africa', x: [45, 60], y: [48, 80], count: 20 },
    { name: 'Asia', x: [62, 88], y: [25, 65], count: 40 },
    { name: 'Australia', x: [80, 92], y: [70, 88], count: 10 },
];

export const Scene3_WannaCry: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene Timings
    const startAttack = 20;
    const killSwitchAt = 300; // 10s mark

    // Transitions
    const sceneAppear = spring({ frame, fps, config: { damping: 12 } });
    const killTrigger = spring({
        frame: frame - killSwitchAt,
        fps,
        config: { stiffness: 180, damping: 12 }
    });

    // Generate dots once based on continent clusters
    const virusDots = React.useMemo(() => {
        const dotsList: { x: string, y: string, delay: number, size: number }[] = [];
        CONTINENTS.forEach((c, ci) => {
            Array.from({ length: c.count }).forEach((_, i) => {
                dotsList.push({
                    x: (Math.random() * (c.x[1] - c.x[0]) + c.x[0]) + '%',
                    y: (Math.random() * (c.y[1] - c.y[0]) + c.y[0]) + '%',
                    delay: (ci * 10) + (i * 1.5), // Spread continent by continent quickly
                    size: Math.random() * 6 + 4
                });
            });
        });
        return dotsList;
    }, []);

    const isAfterKill = frame >= killSwitchAt;

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden', opacity: sceneAppear }}>
            <SpaceBg />
            <StarField count={150} />

            {/* World Map - Highly Polished & Clean */}
            <AbsoluteFill style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10
            }}>
                <div style={{
                    width: '95%',
                    height: '80%',
                    position: 'relative',
                    transform: `scale(${interpolate(frame, [0, 600], [1, 1.05])})`,
                }}>
                    {/* The Map Image (No Antarctica, Glowing Outlines) */}
                    <Img
                        src={staticFile('assets/world_map_cyber.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: `drop-shadow(0 0 30px ${COLORS.primary}20) ${isAfterKill ? 'hue-rotate(90deg) brightness(1.2)' : ''}`,
                            transition: 'filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: 0.8
                        }}
                    />

                    {/* Infection Dots */}
                    {virusDots.map((dot, i) => {
                        const hasAppeared = frame > (startAttack + dot.delay);
                        if (!hasAppeared) return null;

                        const killOpacity = isAfterKill ? interpolate(frame - killSwitchAt, [0, 30], [1, 0.4], { extrapolateRight: 'clamp' }) : 1;
                        const killScale = isAfterKill ? interpolate(frame - killSwitchAt, [0, 30], [1, 0.5], { extrapolateRight: 'clamp' }) : 1;

                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                left: dot.x,
                                top: dot.y,
                                width: dot.size,
                                height: dot.size,
                                borderRadius: '50%',
                                background: isAfterKill ? COLORS.accent : COLORS.secondary,
                                boxShadow: `0 0 15px ${isAfterKill ? COLORS.accent : COLORS.secondary}`,
                                opacity: killOpacity,
                                transform: `scale(${killScale})`,
                                zIndex: 20,
                            }} />
                        );
                    })}

                    {/* Kill Switch Pulse Effect */}
                    {isAfterKill && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${killTrigger * 8})`,
                            width: 200, height: 200,
                            borderRadius: '50%',
                            border: `2px solid ${COLORS.accent}`,
                            opacity: interpolate(killTrigger, [0, 1], [0.8, 0]),
                            zIndex: 25
                        }} />
                    )}
                </div>
            </AbsoluteFill>

            {/* THE TEXT - Catchy & Clean Bottom Layout */}
            <AbsoluteFill style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 100,
                zIndex: 60,
                direction: 'rtl'
            }}>

                {/* Situation 1: The Crisis (Before Kill) */}
                {!isAfterKill && (
                    <div style={{
                        opacity: interpolate(frame, [10, 25], [0, 1]),
                        textAlign: 'center',
                        maxWidth: '80%'
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 15,
                            background: `${COLORS.secondary}15`, border: `2px solid ${COLORS.secondary}`,
                            padding: '12px 35px', borderRadius: '50px',
                            marginBottom: 25, boxShadow: `0 0 30px ${COLORS.secondary}30`
                        }}>
                            <AlertCircle color={COLORS.secondary} size={35} />
                            <span style={{ fontSize: 50, fontWeight: 900, color: COLORS.secondary, fontFamily: 'monospace' }}>WANNA-CRY ERROR!</span>
                        </div>
                        <h2 style={{
                            fontSize: 55, fontWeight: 800, color: 'white', fontFamily: 'Cairo',
                            margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.8)', lineHeight: 1.3
                        }}>
                            الفيروس ضرب مئات الآلاف من الأجهزة..<br />
                            العالم في حالة <span style={{ color: COLORS.secondary, textDecoration: 'underline' }}>فوضى تقنية!</span>
                        </h2>
                    </div>
                )}

                {/* Situation 2: The Hero Fix (After Kill) */}
                {isAfterKill && (
                    <div style={{
                        opacity: killTrigger,
                        transform: `scale(${interpolate(killTrigger, [0, 1], [0.9, 1])})`,
                        textAlign: 'center',
                        maxWidth: '90%'
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 15,
                            background: `${COLORS.accent}15`, border: `2px solid ${COLORS.accent}`,
                            padding: '12px 45px', borderRadius: '50px',
                            marginBottom: 25, boxShadow: `0 0 40px ${COLORS.accent}40`
                        }}>
                            <ShieldCheck color={COLORS.accent} size={40} />
                            <span style={{ fontSize: 55, fontWeight: 900, color: COLORS.accent, fontFamily: 'Cairo' }}>الـ Kill Switch!</span>
                        </div>
                        <h2 style={{
                            fontSize: 48, fontWeight: 800, color: 'white', fontFamily: 'Cairo',
                            margin: 0, lineHeight: 1.4
                        }}>
                            بذكاء ومصادفة.. Marcus اكتشف "المفتاح السري" <br />
                            وأنقذ <span style={{ background: COLORS.accent, color: '#000', padding: '0 10px', borderRadius: '8px' }}>150+ دولة</span> بضغطة واحدة!
                        </h2>
                    </div>
                )}
            </AbsoluteFill>

            <Vignette />
        </AbsoluteFill>
    );
};
