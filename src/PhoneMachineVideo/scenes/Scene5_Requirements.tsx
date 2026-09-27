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
import { Smartphone, Zap, Usb, Wifi, LucideProps, CheckCircle2 } from 'lucide-react';

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

const RequirementItem: React.FC<{
    text: string;
    icon: React.ReactNode;
    showAt: number;
    accentColor: string;
}> = ({ text, icon, showAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });
    const slide = interpolate(appear, [0, 1], [50, 0]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 30,
            opacity: appear,
            transform: `translateX(${slide}px)`,
            marginBottom: 35,
            background: 'rgba(255,255,255,0.03)',
            padding: '25px',
            borderRadius: '25px',
            border: `1px solid ${accentColor}20`,
            width: '100%',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: '22px',
                background: `${accentColor}20`, border: `2px solid ${accentColor}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 30px ${accentColor}20`,
            }}>
                {icon}
            </div>
            <p style={{
                fontSize: 42,
                fontWeight: 700,
                color: 'white',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                margin: 0,
                flex: 1,
            }}>
                {text}
            </p>
            <CheckCircle2 size={30} color={COLORS.accent} style={{ opacity: 0.6 }} />
        </div>
    );
};

export const Scene5_Requirements: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps });
    const subTitleSpring = spring({ frame: frame - 20, fps });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            <FloatingIcon icon={<Smartphone />} top="15%" left="80%" delay={0} size={160} color={COLORS.primary} />
            <FloatingIcon icon={<Usb />} top="75%" left="15%" delay={100} size={120} color={COLORS.secondary} />
            <FloatingIcon icon={<Wifi />} top="20%" left="10%" delay={200} size={140} color={COLORS.accent} />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                padding: '100px 60px',
            }}>
                <div style={{
                    textAlign: 'right',
                    marginBottom: 60,
                    opacity: titleSpring,
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`
                }}>
                    <h1 style={{
                        fontSize: 75, fontWeight: 900, color: COLORS.accent,
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: '0 0 20px 0',
                        textShadow: `0 0 40px ${COLORS.accent}40`,
                    }}>
                        ماذا تحتاج لتشغيله
                    </h1>
                    <p style={{
                        fontSize: 45, fontWeight: 700, color: 'white', opacity: subTitleSpring,
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        transform: `translateY(${interpolate(subTitleSpring, [0, 1], [10, 0])}px)`,
                    }}>
                        لكي يعمل بشكل كامل تحتاج إلى:
                    </p>
                </div>

                {/* Requirements List */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <RequirementItem
                        text="هاتف Android مدعوم"
                        icon={<Smartphone size={40} color={COLORS.primary} />}
                        showAt={50}
                        accentColor={COLORS.primary}
                    />
                    <RequirementItem
                        text="تفعيل Root Access"
                        icon={<Zap size={40} color={COLORS.secondary} />}
                        showAt={80}
                        accentColor={COLORS.secondary}
                    />
                    <RequirementItem
                        text="دعم USB OTG"
                        icon={<Usb size={40} color={COLORS.accent} />}
                        showAt={110}
                        accentColor={COLORS.accent}
                    />
                    <RequirementItem
                        text="Internal/External Wi-Fi Adapter"
                        icon={<Wifi size={40} color={COLORS.primary} />}
                        showAt={140}
                        accentColor={COLORS.primary}
                    />
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
