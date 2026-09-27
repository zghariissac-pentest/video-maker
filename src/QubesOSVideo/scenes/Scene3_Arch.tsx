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
import { Box, Globe, Terminal, ShieldAlert, Cpu } from 'lucide-react';

const ConnectionLine: React.FC<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    showAt: number;
    color: string;
}> = ({ startX, startY, endX, endY, showAt, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const progress = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 15, stiffness: 100 }
    });

    const lWidth = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX);

    return (
        <div style={{
            position: 'absolute',
            left: startX,
            top: startY,
            width: lWidth * progress,
            height: 2,
            background: `linear-gradient(90deg, ${color}33, ${color})`,
            transformOrigin: '0 50%',
            transform: `rotate(${angle}rad)`,
            boxShadow: `0 0 10px ${color}88`,
            zIndex: 5,
        }} />
    );
};

const FancyVMBox: React.FC<{
    name: string;
    icon: React.ReactNode;
    color: string;
    showAt: number;
    isCompromised?: boolean;
    attackAt?: number;
    x: number;
    y: number;
}> = ({ name, icon, color, showAt, isCompromised, attackAt, x, y }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({
        frame: frame - showAt,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const attackProgress = attackAt && frame > attackAt
        ? spring({ frame: frame - attackAt, fps, config: { damping: 10, stiffness: 60 } })
        : 0;

    const scale = interpolate(appear, [0, 1], [0.8, 1]);
    const tiltX = interpolate(Math.sin(frame / 60 + x), [-1, 1], [-5, 5]);
    const tiltY = interpolate(Math.cos(frame / 50 + y), [-1, 1], [-5, 5]);

    const shake = isCompromised && attackAt && frame > attackAt && frame < attackAt + 80
        ? (Math.random() - 0.5) * 20 * (1 - attackProgress)
        : 0;

    const boxColor = isCompromised && frame > (attackAt || 0) ? '#f54768' : color;

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 220,
            height: 260,
            opacity: appear,
            transform: `perspective(1000px) rotateX(${15 + tiltX}deg) rotateY(${tiltY}deg) scale(${scale}) translateY(${shake}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 15,
            padding: 20,
            background: isCompromised && frame > (attackAt || 0)
                ? `rgba(245, 71, 104, ${interpolate(attackProgress, [0, 1], [0.1, 0.4])})`
                : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '30px',
            border: `2px solid ${isCompromised && frame > (attackAt || 0) ? '#ff4d4d' : color + '60'}`,
            boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${boxColor}${Math.floor(interpolate(Math.sin(frame / 15), [-1, 1], [10, 30])).toString(16)}`,
            backdropFilter: 'blur(10px)',
            zIndex: 10,
        }}>
            <div style={{
                color: boxColor,
                filter: `drop-shadow(0 0 15px ${boxColor} )`,
                transform: `scale(${interpolate(Math.sin(frame / 20), [-1, 1], [1, 1.1])})`
            }}>
                {isCompromised && frame > (attackAt || 0) ? <ShieldAlert size={80} /> : icon}
            </div>

            <span style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 900,
                fontFamily: 'Cairo, sans-serif',
                letterSpacing: 1,
                textTransform: 'uppercase',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>{name}</span>

            {/* Moving Status Bar */}
            <div style={{
                width: '60%',
                height: 4,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                overflow: 'hidden',
                marginTop: 10,
            }}>
                <div style={{
                    width: '40%',
                    height: '100%',
                    background: boxColor,
                    transform: `translateX(${interpolate(frame % 60, [0, 60], [-100, 200])}%)`,
                }} />
            </div>

            {/* Fancy corner brackets */}
            <div style={{ position: 'absolute', top: 15, left: 15, width: 20, height: 20, borderTop: `2px solid ${boxColor}44`, borderLeft: `2px solid ${boxColor}44` }} />
            <div style={{ position: 'absolute', bottom: 15, right: 15, width: 20, height: 20, borderBottom: `2px solid ${boxColor}44`, borderRight: `2px solid ${boxColor}44` }} />
        </div>
    );
};

