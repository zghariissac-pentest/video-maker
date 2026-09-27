import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';
import { User, Database, ArrowRight, Shield, FolderKey } from 'lucide-react';

const PRIMARY = '#00BDF2';
const ACCENT = '#ff0055';
const GREEN = '#00ff99';

// ─── Mini Pixel Character ─────────────────────────────────────────────────────
// A tiny CSS-drawn dark-cloaked figure (pixel-art style)
const TinyChar: React.FC<{ x: number; y: number; delay: number; frame: number; fps: number; flip?: boolean }> = ({
    x, y, delay, frame, fps, flip = false,
}) => {
    const enter = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 80 } });
    const walkY = Math.sin((frame - delay) * 0.4) * 5; // walking bob
    const opacity = interpolate(enter, [0, 1], [0, 1]);
    const scale = interpolate(enter, [0, 1], [0, 1]);

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y + walkY,
            opacity,
            transform: `scale(${scale * (flip ? -1 : 1)}, ${scale})`,
            transformOrigin: 'center',
            width: 50,
            height: 60,
            imageRendering: 'pixelated',
        }}>
            <img
                src={staticFile('assets/reaper.png')}
                style={{ width: 50, height: 60, imageRendering: 'pixelated', filter: 'brightness(1.1)' }}
            />
        </div>
    );
};

