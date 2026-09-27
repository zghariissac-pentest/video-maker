import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';
import {
    ShieldCheck,
    Fingerprint,
    FileX2,
    Building,
    Briefcase,
    Bug,
    Coins,
    Award,
    UserCog,
    CheckCircle2,
    TrendingUp,
    Zap,
    Target,
} from 'lucide-react';

const IconBox: React.FC<{
    icon: React.ReactNode;
    delay: number;
    color: string;
    boxSize?: number;
}> = ({ icon, delay, color, boxSize = 80 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 70 } });
    const pulse = interpolate(Math.sin((frame - delay) / 18), [-1, 1], [0.94, 1]);

    return (
        <div style={{
            opacity: interpolate(spr, [0, 1], [0, 1]),
            transform: `scale(${interpolate(spr, [0, 1], [0.5, 1]) * pulse})`,
            width: boxSize, height: boxSize,
            borderRadius: 22,
            background: `${color}10`,
            border: `2px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color,
            boxShadow: `0 0 40px ${color}15, inset 0 0 20px ${color}08`,
        }}>
            {icon}
        </div>
    );
};

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    delay: number;
    x: number;
    y: number;
    color: string;
}> = ({ icon, delay, x, y, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 60 } });
    const float = Math.sin((frame - delay) / 22) * 5;

    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`, top: `${y}%`,
            opacity: interpolate(spr, [0, 1], [0, 0.5]),
            transform: `translateY(${interpolate(spr, [0, 1], [12, 0]) + float}px)`,
            color,
        }}>
            {icon}
        </div>
    );
};

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

