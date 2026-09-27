import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    useVideoConfig,
    Video,
    staticFile
} from 'remotion';

export const CourseHook: React.FC = () => {
    const frame = useCurrentFrame();

    const line1 = "إذا كنت تقضي ساعات طويلة في مشاهدة الكورسات وتشعر أنك تتقدم…";
    const line2 = "فغالباً هذا مجرد إحساس، وليس تقدماً حقيقياً.";

    // Phrase 1 timings: fades in slowly, stays, then fades out
    const opacity1 = interpolate(frame, [15, 30, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const scale1 = interpolate(frame, [15, 150], [0.95, 1.05], { extrapolateRight: 'clamp' });

    // Phrase 2 timings: fades in after Phrase 1
    const opacity2 = interpolate(frame, [150, 170, 270, 290], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const scale2 = interpolate(frame, [150, 300], [0.95, 1.05], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            background: 'black',
            overflow: 'hidden',
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* The MP4 Video Underneath */}
            <AbsoluteFill style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
            }}>
                <Video
                    src={staticFile("course_bg.webm")}
                    volume={0}
                    style={{
                        width: 'auto',
                        height: '100%',
                        objectFit: 'cover',
                        mixBlendMode: 'screen',
                    }}
                    loop
                />
            </AbsoluteFill>

            {/* Clean Text - Phrase 1 */}
            <AbsoluteFill style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: opacity1,
                transform: `scale(${scale1})`,
                padding: '0 80px'
            }}>
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    fontSize: 75,
                    fontWeight: 900,
                    color: 'white',
                    textShadow: '0 10px 40px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)',
                    lineHeight: 1.6,
                }}>
                    {line1}
                </div>
            </AbsoluteFill>

            {/* Clean Text - Phrase 2 */}
            <AbsoluteFill style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: opacity2,
                transform: `scale(${scale2})`,
                padding: '0 80px'
            }}>
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    fontSize: 85,
                    fontWeight: 800,
                    color: '#00ffcc',
                    textShadow: '0 10px 40px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)',
                    lineHeight: 1.6,
                }}>
                    {line2}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
