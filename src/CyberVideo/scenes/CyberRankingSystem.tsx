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

// ─── Pipeline Node ───────────────────────────────────────────────
const PipeNode: React.FC<{
    icon: string;
    label: string;
    sub: string;
    color: string;
    x: number;
    opacity: number;
    scale: number;
}> = ({ icon, label, sub, color, x, opacity, scale }) => (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity,
        width: 160,
    }}>
        <div style={{
            width: 80, height: 80, borderRadius: 22,
            background: `${color}18`,
            border: `2px solid ${color}60`,
            boxShadow: `0 0 30px ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32,
        }}>
            {icon}
        </div>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color, fontFamily: 'monospace', letterSpacing: 1 }}>{label}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo, sans-serif', marginTop: 4, direction: 'rtl' }}>{sub}</div>
        </div>
    </div>
);

// ─── Arrow between nodes ─────────────────────────────────────────
const PipeArrow: React.FC<{ x: number; opacity: number; color: string }> = ({ x, opacity, color }) => (
    <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: `translate(-50%, -50%) translateX(${x}px) translateY(-18px)`,
        opacity,
        display: 'flex', alignItems: 'center', gap: 0,
    }}>
        <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, ${color}40, ${color})` }} />
        <div style={{
            width: 0, height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: `8px solid ${color}`,
        }} />
    </div>
);

