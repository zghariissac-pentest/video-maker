import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
} from 'remotion';
import {
    CyberBg, StarField, Vignette,
    COLORS, TokenIcon, LockOpenIcon
} from '../components/SessionTheme';

// ─── Simple Server Icon ───────────────────────────────────────────────────────
const ServerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.blue }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" fill={`${color}15`} />
        <rect x="2" y="14" width="20" height="8" rx="2" fill={`${color}15`} />
        <path d="M6 6h.01M6 18h.01" strokeWidth="3" />
        <path d="M10 6h8M10 18h8" />
    </svg>
);

// ─── Simple Browser Icon ──────────────────────────────────────────────────────
const BrowserIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" fill={`${color}15`} />
        <path d="M2 8h20" />
        <path d="M6 6h.01M10 6h.01M14 6h.01" strokeWidth="2" />
    </svg>
);

// ─── Subtitle Text Box ────────────────────────────────────────────────────────
const SubtitleBox: React.FC<{ text: string | React.ReactNode; showAt: number; hideAt?: number }> = ({ text, showAt, hideAt }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    if (frame < showAt) return null;
    if (hideAt && frame > hideAt) return null;

    const op = interpolate(frame, [showAt, showAt + 15], [0, 1], { extrapolateRight: 'clamp' });
    const outOp = hideAt ? interpolate(frame, [hideAt - 15, hideAt], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;
    const y = interpolate(spring({ frame: frame - showAt, fps, config: { damping: 14 } }), [0, 1], [20, 0]);

    return (
        <div style={{
            position: 'absolute', bottom: 120, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: op * outOp, transform: `translateY(${y}px)`,
            zIndex: 20,
        }}>
            <p style={{
                fontSize: 42,
                fontWeight: 600,
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.95)',
                maxWidth: '80%',
                lineHeight: 1.6,
                textShadow: `0 4px 20px ${COLORS.bg}, 0 2px 10px rgba(0,0,0,0.8)`,
                padding: '24px 48px',
                background: 'rgba(5, 10, 15, 0.7)',
                border: `1px solid rgba(0, 229, 200, 0.2)`,
                borderRadius: 24,
                backdropFilter: 'blur(10px)',
            }}>{text}</p>
        </div>
    );
};

// ─── Data Packet Animation ────────────────────────────────────────────────────
interface PacketProps {
    startFrame: number;
    duration: number;
    startX: string;
    endX: string;
    y: string;
    icon: React.ReactNode;
    color: string;
}

const AnimatedPacket: React.FC<PacketProps> = ({ startFrame, duration, startX, endX, y, icon, color }) => {
    const frame = useCurrentFrame();
    if (frame < startFrame || frame > startFrame + duration) return null;

    const progress = (frame - startFrame) / duration;
    // Slight ease in-out
    const easedProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    // We expect startX and endX to be pixel or percentage string values, e.g. "30%", "70%".
    // For simplicity, we can do a CSS calc() interpolation
    const currentX = `calc(${startX} + (${easedProgress} * (${endX} - ${startX})))`;

    return (
        <div style={{
            position: 'absolute',
            top: y,
            left: currentX,
            transform: 'translate(-50%, -50%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 70, height: 70,
            borderRadius: '50%',
            background: `${color}22`,
            border: `1px solid ${color}88`,
            boxShadow: `0 0 20px ${color}66`,
            zIndex: 10,
        }}>
            {icon}
        </div>
    );
};