export const Scene3_WhyCyber: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── PHASE A: Skill vs Diploma (0-200) ───
    const aFade = interpolate(frame, [0, 15, 180, 200], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const aSlide = interpolate(frame, [180, 200], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const vsSpr = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 80 } });
    const vsScale = frame < 50 ? 0 : interpolate(vsSpr, [0, 1], [0, 1]);
    const shieldWins = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const capLose = interpolate(frame, [80, 115], [1, 0.35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const capGrayscale = interpolate(frame, [80, 115], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // ─── PHASE B: Companies (210-380) ───
    const bDelay = 210;
    const bFade = interpolate(frame, [bDelay, bDelay + 15, 360, 380], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const bSpr = spring({ frame: frame - bDelay, fps, config: { damping: 18, stiffness: 60 } });
    const bSlide = frame < bDelay ? 40 : interpolate(bSpr, [0, 1], [40, 0]);
    const bSlideOut = interpolate(frame, [360, 380], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // ─── PHASE C: Young bug bounty (390-550) ───
    const cDelay = 390;
    const cSpr = spring({ frame: frame - cDelay, fps, config: { damping: 18, stiffness: 60 } });
    const cFade = interpolate(frame, [cDelay, cDelay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const cSlide = frame < cDelay ? 30 : interpolate(cSpr, [0, 1], [30, 0]);

    const moneyCount = frame > cDelay + 60
        ? Math.min(9999, Math.floor(interpolate(frame - cDelay - 60, [0, 60], [0, 9999], { extrapolateRight: 'clamp' })))
        : 0;

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* ═══ PHASE A: Skill > Diploma ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: aFade,
                transform: `translateY(${aSlide}px)`,
                gap: 50,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 60,
                    transform: `scale(${vsScale})`,
                }}>
                    {/* ShieldCheck (winner) */}
                    <div style={{
                        transform: `scale(${interpolate(shieldWins, [0, 1], [0.85, 1.15])})`,
                        filter: `drop-shadow(0 0 ${20 + shieldWins * 35}px ${COLORS.accent}88)`,
                    }}>
                        <IconBox icon={<ShieldCheck size={44} />} delay={20} color={COLORS.accent} boxSize={100} />
                    </div>

                    {/* VS */}
                    <div style={{
                        fontSize: 26, fontWeight: 900,
                        color: COLORS.secondary,
                        opacity: interpolate(vsSpr, [0, 1], [0, 0.4]),
                        textShadow: `0 0 15px ${COLORS.secondary}44`,
                    }}>VS</div>

                    {/* Fingerprint / diploma symbol (loser) */}
                    <div style={{
                        transform: `scale(${capLose})`,
                        opacity: 1 - capGrayscale * 0.6,
                        filter: `grayscale(${capGrayscale})`,
                    }}>
                        <IconBox icon={<Fingerprint size={44} />} delay={30} color={COLORS.secondary} boxSize={100} />
                    </div>
                </div>

                {/* Checkmark over shield */}
                {frame > 105 && (
                    <div style={{
                        position: 'absolute', top: '36%', left: '27%',
                        opacity: spring({ frame: frame - 105, fps, config: { damping: 12 } }),
                        transform: `scale(${spring({ frame: frame - 105, fps, config: { damping: 12 } })})`,
                    }}>
                        <CheckCircle2 size={28} color={COLORS.accent} />
                    </div>
                )}

                <FadeText delay={10}>
                    Cyber security من القطاعات القلائل<br />
                    لي تشوف فيك <span style={{ color: COLORS.accent }}>المهارة</span> قبل <span style={{ color: COLORS.secondary, textDecoration: 'line-through', opacity: 0.6 }}>الشهادة</span>.
                </FadeText>

                <FloatingIcon icon={<Target size={18} />} delay={45} x={12} y={22} color={COLORS.gold} />
                <FloatingIcon icon={<Bug size={16} />} delay={60} x={82} y={72} color={COLORS.accent} />
                <FloatingIcon icon={<Zap size={14} />} delay={70} x={78} y={18} color={COLORS.primary} />
            </div>

            {/* ═══ PHASE B: Companies ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: bFade,
                transform: `translateY(${bSlide + bSlideOut}px)`,
                gap: 50,
            }}>
                {/* Buildings row */}
                <div style={{ display: 'flex', gap: 25, alignItems: 'flex-end' }}>
                    {[0, 1, 2].map(i => {
                        const bldSpr = spring({ frame: frame - bDelay - i * 10, fps, config: { damping: 16, stiffness: 70 } });
                        return (
                            <div key={i} style={{
                                opacity: interpolate(bldSpr, [0, 1], [0, 1]),
                                transform: `translateY(${interpolate(bldSpr, [0, 1], [20, 0])}px)`,
                            }}>
                                <IconBox
                                    icon={i === 1 ? <Briefcase size={28} /> : <Building size={28} />}
                                    delay={bDelay + i * 10}
                                    color={COLORS.primary}
                                    boxSize={80 + i * 8}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* FileX2 over diploma */}
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconBox icon={<Fingerprint size={32} />} delay={bDelay + 30} color={COLORS.secondary} boxSize={80} />
                    </div>
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: spring({ frame: frame - bDelay - 45, fps, config: { damping: 14 } }),
                        transform: `scale(${spring({ frame: frame - bDelay - 45, fps, config: { damping: 14 } })}) rotate(-10deg)`,
                    }}>
                        <FileX2 size={55} color={COLORS.secondary} strokeWidth={2.5} />
                    </div>
                </div>

                <FadeText delay={bDelay + 15} fontSize={42}>
                    كاين <span style={{ color: COLORS.primary }}>شركات كبار</span><br />
                    شرط الديبلوم من مناصب الـ security<br />
                    متاعهم <span style={{ color: COLORS.accent }}>بالكامل</span>.
                </FadeText>

                <FloatingIcon icon={<CheckCircle2 size={16} />} delay={bDelay + 50} x={18} y={78} color={COLORS.accent} />
                <FloatingIcon icon={<Briefcase size={14} />} delay={bDelay + 60} x={84} y={22} color={COLORS.primary} />
            </div>

            {/* ═══ PHASE C: Young bug bounty hunters ═══ */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                opacity: cFade,
                transform: `translateY(${cSlide}px)`,
                gap: 45,
            }}>
                {/* UserCog + TrendingUp + Bug */}
                <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
                    <IconBox icon={<UserCog size={30} />} delay={cDelay} color={COLORS.accent} boxSize={80} />
                    <div style={{
                        opacity: spring({ frame: frame - cDelay - 12, fps, config: { damping: 14 } }),
                        transform: `translateY(${interpolate(
                            spring({ frame: frame - cDelay - 12, fps, config: { damping: 14 } }),
                            [0, 1], [8, 0]
                        )}px)`,
                    }}>
                        <TrendingUp size={26} color={COLORS.accent} />
                    </div>
                    <IconBox icon={<Bug size={30} />} delay={cDelay + 12} color={COLORS.gold} boxSize={80} />
                </div>

                <FadeText delay={cDelay + 8} fontSize={40}>
                    كاين ناس دخلو الميدان <span style={{ color: COLORS.accent }}>صغار</span>،<br />
                    تعلموا بروحهم، ولقاو روحهم<br />
                    يديرو <span style={{ color: COLORS.gold }}>bug bounty</span>
                </FadeText>

                {/* Money counter */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 15,
                    opacity: spring({ frame: frame - cDelay - 50, fps, config: { damping: 16 } }),
                    transform: `scale(${spring({ frame: frame - cDelay - 50, fps, config: { damping: 16 } })})`,
                }}>
                    <Coins size={30} color={COLORS.accent} />
                    <span style={{
                        fontSize: 50, fontWeight: 900,
                        fontFamily: 'monospace',
                        color: COLORS.accent,
                        textShadow: `0 0 20px ${COLORS.accent}55`,
                    }}>
                        ${moneyCount.toLocaleString()}
                    </span>
                </div>

                <FadeText delay={cDelay + 55} fontSize={38}>
                    ويربحو <span style={{ color: COLORS.accent }}>فلوس أكثر</span><br />
                    من ناس عندهم <span style={{ color: COLORS.secondary, textDecoration: 'line-through', opacity: 0.6 }}>ديبلوم</span>.
                </FadeText>

                {/* Award */}
                <div style={{
                    opacity: spring({ frame: frame - cDelay + 75, fps, config: { damping: 14 } }),
                    transform: `scale(${spring({ frame: frame - cDelay + 75, fps, config: { damping: 14 } })})`,
                }}>
                    <IconBox icon={<Award size={34} />} delay={cDelay + 75} color={COLORS.gold} boxSize={80} />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
