import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    CyberBg, StarField, Vignette,
    COLORS, TokenIcon, HackerIcon
} from '../components/SessionTheme';

// ─── Subtitle Text Box ────────────────────────────────────────────────────────
const SubtitleBox: React.FC<{ text: string | React.ReactNode; showAt: number; hideAt?: number; type?: 'normal' | 'danger' | 'warning' }> = ({ text, showAt, hideAt, type = 'normal' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const op = interpolate(frame, [showAt, showAt + 15], [0, 1], { extrapolateRight: 'clamp' });
    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;
    const y = interpolate(spring({ frame: frame - showAt, fps, config: { damping: 14 } }), [0, 1], [40, 0]);

    const borderColor = type === 'danger' ? COLORS.red : type === 'warning' ? '#ffb03b' : COLORS.teal;

    return (
        <div style={{
            position: 'absolute',
            bottom: '12%',
            left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: op * outOp, transform: `translateY(${y}px)`,
            zIndex: 40,
        }}>
            <p style={{
                fontSize: type === 'danger' ? 68 : 56,
                fontWeight: type === 'danger' ? 800 : 700,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: type === 'danger' ? COLORS.red : 'rgba(255,255,255,0.95)',
                maxWidth: '85%',
                lineHeight: 1.5,
                textShadow: type === 'danger' ? `0 0 40px ${COLORS.red}` : `0 5px 30px ${COLORS.bg}, 0 2px 15px rgba(0,0,0,0.9)`,
                padding: '30px 60px',
                background: type === 'danger' ? `rgba(${parseInt(COLORS.red.slice(1, 3), 16)}, ${parseInt(COLORS.red.slice(3, 5), 16)}, ${parseInt(COLORS.red.slice(5, 7), 16)}, 0.15)` : 'rgba(5, 10, 15, 0.85)',
                border: `2px solid ${borderColor}66`,
                borderRadius: 36,
                backdropFilter: 'blur(15px)',
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px ${borderColor}22`,
            }}>{text}</p>
        </div>
    );
};

// ─── Data Packet ─────────────────────────────────────────────────────────────
const DataPacket: React.FC<{ progress: number; delay: number }> = ({ progress, delay }) => {
    if (progress <= 0 || progress >= 1) return null;

    // Hacker to Server curve
    const x = interpolate(progress, [0, 1], [-200, 200]);
    // Parabola trajectory
    const y = interpolate(progress, [0, 0.5, 1], [0, -100, 0]);

    return (
        <div style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            width: 16, height: 16,
            borderRadius: '50%',
            background: COLORS.blue,
            boxShadow: `0 0 20px ${COLORS.blue}, 0 0 10px ${COLORS.teal}`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
        }} />
    );
};

// ─── Main Scene Component ─────────────────────────────────────────────────────
export const Scene5_Impact: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const masterOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
        interpolate(frame, [780, 800], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // P1: Sending Request
    const showP1 = frame > 0 && frame < 380;

    // P2: Password vs Session
    const showP2 = frame >= 380 && frame < 800;

    // Server checkmark
    const checkScale = interpolate(spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 10 } }), [0, 1], [0, 1]);

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <CyberBg />

            {showP2 && (
                <AbsoluteFill style={{
                    background: `radial-gradient(circle at center, transparent 0%, ${COLORS.red} 100%)`,
                    opacity: interpolate(frame, [380, 420], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                    mixBlendMode: 'screen',
                }} />
            )}

            <StarField count={70} />

            <div style={{ opacity: masterOp, width: '100%', height: '100%' }}>

                {/* --- Part 1: Attacker talking to Server --- */}
                {showP1 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',
                    }}>
                        {/* Hacker (Left) */}
                        <div style={{
                            position: 'absolute', left: `calc(50% - 200px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10
                        }}>
                            <div style={{ width: 140, height: 140, borderRadius: '50%', background: `${COLORS.red}22`, border: `4px solid ${COLORS.red}`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 40px ${COLORS.red}55` }}>
                                <HackerIcon size={70} />
                            </div>
                            <span style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 28, textShadow: `0 0 10px ${COLORS.red}` }}>المهاجم</span>

                            {/* Stolen Token Display */}
                            <div style={{ position: 'absolute', bottom: -10, right: -10, transform: 'scale(0.8)' }}>
                                <div style={{ width: 60, height: 60, borderRadius: 15, background: `${COLORS.blue}33`, border: `2px solid ${COLORS.blue}`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 20px ${COLORS.blue}aa` }}>
                                    <TokenIcon size={30} color={COLORS.blue} />
                                </div>
                            </div>
                        </div>

                        {/* Data Packets Firing */}
                        {frame > 30 && (
                            <>
                                <DataPacket progress={((frame - 30) % 90) / 90} delay={0} />
                                <DataPacket progress={((frame - 60) % 90) / 90} delay={0} />
                                <DataPacket progress={((frame - 90) % 90) / 90} delay={0} />
                            </>
                        )}

                        {/* Server (Right) */}
                        <div style={{
                            position: 'absolute', left: `calc(50% + 200px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10
                        }}>
                            <div style={{ width: 140, height: 140, borderRadius: 30, background: frame > 200 ? `${COLORS.teal}22` : `rgba(255,255,255,0.05)`, border: `4px solid ${frame > 200 ? COLORS.teal : 'rgba(255,255,255,0.2)'}`, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.5s ease', boxShadow: frame > 200 ? `0 0 40px ${COLORS.teal}55` : 'none' }}>
                                <svg width={70} height={70} viewBox="0 0 24 24" fill="none" stroke={frame > 200 ? COLORS.teal : '#aaa'} strokeWidth="1.5">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M6 8h.01M6 12h.01M6 16h.01" strokeWidth="3" />
                                </svg>

                                {/* Approval Checkmark */}
                                {frame > 200 && (
                                    <div style={{
                                        position: 'absolute', bottom: -15, right: -15, width: 50, height: 50,
                                        borderRadius: '50%', background: COLORS.teal, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        transform: `scale(${checkScale})`,
                                    }}>
                                        <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <span style={{ color: frame > 200 ? COLORS.teal : '#aaa', fontWeight: 'bold', fontSize: 28, transition: 'color 0.5s ease' }}>الخادم</span>
                        </div>
                    </div>
                )}

                {/* --- Part 2: Old vs New Paradigm --- */}
                {showP2 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: `translate(-50%, -50%) scale(${interpolate(spring({ frame: Math.max(0, frame - 380), fps, config: { damping: 12 } }), [0, 1], [0, 1])})`,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, width: '100%',
                    }}>
                        {/* Old Way: Password Cracking (Strikethrough / X'd out) */}
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10,
                            opacity: frame > 560 ? 0.3 : 1, transition: 'opacity 0.5s ease'
                        }}>
                            <div style={{ position: 'relative', width: 200, height: 200, borderRadius: '50%', background: `rgba(255,255,255,0.05)`, border: `4px dashed rgba(255,255,255,0.2)`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: 80 }}>🔑</span>

                                {frame > 450 && (
                                    <div style={{ position: 'absolute', inset: -10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '120%', height: 10, background: COLORS.red, transform: 'rotate(-45deg)', boxShadow: `0 0 20px ${COLORS.red}` }} />
                                    </div>
                                )}
                            </div>
                            <span style={{ color: '#aaa', fontWeight: 'bold', fontSize: 32, textTransform: 'uppercase' }}>Cracking<br />Passwords</span>
                        </div>

                        <div style={{ color: COLORS.red, fontSize: 60, fontWeight: 'bold', opacity: frame > 550 ? 1 : 0 }}>VS</div>

                        {/* New Way: Session Stealing (Highlighted) */}
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10,
                            transform: `scale(${interpolate(spring({ frame: Math.max(0, frame - 550), fps, config: { damping: 12 } }), [0, 1], [0.8, 1.2])})`,
                            opacity: frame > 550 ? 1 : 0.3, transition: 'opacity 0.5s ease'
                        }}>
                            <div style={{ width: 220, height: 220, borderRadius: 50, background: `${COLORS.blue}22`, border: `5px solid ${COLORS.blue}`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: frame > 550 ? `0 0 60px ${COLORS.blue}aa` : 'none', transition: 'box-shadow 0.5s ease' }}>
                                <TokenIcon size={120} color={COLORS.blue} />
                                <div style={{ position: 'absolute', top: -10, right: -10, transform: 'scale(0.8)' }}>
                                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: COLORS.red, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 20px ${COLORS.red}` }}>
                                        <HackerIcon size={35} color="#fff" />
                                    </div>
                                </div>
                            </div>
                            <span style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 36, textTransform: 'uppercase', textShadow: `0 0 15px ${COLORS.blue}` }}>Stealing<br />Sessions</span>
                        </div>
                    </div>
                )}

                {/* Subtitles */}
                <SubtitleBox
                    text={<>أي أنه يرسل طلبات إلى الخادم مع <span style={{ color: COLORS.blue }}>Session Cookie المسروق</span>.</>}
                    showAt={10} hideAt={180}
                />
                <SubtitleBox
                    type="danger"
                    text={<>وبما أن الرمز ما زال صالحاً، الخادم يتعامل مع <span style={{ color: '#fff' }}>المهاجم</span> وكأنه <span style={{ color: COLORS.teal }}>المستخدم الحقيقي</span>.</>}
                    showAt={190} hideAt={370}
                />
                <SubtitleBox
                    text={<>لهذا السبب في كثير من الهجمات الحديثة، المخترقون لا يحاولون <span style={{ color: COLORS.red, fontWeight: 'bold' }}>Crack Passwords</span>…</>}
                    showAt={380} hideAt={550}
                />
                <SubtitleBox
                    type="warning"
                    text={<>بل يسرقون <span style={{ color: COLORS.blue }}>Sessions</span> مباشرة.</>}
                    showAt={560} hideAt={780}
                />
            </div>
            <Vignette />
        </AbsoluteFill>
    );
};
