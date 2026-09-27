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
import { Globe, ShoppingBag, ExternalLink, Github, LucideProps } from 'lucide-react';

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

export const Scene6_Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleSpring = spring({ frame, fps });
    const contentSpring = spring({ frame: frame - 25, fps });
    const urlSpring = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 100 } });
    const storeSpring = spring({ frame: frame - 120, fps });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            <FloatingIcon icon={<Github />} top="15%" left="15%" delay={0} size={130} color={COLORS.primary} />
            <FloatingIcon icon={<Globe />} top="70%" left="80%" delay={100} size={150} color={COLORS.secondary} />
            <FloatingIcon icon={<ShoppingBag />} top="20%" left="75%" delay={200} size={110} color={COLORS.accent} />

            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 60px',
                gap: 50,
            }}>
                {/* Title */}
                <div style={{
                    opacity: titleSpring,
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontSize: 80, fontWeight: 900, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        textShadow: `0 0 50px rgba(255,255,255,0.3)`,
                    }}>
                        أين يمكن العثور عليه؟
                    </h1>
                </div>

                {/* Open Source Info */}
                <div style={{
                    opacity: contentSpring,
                    transform: `translateY(${interpolate(contentSpring, [0, 1], [20, 0])}px)`,
                    textAlign: 'center',
                    maxWidth: '85%',
                }}>
                    <p style={{
                        fontSize: 45, fontWeight: 700, color: 'white',
                        fontFamily: 'Cairo, sans-serif', direction: 'rtl', margin: 0,
                        lineHeight: 1.5,
                    }}>
                        المشروع <span style={{ color: COLORS.accent }}>مفتوح المصدر</span> ويمكن تحميله من الموقع الرسمي:
                    </p>
                </div>

                {/* URL Badge */}
                <div style={{
                    opacity: urlSpring,
                    transform: `scale(${interpolate(urlSpring, [0, 1], [0.8, 1])})`,
                    background: `${COLORS.primary}20`,
                    border: `3px solid ${COLORS.primary}`,
                    padding: '30px 60px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    boxShadow: `0 0 60px ${COLORS.primary}30`,
                }}>
                    <ExternalLink size={45} color={COLORS.primary} />
                    <span style={{
                        fontSize: 55,
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'monospace',
                    }}>
                        nethunter.kali.org
                    </span>
                </div>

                {/* NetHunter Store */}
                <div style={{
                    opacity: storeSpring,
                    transform: `translateY(${interpolate(storeSpring, [0, 1], [30, 0])}px)`,
                    background: 'rgba(255,255,255,0.05)',
                    padding: '30px 50px',
                    borderRadius: '25px',
                    borderRight: `8px solid ${COLORS.secondary}`,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    gap: 30,
                    marginTop: 20,
                }}>
                    <ShoppingBag size={50} color={COLORS.secondary} />
                    <p style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        margin: 0,
                    }}>
                        وهناك أيضاً <span style={{ color: COLORS.secondary }}>NetHunter Store</span><br />
                        لتحميل الأدوات داخل البيئة.
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
