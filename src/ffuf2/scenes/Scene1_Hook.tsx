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
    COLORS, BackupIcon, ReconIcon, ExtBadge
} from '../components/ffuf2Theme';

const TextBlock: React.FC<{
    text: React.ReactNode;
    icon: React.ReactNode;
    showAt: number;
    hideAt?: number;
    accentColor: string;
}> = ({ text, icon, showAt, hideAt, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12, stiffness: 100 } });
    const yOffset = interpolate(appear, [0, 1], [30, 0]);
    const scale = interpolate(appear, [0, 1], [0.9, 1]);

    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: appear * outOp,
            transform: `translateY(${yOffset}px) scale(${scale})`,
            gap: 40,
            zIndex: 20,
        }}>
            <div style={{
                width: 160, height: 160, borderRadius: '40px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 50px ${accentColor}20, inset 0 0 20px ${accentColor}10`,
                transform: `rotate(${Math.sin(frame / 30) * 5}deg)`,
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 54,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: 0,
                textShadow: `0 0 20px ${accentColor}40`,
            }}>
                {text}
            </p>
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField />

            {/* Part 1: Many CTF players look for complex bugs... */}
            <TextBlock
                showAt={10}
                hideAt={140}
                accentColor={COLORS.secondary}
                icon={<ReconIcon size={100} color={COLORS.secondary} />}
                text={
                    <>
                        كثير من لاعبي <span style={{ color: COLORS.secondary }}>CTF</span> يبدأون مباشرة <br />
                        بالبحث عن ثغرات <span style={{ color: COLORS.secondary }}>معقدة</span> في الموقع…
                    </>
                }
            />

            {/* Part 1.5: But sometimes it's just a forgotten file. */}
            <TextBlock
                showAt={145}
                hideAt={280}
                accentColor={COLORS.primary}
                icon={<BackupIcon size={100} color={COLORS.primary} />}
                text={
                    <>
                        لكن أحياناً كل ما تحتاجه هو <br />
                        <span style={{ color: COLORS.primary }}>ملف منسي</span> على الخادم.
                    </>
                }
            />

            {/* Part 2: Backup files reveal */}
            {frame >= 285 && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    zIndex: 30,
                    gap: 50
                }}>
                    <p style={{
                        fontSize: 48,
                        fontWeight: 700,
                        fontFamily: 'Cairo, sans-serif',
                        direction: 'rtl',
                        textAlign: 'center',
                        color: 'white',
                        opacity: interpolate(frame, [285, 300], [0, 1]),
                        transform: `translateY(${interpolate(spring({ frame: frame - 285, fps }), [0, 1], [20, 0])}px)`,
                    }}>
                        في كثير من الحالات يقوم المطورون بترك <br />
                        <span style={{ color: COLORS.accent }}>Backup Files</span> بدون قصد مثل:
                    </p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 20,
                        width: '80%',
                    }}>
                        {[".bak", ".old", ".zip", ".tar"].map((ext, i) => {
                            const delay = 310 + (i * 10);
                            const op = interpolate(frame, [delay, delay + 10], [0, 1]);
                            const scale = spring({ frame: frame - delay, fps, config: { damping: 10 } });

                            return (
                                <div key={ext} style={{ opacity: op, transform: `scale(${scale})` }}>
                                    <ExtBadge text={ext} color={i % 2 === 0 ? COLORS.primary : COLORS.secondary} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <Vignette />
        </AbsoluteFill>
    );
};
