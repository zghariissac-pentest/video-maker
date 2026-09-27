import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from 'remotion';
import {
    SpaceBg, StarField, Vignette,
    COLORS
} from '../../NotetakingVideo/components/Theme';
import { Scale, ShieldCheck, Milestone } from 'lucide-react';

export const Scene4_Arrest: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene transition
    const sceneAppear = spring({ frame, fps, config: { damping: 12 } });

    // Arrest Part Reveal
    const arrestTrigger = spring({
        frame: frame - 20,
        fps,
        config: { damping: 12 }
    });

    // Court Part Reveal (Frame 450+)
    const courtAt = 450;
    const courtTrigger = spring({
        frame: frame - courtAt,
        fps,
        config: { damping: 12 }
    });

    const isCourtPhase = frame >= courtAt;

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden', opacity: sceneAppear }}>
            <SpaceBg />
            <StarField count={100} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 40px',
                gap: 60,
                zIndex: 20,
            }}>

                {/* Visual Center Piece */}
                <div style={{
                    position: 'relative',
                    width: 600,
                    height: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* FBI Phase */}
                    {!isCourtPhase && (
                        <div style={{
                            opacity: arrestTrigger,
                            transform: `scale(${interpolate(arrestTrigger, [0, 1], [0.8, 1])})`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 30
                        }}>
                            <div style={{
                                width: 500,
                                height: 500,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.8))',
                                border: '4px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(71, 160, 245, 0.2)'
                            }}>
                                <Img
                                    src={staticFile('assets/fbi_logo.png')}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Court Phase Icons */}
                    {isCourtPhase && (
                        <div style={{
                            opacity: courtTrigger,
                            transform: `scale(${interpolate(courtTrigger, [0, 1], [0.8, 1])})`,
                            display: 'flex',
                            gap: 40,
                            alignItems: 'center'
                        }}>
                            <div style={{
                                background: `${COLORS.accent}15`,
                                border: `2px solid ${COLORS.accent}40`,
                                padding: '50px',
                                borderRadius: '40px',
                                boxShadow: `0 0 60px ${COLORS.accent}20`
                            }}>
                                <Scale size={200} color={COLORS.accent} strokeWidth={1.5} />
                            </div>
                            <div style={{
                                background: `${COLORS.primary}15`,
                                border: `2px solid ${COLORS.primary}40`,
                                padding: '50px',
                                borderRadius: '40px',
                                boxShadow: `0 0 60px ${COLORS.primary}20`
                            }}>
                                <ShieldCheck size={200} color={COLORS.primary} strokeWidth={1.5} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Catchy Text Box */}
                <div style={{
                    minHeight: 300,
                    width: '90%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    direction: 'rtl'
                }}>
                    {/* Part 1: Arrest Plot Twist */}
                    {!isCourtPhase && (
                        <div style={{
                            textAlign: 'center',
                            opacity: arrestTrigger,
                        }}>
                            <h2 style={{
                                fontSize: 45, fontWeight: 700, fontFamily: 'Cairo', color: 'rgba(255,255,255,0.9)',
                                margin: 0, lineHeight: 1.5,
                            }}>
                                لكن لم تنتهِ القصة هنا… بعد أسابيع فقط من هذا الإنجاز، <br />
                                اعتقلته الـ <span style={{ color: COLORS.secondary, borderBottom: `4px solid ${COLORS.secondary}` }}>FBI</span> في مؤتمر DefCon.
                            </h2>
                            <p style={{
                                fontSize: 38, fontWeight: 500, fontFamily: 'Cairo', color: 'rgba(255,255,255,0.6)',
                                marginTop: 25
                            }}>
                                بسبب أخطاء سابقة في مسيرته التقنية، وأُدخل في قضية قانونية ضخمة.
                            </p>
                        </div>
                    )}

                    {/* Part 2: The Redemption */}
                    {isCourtPhase && (
                        <div style={{
                            textAlign: 'center',
                            opacity: courtTrigger,
                        }}>
                            <h2 style={{
                                fontSize: 42, fontWeight: 800, fontFamily: 'Cairo', color: 'white',
                                margin: 0, lineHeight: 1.5,
                            }}>
                                في المحكمة، تم الاعتراف بقيمة <span style={{ color: COLORS.accent }}>مهاراته وإسهاماته</span> في الأمن السيبراني.
                            </h2>
                            <p style={{
                                fontSize: 40, fontWeight: 600, fontFamily: 'Cairo', color: COLORS.primary,
                                marginTop: 20, lineHeight: 1.4
                            }}>
                                الحكم عليه كان خفيفاً، واستمر في العمل حاملاً تجربته نحو <span style={{ borderBottom: `3px solid ${COLORS.primary}` }}>تعليم الآخرين.</span>
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 15,
                                background: 'rgba(255,255,255,0.05)', padding: '10px 30px',
                                borderRadius: '15px', marginTop: 30, border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <Milestone size={30} color={COLORS.accent} />
                                <span style={{ fontFamily: 'monospace', color: 'white', fontSize: 24 }}>EDUCATE & PROTECT</span>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
