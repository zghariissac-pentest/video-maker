import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    RequirementsBg,
    Vignette,
    COLORS,
    VMIcon,
    ToolIcon,
    Particle
} from '../components/RequirementsTheme';

export const Scene2_Context: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings
    const part1Show = 10;
    const part2Show = 150; // Transition to VM talk

    // Animations for Phrase 1
    const p1Spring = spring({ frame: frame - part1Show, fps, config: { damping: 14 } });
    const p1Y = interpolate(p1Spring, [0, 1], [30, 0]);
    const p1Op = interpolate(frame, [part1Show, part1Show + 10], [0, 1], { extrapolateRight: 'clamp' }) *
        interpolate(frame, [part2Show - 10, part2Show], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Animations for Phrase 2
    const p2Spring = spring({ frame: frame - part2Show, fps, config: { damping: 12 } });
    const p2Y = interpolate(p2Spring, [0, 1], [40, 0]);
    const p2Op = interpolate(frame, [part2Show, part2Show + 15], [0, 1], { extrapolateRight: 'clamp' });

    // Icon animations
    const toolIconScale = interpolate(p1Spring, [0, 1], [0.8, 1]);
    const vmIconScale = interpolate(p2Spring, [0, 1], [0.5, 1.2], { extrapolateRight: 'clamp' }) *
        interpolate(p2Spring, [0.8, 1], [1, 0.83], { extrapolateLeft: 'clamp' });

    // Global Exit
    const { durationInFrames } = useVideoConfig();
    const exitOp = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
            <RequirementsBg />

            <Particle delay={10} x="20%" y="30%" size={6} color={COLORS.blue} />
            <Particle delay={30} x="80%" y="25%" size={10} color={COLORS.pink} />

            <div style={{ opacity: exitOp, width: '100%', height: '100%' }}>

                {/* Part 1: Not that powerful reqs */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    opacity: p1Op,
                    transform: `translateY(${p1Y}px)`,
                    gap: 40,
                    padding: '0 80px'
                }}>
                    <div style={{ transform: `scale(${toolIconScale})` }}>
                        <ToolIcon size={140} color={COLORS.blue} />
                    </div>
                    <p style={{
                        color: 'white', fontSize: 54, fontWeight: 700, fontFamily: 'Cairo, sans-serif',
                        textAlign: 'center', direction: 'rtl', margin: 0, lineHeight: 1.5
                    }}>
                        في الواقع، <span style={{ color: COLORS.teal }}>لا تحتاج</span> إلى حاسوب قوي جداً.
                        <br />
                        <span style={{ fontSize: 42, color: COLORS.gray }}>معظم أدوات Pentesting ليست ثقيلة...</span>
                    </p>
                </div>

                {/* Part 2: Virtual Machines talk */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    opacity: p2Op,
                    transform: `translateY(${p2Y}px)`,
                    gap: 50,
                    padding: '0 80px'
                }}>
                    <div style={{
                        position: 'relative',
                        width: 250, height: 200,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {/* Multiple VM visual */}
                        <div style={{ position: 'absolute', transform: `translate(-40px, -20px) scale(${vmIconScale})`, opacity: 0.6 }}>
                            <VMIcon size={120} color={COLORS.purple} />
                        </div>
                        <div style={{ position: 'absolute', transform: `translate(40px, 20px) scale(${vmIconScale})`, zIndex: 2 }}>
                            <VMIcon size={150} color={COLORS.pink} />
                        </div>
                    </div>

                    <p style={{
                        color: 'white', fontSize: 48, fontWeight: 600, fontFamily: 'Cairo, sans-serif',
                        textAlign: 'center', direction: 'rtl', margin: 0, lineHeight: 1.4
                    }}>
                        لكن الجزء الذي يستهلك الموارد هو تشغيل
                        <br />
                        <span style={{ color: COLORS.pink, fontWeight: 800, fontSize: 56 }}>Virtual Machines</span>
                        <br />
                        <span style={{ fontSize: 40, color: COLORS.gray }}>لبناء بيئة اختبار متكاملة.</span>
                    </p>
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
