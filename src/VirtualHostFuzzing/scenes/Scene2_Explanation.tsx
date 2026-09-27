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
} from '../components/Theme';

const ExplanatonLine: React.FC<{
    text: React.ReactNode;
    showAt: number;
    hideAt?: number;
    color?: string;
    align?: 'right' | 'center';
}> = ({ text, showAt, hideAt, color = 'white', align = 'right' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });
    const out = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;

    return (
        <p style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            textAlign: align,
            color: color,
            lineHeight: 1.6,
            width: '95%',
            opacity: appear * out,
            transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
            margin: '15px 0',
            textShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}>
            {text}
        </p>
    );
};

const HostHeaderCard: React.FC<{
    showAt: number;
}> = ({ showAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 14 } });

    // Cycle between subdomains
    const subdomains = ['dev.target.com', 'api.target.com', 'admin.target.com', 'hidden.target.com'];
    const activeIndex = Math.min(Math.floor((frame - showAt) / 30), subdomains.length - 1);
    const activeDomain = subdomains[activeIndex];

    return (
        <div style={{
            width: '90%',
            background: 'rgba(5, 10, 20, 0.95)',
            border: `2px solid ${COLORS.primary}30`,
            borderRadius: '20px',
            padding: '30px',
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${COLORS.primary}10`,
            transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])}) translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
            opacity: appear,
            marginTop: '30px',
            fontFamily: 'monospace',
            color: 'white',
            fontSize: 32,
            lineHeight: 1.5,
            direction: 'ltr',
            textAlign: 'left'
        }}>
            <div style={{ color: COLORS.accent, opacity: 0.8 }}>GET / HTTP/1.1</div>
            <div style={{
                color: COLORS.primary,
                fontWeight: 'bold',
                background: `rgba(240, 219, 79, ${Math.sin(frame / 5) * 0.1 + 0.1})`,
                padding: '5px 10px',
                borderRadius: '8px',
                display: 'inline-block',
                marginTop: '10px',
                transition: 'all 0.2s ease',
            }}>
                Host: <span style={{ color: COLORS.white }}>{activeDomain}</span>
            </div>
            <div style={{ color: COLORS.white, opacity: 0.6, marginTop: '10px' }}>User-Agent: Mozilla/5.0</div>
            <div style={{ color: COLORS.white, opacity: 0.6 }}>Accept: */*</div>
        </div>
    );
}

const SiteIcon: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = COLORS.accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill={`${color}15`} />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
);

const VirtualHostsVisual: React.FC<{ showAt: number; hideAt: number }> = ({ showAt, hideAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt || frame > hideAt) return null;

    const appear = spring({ frame: frame - showAt, fps, config: { damping: 12 } });
    const out = interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const sites = [
        { name: 'dev.target.htb', color: COLORS.primary, delay: 15 },
        { name: 'api.target.htb', color: COLORS.secondary, delay: 30 },
        { name: 'admin.target.htb', color: COLORS.accent, delay: 45 }
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            marginTop: 40,
            opacity: appear * out,
            transform: `scale(${interpolate(appear, [0, 1], [0.8, 1])})`,
        }}>
            {/* Main Server */}
            <div style={{
                width: 120, height: 120,
                borderRadius: 20,
                background: `rgba(2, 6, 10, 0.8)`,
                border: `2px solid ${COLORS.white}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 30px ${COLORS.white}20`,
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: -30, color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>IP: 10.10.10.x</div>
                <svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="4" />
                    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="4" />
                </svg>
            </div>

            {/* Connecting Lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {sites.map((site, i) => {
                    const siteAppear = spring({ frame: frame - (showAt + site.delay), fps, config: { damping: 12 } });
                    return (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 20,
                            opacity: siteAppear,
                            transform: `translateX(${interpolate(siteAppear, [0, 1], [-30, 0])}px)`
                        }}>
                            <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.white}40, ${site.color})` }} />
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '10px 20px', borderRadius: 12,
                                background: `${site.color}15`,
                                border: `1px solid ${site.color}50`,
                                boxShadow: `0 0 20px ${site.color}20`
                            }}>
                                <SiteIcon color={site.color} />
                                <span style={{ color: site.color, fontFamily: 'monospace', fontWeight: 'bold', fontSize: 24 }}>{site.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const Scene2_Explanation: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '60px 40px', justifyContent: 'center' }}>
            <SpaceBg />
            <StarField count={110} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                zIndex: 10,
                position: 'relative'
            }}>
                {/* Intro Explanation */}
                {frame < 240 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                        <ExplanatonLine
                            text={
                                <>
                                    بعض الخوادم تستضيف عدة مواقع مختلفة على نفس <span style={{ color: COLORS.accent }}>IP Address</span> باستخدام ما يسمى <span style={{ color: COLORS.primary }}>Virtual Hosts</span>.
                                </>
                            }
                            showAt={5}
                            hideAt={240}
                            align="center"
                        />
                        <VirtualHostsVisual showAt={30} hideAt={240} />
                    </div>
                )}

                {/* Transition to Explanation */}
                {frame >= 250 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
                        <ExplanatonLine
                            text={
                                <>
                                    الموقع يظهر فقط عندما يتم إرسال <span style={{ color: COLORS.secondary }}>Host Header</span> معين داخل طلب HTTP.
                                </>
                            }
                            showAt={250}
                            align="center"
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <HostHeaderCard showAt={280} />
                        </div>
                    </div>
                )}
            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
