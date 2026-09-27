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
    COLORS, CompanyIcon, EmailIcon, HashIcon,
} from '../components/LeakedTheme';

const InfoCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    showAt: number;
    accentColor: string;
    delay?: number;
}> = ({ icon, title, showAt, accentColor, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({
        frame: frame - showAt - delay,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    if (frame < showAt + delay) return null;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            opacity: appear,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px) scale(${interpolate(appear, [0, 1], [0.8, 1])})`,
        }}>
            <div style={{
                width: 120, height: 120, borderRadius: '30px',
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 10px 30px ${accentColor}10`,
            }}>
                {icon}
            </div>
            <span style={{
                fontSize: 40,
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
            }}>{title}</span>
        </div>
    );
};

export const Scene2_DataBreaches: React.FC = () => {
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
                {/* Part A: Companies & Data Breaches (frames 0-250) */}
                {frame < 260 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [245, 260], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '50%',
                            background: `${COLORS.purple}15`, border: `2px solid ${COLORS.purple}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 50px ${COLORS.purple}22`,
                            marginBottom: 20,
                            transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`
                        }}>
                            <CompanyIcon size={80} color={COLORS.purple} />
                        </div>

                        <h2 style={{
                            fontSize: 56, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0,
                            textShadow: '0 5px 20px rgba(0,0,0,0.5)',
                        }}>
                            خلال السنوات الماضية تعرضت آلاف <span style={{ color: COLORS.purple }}>الشركات</span> إلى ما يسمى<br />
                            <span style={{
                                fontSize: 80, fontWeight: 900, fontFamily: 'Inter, sans-serif',
                                background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.blue})`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>DATA BREACHES</span>
                        </h2>
                    </div>
                )}

                {/* Part B: Database leaks explanation (frames 260-450) */}
                {frame >= 260 && frame < 460 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [260, 275], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [445, 460], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <p style={{
                            fontSize: 56, color: '#fff', fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', maxWidth: '90%', lineHeight: 1.6, margin: 0
                        }}>
                            وهي حوادث يتم فيها تسريب <span style={{ color: COLORS.teal }}>قواعد بيانات</span> كاملة تحتوي على معلومات المستخدمين.
                        </p>
                    </div>
                )}

                {/* Part C: Emails & Passwords (frames 460-600) */}
                {frame >= 460 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: '100%',
                        opacity: interpolate(frame, [460, 475], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <h2 style={{
                            fontSize: 60, fontWeight: 800, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: COLORS.white, marginBottom: 80,
                        }}>
                            هذه البيانات غالباً تشمل:
                        </h2>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 100, width: '100%' }}>
                            <InfoCard
                                showAt={480} icon={<EmailIcon size={70} color={COLORS.blue} />}
                                title="Emails" accentColor={COLORS.blue}
                            />
                            <InfoCard
                                showAt={495} icon={<HashIcon size={70} color={COLORS.teal} />}
                                title="Passwords" accentColor={COLORS.teal}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative Cyber Line */}
            <div style={{
                position: 'absolute', bottom: (frame * 3) % 1920, left: 0, right: 0,
                height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.purple}44, transparent)`, opacity: 0.3,
            }} />
        </AbsoluteFill>
    );
};
