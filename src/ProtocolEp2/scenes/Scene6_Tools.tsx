import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';
import { Radar, Search, GitFork } from 'lucide-react';

const PRIMARY = '#00BDF2';
const GREEN = '#00ff99';
const YELLOW = '#ffd600';
const PURPLE = '#bf5fff';
const BG = '#050810';

// ─── Animated Scan decoration (nmap flavor) ─────────────────────────────────
const RadarPip: React.FC<{ frame: number; color: string; offsetFrames: number }> = ({ frame, color, offsetFrames }) => {
    const t = (frame + offsetFrames) % 50;
    const scale = interpolate(t, [0, 50], [0.3, 2.5]);
    const opacity = interpolate(t, [0, 10, 50], [0, 0.5, 0]);
    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 80, height: 80, borderRadius: '50%',
            border: `2px solid ${color}`,
            transform: `translate(-50%,-50%) scale(${scale})`,
            opacity,
        }} />
    );
};

// ─── Tool Card ──────────────────────────────────────────────────────────────
const ToolCard: React.FC<{
    icon: React.ReactNode;
    name: string;
    arabic: string;
    desc: string;
    delay: number;
    frame: number;
    fps: number;
    color: string;
    accentLine: string;
}> = ({ icon, name, arabic, desc, delay, frame, fps, color, accentLine }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 65 } });
    const isActive = frame >= delay + 5;
    const pulse = isActive ? 1 + Math.sin(frame / 10) * 0.012 : 1;

    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(s, [0, 1], [-120, 0])}px) scale(${pulse})`,
            background: `linear-gradient(135deg, ${color}0d 0%, rgba(5,8,16,0.98) 100%)`,
            border: `1.5px solid ${color}60`,
            borderRadius: 20,
            padding: '24px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            boxShadow: isActive ? `0 0 50px ${color}25, 0 4px 30px rgba(0,0,0,0.5)` : 'none',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Left accent bar */}
            <div style={{
                position: 'absolute', left: 0, top: '15%', bottom: '15%',
                width: 4, borderRadius: 4,
                background: color,
                boxShadow: `0 0 15px ${color}`,
            }} />

            {/* Icon orb */}
            <div style={{
                width: 80, height: 80, borderRadius: 18, flexShrink: 0,
                background: `radial-gradient(circle at 35% 35%, ${color}30, ${color}10)`,
                border: `2px solid ${color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color, boxShadow: `0 0 20px ${color}30`,
                marginLeft: 10,
            }}>
                {icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                    <span style={{
                        color, fontFamily: 'monospace', fontWeight: 900,
                        fontSize: 32, letterSpacing: 1,
                        textShadow: `0 0 20px ${color}`,
                    }}>{name}</span>
                    <span style={{
                        color: `${color}80`, fontFamily: 'Cairo, sans-serif',
                        fontSize: 20, direction: 'rtl',
                    }}>{arabic}</span>
                </div>
                <div style={{
                    color: '#ffffff80', fontFamily: 'Cairo, sans-serif',
                    fontSize: 26, direction: 'rtl', lineHeight: 1.5,
                }}>
                    <span style={{ color, fontWeight: 700 }}>← </span>{desc}
                </div>
            </div>

            {/* Subtle bg glow */}
            <div style={{
                position: 'absolute', right: -30, top: '50%',
                width: 120, height: 120, borderRadius: '50%',
                background: `radial-gradient(circle, ${color}15, transparent 70%)`,
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
            }} />
        </div>
    );
};

// ─── SCENE ────────────────────────────────────────────────────────────────────
export const Scene6_Tools: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const t1 = 30;
    const t2 = 85;
    const t3 = 145;
    const charDelay = 0;

    const tools = [
        {
            icon: <Radar size={38} />,
            name: 'nmap',
            arabic: 'الماسح',
            desc: 'اكتشاف الخدمة والتحقق أن المنفذ 389 مفتوح',
            delay: t1,
            color: GREEN,
            accentLine: GREEN,
        },
        {
            icon: <Search size={38} />,
            name: 'ldapsearch',
            arabic: 'المستخرج',
            desc: 'استخراج المستخدمين والمجموعات من Active Directory',
            delay: t2,
            color: PRIMARY,
            accentLine: PRIMARY,
        },
        {
            icon: <GitFork size={38} />,
            name: 'bloodhound',
            arabic: 'المحلل',
            desc: 'تحليل العلاقات داخل الشبكة وإظهار مسارات الهجوم',
            delay: t3,
            color: PURPLE,
            accentLine: PURPLE,
        },
    ];

    return (
        <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
            {/* Grid bg */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(${PRIMARY}05 1px, transparent 1px), linear-gradient(90deg, ${PRIMARY}05 1px, transparent 1px)`,
                backgroundSize: '70px 70px',
            }} />

            {/* Animated radar pips top-right */}
            <div style={{ position: 'absolute', top: 120, right: 80 }}>
                <RadarPip frame={frame} color={GREEN} offsetFrames={0} />
                <RadarPip frame={frame} color={GREEN} offsetFrames={17} />
                <RadarPip frame={frame} color={GREEN} offsetFrames={34} />
            </div>

            {/* Animated pips bottom-left (purple) */}
            <div style={{ position: 'absolute', bottom: 200, left: 100 }}>
                <RadarPip frame={frame} color={PURPLE} offsetFrames={5} />
                <RadarPip frame={frame} color={PURPLE} offsetFrames={22} />
            </div>

            {/* ── Header ── */}
            <div style={{
                position: 'absolute', top: '7%', width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 5, fps, config: { damping: 12 } }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 5, fps, config: { damping: 12 } }), [0, 1], [30, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 72, fontWeight: 950, color: 'white',
                        fontFamily: 'Cairo, sans-serif', margin: 0,
                        textShadow: `0 0 50px ${PRIMARY}80`,
                        letterSpacing: 2,
                    }}>
                        الأدوات 🛠️
                    </h1>
                </div>
                <div style={{
                    width: interpolate(spring({ frame: frame - 10, fps, config: { damping: 12 } }), [0, 1], [0, 700]),
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                    borderRadius: 3, boxShadow: `0 0 20px ${PRIMARY}`,
                }} />
            </div>

            {/* ── Tool Cards ── */}
            <div style={{
                position: 'absolute',
                top: '27%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                width: '90%',
            }}>
                {tools.map((tool, i) => (
                    <ToolCard key={i} {...tool} frame={frame} fps={fps} />
                ))}
            </div>

            {/* ── Character peeking bottom right ── */}
            <div style={{
                position: 'absolute',
                bottom: '2%',
                right: interpolate(
                    spring({ frame: frame - charDelay, fps, config: { damping: 12 } }),
                    [0, 1], [-130, 20]
                ),
                opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
                transform: 'scaleX(-1)',
            }}>
                <img src={staticFile('assets/reaper.png')}
                    style={{ width: 110, height: 110, imageRendering: 'pixelated' }} />
            </div>

            {/* ── Final tip line ── */}
            {frame >= t3 + 50 && (
                <div style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: interpolate(frame, [t3 + 50, t3 + 65], [0, 1], { extrapolateRight: 'clamp' }),
                    textAlign: 'center',
                }}>
                    <span style={{
                        color: YELLOW, fontFamily: 'Cairo, sans-serif',
                        fontSize: 34, fontWeight: 800, direction: 'rtl',
                        textShadow: `0 0 25px ${YELLOW}`,
                    }}>
                        ⚡ كل أداة تكمل الأخرى — الثلاثة مع بعض = قوة
                    </span>
                </div>
            )}
        </AbsoluteFill>
    );
};
