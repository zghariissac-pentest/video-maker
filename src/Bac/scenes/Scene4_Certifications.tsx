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
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';
import {
    BadgeCheck,
    Building2,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';

const FadeText: React.FC<{
    children: React.ReactNode;
    delay: number;
    fontSize?: number;
}> = ({ children, delay, fontSize = 44 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 60 } });

    return (
        <div style={{
            opacity: interpolate(spr, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spr, [0, 1], [18, 0])}px)`,
            fontSize, fontWeight: 800,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl', textAlign: 'center',
            color: 'white', lineHeight: 1.7,
            maxWidth: '88%',
        }}>
            {children}
        </div>
    );
};

const LogoCard: React.FC<{
    src: string;
    delay: number;
    width?: number;
    height?: number;
    glowColor: string;
}> = ({ src, delay, width = 180, height = 120, glowColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });
    const float = Math.sin((frame - delay) / 22) * 3;

    return (
        <div style={{
            opacity: interpolate(spr, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spr, [0, 1], [30, 0]) + float}px) scale(${interpolate(spr, [0, 1], [0.8, 1])})`,
            width: width + 40,
            height: height + 40,
            borderRadius: 20,
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.1)',
            boxShadow: `0 0 60px ${glowColor}20, 0 20px 50px rgba(0,0,0,0.5)`,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
        }}>
            <Img src={staticFile(src)} style={{ width, height, objectFit: 'contain' }} />
        </div>
    );
};

export const Scene4_Certifications: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── PHASE A: Cert logos (0-210) ───
    const aFade = interpolate(frame, [0, 15, 190, 210], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const aSlide = interpolate(frame, [190, 210], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // CompTIA brand logo at top
    const brandSpr = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 70 } });

    // ─── PHASE B: Companies value them (220-380) ───
    const bDelay = 220;
    const bSpr = spring({ frame: frame - bDelay, fps, config: { damping: 18, stiffness: 60 } });
    const bFade = interpolate(frame, [bDelay, bDelay + 15, 360, 380], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const bSlide = frame < bDelay ? 30 : interpolate(bSpr, [0, 1], [30, 0]);
    const bSlideOut = interpolate(frame, [360, 380], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // ─── PHASE C: Confirmation (390-500) ───
    const cDelay = 390;
    const cSpr = spring({ frame: frame - cDelay, fps, config: { damping: 16, stiffness: 70 } });
    const cFade = interpolate(frame, [cDelay, cDelay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const cSlide = frame < cDelay ? 25 : interpolate(cSpr, [0, 1], [25, 0]);

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* ═══ PHASE A: Real Cert Logos ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: aFade,
                transform: `translateY(${aSlide}px)`,
                gap: 40,
            }}>
                {/* CompTIA brand at top */}
                <div style={{
                    opacity: interpolate(brandSpr, [0, 1], [0, 0.5]),
                    transform: `scale(${interpolate(brandSpr, [0, 1], [0.8, 1])})`,
                }}>
                    <Img src={staticFile('comptia.svg')} style={{ width: 160, height: 34, objectFit: 'contain' }} />
                </div>

                {/* Two cert cards side by side */}
                <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
                    <LogoCard src="security-plus.svg" delay={15} width={140} height={140} glowColor="#2e86c1" />
                    <LogoCard src="oscp-real.png" delay={35} width={150} height={100} glowColor="#e74c3c" />
                </div>

                <FadeText delay={50} fontSize={42}>
                    كيما <span style={{ color: '#2e86c1' }}>Security+</span> أو <span style={{ color: '#e74c3c' }}>OSCP</span>
                </FadeText>

                {/* Floating checkmarks */}
                {[
                    { x: 10, y: 30, d: 70 },
                    { x: 88, y: 55, d: 85 },
                    { x: 12, y: 78, d: 100 },
                    { x: 80, y: 25, d: 115 },
                ].map((p, i) => (
                    <div key={i} style={{
                        position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                        opacity: spring({ frame: frame - p.d, fps, config: { damping: 16 } }) * 0.25,
                        transform: `translateY(${Math.sin((frame - p.d) / 22) * 4}px)`,
                    }}>
                        <CheckCircle2 size={14} color={COLORS.accent} />
                    </div>
                ))}
            </div>

            {/* ═══ PHASE B: Companies value them ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: bFade,
                transform: `translateY(${bSlide + bSlideOut}px)`,
                gap: 45,
            }}>
                {/* Building → Cert → Trend flow */}
                <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => {
                        const icons = [
                            { icon: <Building2 size={30} />, color: COLORS.primary },
                            { icon: <BadgeCheck size={30} />, color: COLORS.accent },
                            { icon: <TrendingUp size={30} />, color: COLORS.gold },
                        ];
                        const ic = icons[i];
                        const spr = spring({ frame: frame - bDelay - i * 12, fps, config: { damping: 14 } });
                        return (
                            <React.Fragment key={i}>
                                {i > 0 && <ArrowRight size={20} color="rgba(255,255,255,0.2)" />}
                                <div style={{
                                    opacity: interpolate(spr, [0, 1], [0, 1]),
                                    transform: `scale(${interpolate(spr, [0, 1], [0.5, 1])})`,
                                    width: 70, height: 70, borderRadius: 18,
                                    background: `${ic.color}10`, border: `2px solid ${ic.color}28`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: ic.color,
                                }}>
                                    {ic.icon}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                <FadeText delay={bDelay + 10} fontSize={44}>
                    هوما ли <span style={{ color: COLORS.primary }}>الشركات</span> تشوف فيهم<br />
                    القيمة <span style={{ color: COLORS.accent }}>الحقيقية</span>,
                </FadeText>

                <FadeText delay={bDelay + 30} fontSize={44}>
                    ماشي <span style={{ color: COLORS.secondary, textDecoration: 'line-through', opacity: 0.6 }}>الديبلوم</span>.
                </FadeText>
            </div>

            {/* ═══ PHASE C: Confirmation ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: cFade,
                transform: `translateY(${cSlide}px)`,
                gap: 40,
            }}>
                <div style={{
                    opacity: spring({ frame: frame - cDelay, fps, config: { damping: 12 } }),
                    transform: `scale(${spring({ frame: frame - cDelay, fps, config: { damping: 12 } })})`,
                }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: 50,
                        background: `${COLORS.accent}12`, border: `3px solid ${COLORS.accent}35`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 50px ${COLORS.accent}20`,
                    }}>
                        <CheckCircle2 size={50} color={COLORS.accent} />
                    </div>
                </div>

                <FadeText delay={cDelay + 10} fontSize={48}>
                    <span style={{ color: COLORS.accent }}>الشهادات</span> هي المفتاح
                </FadeText>

                <FadeText delay={cDelay + 25} fontSize={38}>
                    ماشي الورقة لي عندك<br />
                    من <span style={{ color: COLORS.secondary, textDecoration: 'line-through', opacity: 0.6 }}>الجامعة</span>
                </FadeText>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
