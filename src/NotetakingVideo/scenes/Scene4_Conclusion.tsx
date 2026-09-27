import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from 'remotion';
import { Network, Target, Trophy, Share2 } from 'lucide-react';
import { SpaceBg, StarField, Vignette, COLORS } from '../components/Theme';

export const Scene4_Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Part 1: "Not just gathering"
    const part1Appear = spring({
        frame,
        fps,
        config: { damping: 14, stiffness: 100 }
    });
    const part1Disappear = interpolate(frame, [120, 140], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const part1Opacity = frame < 120 ? part1Appear : part1Disappear;
    const part1Y = interpolate(frame, [120, 140], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Part 2: "Attack Map"
    const part2Wait = 140;
    const part2Appear = spring({
        frame: frame - part2Wait,
        fps,
        config: { damping: 14, stiffness: 100 }
    });

    // Nodes animation for the "Attack Map"
    const nodeCount = 6;
    const nodes = Array.from({ length: nodeCount }).map((_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 250;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y };
    });

    return (
        <AbsoluteFill style={{ background: '#02060a', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />
            <Vignette />

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* Part 1 */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: part1Opacity,
                    transform: `translateY(${part1Y}px)`,
                }}>
                    <h1 style={{
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: 60,
                        color: 'white',
                        textAlign: 'center',
                        direction: 'rtl',
                        lineHeight: 1.5,
                        textShadow: '0 0 20px rgba(255,255,255,0.3)',
                    }}>
                        بهذه الطريقة لا تجمع<br />
                        المعلومات <span style={{ color: COLORS.secondary }}>فقط…</span>
                    </h1>
                </div>

                {/* Part 2: Attack Map Visualization */}
                <div style={{
                    position: 'absolute',
                    opacity: part2Appear,
                    transform: `scale(${interpolate(part2Appear, [0, 1], [0.8, 1])})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* Background Nodes */}
                    {nodes.map((node, i) => {
                        const nodeSpring = spring({
                            frame: frame - (part2Wait + i * 5),
                            fps,
                            config: { damping: 12 }
                        });
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                transform: `translate(${node.x}px, ${node.y}px) scale(${nodeSpring})`,
                                opacity: nodeSpring * 0.6,
                            }}>
                                <div style={{
                                    padding: 20,
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '50%',
                                    border: `1px solid ${COLORS.primary}40`,
                                }}>
                                    {i % 2 === 0 ? <Share2 size={30} color={COLORS.primary} /> : <Network size={30} color={COLORS.primary} />}
                                </div>
                            </div>
                        );
                    })}

                    {/* Central Content */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                    }}>
                        <div style={{
                            padding: 40,
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '30px',
                            border: `2px solid ${COLORS.accent}`,
                            boxShadow: `0 0 50px ${COLORS.accent}40`,
                            marginBottom: 40,
                        }}>
                            <Target size={100} color={COLORS.accent} />
                        </div>
                        <h1 style={{
                            fontFamily: 'Cairo, sans-serif',
                            fontSize: 55,
                            color: 'white',
                            textAlign: 'center',
                            direction: 'rtl',
                            lineHeight: 1.4,
                            textShadow: '0 0 20px rgba(255,255,255,0.3)',
                            maxWidth: '90%'
                        }}>
                            بل تبني <span style={{ color: COLORS.accent }}>Attack Map</span><br />
                            واضحة لكل هدف.
                        </h1>
                    </div>
                </div>

                {/* Success Icon appearing at the very end */}
                {frame > part2Wait + 60 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 100,
                        opacity: spring({ frame: frame - (part2Wait + 60), fps }),
                        transform: `scale(${spring({ frame: frame - (part2Wait + 60), fps })})`,
                    }}>
                        <Trophy size={60} color="#ffd700" style={{ filter: 'drop-shadow(0 0 10px #ffd70080)' }} />
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
