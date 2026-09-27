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

// ─── Ranked Result Card ──────────────────────────────────────────
const RankCard: React.FC<{
    rank: number;
    displayRank: number;
    title: string;
    color: string;
    y: number;
    opacity: number;
    scale: number;
    isTop: boolean;
}> = ({ rank, displayRank, title, color, y, opacity, scale, isTop }) => (
    <div style={{
        position: 'absolute',
        left: '50%',
        transform: `translate(-50%, ${y}px) scale(${scale})`,
        width: 780,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '20px 28px',
        background: isTop ? `${color}15` : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isTop ? color + '60' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 18,
        boxShadow: isTop ? `0 0 40px ${color}25, 0 10px 40px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.4)',
        opacity,
    }}>
        {/* Rank badge */}
        <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: isTop ? color : 'rgba(255,255,255,0.08)',
            border: `2px solid ${isTop ? color : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 900,
            color: isTop ? '#000' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.3s',
            boxShadow: isTop ? `0 0 20px ${color}60` : 'none',
        }}>
            #{displayRank}
        </div>
        {/* Content */}
        <div style={{ flex: 1, direction: 'rtl' }}>
            <div style={{
                fontSize: 20, fontWeight: isTop ? 700 : 500,
                color: isTop ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'Cairo, sans-serif',
            }}>
                {title}
            </div>
            <div style={{
                fontSize: 12, color: isTop ? COLORS.secondary : 'rgba(255,255,255,0.2)',
                fontFamily: 'monospace', marginTop: 4,
            }}>
                RELEVANCE_SCORE: {isTop ? '0.97' : (0.45 + rank * 0.08).toFixed(2)}
            </div>
        </div>
        {/* Signal bar (algorithm confidence) */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
            {[1, 2, 3, 4, 5].map(b => (
                <div key={b} style={{
                    width: 5, borderRadius: 3,
                    height: `${b * 20}%`,
                    background: b <= (isTop ? 5 : rank + 1) ? color : 'rgba(255,255,255,0.1)',
                    opacity: isTop ? 1 : 0.4,
                }} />
            ))}
        </div>
    </div>
);

// ─── Algorithm Eye ───────────────────────────────────────────────
const AlgoEye: React.FC<{ progress: number }> = ({ progress }) => {
    const size = interpolate(progress, [0, 1], [0, 300]);
    const ringOpacity = interpolate(progress, [0, 0.3, 1], [0, 1, 0.7]);

    return (
        <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: size, height: size,
            borderRadius: '50%',
            border: `2px solid ${COLORS.primary}`,
            boxShadow: `0 0 30px ${COLORS.primary}50, inset 0 0 30px ${COLORS.primary}20`,
            opacity: ringOpacity,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            {/* Inner rings */}
            <div style={{
                width: '60%', height: '60%', borderRadius: '50%',
                border: `1.5px solid ${COLORS.secondary}80`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{
                    width: '50%', height: '50%', borderRadius: '50%',
                    background: COLORS.primary,
                    boxShadow: `0 0 20px ${COLORS.primary}`,
                    opacity: progress,
                }} />
            </div>
            {/* Crosshair lines */}
            {[0, 90].map(angle => (
                <div key={angle} style={{
                    position: 'absolute',
                    width: '120%', height: 1,
                    background: `${COLORS.primary}50`,
                    transform: `rotate(${angle}deg)`,
                }} />
            ))}
        </div>
    );
};

// ─── Scene ───────────────────────────────────────────────────────
export const CyberRanking: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // -- Beat timings --
    const T = {
        cardsIn: 0,
        line1: 20,    // حتى نفس المعلومة…
        shuffle: 70,    // cards re-rank
        line2: 90,    // يتم إعادة ترتيبها — Ranking.
        line3: 150,   // وهنا النقطة المهمة…
        eyeIn: 180,   // eye appears
        line4: 200,   // أنت لا ترى الصورة الكاملة.
        line5: 260,   // أنت ترى ما يعتقد الـ Algorithm…
    };

    // Card springs
    const card1 = spring({ frame: frame - T.cardsIn, fps, config: { stiffness: 60 } });
    const card2 = spring({ frame: frame - T.cardsIn - 8, fps, config: { stiffness: 60 } });
    const card3 = spring({ frame: frame - T.cardsIn - 16, fps, config: { stiffness: 60 } });

    // Shuffle animation
    const shuffleProgress = spring({ frame: frame - T.shuffle, fps, config: { stiffness: 120, damping: 12 } });

    // Eye
    const eyeProgress = spring({ frame: frame - T.eyeIn, fps, config: { stiffness: 80 } });

    // Text opacities
    const tl1 = interpolate(frame, [T.line1, T.line1 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const tl2 = interpolate(frame, [T.line2, T.line2 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const tl3 = interpolate(frame, [T.line3, T.line3 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const tl4 = interpolate(frame, [T.line4, T.line4 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const tl5 = interpolate(frame, [T.line5, T.line5 + 22], [0, 1], { extrapolateRight: 'clamp' });

    // Cards: before shuffle → equal rank, after → top card jumps to #1
    const cardAY_before = -180;
    const cardBY_before = 0;
    const cardCY_before = 180;

    // After shuffle: A goes DOWN (was #1, now #3), C goes UP (was #3, now #1)
    const cardAY_after = 180;
    const cardCY_after = -180;

    const cardAY = interpolate(shuffleProgress, [0, 1], [cardAY_before, cardAY_after]);
    const cardBY = cardBY_before;
    const cardCY = interpolate(shuffleProgress, [0, 1], [cardCY_before, cardCY_after]);

    const cardADisplayRank = shuffleProgress > 0.5 ? 3 : 1;
    const cardCDisplayRank = shuffleProgress > 0.5 ? 1 : 3;

    const cards = [
        { title: 'مصادر تعليمية مفتوحة للجميع', initialRank: 1, displayRank: cardADisplayRank, y: cardAY, color: COLORS.secondary, spring: card1, isTop: cardADisplayRank === 1 },
        { title: 'دورة برمجة متوسطة المستوى', initialRank: 2, displayRank: 2, y: cardBY, color: COLORS.accent, spring: card2, isTop: false },
        { title: 'Bootcamp مدفوع — سجّل الآن', initialRank: 3, displayRank: cardCDisplayRank, y: cardCY, color: COLORS.primary, spring: card3, isTop: cardCDisplayRank === 1 },
    ];

    // Phase: before or after eye reveal — fade out cards
    const cardsOpacity = interpolate(frame, [T.eyeIn, T.eyeIn + 20], [1, 0.15], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <CyberBackground />
            <AbsoluteFill style={{ background: 'rgba(0,0,0,0.78)' }} />

            {/* SFX */}
            <Audio src={staticFile('assets/cyber/sfx/swoosh.mp3')} startFrom={0} volume={0.35} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.cardsIn} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.cardsIn + 8} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.cardsIn + 16} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/shuffle.mp3')} startFrom={T.shuffle} volume={0.5} />
            <Audio src={staticFile('assets/cyber/sfx/scan.mp3')} startFrom={T.eyeIn} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/impact.mp3')} startFrom={T.line4} volume={0.55} />

            {/* ─── CARDS (center stage) ─── */}
            <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cards.map((card, i) => (
                    <RankCard
                        key={i}
                        rank={card.initialRank}
                        displayRank={card.displayRank}
                        title={card.title}
                        color={card.color}
                        y={card.y + interpolate(card.spring, [0, 1], [80, 0])}
                        opacity={card.spring * cardsOpacity}
                        scale={interpolate(card.spring, [0, 1], [0.85, 1])}
                        isTop={card.isTop}
                    />
                ))}
            </AbsoluteFill>

            {/* ─── ALGORITHM EYE ─── */}
            <AlgoEye progress={eyeProgress} />

            {/* ─── TEXT LINES ─── */}
            <AbsoluteFill style={{
                direction: 'rtl',
                fontFamily: 'Cairo, sans-serif',
                textAlign: 'center',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 80,
                gap: 0,
                pointerEvents: 'none',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Line 1 */}
                    <div style={{ opacity: tl1 * (1 - tl2 * 0.7), transform: `translateY(${interpolate(tl1, [0, 1], [15, 0])}px)` }}>
                        <span style={{ fontSize: 42, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                            حتى نفس المعلومة…
                        </span>
                    </div>

                    {/* Line 2 */}
                    <div style={{ opacity: tl2, transform: `translateY(${interpolate(tl2, [0, 1], [15, 0])}px)` }}>
                        <span style={{ fontSize: 48, fontWeight: 900, color: COLORS.secondary, textShadow: `0 0 20px ${COLORS.secondary}80` }}>
                            يتم إعادة ترتيبها —{' '}
                        </span>
                        <span style={{ fontSize: 48, fontWeight: 900, color: COLORS.accent, fontFamily: 'monospace', textShadow: `0 0 20px ${COLORS.accent}80` }}>
                            Ranking.
                        </span>
                    </div>

                    {/* Line 3 */}
                    <div style={{ opacity: tl3, transform: `translateY(${interpolate(tl3, [0, 1], [15, 0])}px)` }}>
                        <span style={{ fontSize: 38, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                            وهنا النقطة المهمة…
                        </span>
                    </div>

                    {/* Line 4 — BIG */}
                    <div style={{ opacity: tl4, transform: `scale(${interpolate(tl4, [0, 1], [0.9, 1])}) translateY(${interpolate(tl4, [0, 1], [20, 0])}px)` }}>
                        <span style={{ fontSize: 64, fontWeight: 900, color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.3)', letterSpacing: -1 }}>
                            أنت لا ترى الصورة الكاملة.
                        </span>
                    </div>

                    {/* Line 5 — Glow Finale */}
                    <div style={{ opacity: tl5, transform: `translateY(${interpolate(tl5, [0, 1], [15, 0])}px)` }}>
                        <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.primary, textShadow: `0 0 25px ${COLORS.primary}` }}>
                            أنت ترى ما يعتقد الـ{' '}
                        </span>
                        <span style={{ fontSize: 38, fontWeight: 900, color: COLORS.accent, fontFamily: 'monospace', textShadow: `0 0 25px ${COLORS.accent}` }}>
                            Algorithm
                        </span>
                        <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.primary, textShadow: `0 0 25px ${COLORS.primary}` }}>
                            … أنه مناسب لك.
                        </span>
                    </div>
                </div>
            </AbsoluteFill>

            {/* ─── SHUFFLE LABEL ─── */}
            <div style={{
                position: 'absolute',
                top: 60, left: '50%', transform: 'translateX(-50%)',
                opacity: interpolate(frame, [T.shuffle, T.shuffle + 15, T.line3, T.line3 + 15], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                display: 'flex', alignItems: 'center', gap: 14,
            }}>
                <div style={{ width: 30, height: 1.5, background: `${COLORS.accent}80` }} />
                <div style={{
                    fontSize: 16, color: COLORS.accent,
                    fontFamily: 'monospace', letterSpacing: 3,
                    textShadow: `0 0 10px ${COLORS.accent}`,
                }}>
                    ALGO_RERANK :: EXECUTING…
                </div>
                <div style={{ width: 30, height: 1.5, background: `${COLORS.accent}80` }} />
            </div>

            <StaticVignette />
            <Scanlines />
        </AbsoluteFill>
    );
};
