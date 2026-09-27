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
    COLORS, BucketIcon, LockOpenIcon, ExposedDBIcon, UserIcon
} from '../components/CloudTheme';

// Helper for tiny data particles
const DataParticle: React.FC<{ delay: number; x: string; y: string }> = ({ delay, x, y }) => {
    const frame = useCurrentFrame();
    const progress = ((frame + delay) % 60) / 60;
    return (
        <div style={{
            position: 'absolute',
            left: x, top: y,
            width: 8, height: 8, background: COLORS.cyan,
            borderRadius: '2px',
            opacity: interpolate(progress, [0, 0.5, 1], [0, 1, 0]),
            transform: `translateY(${interpolate(progress, [0, 1], [20, -100])}px) scale(${interpolate(progress, [0, 1], [0.5, 1.2])})`,
        }} />
    );
};

export const Scene2_Misconfiguration: React.FC = () => {
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

                {/* Part 1: Cloud Misconfiguration & Storage Services (0s - 7s) */}
                {frame < 210 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [195, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                width: 160, height: 160, borderRadius: '40px',
                                background: `${COLORS.cyan}15`, border: `1.5px solid ${COLORS.cyan}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 50px ${COLORS.cyan}15`,
                                transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`
                            }}>
                                <BucketIcon size={100} color={COLORS.cyan} />
                            </div>
                            {/* Moving Data Particles */}
                            <DataParticle delay={0} x="30%" y="80%" />
                            <DataParticle delay={20} x="50%" y="90%" />
                            <DataParticle delay={40} x="70%" y="85%" />
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            هذا ما يسمى <span style={{ color: COLORS.cyan, fontSize: 56 }}>Cloud Misconfiguration</span>.<br />
                            الكثير من الشركات تستخدم خدمات تخزين سحابية مثل <br />
                            <span style={{ color: COLORS.blue }}>Amazon S3</span> أو <span style={{ color: COLORS.blue }}>Google Cloud Storage</span>.
                        </p>
                    </div>
                )}

                {/* Part 2: Wrong Permissions & The "Open Door" (7.3s - 14s) */}
                {frame >= 210 && frame < 420 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [210, 225], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [405, 420], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ position: 'relative', width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* The Bucket with an Open Lock */}
                            <div style={{
                                width: 160, height: 160, borderRadius: '40px',
                                background: `${COLORS.red}15`, border: `1.5px solid ${COLORS.red}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 50px ${COLORS.red}15`,
                                zIndex: 2
                            }}>
                                <LockOpenIcon size={100} color={COLORS.red} />
                            </div>

                            {/* Unauthorized Visitor walking through */}
                            <div style={{
                                position: 'absolute',
                                transform: `translateX(${interpolate(frame, [230, 380], [-400, 400])}px)`,
                                opacity: interpolate(frame, [230, 250], [0, 1], { extrapolateRight: 'clamp' }) *
                                    interpolate(frame, [360, 380], [1, 0], { extrapolateLeft: 'clamp' }),
                                zIndex: 1
                            }}>
                                <UserIcon size={60} color={COLORS.white} />
                                <div style={{ fontSize: 20, color: COLORS.red, textAlign: 'center', fontWeight: 'bold' }}>HACKER</div>
                            </div>
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 600, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            إذا تم إعداد <span style={{ color: COLORS.red }}>الصلاحيات</span> بشكل خاطئ، <br />
                            يمكن <span style={{ color: COLORS.white, textDecoration: 'underline' }}>لأي شخص</span> الوصول للملفات <br />
                            بدون الحاجة لأي كلمة مرور.
                        </p>
                    </div>
                )}

                {/* Part 3: Exposed Buckets & Database Pulse (14.3s - 20s) */}
                {frame >= 420 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [420, 435], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Radiating Leak Wave */}
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: 160, height: 160,
                                    borderRadius: '50%',
                                    border: `2px solid ${COLORS.red}${Math.floor(interpolate((frame + i * 30) % 60, [0, 60], [44, 0])).toString(16).padStart(2, '0')}`,
                                    transform: `scale(${interpolate((frame + i * 30) % 60, [0, 60], [1, 2])})`,
                                }} />
                            ))}
                            <div style={{
                                width: 160, height: 160, borderRadius: '40px',
                                background: `${COLORS.purple}15`, border: `1.5px solid ${COLORS.purple}33`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 20px 50px ${COLORS.purple}15`,
                                transform: `rotate(${Math.sin(frame / 20) * 8}deg)`
                            }}>
                                <ExposedDBIcon size={100} color={COLORS.purple} />
                            </div>
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            يتم أحياناً ترك قواعد البيانات <span style={{
                                color: COLORS.red,
                                fontWeight: 900,
                                opacity: interpolate(Math.sin(frame / 10), [-1, 1], [0.6, 1])
                            }}>EXPOSED</span> عن طريق الخطأ، <br />
                            وهذه تُعرف باسم <span style={{ color: COLORS.purple, fontSize: 52 }}>Exposed Buckets</span>.
                        </p>
                    </div>
                )}

            </div>

            {/* Glowing Scan Bar */}
            <div style={{
                position: 'absolute', top: (frame * 5) % 1920, left: 0, right: 0,
                height: 100, background: `linear-gradient(to bottom, transparent, ${COLORS.blue}08, transparent)`,
                pointerEvents: 'none', opacity: 0.3
            }} />
        </AbsoluteFill>
    );
};
