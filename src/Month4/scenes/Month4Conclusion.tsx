import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    ModernBackground, ModernStaticVignette,
    COLORS
} from '../components/Month4Theme';

const StepNode: React.FC<{ label: string; sub: string; active: boolean; opacity: number; error?: boolean }> = ({ label, sub, active, opacity, error }) => (
    <div style={{
        flex: 1,
        padding: '25px',
        background: active ? `${error ? COLORS.secondary : COLORS.primary}10` : 'rgba(255, 255, 255, 0.02)',
        borderRadius: 24,
        border: `1px solid ${active ? (error ? COLORS.secondary : COLORS.primary) : 'rgba(255, 255, 255, 0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity,
        boxShadow: active ? `0 0 30px ${(error ? COLORS.secondary : COLORS.primary)}30` : 'none'
    }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: '900', color: active ? COLORS.white : 'rgba(255,255,255,0.2)' }}>{sub}</div>
        {error && (
            <div style={{ color: COLORS.secondary, fontSize: 12, fontWeight: 'bold' }}>BYPASSED</div>
        )}
    </div>
);

export const Month4Conclusion: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{
            background: COLORS.background,
            fontFamily: 'Inter, Cairo, sans-serif',
            overflow: 'hidden',
        }}>
            <ModernBackground />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 70,
                zIndex: 10
            }}>
                {/* NARRATIVE TEXT (Arabic) */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    opacity: interpolate(frame, [10, 30], [0, 1]),
                    maxWidth: 1000
                }}>
                    <div style={{
                        fontSize: 48,
                        fontWeight: 900,
                        color: COLORS.white,
                    }}>
                        السيرفر يفترض أن الخطوات ستتم بترتيب معين…
                    </div>
                    <div style={{
                        fontSize: 42,
                        fontWeight: 700,
                        color: COLORS.secondary,
                        opacity: interpolate(frame, [120, 140], [0, 1]),
                    }}>
                        لكنه لا يتحقق من الحالة الفعلية قبل التنفيذ.
                    </div>
                </div>

                {/* FLOW DIAGRAM */}
                <div style={{
                    width: 900,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 30,
                    opacity: interpolate(frame, [40, 60], [0, 1])
                }}>
                    <StepNode label="STEP 01" sub="Request Initialization" active={true} opacity={1} />
                    <div style={{ flex: 0.2, height: 2, background: 'rgba(255,255,255,0.1)' }} />
                    <StepNode label="STEP 02" sub="State Check" active={frame > 160} error={frame > 160} opacity={1} />
                    <div style={{ flex: 0.2, height: 2, background: 'rgba(255,255,255,0.1)' }} />
                    <StepNode label="STEP 03" sub="Execution" active={frame > 180} opacity={1} />
                </div>

                {/* THE DEFINITION */}
                <div style={{
                    marginTop: 20,
                    direction: 'rtl',
                    background: 'rgba(0, 242, 255, 0.05)',
                    padding: '20px 50px',
                    borderRadius: 40,
                    border: `2px solid ${COLORS.primary}`,
                    opacity: interpolate(frame, [200, 220], [0, 1]),
                    boxShadow: `0 0 50px ${COLORS.primary}20`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20
                }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.white }}>هذا هو:</div>
                    <div style={{ fontSize: 40, fontWeight: '950', color: COLORS.primary, letterSpacing: '0.02em' }}>
                        State-based logic flaw
                    </div>
                </div>
            </div>

            <ModernStaticVignette />
        </AbsoluteFill>
    );
};