// ─── Main Scene Component ─────────────────────────────────────────────────────
export const Scene2_Mechanism: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in/out
    const masterOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) *
        interpolate(frame, [385, 400], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Node positioning
    const clientX = '25%';
    const serverX = '75%';
    const nodeY = '45%';

    // Scale animation for nodes
    const clientScale = interpolate(spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14 } }), [0, 1], [0.5, 1]);
    const serverScale = interpolate(spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14 } }), [0, 1], [0.5, 1]);

    // Token creation scaling inside server
    const tokenCreatedScale = interpolate(spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 12 } }), [0, 1], [0, 1]);

    // Cookie box inside browser showing the token later
    const cookieScale = interpolate(spring({ frame: Math.max(0, frame - 305), fps, config: { damping: 12 } }), [0, 1], [0, 1]);

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <CyberBg />
            <StarField count={45} />

            <div style={{ opacity: masterOp, width: '100%', height: '100%' }}>

                {/* Connection Line */}
                <div style={{
                    position: 'absolute',
                    top: nodeY, left: clientX, right: '25%', height: 2,
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, transparent)`,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}>
                    {/* Animated dashes in connection */}
                    <div style={{
                        width: '100%', height: '100%',
                        background: `repeating-linear-gradient(90deg, transparent, transparent 10px, ${COLORS.teal}44 10px, ${COLORS.teal}44 20px)`,
                        transform: `translateX(${(frame % 30)}px)`,
                        opacity: 0.5,
                    }} />
                </div>

                {/* Left Node: Client (Browser) */}
                <div style={{
                    position: 'absolute', top: nodeY, left: clientX,
                    transform: `translate(-50%, -50%) scale(${clientScale})`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    zIndex: 5,
                }}>
                    <div style={{
                        width: 140, height: 140, borderRadius: 32,
                        background: `${COLORS.teal}11`, border: `2px solid ${COLORS.teal}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 40px ${COLORS.teal}44 inset, 0 0 30px ${COLORS.teal}33`,
                        position: 'relative',
                    }}>
                        <BrowserIcon size={80} color={COLORS.teal} />

                        {/* Session Cookie container that appears when token arrives */}
                        {frame > 300 && (
                            <div style={{
                                position: 'absolute', bottom: -20, right: -20,
                                width: 70, height: 70, borderRadius: 16,
                                background: `${COLORS.blue}22`, border: `1px solid ${COLORS.blue}aa`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 0 15px ${COLORS.blue}66`,
                                transform: `scale(${cookieScale})`,
                            }}>
                                <span style={{ position: 'absolute', top: -18, fontSize: 12, color: COLORS.blue, fontWeight: 'bold' }}>Cookie</span>
                                <TokenIcon size={40} color={COLORS.blue} />
                            </div>
                        )}
                    </div>
                    <span style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.teal, fontFamily: 'monospace' }}>Browser</span>
                </div>

                {/* Right Node: Server */}
                <div style={{
                    position: 'absolute', top: nodeY, left: serverX,
                    transform: `translate(-50%, -50%) scale(${serverScale})`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    zIndex: 5,
                }}>
                    <div style={{
                        width: 140, height: 140, borderRadius: 32,
                        background: `${COLORS.blue}11`, border: `2px solid ${COLORS.blue}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 40px ${COLORS.blue}44 inset, 0 0 30px ${COLORS.blue}33`,
                        position: 'relative',
                    }}>
                        <ServerIcon size={80} color={COLORS.blue} />

                        {/* Token generation inside server */}
                        {frame > 210 && frame < 270 && (
                            <div style={{
                                position: 'absolute', top: -30, left: '50%', transform: `translateX(-50%) scale(${tokenCreatedScale})`,
                                padding: '4px 12px', borderRadius: 8, background: `${COLORS.teal}33`,
                                border: `1px solid ${COLORS.teal}88`, color: COLORS.teal, fontSize: 14, fontWeight: 'bold'
                            }}>
                                Generates Token
                            </div>
                        )}
                    </div>
                    <span style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.blue, fontFamily: 'monospace' }}>Server</span>
                </div>


                {/* Animation Sequence:
                    1. 100 - 160: Client sends login request (Lock Icon)
                    2. 180 (Subtitle Change): "Instead..."
                    3. 210 - 240: Server generates token (Text popup)
                    4. 250 - 310: Server sends Token back to Client
                */}

                {/* Packet 1: Login Request */}
                <AnimatedPacket
                    startFrame={100} duration={50}
                    startX={clientX} endX={serverX} y={nodeY}
                    icon={<LockOpenIcon size={40} color={COLORS.red} />}
                    color={COLORS.red}
                />

                {/* Cross/Reject or "doesn't check password every request" visual could be here,
                    but we keep it simple with just sending it once as "Authentication". */}

                {/* Packet 2: Sending Token back */}
                <AnimatedPacket
                    startFrame={250} duration={55}
                    startX={serverX} endX={clientX} y={nodeY}
                    icon={<TokenIcon size={40} color={COLORS.blue} />}
                    color={COLORS.blue}
                />


                {/* Subtitles */}
                {/* 1. "عندما تقوم بتسجيل الدخول..." */}
                <SubtitleBox
                    text={
                        <>
                            عندما تقوم بتسجيل الدخول إلى موقع، الخادم <span style={{ color: COLORS.red }}>لا يتحقق</span> من كلمة المرور في كل طلب ترسله.
                        </>
                    }
                    showAt={20} hideAt={170}
                />

                {/* 2. "بدلاً من ذلك..." */}
                <SubtitleBox
                    text={
                        <>
                            بدلاً من ذلك، بعد نجاح عملية Authentication<br />
                            يقوم الخادم بإنشاء <span style={{ color: COLORS.teal }}>Session Token</span> ويرسله إلى المتصفح داخل <span style={{ color: COLORS.blue }}>Session Cookie</span>.
                        </>
                    }
                    showAt={180} hideAt={380}
                />

            </div>

            <Vignette />
        </AbsoluteFill>
    );
};
