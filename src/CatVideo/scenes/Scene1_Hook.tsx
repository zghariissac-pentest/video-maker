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
import { Terminal, FileQuestion, ChevronRight, FileJson, FileText, FileCode } from 'lucide-react';

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
            gap: 50,
            zIndex: 20,
        }}>
            <div style={{
                width: 180, height: 180, borderRadius: '45px',
                background: `${accentColor}15`, border: `2px solid ${accentColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 60px ${accentColor}25, inset 0 0 25px ${accentColor}15`,
                transform: `rotate(${Math.sin(frame / 25) * 6}deg)`,
            }}>
                {icon}
            </div>

            <p style={{
                fontSize: 60,
                fontWeight: 800,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'white',
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: 0,
                textShadow: `0 0 30px ${accentColor}50`,
            }}>
                {text}
            </p>
        </div>
    );
};

const FileItem: React.FC<{
    name: string;
    icon: React.ReactNode;
    color: string;
    showAt: number;
}> = ({ name, icon, color, showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            opacity: appear,
            transform: `translateX(${interpolate(appear, [0, 1], [-40, 0])}px)`,
            background: 'rgba(255,255,255,0.03)',
            padding: '20px 40px',
            borderRadius: '20px',
            border: `1px solid ${color}30`,
            width: '100%',
            maxWidth: '700px',
            boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${color}10`,
        }}>
            <div style={{ color }}>{icon}</div>
            <span style={{
                fontFamily: 'Fira Code',
                fontSize: 45,
                color: 'white',
                textShadow: `0 0 10px ${color}40`
            }}>
                {name === "home here" ? (
                    <>home<span style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '0 4px' }}> </span>here</>
                ) : name}
            </span>
            {name === "home here" && (
                <div style={{
                    marginLeft: 'auto',
                    background: `${COLORS.secondary}20`,
                    color: COLORS.secondary,
                    padding: '5px 15px',
                    borderRadius: '10px',
                    fontFamily: 'Cairo',
                    fontSize: 22,
                    border: `1px solid ${COLORS.secondary}40`
                }}>
                    مسافة!
                </div>
            )}
        </div>
    );
};

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
            <SpaceBg />
            <StarField count={130} />

            {/* Part 1: The Question */}
            <TextBlock
                showAt={10}
                hideAt={130}
                accentColor={COLORS.primary}
                icon={<FileQuestion size={110} color={COLORS.primary} />}
                text={
                    <>
                        ما الفرق بين <span style={{ color: COLORS.primary }}>هذه الملفات…</span>
                    </>
                }
            />

            {/* Part 2: The Files List (Cleaner) */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 25,
                opacity: interpolate(frame, [135, 150, 280, 295], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                display: frame < 135 || frame > 295 ? 'none' : 'flex'
            }}>
                <FileItem name="homehere" icon={<FileText size={45} />} color={COLORS.primary} showAt={145} />
                <FileItem name="home-is-here" icon={<FileCode size={45} />} color={COLORS.accent} showAt={160} />
                <FileItem name="home here" icon={<FileJson size={45} />} color={COLORS.secondary} showAt={175} />
            </AbsoluteFill>

            {/* Part 3: The Shell Question */}
            <TextBlock
                showAt={300}
                accentColor={COLORS.accent}
                icon={<Terminal size={110} color={COLORS.accent} />}
                text={
                    <>
                        وكيف يتعامل معها الـ <span style={{ color: COLORS.accent }}>Shell</span><br />
                        عند استخدام <span style={{ color: COLORS.primary, fontFamily: 'Fira Code' }}>cat</span>؟
                    </>
                }
            />

            <Vignette />
        </AbsoluteFill>
    );
};
