import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
} from 'remotion';
import { User, Users, FolderKey, ChevronRight } from 'lucide-react';

const PRIMARY = '#00BDF2';
const GREEN = '#00ff99';
const YELLOW = '#ffd600';
const BG = '#050810';

// ─── typewriter ────────────────────────────────────────────────────────────────
function slice(text: string, startFrame: number, frame: number, speed = 2): string {
    return text.slice(0, Math.max(0, Math.floor((frame - startFrame) / speed)));
}

// ─── Step Badge ────────────────────────────────────────────────────────────────
const StepBadge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const s = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 90 } });
    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: `${YELLOW}15`,
            border: `2px solid ${YELLOW}`,
            borderRadius: 50,
            padding: '10px 28px',
            boxShadow: `0 0 30px ${YELLOW}40`,
        }}>
            <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: YELLOW,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: 900, fontSize: 18, fontFamily: 'monospace',
            }}>2</div>
            <span style={{ color: YELLOW, fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 26, letterSpacing: 1 }}>
                جمع المعلومات
            </span>
        </div>
    );
};

// ─── Terminal line ──────────────────────────────────────────────────────────────
const TerminalBlock: React.FC<{
    frame: number; fps: number;
    cmd: string; cmdStart: number; cmdColor?: string;
    results: { text: string; delay: number; color?: string }[];
}> = ({ frame, fps, cmd, cmdStart, cmdColor = PRIMARY, results }) => {
    const s = spring({ frame: frame - cmdStart + 10, fps, config: { damping: 12 } });

    return (
        <div style={{
            opacity: interpolate(s, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
            background: 'rgba(5,8,16,0.97)',
            border: `1.5px solid ${PRIMARY}30`,
            borderRadius: 16,
            padding: '20px 26px',
            boxShadow: `0 0 40px ${PRIMARY}10`,
            width: 920,
            fontFamily: 'monospace',
        }}>
            {/* Title bar */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: 10, color: '#ffffff40', fontSize: 13 }}>kali@terminal</span>
            </div>
            {/* Prompt + cmd */}
            <div style={{ fontSize: 26, lineHeight: 1.5 }}>
                <span style={{ color: GREEN }}>┌──root@kali─[~]<br />└─$ </span>
                <span style={{ color: cmdColor, textShadow: `0 0 15px ${cmdColor}` }}>
                    {slice(cmd, cmdStart, frame, 2)}
                </span>
                {slice(cmd, cmdStart, frame, 2).length < cmd.length && (
                    <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0, color: cmdColor }}>▮</span>
                )}
            </div>
            {/* Results */}
            {results.map((r, i) => (
                frame >= r.delay && (
                    <div key={i} style={{
                        fontSize: 22,
                        color: r.color ?? '#ffffff60',
                        opacity: interpolate(frame, [r.delay, r.delay + 10], [0, 1], { extrapolateRight: 'clamp' }),
                        marginTop: 6,
                        paddingLeft: 10,
                        borderLeft: `2px solid ${r.color ?? '#ffffff20'}`,
                    }}>
                        {slice(r.text, r.delay, frame, 1)}
                    </div>
                )
            ))}
        </div>
    );
};

// ─── Extracted Entity Card ──────────────────────────────────────────────────────
const EntityCard: React.FC<{
    icon: React.ReactNode; label: string; sub: string;
    delay: number; frame: number; fps: number; color: string; fromRight?: boolean;
}> = ({ icon, label, sub, delay, frame, fps, color, fromRight }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 80 } });
    const x = interpolate(s, [0, 1], [fromRight ? 200 : -200, 0]);
    const op = interpolate(s, [0, 1], [0, 1]);

    return (
        <div style={{
            opacity: op,
            transform: `translateX(${x}px)`,
            background: `${color}10`,
            border: `1.5px solid ${color}50`,
            borderRadius: 14,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: `0 0 20px ${color}20`,
            minWidth: 260,
        }}>
            <div style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: `${color}20`,
                border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color,
            }}>
                {icon}
            </div>
            <div>
                <div style={{ color: 'white', fontFamily: 'monospace', fontWeight: 700, fontSize: 18 }}>{label}</div>
                <div style={{ color: `${color}aa`, fontFamily: 'Cairo, sans-serif', fontSize: 14 }}>{sub}</div>
            </div>
        </div>
    );
};

