import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Settings, Cpu, Terminal, Shield, Layers, Zap, LucideProps } from 'lucide-react';

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    top: string;
    left: string;
    delay: number;
    size: number;
    color: string;
}> = ({ icon, top, left, delay, size, color }) => {
    const frame = useCurrentFrame();
    const yShift = Math.sin((frame + delay) / 30) * 15;
    const opacity = 0.04 + Math.sin((frame + delay) / 50) * 0.01;

    return (
        <div style={{
            position: 'absolute',
            top,
            left,
            opacity,
            transform: `translateY(${yShift}px)`,
            color,
        }}>
            {React.cloneElement(icon as React.ReactElement<LucideProps>, { size })}
        </div>
    );
};

const ListItem: React.FC<{
    text: string;
    icon: React.ReactNode;
    showAt: number;
    accentColor: string;
}> = ({ text, icon, showAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12 } });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 25,
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [30, 0])}px)`,
            width: '100%',
            marginBottom: 20,
        }}>
            <div style={{
                width: 70, height: 70, borderRadius: '20px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 20px ${accentColor}15`,
            }}>
                {icon}
            </div>
            <p style={{
                fontSize: 38,
                fontWeight: 600,
                color: 'white',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                margin: 0,
            }}>
                {text}
            </p>
        </div>
    );
};

export const Scene4_Technical: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Section transitions
    const titleSpring = spring({ frame, fps });
    const part1Spring = spring({ frame: frame - 30, fps });
    const part2TitleSpring = spring({ frame: frame - 180, fps });
    const part3TitleSpring = spring({ frame: frame - 350, fps });
    const conclusionSpring = spring({ frame: frame - 550, fps });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            <FloatingIcon icon={<Settings />} top="10%" left="5%" delay={0} size={150} color={COLORS.primary} />
            <FloatingIcon icon={<Cpu />} top="80%" left="10%" delay={100} size={120} color={COLORS.secondary} />
            <FloatingIcon icon={<Layers />} top="15%" left="85%" delay={200} size={130} color={COLORS.accent} />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                padding: '100px 60px',
            }}>
                {/* Main Title */}
                <div style={{
                    opacity: titleSpring,
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
                    marginBottom: 60,
                    textAlign: 'right',
                }}>
                    <h1 style={{
                        fontSize: 75, fontWeight: 900, color: COLORS.primary,
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        textShadow: `0 0 40px ${COLORS.primary}40`,
                    }}>
                        كيف يعمل تقنياً
                    </h1>
                </div>

                {/* Part 1: Android Kernel */}
                <div style={{
                    opacity: part1Spring,
                    transform: `translateY(${interpolate(part1Spring, [0, 1], [20, 0])}px)`,
                    marginBottom: 40,
                    padding: '30px',
                    borderRadius: '25px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRight: `6px solid ${COLORS.secondary}`,
                }}>
                    <p style={{
                        fontSize: 42, fontWeight: 700, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        lineHeight: 1.6,
                    }}>
                        هواتف Android تعمل أصلاً فوق <span style={{ color: COLORS.secondary }}>Linux Kernel</span>.<br />
                        لذلك من الممكن تشغيل بيئة Linux كاملة داخل الهاتف.
                    </p>
                </div>

                {/* Part 2: What NetHunter Does */}
                {frame > 180 && frame < 360 && (
                    <div style={{ opacity: part2TitleSpring }}>
                        <h2 style={{
                            fontSize: 45, fontWeight: 800, color: COLORS.accent,
                            fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            marginBottom: 40,
                        }}>
                            ما يفعله NetHunter هو:
                        </h2>
                        <ListItem text="إضافة Linux Environment داخل النظام" icon={<Layers size={35} color={COLORS.accent} />} showAt={210} accentColor={COLORS.accent} />
                        <ListItem text="توفير Terminal للتحكم الكامل" icon={<Terminal size={35} color={COLORS.accent} />} showAt={240} accentColor={COLORS.accent} />
                        <ListItem text="تشغيل أدوات Security Testing" icon={<Shield size={35} color={COLORS.accent} />} showAt={270} accentColor={COLORS.accent} />
                    </div>
                )}

                {/* Part 3: Technical requirements */}
                {frame >= 360 && frame < 560 && (
                    <div style={{ opacity: part3TitleSpring }}>
                        <h2 style={{
                            fontSize: 45, fontWeight: 800, color: COLORS.primary,
                            fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            marginBottom: 40,
                        }}>
                            تقنياً يتم ذلك باستخدام:
                        </h2>
                        <ListItem text="Root Access لصلاحيات كاملة" icon={<Zap size={35} color={COLORS.primary} />} showAt={390} accentColor={COLORS.primary} />
                        <ListItem text="Custom Kernel لميزات متقدمة" icon={<Cpu size={35} color={COLORS.primary} />} showAt={420} accentColor={COLORS.primary} />
                        <ListItem text="بيئة Chroot لتشغيل النظام" icon={<Layers size={35} color={COLORS.primary} />} showAt={450} accentColor={COLORS.primary} />
                    </div>
                )}

                {/* Final Conclusion */}
                <div style={{
                    position: 'absolute',
                    bottom: 120,
                    left: 60,
                    right: 60,
                    opacity: conclusionSpring,
                    transform: `translateY(${interpolate(conclusionSpring, [0, 1], [40, 0])}px)`,
                    textAlign: 'center',
                    background: `linear-gradient(90deg, transparent, ${COLORS.primary}10, transparent)`,
                    padding: '40px 0',
                    borderTop: `1px solid ${COLORS.primary}20`,
                }}>
                    <p style={{
                        fontSize: 48, fontWeight: 800, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        lineHeight: 1.4,
                    }}>
                        بهذه الطريقة يمكن للهاتف تشغيل أدوات <br />
                        موجودة عادة في أنظمة Linux.
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
