import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';
import { LockOpen, Eye, ShieldX, Database, ArrowDown } from 'lucide-react';

const PRIMARY = '#00BDF2';
const ACCENT = '#ff0055';
const GREEN = '#00ff99';
const YELLOW = '#ffd600';
const BG = '#050810';

// ─── Step Badge ────────────────────────────────────────────────────────────────
const StepBadge: React.FC<{ frame: number; fps: number; num: number; label: string; color: string }> = ({
    frame, fps, num, label, color,
}) => {
    const s = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 90 } });
    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: `${color}15`, border: `2px solid ${color}`,
            borderRadius: 50, padding: '10px 28px',
            boxShadow: `0 0 30px ${color}40`,
        }}>
            <div style={{
                width: 32, height: 32, borderRadius: '50%', background: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: 900, fontSize: 18, fontFamily: 'monospace',
            }}>{num}</div>
            <span style={{ color, fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 26 }}>{label}</span>
        </div>
    );
};

// ─── Focus Card ────────────────────────────────────────────────────────────────
const FocusCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    sub: string;
    delay: number;
    frame: number;
    fps: number;
    color: string;
    index: number;
    active: boolean;
}> = ({ icon, title, sub, delay, frame, fps, color, index, active }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 70 } });
    const pulse = active ? 1 + Math.sin(frame / 8) * 0.015 : 1;

    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${pulse})`,
            background: active ? `${color}12` : 'rgba(255,255,255,0.03)',
            border: `2px solid ${active ? color : color + '40'}`,
            borderRadius: 22,
            padding: '30px 36px',
            boxShadow: active ? `0 0 40px ${color}30, 0 0 80px ${color}10` : 'none',
            transition: 'all 0.3s ease',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            minWidth: 380,
        }}>
            {/* Number badge */}
            <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `${color}20`, border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color, fontSize: 18, fontWeight: 900, fontFamily: 'monospace',
            }}>
                {index + 1}
            </div>

            {/* Icon */}
            <div style={{
                width: 90, height: 90, borderRadius: 20,
                background: `${color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color,
                boxShadow: active ? `0 0 30px ${color}50` : 'none',
            }}>
                {icon}
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    color: active ? 'white' : '#ffffff80',
                    fontFamily: 'Cairo, sans-serif', fontWeight: 800,
                    fontSize: 30, direction: 'rtl',
                    textShadow: active ? `0 0 20px ${color}` : 'none',
                }}>{title}</div>
                <div style={{
                    color: active ? `${color}cc` : `${color}50`,
                    fontFamily: 'Cairo, sans-serif', fontSize: 22,
                    direction: 'rtl', marginTop: 6, lineHeight: 1.5,
                }}>{sub}</div>
            </div>
        </div>
    );
};

// ─── Anonymous bind animation ──────────────────────────────────────────────────
const AnonBindAnim: React.FC<{ frame: number; fps: number; start: number }> = ({ frame, fps, start }) => {
    const t = frame - start;
    if (t < 0) return null;

    // Lock unlocking animation
    const lockOpen = interpolate(t, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const dataFlow = t > 25;

    return (
        <div style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            opacity: interpolate(t, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
            {/* User (no login) */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: `${ACCENT}20`, border: `2px solid ${ACCENT}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: ACCENT,
                }}>
                    <ShieldX size={28} />
                </div>
                <span style={{ color: ACCENT, fontFamily: 'monospace', fontSize: 13 }}>Anonymous</span>
            </div>

            {/* Arrow */}
            <div style={{
                width: interpolate(lockOpen, [0, 1], [0, 140]),
                height: 3,
                background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})`,
                borderRadius: 2,
                boxShadow: `0 0 10px ${GREEN}`,
                position: 'relative',
                overflow: 'hidden',
            }}>
                {dataFlow && (
                    <div style={{
                        position: 'absolute',
                        left: `${((frame - start - 25) % 30) / 30 * 100}%`,
                        top: -3, width: 10, height: 10, borderRadius: '50%',
                        background: '#fff', boxShadow: '0 0 8px #fff',
                    }} />
                )}
            </div>

            {/* Lock open */}
            <div style={{
                width: 60, height: 60, borderRadius: 14,
                background: `${GREEN}20`, border: `2px solid ${GREEN}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: GREEN,
                boxShadow: lockOpen > 0.5 ? `0 0 25px ${GREEN}60` : 'none',
            }}>
                <LockOpen size={28} />
            </div>

            <Database size={32} color={PRIMARY} style={{ filter: `drop-shadow(0 0 10px ${PRIMARY})` }} />
        </div>
    );
};

// ─── INFO OVERFLOW anim ────────────────────────────────────────────────────────
const InfoOverflow: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
    const t = frame - start;
    if (t < 0) return null;

    const items = [
        { label: 'uid=admin', color: PRIMARY, delay: 0 },
        { label: 'uid=john', color: GREEN, delay: 8 },
        { label: 'uid=sara', color: YELLOW, delay: 16 },
        { label: 'uid=guest', color: '#ffffff80', delay: 24 },
        { label: 'cn=Admins', color: ACCENT, delay: 32 },
        { label: 'cn=IT', color: PRIMARY, delay: 40 },
    ];

    return (
        <div style={{
            position: 'absolute', top: '30%', left: '55%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 8,
            opacity: interpolate(t, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                color: YELLOW, fontFamily: 'monospace', fontSize: 16,
            }}>
                <Eye size={18} /> <span>visible data</span>
            </div>
            {items.map((item, i) => (
                <div key={i} style={{
                    opacity: interpolate(t, [item.delay, item.delay + 8], [0, 1], { extrapolateRight: 'clamp' }),
                    transform: `translateX(${interpolate(t, [item.delay, item.delay + 10], [30, 0], { extrapolateRight: 'clamp' })}px)`,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}50`,
                    borderRadius: 8,
                    padding: '6px 16px',
                    fontFamily: 'monospace', fontSize: 18,
                    color: item.color,
                }}>
                    {item.label}
                </div>
            ))}
        </div>
    );
};

