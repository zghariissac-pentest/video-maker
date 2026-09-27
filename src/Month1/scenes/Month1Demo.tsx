import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import {
    StableSpaceBg, StableStarField, StaticVignette,
    COLORS
} from '../components/Month1Theme';

const RequestBox: React.FC<{ command: string; title: string; opacity: number }> = ({ command, title, opacity }) => (
    <div style={{
        width: '100%',
        background: 'rgba(10, 15, 20, 0.4)',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    }}>
        <div style={{ fontSize: 14, color: COLORS.primary, fontWeight: 'bold', letterSpacing: '0.1em' }}>{title}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 24, color: COLORS.white }}>{command}</div>
    </div>
);

const ResponseBox: React.FC<{ headers: string[]; highlightIndex?: number; opacity: number }> = ({ headers, highlightIndex, opacity }) => (
    <div style={{
        width: '100%',
        background: 'rgba(10, 15, 20, 0.6)',
        borderRadius: 16,
        padding: 24,
        border: '1px solid rgba(71, 160, 245, 0.1)',
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontFamily: 'monospace',
        fontSize: 22
    }}>
        {headers.map((h, i) => (
            <div key={i} style={{
                color: i === highlightIndex ? COLORS.secondary : 'rgba(255,255,255,0.7)',
                background: i === highlightIndex ? `${COLORS.secondary}15` : 'transparent',
                padding: i === highlightIndex ? '4px 8px' : '0',
                borderRadius: 4,
                border: i === highlightIndex ? `1px solid ${COLORS.secondary}30` : 'none',
                fontWeight: i === highlightIndex ? 'bold' : 'normal'
            }}>
                {h}
            </div>
        ))}
    </div>
);

export const Month1Demo: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{
            background: '#010103',
            fontFamily: 'Cairo, sans-serif',
            overflow: 'hidden',
        }}>
            <StableSpaceBg />
            <StableStarField count={100} />

            <div style={{
                position: 'absolute',
                inset: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 50,
                zIndex: 10
            }}>
                {/* NARRATIVE TEXT */}
                <div style={{
                    direction: 'rtl',
                    textAlign: 'center',
                    height: 120,
                    fontSize: 48,
                    fontWeight: 800,
                    color: COLORS.white,
                    textShadow: '0 0 20px rgba(255,255,255,0.2)'
                }}>
                    {frame < 120 ? "أرسلت هذا الطلب باستخدام Burp Suite…" :
                        frame < 240 ? "ثم غيّرت الرقم فقط…" :
                            "الرد يبدو متشابه… لكن لاحظ الفرق هنا…"}
                </div>

                {/* DEMO CONTAINER */}
                <div style={{
                    width: 900,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: 32,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 30,
                    boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                }}>

                    {/* REQUEST SECTION */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <RequestBox
                            title="INTERCEPTED REQUEST (1)"
                            command="GET /api/user?id=101"
                            opacity={interpolate(frame, [20, 40], [0, 1])}
                        />

                        {frame > 140 && (
                            <RequestBox
                                title="MODIFIED REQUEST (2)"
                                command="GET /api/user?id=102"
                                opacity={interpolate(frame, [140, 160], [0, 1])}
                            />
                        )}
                    </div>

                    {/* RESPONSE SECTION */}
                    {frame > 260 && (
                        <div style={{ display: 'flex', gap: 20 }}>
                            <div style={{ flex: 1 }}>
                                <ResponseBox
                                    headers={["HTTP/1.1 200 OK", "Content-Type: application/json", "Content-Length: 512"]}
                                    highlightIndex={frame > 320 ? 2 : undefined}
                                    opacity={interpolate(frame, [260, 280], [0, 1])}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <ResponseBox
                                    headers={["HTTP/1.1 200 OK", "Content-Type: application/json", "Content-Length: 768"]}
                                    highlightIndex={frame > 320 ? 2 : undefined}
                                    opacity={interpolate(frame, [260, 280], [0, 1])}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* VISUAL HIGHLIGHT ARROW / POINTER IF NEEDED */}
                {frame > 340 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        color: COLORS.secondary,
                        fontSize: 32,
                        fontWeight: 'bold',
                        opacity: interpolate(frame % 30, [0, 15, 30], [0.4, 1, 0.4])
                    }}>
                        👉 فرق في حجم البيانات كشف الثغرة!
                    </div>
                )}
            </div>

            <StaticVignette />
        </AbsoluteFill>
    );
};