export const Scene3_Arch: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Layers Appearances
    const xenBaseAppear = spring({ frame: frame - 10, fps });
    const xenLabelAppear = spring({ frame: frame - 40, fps });

    // Locations
    const middleX = width / 2;
    const baseTop = height / 2 + 150;
    const vmRow1Y = height / 2 - 400;
    const vmRow2Y = height / 2 - 150;

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            {/* Fancy Background */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                <SpaceBg />
                <StarField count={130} />
            </div>

            {/* Glowing Aura for the 전체 Architecture */}
            <div style={{
                position: 'absolute',
                top: height / 2 - 300,
                left: middleX - 500,
                width: 1000,
                height: 800,
                background: `radial-gradient(circle, ${COLORS.primary}10 0%, transparent 70%)`,
                filter: 'blur(50px)',
                zIndex: 1,
            }} />

            <AbsoluteFill style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Xen Hypervisor Core - More Fancy */}
                <div style={{
                    position: 'absolute',
                    top: baseTop,
                    width: 750,
                    height: 140,
                    opacity: xenBaseAppear,
                    transform: `perspective(1000px) rotateX(45deg) scale(${xenBaseAppear})`,
                    background: `linear-gradient(135deg, ${COLORS.primary}44, #0a1f33)`,
                    border: `3px solid ${COLORS.primary}88`,
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 120px ${COLORS.primary}33, inset 0 0 40px ${COLORS.primary}22`,
                    zIndex: 2,
                }}>
                    {/* Interior Detail (Motherboard feel) */}
                    <div style={{
                        position: 'absolute',
                        inset: 20,
                        border: `1px solid ${COLORS.primary}22`,
                        borderRadius: '20px',
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 11px)',
                    }} />

                    <div style={{
                        opacity: xenLabelAppear,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 25,
                        transform: 'rotateX(-20deg) translateY(-15px)',
                    }}>
                        <Cpu size={50} color={COLORS.primary} style={{ filter: `drop-shadow(0 0 10px ${COLORS.primary})` }} />
                        <span style={{
                            fontSize: 56,
                            fontWeight: 900,
                            letterSpacing: 8,
                            color: 'white',
                            fontFamily: 'Montserrat, sans-serif',
                            textShadow: `0 0 20px ${COLORS.primary}88`,
                        }}>XEN CORE</span>
                    </div>
                </div>

                {/* Connection Pipes from Core to VMs */}
                <ConnectionLine startX={middleX - 50} startY={baseTop} endX={middleX - 250} endY={vmRow1Y + 260} showAt={100} color={COLORS.primary} />
                <ConnectionLine startX={middleX} startY={baseTop} endX={middleX - 50} endY={vmRow1Y + 260} showAt={120} color={COLORS.accent} />
                <ConnectionLine startX={middleX + 50} startY={baseTop} endX={middleX + 150} endY={vmRow1Y + 260} showAt={140} color={COLORS.secondary} />
                <ConnectionLine startX={middleX} startY={baseTop} endX={middleX - 50} endY={vmRow2Y + 260} showAt={160} color={COLORS.primary} />

                {/* VMs Grid */}
                <FancyVMBox name="Personal" icon={<Globe size={70} />} color={COLORS.primary} showAt={100} x={width / 2 - 380} y={vmRow1Y} />
                <FancyVMBox name="Work" icon={<Terminal size={70} />} color={COLORS.accent} showAt={120} x={width / 2 - 110} y={vmRow1Y - 100} />
                <FancyVMBox name="Vault" icon={<Box size={70} />} color={COLORS.secondary} showAt={140} x={width / 2 + 160} y={vmRow1Y} />

                <FancyVMBox
                    name="Disposable"
                    icon={<Globe size={70} />}
                    color={COLORS.primary}
                    showAt={180}
                    isCompromised={true}
                    attackAt={350}
                    x={width / 2 - 110}
                    y={vmRow2Y}
                />

                {/* Beam Attack Effect */}
                {frame > 330 && frame < 450 && (
                    <>
                        {/* The Bolt */}
                        <div style={{
                            position: 'absolute',
                            width: 8,
                            left: middleX - 5,
                            top: 0,
                            height: interpolate(frame, [330, 350], [0, height / 2 - 150]),
                            background: `linear-gradient(to bottom, transparent, #f54768, #fff, #f54768)`,
                            boxShadow: '0 0 30px #f54768, 0 0 60px #f54768',
                            opacity: interpolate(frame, [400, 450], [1, 0]),
                            zIndex: 50,
                            borderRadius: '4px',
                        }} />

                        {/* Impact Ripple */}
                        <div style={{
                            position: 'absolute',
                            left: middleX - 110,
                            top: vmRow2Y,
                            width: 220,
                            height: 260,
                            borderRadius: '30px',
                            border: '4px solid #f54768',
                            opacity: interpolate(frame, [350, 360, 420], [0, 1, 0]),
                            transform: `scale(${interpolate(frame, [350, 420], [1, 2])})`,
                            zIndex: 51,
                        }} />
                    </>
                )}
            </AbsoluteFill>

            {/* Arabic Text (Corrected & Fixed position) */}
            <div style={{
                position: 'absolute',
                top: height - 600,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 25,
                direction: 'rtl',
                padding: '0 60px',
                textAlign: 'center',
            }}>
                <div style={{
                    opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
                }}>
                    <p style={{
                        fontSize: 48,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        lineHeight: 1.3,
                        textShadow: '0 0 30px rgba(71, 160, 245, 0.5)',
                    }}>
                        Qubes OS يعتمد على مفهوم <span style={{ color: COLORS.primary }}>compartmentalization</span>.
                    </p>
                </div>

                <div style={{
                    opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: 'clamp' }),
                }}>
                    <p style={{
                        fontSize: 40,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        opacity: 0.95,
                    }}>
                        كل VM مستقلة تمامًا، من التطبيقات حتى الشبكة.
                    </p>
                </div>

                <div style={{
                    opacity: interpolate(frame, [260, 280], [0, 1], { extrapolateRight: 'clamp' }),
                }}>
                    <p style={{
                        fontSize: 40,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        opacity: 0.95,
                    }}>
                        هذه الـ VMs تعمل فوق <span style={{ color: COLORS.accent }}>Xen Hypervisor</span>.
                    </p>
                </div>

                <div style={{
                    opacity: interpolate(frame, [450, 470], [0, 1], { extrapolateRight: 'clamp' }),
                    background: 'rgba(245, 71, 104, 0.1)',
                    padding: '20px 40px',
                    borderRadius: '20px',
                    border: '1px solid rgba(245, 71, 104, 0.3)',
                    boxShadow: '0 0 30px rgba(245, 71, 104, 0.2)',
                }}>
                    <p style={{
                        fontSize: 46,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: COLORS.secondary,
                        lineHeight: 1.4,
                    }}>
                        أي اختراق يبقى محدوداً ولا ينتقل للنظام!
                    </p>
                </div>
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
