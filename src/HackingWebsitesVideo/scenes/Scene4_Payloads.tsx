import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import { Package, GitFork, Terminal, BookOpen, UserCheck } from 'lucide-react';

export const Scene4_Payloads: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const titleAppear = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const contentAppear = spring({
        frame: frame - 25,
        fps,
        config: { damping: 14, stiffness: 90 }
    });

    const tipAppear = spring({
        frame: frame - 180,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    // Logo floating & rotating
    const logoY = Math.sin(frame / 35) * 15;

    return (
        <AbsoluteFill style={{
            background: '#000',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 60px',
                zIndex: 20,
            }}>

                {/* Header */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    marginBottom: 70,
                    opacity: titleAppear,
                    transform: `translateY(${interpolate(titleAppear, [0, 1], [30, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: 45,
                        color: '#f54768', // Pink/Redish for payloads
                        fontFamily: 'Cairo, sans-serif',
                        margin: '0 0 10px 0',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                    }}>
                        الثالث:
                    </h2>
                    <h1 style={{
                        fontSize: 85,
                        fontWeight: 900,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        textShadow: '0 0 40px rgba(245, 71, 104, 0.3)',
                    }}>
                        PayloadsAllTheThings
                    </h1>
                </div>

                {/* GitHub Repo / Library Visualization */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 30,
                    marginBottom: 80,
                    opacity: contentAppear,
                    transform: `scale(${interpolate(contentAppear, [0, 1], [0.9, 1])}) translateY(${logoY}px)`,
                }}>
                    {/* Main Icon */}
                    <div style={{
                        width: 320,
                        height: 320,
                        background: 'linear-gradient(135deg, #f5476830, #00d4ff30)',
                        border: '3px solid #f54768',
                        borderRadius: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: '0 0 60px rgba(245, 71, 104, 0.4)',
                    }}>
                        <BookOpen size={180} color="white" strokeWidth={1.5} />
                        <Package size={60} color="#f54768" style={{ position: 'absolute', bottom: -20, right: -20, filter: 'drop-shadow(0 0 10px #f54768)' }} />
                    </div>

                    {/* Floating Side Info */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 20,
                        direction: 'rtl',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(255,255,255,0.05)', padding: '15px 30px', borderRadius: 20 }}>
                            <GitFork size={30} color="#fff" />
                            <span style={{ color: '#fff', fontSize: 24, fontFamily: 'Cairo' }}>GitHub Verified</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(245, 71, 104,0.1)', padding: '15px 30px', borderRadius: 20 }}>
                            <Terminal size={30} color="#f54768" />
                            <span style={{ color: '#fff', fontSize: 24, fontFamily: 'Cairo' }}>Ready Payloads</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    maxWidth: 950,
                    opacity: contentAppear,
                    transform: `translateY(${interpolate(contentAppear, [0, 1], [30, 0])}px)`,
                    marginBottom: 100,
                }}>
                    <p style={{
                        fontSize: 55,
                        fontFamily: 'Cairo, sans-serif',
                        lineHeight: 1.4,
                        color: '#eee',
                        margin: 0,
                        fontWeight: 600,
                    }}>
                        مكتبة ضخمة من <br />
                        <span style={{ color: '#f54768', textShadow: '0 0 20px #f5476840' }}>payloads جاهزة</span> للاستخدام.
                    </p>
                </div>

                {/* Warning: Mastery over copy-paste */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    background: 'linear-gradient(to right, rgba(0,212,255,0.1), rgba(245, 71, 104,0.1))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '40px 60px',
                    borderRadius: 35,
                    opacity: tipAppear,
                    transform: `translateY(${interpolate(tipAppear, [0, 1], [40, 0])}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 40,
                    maxWidth: 1000,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}>
                    <UserCheck size={80} color="#00d4ff" />
                    <p style={{
                        fontSize: 42,
                        fontFamily: 'Cairo, sans-serif',
                        color: 'white',
                        margin: 0,
                        fontWeight: 700,
                        lineHeight: 1.4,
                    }}>
                        لكن استخدامها بدون فهم… <br />
                        لن يجعلك <span style={{ color: '#00d4ff' }}>محترفًا</span> أبدًا.
                    </p>
                </div>
            </div>

            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: 0, bottom: 0, left: 0, right: 0,
                backgroundImage: 'radial-gradient(ellipse at center, rgba(245,71,104,0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