// ─── User Card ─────────────────────────────────────────────────────────────────
const UserCard: React.FC<{ label: string; sub: string; delay: number; frame: number; fps: number; color: string }> = ({
    label, sub, delay, frame, fps, color,
}) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 70 } });
    const opacity = interpolate(s, [0, 1], [0, 1]);
    const translateY = interpolate(s, [0, 1], [30, 0]);

    return (
        <div style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            background: 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${color}40`,
            borderRadius: 16,
            padding: '14px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 0 20px ${color}20`,
        }}>
            <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: `${color}20`,
                border: `2px solid ${color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <User size={20} color={color} />
            </div>
            <div>
                <div style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18 }}>{label}</div>
                <div style={{ color: `${color}`, fontFamily: 'Cairo, sans-serif', fontSize: 13, opacity: 0.8 }}>{sub}</div>
            </div>
        </div>
    );
};

// ─── LDAP Flow Arrow ───────────────────────────────────────────────────────────
const FlowArrow: React.FC<{ frame: number; start: number; end: number }> = ({ frame, start, end }) => {
    const prog = interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const dotPos = (frame % 25) / 25;

    return (
        <div style={{ position: 'relative', width: 200, height: 4, background: `${PRIMARY}20`, borderRadius: 4 }}>
            {/* Fill */}
            <div style={{
                position: 'absolute', top: 0, left: 0,
                width: `${prog * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${PRIMARY}60, ${PRIMARY})`,
                borderRadius: 4,
                boxShadow: `0 0 10px ${PRIMARY}`,
            }} />
            {/* Moving dot */}
            {prog > 0.1 && (
                <div style={{
                    position: 'absolute',
                    left: `${Math.min(prog, 1) * dotPos * 100}%`,
                    top: -5,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: `0 0 12px ${PRIMARY}`,
                }} />
            )}
        </div>
    );
};

// ─── SERVER NODE ───────────────────────────────────────────────────────────────
const ServerNode: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const s = spring({ frame: frame - 30, fps, config: { damping: 12 } });
    const pulse = 1 + Math.sin(frame / 10) * 0.04;

    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `scale(${interpolate(s, [0, 1], [0.5, 1]) * pulse})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
        }}>
            <div style={{
                width: 110,
                height: 110,
                borderRadius: 24,
                background: `radial-gradient(circle at 30% 30%, #1a2f4a, #0a0a14)`,
                border: `2.5px solid ${PRIMARY}`,
                boxShadow: `0 0 40px ${PRIMARY}60, 0 0 80px ${PRIMARY}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 6,
            }}>
                <Database size={38} color={PRIMARY} />
                <div style={{ fontSize: 11, color: PRIMARY, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1 }}>LDAP</div>
            </div>
            <div style={{ fontSize: 14, color: 'white', fontFamily: 'Cairo, sans-serif', opacity: 0.7 }}>Active Directory</div>
        </div>
    );
};

// ─── SCENE ─────────────────────────────────────────────────────────────────────
export const Scene2_LDAP: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text timings
    const t1 = 10;
    const t2 = 90;

    const s1 = spring({ frame: frame - t1, fps, config: { damping: 13 } });
    const s2 = spring({ frame: frame - t2, fps, config: { damping: 13 } });

    // Chars walking in from both sides
    const charPositions = [
        { x: 80, y: 680, delay: 20, flip: false },
        { x: 120, y: 760, delay: 40, flip: false },
        { x: 60, y: 840, delay: 60, flip: false },
        { x: 820, y: 680, delay: 30, flip: true },
        { x: 780, y: 760, delay: 50, flip: true },
        { x: 840, y: 840, delay: 70, flip: true },
    ];

    return (
        <AbsoluteFill style={{ background: '#050810', overflow: 'hidden' }}>

            {/* Subtle grid background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                    linear-gradient(${PRIMARY}08 1px, transparent 1px),
                    linear-gradient(90deg, ${PRIMARY}08 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }} />

            {/* Radial glow in center */}
            <div style={{
                position: 'absolute',
                top: '40%', left: '50%',
                width: 500, height: 500,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PRIMARY}12 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
            }} />

            {/* Small characters walking in */}
            {charPositions.map((p, i) => (
                <TinyChar key={i} x={p.x} y={p.y} delay={p.delay} frame={frame} fps={fps} flip={p.flip} />
            ))}

            {/* LDAP Server Node — center */}
            <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <ServerNode frame={frame} fps={fps} />
            </div>

            {/* Flow arrows from chars → server */}
            <div style={{ position: 'absolute', top: '42%', left: '18%', transform: 'translateY(-50%)' }}>
                <FlowArrow frame={frame} start={50} end={90} />
            </div>
            <div style={{ position: 'absolute', top: '42%', right: '18%', transform: 'translateY(-50%) scaleX(-1)' }}>
                <FlowArrow frame={frame} start={60} end={100} />
            </div>

            {/* User Cards */}
            {frame >= 70 && (
                <div style={{
                    position: 'absolute',
                    top: '58%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 20,
                    direction: 'ltr',
                }}>
                    <UserCard label="Admin" sub="Full Access" delay={70} frame={frame} fps={fps} color={ACCENT} />
                    <UserCard label="User" sub="Read Only" delay={90} frame={frame} fps={fps} color={PRIMARY} />
                    <UserCard label="Guest" sub="No Access" delay={110} frame={frame} fps={fps} color={GREEN} />
                </div>
            )}

            {/* Shield + Key Icon row */}
            {frame >= 120 && (
                <div style={{
                    position: 'absolute',
                    top: '28%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 30,
                    opacity: interpolate(frame, [120, 135], [0, 1]),
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <Shield size={32} color={PRIMARY} style={{ filter: `drop-shadow(0 0 10px ${PRIMARY})` }} />
                        <span style={{ color: PRIMARY, fontSize: 12, fontFamily: 'Cairo, sans-serif' }}>Auth</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <ArrowRight size={32} color='#ffffff60' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <FolderKey size={32} color={ACCENT} style={{ filter: `drop-shadow(0 0 10px ${ACCENT})` }} />
                        <span style={{ color: ACCENT, fontSize: 12, fontFamily: 'Cairo, sans-serif' }}>AD</span>
                    </div>
                </div>
            )}

            {/* ── TEXT ── */}
            <div style={{
                position: 'absolute',
                bottom: '8%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18,
                padding: '0 60px',
            }}>
                {/* Line 1 */}
                <div style={{
                    opacity: interpolate(s1, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(s1, [0, 1], [30, 0])}px)`,
                    display: frame < t2 + 15 ? 'block' : 'none',
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontSize: 60, fontWeight: 900, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        margin: 0,
                        textShadow: `0 0 30px ${PRIMARY}`,
                    }}>
                        اليوم مع بروتوكول <span style={{ color: PRIMARY }}>LDAP</span>
                    </h1>
                </div>

                {/* Line 2 */}
                <div style={{
                    opacity: interpolate(s2, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(s2, [0, 1], [30, 0])}px)`,
                    display: frame >= t2 ? 'block' : 'none',
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontSize: 48, fontWeight: 800, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        lineHeight: 1.6, margin: 0,
                        textShadow: `0 0 25px ${PRIMARY}40`,
                    }}>
                        وهو المسؤول عن إدارة معلومات المستخدمين داخل{' '}
                        <span style={{ color: ACCENT }}>Active Directory</span>
                    </h1>
                </div>

                {/* Divider line */}
                <div style={{
                    width: interpolate(spring({ frame: frame - 20, fps, config: { damping: 12 } }), [0, 1], [0, 780]),
                    height: 4,
                    background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                    borderRadius: 4,
                    boxShadow: `0 0 20px ${PRIMARY}`,
                }} />
            </div>
        </AbsoluteFill>
    );
};
