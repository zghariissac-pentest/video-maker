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
import { CheckCircle2, Smartphone, Terminal, ShieldCheck } from 'lucide-react';

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    top: string;
    left: string;
    delay: number;
    opacity: number;
}> = ({ icon, top, left, delay, opacity }) => {
    const frame = useCurrentFrame();
    const yShift = Math.sin((frame + delay) / 40) * 15;

    return (
        <div style={{
            position: 'absolute',
            top,
            left,
            opacity: opacity * 0.1,
            transform: `translateY(${yShift}px)`,
            color: 'white',
        }}>
            {icon}
        </div>
    );
};

export const Scene2_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Answer "Yes" animation
    const answerAppear = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 100 },
    });

    // Explanation animation
    const explanationAppear = spring({
        frame: frame - 60,
        fps,
        config: { damping: 12 },
    });

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={150} />

            <FloatingIcon icon={<Smartphone size={100} />} top="10%" left="15%" delay={0} opacity={1} />
            <FloatingIcon icon={<Terminal size={120} />} top="75%" left="80%" delay={50} opacity={1} />
            <FloatingIcon icon={<ShieldCheck size={90} />} top="20%" left="70%" delay={100} opacity={1} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 80,
                padding: '0 40px',
            }}>
                {/* Answer: Yes */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 30,
                    opacity: answerAppear,
                    transform: `scale(${interpolate(answerAppear, [0, 1], [0.8, 1])})`,
                }}>
                    <div style={{
                        width: 160,
                        height: 160,
                        borderRadius: '50%',
                        background: `${COLORS.accent}20`,
                        border: `3px solid ${COLORS.accent}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 50px ${COLORS.accent}30`,
                    }}>
                        <CheckCircle2 size={100} color={COLORS.accent} />
                    </div>

                    <h2 style={{
                        fontSize: 80,
                        fontWeight: 900,
                        color: COLORS.accent,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        margin: 0,
                        textShadow: `0 0 40px ${COLORS.accent}60`,
                    }}>
                        الإجابة: نعم.
                    </h2>
                </div>

                {/* Explanation */}
                <div style={{
                    opacity: explanationAppear,
                    transform: `translateY(${interpolate(explanationAppear, [0, 1], [30, 0])}px)`,
                    textAlign: 'center',
                    maxWidth: '90%',
                }}>
                    <p style={{
                        fontSize: 55,
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        lineHeight: 1.5,
                        margin: 0,
                        textShadow: '0 0 20px rgba(0,0,0,0.5)',
                    }}>
                        وهذا هو كيف يصبح الهاتف<br />
                        <span style={{
                            color: COLORS.primary,
                            fontSize: 65,
                            fontWeight: 900,
                            textShadow: `0 0 30px ${COLORS.primary}40`
                        }}>أداة للاختبار الأمني</span>.
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