// ─── SCENE ─────────────────────────────────────────────────────────────────────
export const Scene5_Focus: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const card1Delay = 30;
    const card2Delay = 65;
    const card1Active = frame >= card1Delay + 10 && frame < card2Delay + 10;
    const card2Active = frame >= card2Delay + 10;
    const anonAnimStart = 50;
    const infoAnimStart = 110;

    return (
        <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
            {/* Grid bg */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(${PRIMARY}06 1px, transparent 1px), linear-gradient(90deg, ${PRIMARY}06 1px, transparent 1px)`,
                backgroundSize: '70px 70px',
            }} />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute',
                top: '30%', left: '50%',
                width: 600, height: 600, borderRadius: '50%',
                background: `radial-gradient(circle, ${PRIMARY}08, transparent 70%)`,
                transform: 'translate(-50%,-50%)',
            }} />

            {/* ── Header ── */}
            <div style={{
                position: 'absolute', top: '6%', width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
                <StepBadge frame={frame} fps={fps} num={3} label="ماذا نبحث؟" color={ACCENT} />

                <div style={{
                    opacity: interpolate(spring({ frame: frame - 15, fps, config: { damping: 13 } }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 15, fps, config: { damping: 13 } }), [0, 1], [20, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 50, fontWeight: 900, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        textShadow: `0 0 30px ${ACCENT}60`,
                    }}>
                        نركز على نقطتين أساسيتين
                    </h1>
                </div>
            </div>

            {/* ── Two Focus Cards ── */}
            <div style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                gap: 24,
                width: '88%',
            }}>
                <FocusCard
                    icon={<LockOpen size={44} />}
                    title="الوصول بدون تسجيل دخول"
                    sub="Anonymous Bind — هل يٌسمح بالاستعلام بدون كلمة مرور؟"
                    delay={card1Delay}
                    frame={frame} fps={fps}
                    color={ACCENT}
                    index={0}
                    active={card1Active}
                />
                <FocusCard
                    icon={<Eye size={44} />}
                    title="كمية المعلومات الظاهرة"
                    sub="Data Exposure — ما مقدار البيانات المكشوفة للاستعلام؟"
                    delay={card2Delay}
                    frame={frame} fps={fps}
                    color={YELLOW}
                    index={1}
                    active={card2Active}
                />
            </div>

            {/* ── Animated visual: anon bind ── */}
            {frame >= anonAnimStart && frame < infoAnimStart + 10 && (
                <AnonBindAnim frame={frame} fps={fps} start={anonAnimStart} />
            )}

            {/* ── Animated visual: info overflow ── */}
            {frame >= infoAnimStart && (
                <InfoOverflow frame={frame} start={infoAnimStart} />
            )}

            {/* ── Arrow hint ── */}
            {frame >= 150 && (
                <div style={{
                    position: 'absolute',
                    top: '33%',
                    left: '20%',
                    opacity: interpolate(frame, [150, 165], [0, 1], { extrapolateRight: 'clamp' }),
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                    <ArrowDown size={28} color={ACCENT} style={{ filter: `drop-shadow(0 0 10px ${ACCENT})` }} />
                    <span style={{ color: `${ACCENT}cc`, fontFamily: 'Cairo, sans-serif', fontSize: 22, direction: 'rtl' }}>
                        إذا نجحنا هنا = ثغرة حقيقية
                    </span>
                </div>
            )}

            {/* ── Character watching from bottom left ── */}
            <div style={{
                position: 'absolute',
                bottom: '2%',
                left: interpolate(
                    spring({ frame: frame - 0, fps, config: { damping: 12 } }),
                    [0, 1], [-130, 25]
                ),
                opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
                <img src={staticFile('assets/reaper.png')}
                    style={{ width: 110, height: 110, imageRendering: 'pixelated' }} />
            </div>
        </AbsoluteFill>
    );
};
