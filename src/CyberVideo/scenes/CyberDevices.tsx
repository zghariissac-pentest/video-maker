import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Audio,
    staticFile,
} from 'remotion';
import { COLORS, Scanlines, StaticVignette, CyberBackground } from '../components/CyberTheme';

// ─── Single Result Row ───────────────────────────────────────────
const Row: React.FC<{
    rank: number;
    title: string;
    url: string;
    snippet: string;
    color: string;
    highlighted: boolean;
    entryFrame: number;
    frame: number;
}> = ({ title, url, snippet, color, highlighted, entryFrame, frame }) => {
    const op = interpolate(frame, [entryFrame, entryFrame + 15], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            padding: '12px 0',
            borderBottom: `1px solid rgba(255,255,255,0.06)`,
            opacity: op,
            background: highlighted ? `${color}08` : 'transparent',
            borderRadius: 8,
            paddingLeft: highlighted ? 10 : 0,
            paddingRight: highlighted ? 10 : 0,
            borderLeft: highlighted ? `3px solid ${color}` : '3px solid transparent',
            boxShadow: highlighted ? `inset 0 0 20px ${color}0a` : 'none',
        }}>
            {/* URL breadcrumb (Google-style green) */}
            <div style={{ fontSize: 12, color: '#4ade80', fontFamily: 'monospace', marginBottom: 4, direction: 'ltr' }}>
                {url}
            </div>
            {/* Blue link title */}
            <div style={{ fontSize: 19, fontWeight: 700, color: '#8ab4f8', fontFamily: 'Cairo, sans-serif', lineHeight: 1.25, direction: 'rtl', marginBottom: 5 }}>
                {title}
            </div>
            {/* Gray snippet */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Cairo, sans-serif', lineHeight: 1.5, direction: 'rtl' }}>
                {snippet}
            </div>
        </div>
    );
};