// ─── SCENE ─────────────────────────────────────────────────────────────────────
export const Scene4_LDAPSearch: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const CMD = 'ldapsearch -x -H ldap://target -b "dc=corp,dc=local"';
    const cmdStart = 35;
    const cmdDone = cmdStart + CMD.length * 2;
    const r1 = cmdDone + 8;
    const r2 = r1 + 20;
    const r3 = r2 + 20;
    const cardsStart = r3 + 30;

    return (
        <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
            {/* Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(${PRIMARY}06 1px, transparent 1px), linear-gradient(90deg, ${PRIMARY}06 1px, transparent 1px)`,
                backgroundSize: '70px 70px',
            }} />

            {/* ── Header area ── */}
            <div style={{
                position: 'absolute',
                top: '7%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
            }}>
                <StepBadge frame={frame} fps={fps} />

                {/* Arabic text */}
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 15, fps, config: { damping: 13 } }), [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(spring({ frame: frame - 15, fps, config: { damping: 13 } }), [0, 1], [20, 0])}px)`,
                    textAlign: 'center',
                    marginTop: 4,
                }}>
                    <h1 style={{
                        fontSize: 52, fontWeight: 900, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        margin: 0,
                        textShadow: `0 0 30px ${PRIMARY}`,
                    }}>
                        الآن نبدأ جمع المعلومات باستعمال <span style={{ color: PRIMARY }}>ldapsearch</span>
                    </h1>
                </div>

                {/* Sub-text */}
                <div style={{
                    opacity: interpolate(spring({ frame: frame - 25, fps, config: { damping: 13 } }), [0, 1], [0, 1]),
                }}>
                    <h2 style={{
                        fontSize: 36, fontWeight: 700, color: `${PRIMARY}99`,
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                        margin: 0,
                    }}>
                        لاستخراج المستخدمين والمجموعات
                    </h2>
                </div>
            </div>

            {/* ── Terminal ── */}
            <div style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <TerminalBlock
                    frame={frame}
                    fps={fps}
                    cmd={CMD}
                    cmdStart={cmdStart}
                    results={[
                        { text: 'dn: uid=admin,ou=Users,dc=corp,dc=local', delay: r1, color: `${GREEN}cc` },
                        { text: 'dn: uid=john,ou=Users,dc=corp,dc=local', delay: r2, color: `${GREEN}99` },
                        { text: 'dn: cn=IT Team,ou=Groups,dc=corp,dc=local', delay: r3, color: `${YELLOW}cc` },
                    ]}
                />
            </div>

            {/* ── Extracted entity cards ── */}
            {frame >= cardsStart && (
                <div style={{
                    position: 'absolute',
                    top: '66%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    gap: 18,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '90%',
                }}>
                    <EntityCard
                        icon={<User size={22} />}
                        label="uid=admin"
                        sub="مستخدم — صلاحيات عالية"
                        delay={cardsStart}
                        frame={frame} fps={fps}
                        color={PRIMARY}
                    />
                    <EntityCard
                        icon={<User size={22} />}
                        label="uid=john"
                        sub="مستخدم — عضو IT"
                        delay={cardsStart + 20}
                        frame={frame} fps={fps}
                        color={GREEN}
                        fromRight
                    />
                    <EntityCard
                        icon={<Users size={22} />}
                        label="cn=IT Team"
                        sub="مجموعة — وصول شبكي"
                        delay={cardsStart + 40}
                        frame={frame} fps={fps}
                        color={YELLOW}
                    />
                </div>
            )}

            {/* ── Character peeking ── */}
            <div style={{
                position: 'absolute',
                bottom: '3%',
                right: interpolate(
                    spring({ frame: frame - 0, fps, config: { damping: 12 } }),
                    [0, 1], [-130, 30]
                ),
                opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
                <img src={staticFile('assets/reaper.png')}
                    style={{ width: 110, height: 110, imageRendering: 'pixelated', transform: 'scaleX(-1)' }} />
            </div>

            {/* ── Tip arrow line ── */}
            {frame >= cardsStart + 50 && (
                <div style={{
                    position: 'absolute',
                    bottom: '9%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: interpolate(frame, [cardsStart + 50, cardsStart + 65], [0, 1], { extrapolateRight: 'clamp' }),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <FolderKey size={26} color={YELLOW} style={{ filter: `drop-shadow(0 0 10px ${YELLOW})` }} />
                    <ChevronRight size={20} color='#ffffff40' />
                    <span style={{
                        color: 'white', fontFamily: 'Cairo, sans-serif',
                        fontSize: 36, fontWeight: 800, direction: 'rtl',
                        textShadow: `0 0 20px ${YELLOW}`,
                    }}>
                        نحفظ هذه المعلومات للخطوة القادمة
                    </span>
                </div>
            )}
        </AbsoluteFill>
    );
};
