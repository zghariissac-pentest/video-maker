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
    COLORS, HashIcon, HackingIcon, DumpIcon, StuffingIcon
} from '../components/LeakedTheme';

export const Scene3_Mechanism: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: COLORS.bg, overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={50} />
            <Vignette />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
            }}>

                {/* Part 1: What is a Password Hash? (0s - 7s) */}
                {frame < 220 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [205, 220], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '40px',
                            background: `${COLORS.teal}15`, border: `2px solid ${COLORS.teal}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 50px ${COLORS.teal}22`,
                            transform: `rotate(${Math.sin(frame / 30) * 10}deg)`
                        }}>
                            <HashIcon size={80} color={COLORS.teal} />
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            لـ <span style={{ color: COLORS.teal }}>Password Hash</span> هو تمثيل مشفّر لكلمة المرور باستخدام خوارزميات مثل <br />
                            <span style={{ fontFamily: 'Inter', color: COLORS.blue }}>SHA-256</span> أو <span style={{ fontFamily: 'Inter', color: COLORS.purple }}>bcrypt</span>
                        </p>
                    </div>
                )}

                {/* Part 2: The Problem (7.3s - 14s) */}
                {frame >= 220 && frame < 430 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [220, 235], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [415, 430], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '50%',
                            background: `${COLORS.red}15`, border: `2px solid ${COLORS.red}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 60px ${COLORS.red}33`,
                        }}>
                            <HackingIcon size={80} color={COLORS.red} />
                        </div>

                        <p style={{
                            fontSize: 44, fontWeight: 600, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            لكن المشكلة أن بعض الأنظمة تستخدم <span style={{ color: COLORS.red }}>خوارزميات ضعيفة</span>،<br />
                            مما يسمح للمهاجمين باستعادة كلمة المرور عبر <span style={{ color: COLORS.yellow }}>Hash Cracking</span>.
                        </p>
                    </div>
                )}

                {/* Part 3: Credential Dumps (14.3s - 21s) */}
                {frame >= 430 && frame < 640 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [430, 445], [0, 1], { extrapolateRight: 'clamp' }) *
                            interpolate(frame, [625, 640], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '40px',
                            background: `${COLORS.yellow}15`, border: `2px solid ${COLORS.yellow}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 50px ${COLORS.yellow}22`,
                        }}>
                            <DumpIcon size={80} color={COLORS.yellow} />
                        </div>

                        <p style={{
                            fontSize: 48, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            بعد ذلك يتم نشر هذه البيانات في ما يسمى <br />
                            <span style={{ fontSize: 70, color: COLORS.yellow, fontWeight: 900 }}>CREDENTIAL DUMPS</span>
                        </p>
                    </div>
                )}

                {/* Part 4: Credential Stuffing (21.3s - 28s) */}
                {frame >= 640 && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
                        opacity: interpolate(frame, [640, 655], [0, 1], { extrapolateRight: 'clamp' })
                    }}>
                        <div style={{
                            width: 160, height: 160, borderRadius: '40px',
                            background: `${COLORS.blue}20`, border: `2px solid ${COLORS.blue}66`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 0 70px ${COLORS.blue}33`,
                            transform: `scale(${spring({ frame: frame - 640, fps, config: { damping: 10 } })})`
                        }}>
                            <StuffingIcon size={100} color={COLORS.blue} />
                        </div>

                        <p style={{
                            fontSize: 50, fontWeight: 700, fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            textAlign: 'center', color: '#fff', lineHeight: 1.6, margin: 0
                        }}>
                            هنا تبدأ هجمة أخرى تسمى <br />
                            <span style={{
                                fontSize: 80, fontWeight: 900,
                                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.teal})`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>CREDENTIAL STUFFING</span>
                        </p>
                    </div>
                )}

            </div>

            {/* Scanning Line Effect */}
            <div style={{
                position: 'absolute', top: (frame * 5) % 1920, left: 0, right: 0,
                height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.teal}44, transparent)`, opacity: 0.2,
            }} />
        </AbsoluteFill>
    );
};
