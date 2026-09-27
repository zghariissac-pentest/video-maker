import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';
import { FolderOpen, Key, UserMinus, Search } from 'lucide-react';

const COLORS = {
    primary: '#00BDF2',
    accent: '#ff0055',
    background: '#000000',
    card: 'rgba(255, 255, 255, 0.03)',
};

// --- COMPONENTS ---

const CheckBox: React.FC<{
    Icon: React.ElementType;
    label: string;
    delay: number;
    activeFrame: number;
}> = ({ Icon, label, delay, activeFrame }) => {
    const frame = useCurrentFrame();
    const entry = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    const isActive = frame >= activeFrame;
    const highlight = spring({ frame: frame - activeFrame, fps: 30, config: { damping: 10 } });

    return (
        <div style={{
            opacity: entry,
            transform: `scale(${entry + highlight * 0.05}) translateY(${interpolate(entry, [0, 1], [50, 0])}px)`,
            width: 320,
            background: isActive ? 'rgba(0, 189, 242, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            border: `2px solid ${isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.1)'}`,
            padding: '40px 20px',
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 25,
            transition: 'all 0.3s ease',
            boxShadow: isActive ? `0 0 50px ${COLORS.primary}30` : 'none',
        }}>
            <Icon size={70} color={isActive ? COLORS.primary : '#fff'} />
            <h3 style={{
                color: 'white',
                fontSize: 26,
                fontWeight: 900,
                fontFamily: 'Cairo, sans-serif',
                textAlign: 'center',
                direction: 'rtl',
                margin: 0,
            }}>{label}</h3>
        </div>
    );
};

// --- SCENE ---

export const Scene4_Testing: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const tHeading = 15;
    const tPoint1 = 90;
    const tPoint2 = 210;
    const tPoint3 = 330;

    const headingSlide = spring({ frame: frame - tHeading, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            {/* Background Grid (Moving) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(${COLORS.primary}10 1px, transparent 1px), linear-gradient(90deg, ${COLORS.primary}10 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                transform: `rotate(15deg) translateY(${frame % 80}px)`,
                opacity: 0.3,
            }} />

            {/* Central Heading */}
            <div style={{
                position: 'absolute',
                top: '15%',
                width: '100%',
                opacity: headingSlide,
                transform: `translateY(${interpolate(headingSlide, [0, 1], [-50, 0])}px)`,
            }}>
                <h1 style={{
                    fontSize: 60,
                    fontWeight: 950,
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    textAlign: 'center',
                    textShadow: `0 0 30px ${COLORS.primary}80`,
                }}>
                    عند اختبار <span style={{ color: COLORS.primary }}>SMB</span> نركز على ثلاث نقاط:
                </h1>
            </div>

            {/* Three Pillars Section */}
            <div style={{
                position: 'absolute',
                top: '40%',
                width: '100%',
                padding: '0 60px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 30,
            }}>
                <CheckBox
                    Icon={FolderOpen}
                    label="هل توجد shares مفتوحة"
                    delay={tPoint1}
                    activeFrame={tPoint1 + 30}
                />
                <CheckBox
                    Icon={Key}
                    label="ما هي الصلاحيات الموجودة"
                    delay={tPoint2}
                    activeFrame={tPoint2 + 30}
                />
                <CheckBox
                    Icon={UserMinus}
                    label="هل يمكن الوصول بدون authentication"
                    delay={tPoint3}
                    activeFrame={tPoint3 + 30}
                />
            </div>

            {/* Scanner / Radar Sweep Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(to right, transparent, ${COLORS.primary}05, transparent)`,
                transform: `translateX(${(frame % 120 / 120) * 100}%)`,
                pointerEvents: 'none',
            }} />

            {/* Decorative Corner Icons */}
            <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.1 }}>
                <Search size={300} style={{ position: 'absolute', top: -50, right: -50, color: COLORS.primary }} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
