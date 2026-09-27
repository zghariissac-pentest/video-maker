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
    COLORS, TokenIcon, HackerIcon,
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

// ─── Custom Icons for Methods ─────────────────────────────────────────────────
const MalwareIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.red }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={`${color}15`} />
        <path d="M8 11h.01M16 11h.01" strokeWidth="3" />
        <path d="M10 16c1.33 1 2.67 1 4 0" />
        <path d="M4.5 7.5L8 11M19.5 7.5L16 11" strokeWidth="2" />
    </svg>
);

const ExtensionIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = COLORS.purple }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" fill={`${color}15`} />
        <path d="M2 8h20" />
        <path d="M16 4v4" />
        <circle cx="12" cy="14" r="3" fill={`${color}33`} />
        <path d="M12 11v6M9 14h6" />
    </svg>
);

const XSSIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = '#ffb03b' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <path d="M10 2l4 20" stroke={`${color}aa`} />
        <circle cx="12" cy="12" r="3" fill={`${color}33`} />
    </svg>
);

// ─── Main Scene Component ─────────────────────────────────────────────────────
export const Scene4_Methods: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const masterOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
        interpolate(frame, [880, 900], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Method active states
    const isMethod1 = frame >= 60 && frame < 240;
    const isMethod2 = frame >= 240 && frame < 450;
    const isMethod3 = frame >= 450 && frame < 660;
    const isMethod4 = frame >= 660 && frame < 880;

    // Center icon element scales
    const m1Scale = interpolate(spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } }), [0, 1], [0, 1]) * (frame > 240 ? interpolate(frame, [240, 250], [1, 0]) : 1);
    const m2Scale = interpolate(spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 12 } }), [0, 1], [0, 1]) * (frame > 450 ? interpolate(frame, [450, 460], [1, 0]) : 1);
    const m3Scale = interpolate(spring({ frame: Math.max(0, frame - 460), fps, config: { damping: 12 } }), [0, 1], [0, 1]) * (frame > 660 ? interpolate(frame, [660, 670], [1, 0]) : 1);

    // Token replay animations
    const hackerReplayX = interpolate(spring({ frame: Math.max(0, frame - 670), fps, config: { damping: 12 } }), [0, 1], [-200, -100]);
    const serverReplayX = interpolate(spring({ frame: Math.max(0, frame - 670), fps, config: { damping: 12 } }), [0, 1], [200, 100]);
    const tokenFly = interpolate(Math.max(0, frame - 720), [0, 40], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={80} />

            <div style={{ opacity: masterOp, width: '100%', height: '100%' }}>

                {/* --- Visuals for Methods --- */}

                {/* M1: Malware */}
                {isMethod1 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: `translate(-50%, -50%) scale(${m1Scale})`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
                    }}>
                        <div style={{
                            width: 260, height: 260, borderRadius: 60,
                            background: `${COLORS.red}1a`, border: `4px solid ${COLORS.red}88`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 80px ${COLORS.red}44 inset, 0 0 50px ${COLORS.red}44`,
                        }}>
                            <MalwareIcon size={140} />
                            <div style={{ position: 'absolute', bottom: -10, right: -10, transform: 'scale(0.7)' }}>
                                <TokenIcon size={80} color={COLORS.blue} />
                            </div>
                        </div>
                        <span style={{ fontSize: 44, fontWeight: 'bold', color: COLORS.red, textTransform: 'uppercase', letterSpacing: 4, textShadow: `0 0 20px ${COLORS.red}` }}>
                            Malware
                        </span>
                    </div>
                )}

                {/* M2: Malicious Extension */}
                {isMethod2 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: `translate(-50%, -50%) scale(${m2Scale})`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
                    }}>
                        <div style={{
                            width: 260, height: 260, borderRadius: 60,
                            background: `${COLORS.purple}1a`, border: `4px solid ${COLORS.purple}88`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 80px ${COLORS.purple}44 inset, 0 0 50px ${COLORS.purple}44`,
                        }}>
                            <ExtensionIcon size={140} />
                            <div style={{ position: 'absolute', bottom: -20, opacity: 0.8, transform: 'scale(0.8)' }}>
                                {"< READ/CHANGE DATA >"}
                            </div>
                        </div>
                        <span style={{ fontSize: 44, fontWeight: 'bold', color: COLORS.purple, textTransform: 'uppercase', letterSpacing: 4, textShadow: `0 0 20px ${COLORS.purple}` }}>
                            Browser Extensions
                        </span>
                    </div>
                )}

                {/* M3: XSS */}
                {isMethod3 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: `translate(-50%, -50%) scale(${m3Scale})`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
                    }}>
                        <div style={{
                            width: 260, height: 260, borderRadius: '50%',
                            background: `#ffb03b1a`, border: `4px solid #ffb03b88`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 80px #ffb03b44 inset, 0 0 50px #ffb03b44`,
                        }}>
                            <XSSIcon size={130} />
                        </div>
                        <span style={{ fontSize: 44, fontWeight: 'bold', color: '#ffb03b', textTransform: 'uppercase', letterSpacing: 4, textShadow: `0 0 20px #ffb03b` }}>
                            Cross-Site Scripting
                        </span>
                    </div>
                )}

                {/* M4: Token Replay */}
                {isMethod4 && (
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%',
                        transform: `translate(-50%, -50%)`,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',
                    }}>
                        {/* Hacker Left */}
                        <div style={{
                            position: 'absolute', left: `calc(50% + ${hackerReplayX}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10
                        }}>
                            <div style={{ width: 150, height: 150, borderRadius: '50%', background: `${COLORS.red}22`, border: `3px solid ${COLORS.red}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <HackerIcon size={80} />
                            </div>
                            <span style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 24 }}>Attacker</span>
                        </div>

                        {/* Server Right */}
                        <div style={{
                            position: 'absolute', left: `calc(50% + ${serverReplayX}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10
                        }}>
                            <div style={{ width: 150, height: 150, borderRadius: 30, background: `${COLORS.teal}22`, border: `3px solid ${COLORS.teal}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke={COLORS.teal} strokeWidth="1.5">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M6 8h.01M6 12h.01M6 16h.01" strokeWidth="3" />
                                </svg>
                            </div>
                            <span style={{ color: COLORS.teal, fontWeight: 'bold', fontSize: 24 }}>Server (Victim Account)</span>
                        </div>

                        {/* Flying token */}
                        {frame > 720 && (
                            <div style={{
                                position: 'absolute',
                                left: `calc(50% + ${interpolate(tokenFly, [0, 1], [hackerReplayX + 80, serverReplayX - 80])}px)`,
                                transform: 'translate(-50%, -50%)', zIndex: 20,
                            }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: 20, background: `${COLORS.blue}22`, border: `3px solid ${COLORS.blue}`,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    boxShadow: `0 0 30px ${COLORS.blue}aa`
                                }}>
                                    <TokenIcon size={40} color={COLORS.blue} />
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* Subtitles */}
                <SubtitleBox
                    text={<>هناك عدة <span style={{ color: COLORS.teal }}>طرق لذلك</span>.</>}
                    showAt={10} hideAt={55}
                />
                <SubtitleBox
                    type="danger"
                    text={<>أحد أشهرها هو <span style={{ color: '#fff' }}>Malware</span> يقوم بقراءة ملفات المتصفح مثل <span style={{ color: COLORS.blue }}>Cookie Storage</span> أو <span style={{ color: COLORS.blue }}>Local Storage</span> واستخراج رموز الجلسات الخاصة بالمواقع.</>}
                    showAt={60} hideAt={240}
                />
                <SubtitleBox
                    text={<>طريقة أخرى هي <span style={{ color: COLORS.purple, fontWeight: 'bold' }}>Malicious Browser Extensions</span> التي تملك صلاحيات مثل <i>Read and Change Data</i>، مما يسمح لها بالوصول إلى Cookies وسرقتها.</>}
                    showAt={250} hideAt={450}
                />
                <SubtitleBox
                    type="warning"
                    text={<>بعض الهجمات تعتمد أيضاً على <span style={{ color: '#fff' }}>Cross-Site Scripting (XSS)</span>، حيث يتم حقن JavaScript داخل الموقع لسرقة <span style={{ color: '#fff' }}>Session Tokens</span> من المتصفح.</>}
                    showAt={460} hideAt={660}
                />
                <SubtitleBox
                    text={<>بعد الحصول على الرمز، يقوم المهاجم باستخدامه في ما يسمى <span style={{ color: COLORS.red, fontWeight: 'bold' }}>Token Replay</span>.</>}
                    showAt={670} hideAt={880}
                />
            </div>
            <Vignette />
        </AbsoluteFill>
    );
};
