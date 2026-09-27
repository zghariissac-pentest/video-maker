import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';

const PRIMARY = '#00BDF2';
const GREEN = '#00ff99';
const BG = '#050810';

// ─── typewriter ────────────────────────────────────────────────────────────────
function useTypewriter(text: string, startFrame: number, frame: number, speed = 2): string {
    const chars = Math.floor(Math.max(0, frame - startFrame) / speed);
    return text.slice(0, chars);
}

// ─── Terminal window ───────────────────────────────────────────────────────────
const Terminal: React.FC<{
    frame: number;
    fps: number;
    lines: { text: string; startFrame: number; color?: string; speed?: number }[];
}> = ({ frame, fps, lines }) => {
    const s = spring({ frame: frame - 5, fps, config: { damping: 12 } });
    const opacity = interpolate(s, [0, 1], [0, 1]);
    const translateY = interpolate(s, [0, 1], [40, 0]);

    return (
        <div style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            background: 'rgba(5,8,16,0.95)',
            border: `1.5px solid ${PRIMARY}40`,
            borderRadius: 16,
            padding: '22px 28px',
            boxShadow: `0 0 40px ${PRIMARY}20, inset 0 0 20px rgba(0,0,0,0.5)`,
            width: 900,
        }}>
            {/* Title bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 12, color: '#ffffff50', fontFamily: 'monospace', fontSize: 14 }}>terminal</span>
            </div>

            {/* Prompt + lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {lines.map((line, i) => {
                    const typed = useTypewriter(line.text, line.startFrame, frame, line.speed ?? 2);
                    const visible = frame >= line.startFrame - 5;
                    const isPrompt = line.text.startsWith('$');
                    const lineOpacity = interpolate(frame, [line.startFrame - 5, line.startFrame + 5], [0, 1], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                    });

                    if (!visible) return null;
                    return (
                        <div key={i} style={{ opacity: lineOpacity, fontFamily: 'monospace', fontSize: 28, lineHeight: 1.4 }}>
                            {isPrompt ? (
                                <span>
                                    <span style={{ color: GREEN }}>┌──</span>
                                    <span style={{ color: PRIMARY }}>root</span>
                                    <span style={{ color: '#fff' }}>@kali</span>
                                    <span style={{ color: GREEN }}>─</span>
                                    <span style={{ color: '#fff50' }}>[~]</span>
                                    <br />
                                    <span style={{ color: GREEN }}>└─$ </span>
                                    <span style={{ color: line.color ?? '#fff', textShadow: `0 0 20px ${line.color ?? PRIMARY}` }}>
                                        {typed.replace(/^\$ ?/, '')}
                                    </span>
                                    {/* Cursor blink after last char */}
                                    {typed.length < line.text.replace(/^\$ ?/, '').length + 1 && (
                                        <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0, color: line.color ?? '#fff' }}>▮</span>
                                    )}
                                </span>
                            ) : (
                                <span style={{ color: line.color ?? '#ffffff80' }}>{typed}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Port Status Badge ─────────────────────────────────────────────────────────
const PortBadge: React.FC<{ frame: number; fps: number; delay: number }> = ({ frame, fps, delay }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 8, stiffness: 100 } });
    const pulse = 1 + Math.sin(frame / 8) * 0.06;

    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `scale(${interpolate(s, [0, 1], [0.3, 1]) * pulse})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
        }}>
            <div style={{
                background: `${GREEN}15`,
                border: `2.5px solid ${GREEN}`,
                borderRadius: 16,
                padding: '14px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: `0 0 30px ${GREEN}60`,
            }}>
                <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: GREEN,
                    boxShadow: `0 0 12px ${GREEN}`,
                    animation: 'pulse 1s infinite',
                }} />
                <span style={{ color: GREEN, fontFamily: 'monospace', fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>
                    PORT 389 — OPEN
                </span>
            </div>
            <span style={{ color: `${GREEN}80`, fontFamily: 'monospace', fontSize: 16 }}>
                LDAP is running ✓
            </span>
        </div>
    );
};

// ─── Scan line sweeping effect ─────────────────────────────────────────────────
const ScanLine: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
    const t = frame - start;
    if (t < 0 || t > 45) return null;
    const y = interpolate(t, [0, 45], [0, 1500]);
    const opacity = interpolate(t, [0, 10, 35, 45], [0, 0.8, 0.8, 0]);

    return (
        <div style={{
            position: 'absolute',
            left: 0, right: 0,
            top: y,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
            opacity,
            boxShadow: `0 0 20px 5px ${PRIMARY}60`,
            zIndex: 50,
        }} />
    );
};

// ─── SCENE ─────────────────────────────────────────────────────────────────────
export const Scene3_Nmap: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Cmd types out starting at frame 35 (after text appears)
    const CMD = 'nmap -p 389 target';
    const RESULT_LINES = [
        '389/tcp  open  ldap',
        'Service Info: LDAP Active Directory',
    ];

    const cmdDone = 35 + CMD.length * 2;
    const result1Start = cmdDone + 10;
    const result2Start = result1Start + 30;
    const badgeDelay = result2Start + 25;
    const charDelay = 0;

    return (
        <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
            {/* Grid background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(${PRIMARY}06 1px, transparent 1px), linear-gradient(90deg, ${PRIMARY}06 1px, transparent 1px)`,
                backgroundSize: '70px 70px',
            }} />

            <ScanLine frame={frame} start={30} />

            {/* ── Arabic text (top) ── */}
            <div style={{
                position: 'absolute',
                top: '8%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
            }}>
                {/* Line 1 */}
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 5, fps, config: { damping: 13 } }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 5, fps, config: { damping: 13 } }), [0, 1], [30, 0])}px)`,
                }}>
                    <h1 style={{
                        fontSize: 56, fontWeight: 900, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        margin: 0,
                        textShadow: `0 0 30px ${PRIMARY}`,
                    }}>
                        أول شيء: نتأكد أن <span style={{ color: PRIMARY }}>LDAP</span> يعمل
                    </h1>
                </div>

                {/* Line 2 — "use this command" */}
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 20, fps, config: { damping: 13 } }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 20, fps, config: { damping: 13 } }), [0, 1], [20, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 40, fontWeight: 700, color: `${PRIMARY}cc`,
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        margin: 0,
                    }}>
                        نستعمل:
                    </h2>
                </div>
            </div>

            {/* ── Terminal Window ── */}
            <div style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Terminal
                    frame={frame}
                    fps={fps}
                    lines={[
                        { text: `$ ${CMD}`, startFrame: 35, color: PRIMARY, speed: 2 },
                        { text: RESULT_LINES[0], startFrame: result1Start, color: `${GREEN}cc`, speed: 1 },
                        { text: RESULT_LINES[1], startFrame: result2Start, color: '#ffffff60', speed: 1 },
                    ]}
                />
            </div>

            {/* ── Port Open Badge ── */}
            {frame >= badgeDelay && (
                <div style={{ position: 'absolute', top: '62%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <PortBadge frame={frame} fps={fps} delay={badgeDelay} />
                </div>
            )}

            {/* ── Character peeking in from side ── */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                left: interpolate(spring({ frame: frame - charDelay, fps, config: { damping: 12 } }), [0, 1], [-120, 30]),
                opacity: interpolate(frame, [charDelay, charDelay + 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
                <img
                    src={staticFile('assets/reaper.png')}
                    style={{ width: 130, height: 130, imageRendering: 'pixelated' }}
                />
            </div>

            {/* ── Bottom conclusion ── */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                width: '100%',
                textAlign: 'center',
                opacity: interpolate(frame, [badgeDelay + 20, badgeDelay + 35], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(spring({ frame: frame - (badgeDelay + 20), fps, config: { damping: 12 } }), [0, 1], [20, 0])}px)`,
            }}>
                <h2 style={{
                    fontSize: 46, fontWeight: 900, color: 'white',
                    fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                    margin: 0,
                    textShadow: `0 0 30px ${GREEN}`,
                }}>
                    إذا كان المنفذ مفتوح — <span style={{ color: GREEN }}>نكمل ✓</span>
                </h2>
            </div>
        </AbsoluteFill>
    );
};