// ─── Half Panel (top or bottom) ─────────────────────────────────
const HalfPanel: React.FC<{
    position: 'top' | 'bottom';
    color: string;
    label: string;
    slideProgress: number;
    highlightActive: boolean;
    frame: number;
    results: { title: string; url: string; snippet: string; highlighted?: boolean }[];
}> = ({ position, color, label, slideProgress, highlightActive, frame, results }) => {
    const yFrom = position === 'top' ? -400 : 400;
    const y = interpolate(slideProgress, [0, 1], [yFrom, 0]);
    const half = position === 'top' ? '0%' : '50%';

    return (
        <div style={{
            position: 'absolute',
            left: 0, right: 0,
            top: half,
            height: '50%',
            transform: `translateY(${y}px)`,
            opacity: slideProgress,
            padding: position === 'top' ? '90px 50px 20px' : '20px 50px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            {/* Label */}
            <div style={{
                fontSize: 13, fontFamily: 'monospace', color, opacity: 0.7,
                letterSpacing: 3, marginBottom: 14,
            }}>
                ◈ {label}
            </div>

            {/* Card */}
            <div style={{
                background: 'rgba(5,8,18,0.88)',
                backdropFilter: 'blur(24px)',
                border: `1px solid ${color}35`,
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: `0 0 60px ${color}18, 0 20px 60px rgba(0,0,0,0.6)`,
            }}>
                {/* Google-style search bar */}
                <div style={{
                    background: 'rgba(0,0,0,0.45)',
                    borderBottom: `1px solid rgba(255,255,255,0.06)`,
                    padding: '14px 20px',
                    display: 'flex', alignItems: 'center', gap: 14,
                }}>
                    {/* Google G logo  */}
                    <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                        {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c, i) => (
                            <div key={i} style={{ fontSize: 16, fontWeight: 900, color: c, fontFamily: 'Arial, sans-serif', lineHeight: 1 }}>
                                {'Goog'[i]}
                            </div>
                        ))}
                    </div>
                    {/* Search pill */}
                    <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 24, padding: '8px 18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <span style={{ fontSize: 15, fontFamily: 'Cairo, sans-serif', color: 'rgba(255,255,255,0.85)', direction: 'rtl' }}>
                            كيف تتعلم البرمجة
                        </span>
                        <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }}>🔍</span>
                    </div>
                </div>
                {/* Results */}
                <div style={{ padding: '14px 22px', display: 'flex', flexDirection: 'column' }}>
                    {results.map((r, i) => (
                        <Row
                            key={i}
                            rank={i + 1}
                            title={r.title}
                            url={r.url}
                            snippet={r.snippet}
                            color={color}
                            highlighted={!!r.highlighted && highlightActive}
                            entryFrame={10 + i * 12}
                            frame={frame}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Scene ───────────────────────────────────────────────────────
export const CyberDevices: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const top = spring({ frame: frame - 5, fps, config: { stiffness: 55, damping: 14 } });
    const bot = spring({ frame: frame - 25, fps, config: { stiffness: 55, damping: 14 } });

    const beat1 = 80;
    const beat2 = 140;
    const beat3 = 200;

    const d1 = interpolate(frame, [beat1, beat1 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const d2 = interpolate(frame, [beat2, beat2 + 18], [0, 1], { extrapolateRight: 'clamp' });
    const d3 = interpolate(frame, [beat3, beat3 + 18], [0, 1], { extrapolateRight: 'clamp' });

    const hookOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    const diffLabels = [
        { text: 'الترتيب يتغير…', progress: d1 },
        { text: 'المحتوى يتغير…', progress: d2 },
        { text: 'حتى الاقتراحات تختلف.', progress: d3 },
    ];

    return (
        <AbsoluteFill style={{ background: COLORS.background, overflow: 'hidden' }}>
            <CyberBackground />
            <AbsoluteFill style={{ background: 'rgba(0,0,0,0.74)' }} />

            {/* SFX */}
            <Audio src={staticFile('assets/cyber/sfx/whoosh.wav')} startFrom={0} volume={0.35} />
            <Audio src={staticFile('assets/cyber/sfx/typing.wav')} startFrom={10} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/typing.wav')} startFrom={25} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/beep.wav')} startFrom={40} volume={0.4} />
            <Audio src={staticFile('assets/cyber/sfx/tick.wav')} startFrom={80} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/tick.wav')} startFrom={140} volume={0.45} />
            <Audio src={staticFile('assets/cyber/sfx/tick.wav')} startFrom={200} volume={0.45} />

            {/* TOP PANEL — Device A */}
            <HalfPanel
                position="top"
                color={COLORS.secondary}
                label="DEVICE_A"
                slideProgress={top}
                highlightActive={d1 > 0.5}
                frame={frame}
                results={[
                    { title: 'أفضل 10 كورسات برمجة مجانية للمبتدئين', url: 'ar.coursera.org › learn › programming', snippet: 'تعلّم البرمجة من الصفر مع أفضل المدرّسين — مجاناً وبالعربية.', highlighted: true },
                    { title: 'تعلّم Python خطوة بخطوة', url: 'python.org › beginners › ar', snippet: 'وثائق رسمية للمبتدئين — ابدأ بأول سطر كود في أقل من 5 دقائق.' },
                    { title: 'مجتمع المبرمجين العرب', url: 'arabcoders.io › forum', snippet: 'اطرح أسئلتك وتواصل مع آلاف المطوّرين العرب حول العالم.' },
                ]}
            />

            {/* BOTTOM PANEL — Device B */}
            <HalfPanel
                position="bottom"
                color={COLORS.accent}
                label="DEVICE_B"
                slideProgress={bot}
                highlightActive={d1 > 0.5}
                frame={frame}
                results={[
                    { title: 'Bootcamp برمجة مدفوع — سجّل الآن', url: 'techbootcamp.com › ar › enroll', snippet: 'انضم اليوم وابدأ مسيرتك المهنية — 400$ فقط لكامل المنهج.', highlighted: true },
                    { title: 'أفضل أدوات Hacking للمحترفين 2024', url: 'hackthebox.eu › tools › list', snippet: 'Burp Suite, Metasploit, Nmap — نظرة عامة على أدوات اختبار الاختراق.' },
                    { title: 'أفضل لغات برمجة 2024 — تقرير GitHub', url: 'github.blog › developer-survey', snippet: 'Python وJavaScript الأكثر طلباً — شاهد الإحصائيات الكاملة.' },
                ]}
            />

            {/* ─── DIVIDER LINE ─── */}
            <div style={{
                position: 'absolute',
                left: 50, right: 50, top: '50%',
                height: 1,
                background: `linear-gradient(90deg, transparent, ${COLORS.secondary}40, rgba(255,255,255,0.15), ${COLORS.accent}40, transparent)`,
                opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
            }} />

            {/* ─── HOOK TEXT (over divider) ─── */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 90,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                direction: 'rtl',
                fontFamily: 'Cairo, sans-serif',
                textAlign: 'center',
                opacity: hookOpacity,
                paddingTop: 20,
            }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    جرب تبحث عن نفس الكلمة… على جهازين مختلفين.
                </div>
            </div>

            {/* ─── DIFF LABELS — over divider, animated ─── */}
            <div style={{
                position: 'absolute',
                left: 0, right: 0, top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                zIndex: 20,
                pointerEvents: 'none',
            }}>
                {diffLabels.map(({ text, progress }, i) => (
                    <div key={i} style={{
                        opacity: progress,
                        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
                        display: 'flex', alignItems: 'center', gap: 14,
                    }}>
                        <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, transparent, ${COLORS.primary}90)` }} />
                        <div style={{
                            fontSize: 28, fontWeight: 800,
                            color: COLORS.primary,
                            textShadow: `0 0 20px ${COLORS.primary}`,
                            fontFamily: 'Cairo, sans-serif', direction: 'rtl',
                            whiteSpace: 'nowrap',
                        }}>
                            {text}
                        </div>
                        <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, ${COLORS.primary}90, transparent)` }} />
                    </div>
                ))}
            </div>

            {/* ─── CORNER ─── */}
            <div style={{
                position: 'absolute', bottom: 45, left: 50,
                color: COLORS.secondary, opacity: 0.2,
                fontSize: 12, fontFamily: 'monospace', lineHeight: 1.9,
            }}>
                DIFF: {interpolate(frame, [0, 215], [0, 94], { extrapolateRight: 'clamp' }).toFixed(0)}%
            </div>

            <StaticVignette />
            <Scanlines />
        </AbsoluteFill>
    );
};
