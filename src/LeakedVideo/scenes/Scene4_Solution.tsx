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
    COLORS, MultiSiteIcon, RepeatIcon, ShieldCheckIcon, TwoFactorIcon, WarningIcon
} from '../components/LeakedTheme';

const SolutionItem: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
    showAt: number;
    accentColor: string;
}> = ({ icon, text, showAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 12 }
    });

    if (frame < showAt) return null;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [-30, 0])}px)`,
            background: `linear-gradient(90deg, ${accentColor}15, transparent)`,
            padding: '20px 40px',
            borderRadius: '20px',
            borderRight: `4px solid ${accentColor}`,
            width: '100%',
        }}>
            <div style={{
                width: 90, height: 90, borderRadius: '20px',
                background: COLORS.bg,
                border: `1px solid ${accentColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
            }}>
                {icon}
            </div>
            <p style={{
                fontSize: 38, fontWeight: 700, color: '#fff',
                fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                textAlign: 'right'
            }}>{text}</p>
        </div>
    );
};

export const Scene4_Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={40} />
            <Vignette />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
            }}>

                {/* Part 1: How it works (0s - 12s) */}
                {frame < 360 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [345, 360], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            display: 'flex', gap: 30, marginBottom: 20
                        }}>
                            <MultiSiteIcon size={120} color={COLORS.blue} />
                            <RepeatIcon size={120} color={COLORS.red} />
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 600, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            في هذا النوع من الهجمات يقوم المهاجمون بتجربة نفس <span style={{ color: COLORS.blue }}>Email / Password</span><br />
                            على <span style={{ color: COLORS.yellow }}>آلاف المواقع</span> المختلفة، لأن كثيراً من المستخدمين<br />
                            يعيدون استخدام نفس كلمة المرور.
                        </p>
                    </div>
                )}

                {/* Part 2: The Consequence (12.3s - 19s) */}
                {frame >= 360 && frame < 570 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [360, 375], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [555, 570], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 150, height: 150, borderRadius: '50%',
                            background: `${COLORS.red}20`, border: `2px solid ${COLORS.red}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 50px ${COLORS.red}44`,
                        }}>
                            <WarningIcon size={100} color={COLORS.red} />
                        </div>

                        <h2 style={{
                            fontSize: 54, fontWeight: 800, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            ولهذا السبب قد يتم اختراق <span style={{ color: COLORS.red }}>حسابك</span>…<br />
                            حتى لو لم يتم اختراق <span style={{ color: COLORS.teal }}>الموقع نفسه</span>.
                        </h2>
                    </div>
                )}

                {/* Part 3: Solutions (19.3s - End) */}
                {frame >= 570 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50,
                        width: '100%',
                        opacity: interpolate(frame, [570, 585], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <h2 style={{
                            fontSize: 56, fontWeight: 900, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            color: COLORS.white, marginBottom: 20
                        }}>أهم ممارسات الأمان:</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%', maxWidth: 800 }}>
                            <SolutionItem
                                showAt={600}
                                icon={<ShieldCheckIcon size={60} color={COLORS.teal} />}
                                text={<>استخدام <span style={{ color: COLORS.teal }}>Unique Passwords</span> لكل موقع</>}
                                accentColor={COLORS.teal}
                            />
                            <SolutionItem
                                showAt={630}
                                icon={<TwoFactorIcon size={60} color={COLORS.yellow} />}
                                text={<>تفعيل <span style={{ color: COLORS.yellow }}>Two-Factor Authentication</span></>}
                                accentColor={COLORS.yellow}
                            />
                        </div>

                        <div style={{
                            marginTop: 60,
                            transform: `scale(${interpolate(spring({ frame: frame - 680, fps, config: { damping: 10 } }), [0, 1], [0.8, 1])})`,
                            opacity: interpolate(frame, [680, 700], [0, 1])
                        }}>
                            <span style={{
                                fontSize: 40, fontWeight: 900, fontFamily: 'Inter', letterSpacing: 8,
                                color: COLORS.teal, border: `2px solid ${COLORS.teal}66`,
                                padding: '15px 40px', borderRadius: '15px', background: `${COLORS.teal}08`
                            }}>STAY SAFE</span>
                        </div>
                    </div>
                )}

            </div>

            {/* Ambient Pulse */}
            <div style={{
                position: 'absolute', inset: 0,
                boxShadow: `inset 0 0 100px ${COLORS.teal}${Math.floor(interpolate(Math.sin(frame / 20), [-1, 1], [5, 15]))}`,
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
