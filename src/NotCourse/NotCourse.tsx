import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Clock, MonitorPlay, TrendingUp, XCircle, BookOpen } from 'lucide-react';

export const NotCourseVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#050505' }}>
            <Series>
                <Series.Sequence durationInFrames={300}>
                    <NotCourseHook />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

const NotCourseHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const line1 = "إذا كنت تقضي ساعات طويلة في مشاهدة الكورسات وتشعر أنك تتقدم…";
    const line2 = "فغالباً هذا مجرد إحساس، وليس تقدما حقيقيا.";

    // Smooth entry for Line 1
    const line1Opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const line1Y = interpolate(frame, [15, 35], [50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // Floating icons for Phase 1
    const icon1Spring = spring({ frame: frame - 25, fps, config: { damping: 15 } });
    const icon2Spring = spring({ frame: frame - 35, fps, config: { damping: 15 } });
    const icon3Spring = spring({ frame: frame - 45, fps, config: { damping: 15 } });

    // Progress bar animation to match "feeling like you are progressing"
    const progressWidth = spring({
        frame: frame - 60,
        fps,
        config: { damping: 200, mass: 1 },
        durationInFrames: 60,
    }); // goes from 0 to 1

    const progressIconSpring = spring({ frame: frame - 60, fps, config: { damping: 12 } });

    // Shatter or glitch effect on the progress bar when the realization hits
    const isRealization = frame > 140;
    const phase1Opacity = interpolate(frame, [135, 145], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // Smooth entry for Line 2 (The Realization)
    const line2Opacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const line2Scale = spring({
        frame: frame - 150,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    const alertIconSpring = spring({
        frame: frame - 160,
        fps,
        config: { damping: 10, mass: 1 },
    });

    const words1 = line1.split(" ");

    // Split line 2 for display:
    const line2Parts = line2.split('،');
    const line2Part1 = line2Parts[0] + '،';
    const line2Part2 = line2Parts.length > 1 ? line2Parts[1].trim() : '';

    return (
        <AbsoluteFill style={{
            fontFamily: 'Cairo, sans-serif',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: '100px',
            background: 'radial-gradient(circle at center, #111 0%, #050505 100%)'
        }}>
            {/* Background glowing orb that changes color */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 800,
                height: 800,
                transform: 'translate(-50%, -50%)',
                background: isRealization ? 'radial-gradient(circle, rgba(255, 50, 50, 0.1) 0%, transparent 60%)' : 'radial-gradient(circle, rgba(0, 255, 200, 0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
                transition: 'background 1s ease',
            }} />

            {/* Subtle floating grid */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.5,
                zIndex: -1,
                transform: `translateY(${frame * 0.2}px)`, // Slow scrolling grid
            }} />

            {/* ===================== PHASE 1: The Illusion ===================== */}
            <AbsoluteFill style={{ opacity: phase1Opacity, justifyContent: 'center', alignItems: 'center' }}>

                {/* Floating Icons Background */}
                <div style={{ position: 'absolute', top: '15%', left: '20%', transform: `scale(${icon1Spring})`, opacity: 0.6 }}>
                    <Clock size={120} color="#00ffcc" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,204,0.5))' }} />
                </div>
                <div style={{ position: 'absolute', top: '25%', right: '15%', transform: `scale(${icon2Spring})`, opacity: 0.5 }}>
                    <MonitorPlay size={100} color="#00b3ff" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 20px rgba(0,179,255,0.5))' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '25%', left: '15%', transform: `scale(${icon3Spring})`, opacity: 0.4 }}>
                    <BookOpen size={90} color="#ffffff" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
                </div>

                {/* Line 1 with staggered word animation */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row-reverse',
                    justifyContent: 'center',
                    gap: '20px',
                    width: '100%',
                    opacity: line1Opacity,
                    transform: `translateY(${line1Y}px)`,
                    position: 'absolute',
                    top: '35%',
                }}>
                    {words1.map((word, i) => {
                        const wordSpring = spring({
                            frame: frame - (20 + i * 5),
                            fps,
                            config: { damping: 12 },
                        });
                        return (
                            <span key={i} style={{
                                fontSize: 70,
                                fontWeight: 800,
                                color: '#FFFFFF',
                                opacity: wordSpring,
                                transform: `translateY(${interpolate(wordSpring, [0, 1], [40, 0])}px)`,
                                textShadow: '0px 4px 20px rgba(0,0,0,0.5)',
                            }}>
                                {word}
                            </span>
                        );
                    })}
                </div>

                {/* Fake progress bar */}
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    width: '700px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <div style={{
                        flex: 1,
                        height: '8px',
                        backgroundColor: '#222',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 0 20px rgba(0,0,0,0.8)',
                    }}>
                        <div style={{
                            width: `${progressWidth * 100}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #00FFCC 0%, #00B3FF 100%)',
                            boxShadow: '0 0 15px #00FFCC',
                        }} />
                    </div>
                    {/* Progress Arrow Icon */}
                    <div style={{
                        transform: `scale(${progressIconSpring}) translateX(${interpolate(progressWidth, [0, 1], [-20, 0])}px)`,
                        opacity: progressIconSpring,
                    }}>
                        <TrendingUp size={50} color="#00FFCC" style={{ filter: 'drop-shadow(0 0 15px #00FFCC)' }} />
                    </div>
                </div>

            </AbsoluteFill>


            {/* ===================== PHASE 2: The Realization ===================== */}
            <AbsoluteFill style={{ opacity: line2Opacity, justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    transform: `scale(${line2Scale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px'
                }}>
                    {/* Shock Alert Icon */}
                    <div style={{
                        transform: `scale(${alertIconSpring}) rotate(${interpolate(alertIconSpring, [0, 1], [-20, 0])}deg)`,
                        opacity: alertIconSpring,
                    }}>
                        <XCircle size={150} color="#FF4444" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 40px rgba(255, 68, 68, 0.8))' }} />
                    </div>

                    <div style={{
                        textAlign: 'center',
                        direction: 'rtl',
                    }}>
                        <span style={{
                            fontSize: 90,
                            fontWeight: 900,
                            color: '#FF4444',
                            textShadow: '0px 0px 40px rgba(255, 68, 68, 0.6), 0px 5px 20px rgba(0,0,0,0.8)',
                            letterSpacing: '-1px'
                        }}>
                            {line2Part1}
                        </span>
                        <br />
                        <span style={{
                            fontSize: 80,
                            fontWeight: 700,
                            color: '#EEEEEE',
                            marginTop: '20px',
                            display: 'inline-block',
                            textShadow: '0px 5px 20px rgba(0,0,0,0.8)',
                        }}>
                            {line2Part2}
                        </span>
                    </div>
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