// ─── Signal Card ─────────────────────────────────────────────────
const SignalCard: React.FC<{
    icon: string;
    label: string;
    desc: string;
    value: string;
    color: string;
    y: number;
    opacity: number;
    scale: number;
}> = ({ icon, label, desc, value, color, y, opacity, scale }) => (
    <div style={{
        position: 'absolute',
        left: '50%',
        transform: `translate(-50%, ${y}px) scale(${scale})`,
        width: 860,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '20px 28px',
        background: 'rgba(5,8,20,0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color}40`,
        borderRadius: 18,
        boxShadow: `0 0 30px ${color}15, 0 10px 30px rgba(0,0,0,0.5)`,
        opacity,
    }}>
        {/* Icon */}
        <div style={{
            width: 58, height: 58, borderRadius: 16, flexShrink: 0,
            background: `${color}18`, border: `2px solid ${color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: `0 0 20px ${color}30`,
        }}>
            {icon}
        </div>
        {/* Text */}
        <div style={{ flex: 1, direction: 'rtl' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: 'Cairo, sans-serif' }}>{label}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: 'Cairo, sans-serif', marginTop: 5, lineHeight: 1.4 }}>{desc}</div>
        </div>
        {/* Value badge */}
        <div style={{
            padding: '8px 18px', borderRadius: 30,
            background: `${color}18`, border: `1px solid ${color}50`,
            fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color,
            whiteSpace: 'nowrap', flexShrink: 0,
        }}>
            {value}
        </div>
    </div>
);

// ─── Scene ───────────────────────────────────────────────────────
export const CyberRankingSystem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const T = {
        // Phase 1: Intro
        intro: 10,   // تقنيًا…
        // Phase 2: Pipeline diagram
        pipeIn: 60,   // pipeline appears
        pipe2: 85,
        pipe3: 110,
        arrow1: 90,
        arrow2: 115,
        pipeText: 130,  // text about pipeline
        // Phase 3: Signals
        signalsTitle: 210,
        sig1: 240,
        sig2: 285,
        sig3: 330,
        // Phase 4: Conclusion
        concl: 400,
    };

    // Springs
    const sp = (delay: number, stiff = 70) =>
        spring({ frame: frame - delay, fps, config: { stiffness: stiff, damping: 14 } });

    const introSp = sp(T.intro);
    const pipe1Sp = sp(T.pipeIn);
    const pipe2Sp = sp(T.pipe2);
    const pipe3Sp = sp(T.pipe3);
    const sigTitleSp = sp(T.signalsTitle);
    const sig1Sp = sp(T.sig1);
    const sig2Sp = sp(T.sig2);
    const sig3Sp = sp(T.sig3);
    const conclSp = sp(T.concl, 90);

    // Arrow opacities
    const arr1Op = interpolate(frame, [T.arrow1, T.arrow1 + 20], [0, 1], { extrapolateRight: 'clamp' });
    const arr2Op = interpolate(frame, [T.arrow2, T.arrow2 + 20], [0, 1], { extrapolateRight: 'clamp' });

    // Text stages
    const t = (start: number, dur = 18) =>
        interpolate(frame, [start, start + dur], [0, 1], { extrapolateRight: 'clamp' });

    // Phase transitions
    const pipeVisible = interpolate(frame, [T.concl - 20, T.concl], [1, 0], { extrapolateRight: 'clamp' });
    const signalsVisible = interpolate(frame, [T.sig3 + 30, T.concl - 10], [1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <CyberBackground />
            <AbsoluteFill style={{ background: 'rgba(0,0,0,0.78)' }} />

            {/* SFX */}
            <Audio src={staticFile('assets/cyber/sfx/swoosh.mp3')} startFrom={0} volume={0.35} />
            <Audio src={staticFile('assets/cyber/sfx/pop.mp3')} startFrom={T.pipeIn} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/pop.mp3')} startFrom={T.pipe2} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/pop.mp3')} startFrom={T.pipe3} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.sig1} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.sig2} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/tick.mp3')} startFrom={T.sig3} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/impact.mp3')} startFrom={T.concl} volume={0.55} />

            {/* ═══════════════════════════════
                PHASE 1 — INTRO
            ═══════════════════════════════ */}
            <div style={{
                position: 'absolute', top: 70, width: '100%',
                textAlign: 'center', direction: 'rtl', fontFamily: 'Cairo, sans-serif',
                opacity: introSp * pipeVisible,
            }}>
                <div style={{ fontSize: 50, fontWeight: 900, color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
                    تقنيًا…
                </div>
                <div style={{
                    fontSize: 30, fontWeight: 600, color: COLORS.secondary,
                    marginTop: 12, padding: '0 60px',
                    opacity: t(T.pipeIn - 20),
                    textShadow: `0 0 15px ${COLORS.secondary}60`,
                }}>
                    كل عملية بحث أو فتح صفحة… تمر عبر نظام ترتيب —{' '}
                    <span style={{ color: COLORS.accent, fontFamily: 'monospace' }}>Ranking System</span>
                </div>
            </div>

            {/* ═══════════════════════════════
                PHASE 2 — PIPELINE DIAGRAM
            ═══════════════════════════════ */}
            <div style={{ opacity: pipeVisible }}>
                {/* Request node */}
                <PipeNode
                    icon="🔍"
                    label="REQUEST"
                    sub="طلب البحث"
                    color={COLORS.secondary}
                    x={-340}
                    opacity={pipe1Sp}
                    scale={interpolate(pipe1Sp, [0, 1], [0.8, 1])}
                />
                <PipeArrow x={-190} opacity={arr1Op} color={COLORS.secondary} />

                {/* Filter node */}
                <PipeNode
                    icon="⚙️"
                    label="RANK ENGINE"
                    sub="تصفية وترتيب"
                    color={COLORS.primary}
                    x={0}
                    opacity={pipe2Sp}
                    scale={interpolate(pipe2Sp, [0, 1], [0.8, 1])}
                />
                <PipeArrow x={150} opacity={arr2Op} color={COLORS.primary} />

                {/* Results node */}
                <PipeNode
                    icon="📋"
                    label="RESULTS"
                    sub="نتائج مخصصة"
                    color={COLORS.accent}
                    x={310}
                    opacity={pipe3Sp}
                    scale={interpolate(pipe3Sp, [0, 1], [0.8, 1])}
                />

                {/* Pipeline description text */}
                <div style={{
                    position: 'absolute',
                    top: '56%',
                    width: '100%', textAlign: 'center', direction: 'rtl',
                    fontFamily: 'Cairo, sans-serif', padding: '0 80px',
                    opacity: t(T.pipeText) * pipeVisible,
                }}>
                    <div style={{ fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                        هذا النظام لا يعرض كل النتائج…
                    </div>
                    <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.5)', marginTop: 10, lineHeight: 1.6 }}>
                        بل يقوم بتصفية وترتيب المحتوى بناءً على إشارات مختلفة.
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════
                PHASE 3 — SIGNAL CARDS
            ═══════════════════════════════ */}
            <div style={{
                position: 'absolute', width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                opacity: signalsVisible,
            }}>
                {/* Section title */}
                <div style={{
                    position: 'absolute', top: 80, width: '100%',
                    textAlign: 'center', direction: 'rtl',
                    fontFamily: 'Cairo, sans-serif',
                    opacity: sigTitleSp,
                    transform: `translateY(${interpolate(sigTitleSp, [0, 1], [20, 0])}px)`,
                }}>
                    <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.secondary, textShadow: `0 0 20px ${COLORS.secondary}60` }}>
                        الإشارات التي يستخدمها:
                    </div>
                </div>

                {/* Signal 1 */}
                <SignalCard
                    icon="📜"
                    label="سجل التصفح"
                    desc="ماذا فتحت من قبل؟ الخوارزمية تحفظ كل رابط فتحته."
                    value="WEIGHT: 0.83"
                    color={COLORS.secondary}
                    y={210}
                    opacity={sig1Sp}
                    scale={interpolate(sig1Sp, [0, 1], [0.92, 1])}
                />

                {/* Signal 2 */}
                <SignalCard
                    icon="⚡"
                    label="معدل التفاعل"
                    desc="كم ثانية قضيت في الصفحة؟ هل ضغطت أم رجعت بسرعة؟"
                    value="WEIGHT: 0.91"
                    color={COLORS.accent}
                    y={380}
                    opacity={sig2Sp}
                    scale={interpolate(sig2Sp, [0, 1], [0.92, 1])}
                />

                {/* Signal 3 */}
                <SignalCard
                    icon="🎯"
                    label="احتمالية الضغط — CTR"
                    desc="هل هذا النوع من العناوين مناسب لك بناءً على سلوكك السابق؟"
                    value="WEIGHT: 0.96"
                    color={COLORS.primary}
                    y={550}
                    opacity={sig3Sp}
                    scale={interpolate(sig3Sp, [0, 1], [0.92, 1])}
                />
            </div>

            {/* ═══════════════════════════════
                PHASE 4 — CONCLUSION
            ═══════════════════════════════ */}
            <div style={{
                position: 'absolute', width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center',
                top: 0, bottom: 0,
                opacity: conclSp,
                transform: `scale(${interpolate(conclSp, [0, 1], [0.95, 1])})`,
                direction: 'rtl', fontFamily: 'Cairo, sans-serif', textAlign: 'center',
                padding: '0 70px',
                zIndex: 20,
            }}>
                <div style={{
                    padding: '50px 60px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(30px)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: 28,
                    boxShadow: `0 0 80px ${COLORS.primary}15, 0 30px 80px rgba(0,0,0,0.6)`,
                    display: 'flex', flexDirection: 'column', gap: 24,
                }}>
                    <div style={{ fontSize: 34, fontWeight: 700, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                        لهذا… نفس الطلب —
                        <span style={{ color: COLORS.accent, fontFamily: 'monospace', margin: '0 8px' }}>Request</span>
                    </div>
                    <div style={{ fontSize: 54, fontWeight: 900, color: '#fff', lineHeight: 1.3, textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
                        يمكن أن يعطي نتائج مختلفة…
                    </div>
                    <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.secondary, textShadow: `0 0 20px ${COLORS.secondary}60` }}>
                        حسب المستخدم.
                    </div>
                </div>
            </div>

            {/* HUD */}
            <div style={{
                position: 'absolute', top: 50, left: 50,
                color: COLORS.secondary, opacity: 0.2,
                fontSize: 11, fontFamily: 'monospace', lineHeight: 1.9,
            }}>
                MODULE: RANKING_SYSTEM<br />
                SIGNALS_ACTIVE: 03<br />
                PERSONALIZATION: ON
            </div>

            <StaticVignette />
            <Scanlines />
        </AbsoluteFill>
    );
};
