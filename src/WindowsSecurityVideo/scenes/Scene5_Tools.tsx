import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';
import { Terminal, Key, Box, Settings, Cpu } from 'lucide-react';

const COLORS = {
    primary: '#00BDF2',
    accent: '#ff0055',
    background: '#020202',
};

// --- COMPONENTS ---

const ToolCard: React.FC<{
    name: string;
    Icon: React.ElementType;
    description: string;
    delay: number;
    color: string;
}> = ({ name, Icon, description, delay, color }) => {
    const frame = useCurrentFrame();
    const slide = spring({ frame: frame - delay, fps: 30, config: { damping: 15 } });

    const textProgress = Math.max(0, frame - delay - 20);
    const typedText = description.slice(0, Math.floor(textProgress / 1.5));

    return (
        <div style={{
            opacity: slide,
            transform: `translateY(${interpolate(slide, [0, 1], [100, 0])}px)`,
            width: 450,
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${color}40`,
            borderRadius: 24,
            padding: '40px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: 25,
            boxShadow: `0 20px 50px ${color}10`,
            backdropFilter: 'blur(10px)',
            height: 600,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                <div style={{ background: `${color}20`, padding: 12, borderRadius: 12 }}>
                    <Icon size={32} color={color} />
                </div>
                <h2 style={{
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 900,
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                    margin: 0,
                    textTransform: 'uppercase',
                }}>{name}</h2>
            </div>

            <div style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 16,
                padding: 20,
                border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
                <p style={{
                    color: '#ccc',
                    fontSize: 24,
                    lineHeight: 1.6,
                    fontFamily: 'Cairo, sans-serif',
                    direction: 'rtl',
                    margin: 0,
                }}>
                    {typedText}
                </p>
                {textProgress % 10 < 5 && typedText.length < description.length && (
                    <span style={{ color: color, fontSize: 24 }}>|</span>
                )}
            </div>
        </div>
    );
};

// --- SCENE ---

export const Scene5_Tools: React.FC = () => {
    const frame = useCurrentFrame();
    const { } = useVideoConfig(); // useVideoConfig is used in children

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            {/* Background Atmosphere */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 10% 10%, #00182b 0%, #020202 80%)',
                opacity: 0.5,
            }} />

            {/* Title Section */}
            <div style={{
                position: 'absolute',
                top: '10%',
                width: '100%',
                textAlign: 'center',
            }}>
                <h1 style={{
                    fontSize: 55,
                    fontWeight: 950,
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    textShadow: `0 0 30px ${COLORS.primary}80`,
                }}>
                    أهم الأدوات والتقنيات المستخدمة:
                </h1>
            </div>

            {/* Tool Cards Container */}
            <div style={{
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 50,
            }}>
                <ToolCard
                    name="CrackMapExec"
                    Icon={Key}
                    description="تستعمله لاختبار تسجيل الدخول، ومعرفة إذا كانت هناك صلاحيات أو وصول"
                    delay={30}
                    color={COLORS.primary}
                />

                <ToolCard
                    name="Impacket"
                    Icon={Box}
                    description="مجموعة أدوات تسمح لك بالتعامل مع SMB مثل استعراض الملفات أو تنفيذ أوامر عن بعد إذا كان الوصول متاح"
                    delay={90}
                    color={COLORS.accent}
                />
            </div>

            {/* Floating Decorations */}
            <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: 0.05,
            }}>
                <Terminal size={400} style={{ position: 'absolute', bottom: -100, left: -100, color: COLORS.primary }} />
                <Settings size={300} style={{ position: 'absolute', top: -50, right: -50, color: COLORS.accent }} />
                <Cpu size={200} style={{ position: 'absolute', bottom: 100, right: 100, color: COLORS.primary }} />
            </div>

            {/* Progress Scanning Line */}
            <div style={{
                position: 'absolute',
                height: 4,
                width: (frame / 600) * 100 + '%',
                background: COLORS.primary,
                bottom: 0,
                left: 0,
                boxShadow: `0 0 20px ${COLORS.primary}`,
            }} />
        </AbsoluteFill>
    );
};
