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
    COLORS, TokenIcon, HackerIcon, LockOpenIcon,
} from '../components/SessionTheme';

// ─── Elegant Clean Text Block ──────────────────────────────────────────────────
const CleanStatement: React.FC<{
    text: React.ReactNode;
    icon: React.ReactNode;
    showAt: number;
    hideAt?: number;
    accentColor: string;
}> = ({ text, icon, showAt, hideAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    // Smooth and elegant slide up + fade
    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14, stiffness: 100 } });
    const yOffset = interpolate(appear, [0, 1], [40, 0]);
    const scale = interpolate(appear, [0, 1], [0.95, 1]);

    // Smooth fade out
    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px) scale(${scale})`,
            gap: 40,
            zIndex: 20,
        }}>
            {/* Elegant Icon Presentation */}
            <div style={{
                width: 140, height: 140, borderRadius: '50%',
                background: `${accentColor}11`, border: `2px solid ${accentColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 40px ${accentColor}22, inset 0 0 20px ${accentColor}11`,
            }}>
                <div style={{ transform: 'scale(1.2)' }}>
                    {icon}
                </div>
            </div>

            {/* Typography */}
            <p style={{
                fontSize: 64,
                fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.5,
                maxWidth: '80%',
                margin: 0,
                textShadow: `0 10px 30px rgba(0,0,0,0.8), 0 2px 10px ${accentColor}44`,
            }}>
                {text}
            </p>
        </div>
    );
};

// ─── Scene 1 — Hook (Clean & Elegant) ─────────────────────────────────────────
export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene transition fades
    const masterOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
        interpolate(frame, [285, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <CyberBg />

            {/* Minimalist Grid overlay to give more tech feel */}
            <AbsoluteFill style={{
                backgroundImage: `linear-gradient(${COLORS.teal}05 1px, transparent 1px), linear-gradient(90deg, ${COLORS.teal}05 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: 0.5,
                zIndex: 0,
                transform: `translateY(${(frame * 0.5) % 40}px)`,
            }} />

            <StarField count={80} />

            <div style={{ opacity: masterOp, width: '100%', height: '100%' }}>

                {/* Statement 1: frames 10 to 110 */}
                <CleanStatement
                    showAt={10} hideAt={110}
                    accentColor={COLORS.red}
                    icon={<HackerIcon size={80} color={COLORS.red} />}
                    text={
                        <>
                            المخترقون يمكنهم الدخول إلى <span style={{ color: COLORS.red }}>حسابك</span><br />
                            بدون كلمة المرور…
                        </>
                    }
                />

                {/* Statement 2: frames 115 to 205 */}
                <CleanStatement
                    showAt={115} hideAt={205}
                    accentColor={COLORS.teal}
                    icon={<LockOpenIcon size={80} color={COLORS.teal} />}
                    text={
                        <>
                            بل أحياناً حتى بدون كسر أي <span style={{ color: COLORS.teal }}>حماية</span>.
                        </>
                    }
                />

                {/* Statement 3: frames 210 to End */}
                {frame >= 210 && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        opacity: interpolate(frame, [210, 225], [0, 1], { extrapolateRight: 'clamp' }),
                        gap: 20,
                        zIndex: 30,
                    }}>
                        <p style={{
                            fontSize: 56, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            color: 'rgba(255,255,255,0.9)', textAlign: 'center', margin: 0,
                            transform: `translateY(${interpolate(spring({ frame: frame - 210, fps, config: { damping: 14 } }), [0, 1], [30, 0])}px)`
                        }}>
                            السبب هو شيء يسمى
                        </p>

                        <div style={{
                            transform: `scale(${interpolate(spring({ frame: frame - 230, fps, config: { damping: 12 } }), [0, 1], [0.8, 1])})`,
                            opacity: frame >= 230 ? 1 : 0,
                        }}>
                            <h1 style={{
                                fontSize: 90,
                                fontWeight: 900,
                                fontFamily: 'Inter, sans-serif',
                                margin: 0,
                                textAlign: 'center',
                                background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.blue} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: `0 10px 40px ${COLORS.teal}66`,
                                letterSpacing: '-1px',
                                padding: '20px',
                            }}>
                                SESSION HIJACKING
                            </h1>
                        </div>

                        {/* Token Icon beneath to seal the deal */}
                        <div style={{
                            marginTop: 20,
                            transform: `translateY(${interpolate(spring({ frame: frame - 245, fps, config: { damping: 12 } }), [0, 1], [20, 0])}px)`,
                            opacity: interpolate(frame, [245, 260], [0, 1], { extrapolateRight: 'clamp' }),
                        }}>
                            <TokenIcon size={120} color={COLORS.blue} />
                        </div>
                    </div>
                )}

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
