import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { UserSquare2, RefreshCw, User, Smartphone, Server, RefreshCcw, Fingerprint, LucideIcon } from 'lucide-react';

export const TelegramScene5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text slides
    const t1Slide = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const t2Slide = spring({ frame: frame - 50, fps, config: { damping: 14 } });
    const t3Slide = spring({ frame: frame - 160, fps, config: { damping: 14 } });
    const t4Slide = spring({ frame: frame - 280, fps, config: { damping: 14 } });

    const t1Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });
    const t2Opacity = interpolate(frame, [50, 60], [0, 1], { extrapolateRight: 'clamp' });
    const t3Opacity = interpolate(frame, [160, 170], [0, 1], { extrapolateRight: 'clamp' });
    const t4Opacity = interpolate(frame, [280, 290], [0, 1], { extrapolateRight: 'clamp' });

    // The entire earlier text block exits around frame 270 to make room for final description
    const topTextExit = spring({ frame: frame - 260, fps, config: { damping: 14 } });
    const topTextOpacity = interpolate(frame, [260, 275], [1, 0], { extrapolateRight: 'clamp' });

    // Identity Mask warping logic (Frames 50->150)
    // Flicker scale violently a few times to show instability
    const idUnstable = Math.sin(frame * 0.5) * 5;

    // Main UI element rotation (Identity Rotation concept)
    const rotationDegrees = interpolate(frame, [160, 300], [0, 360], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const rotationPop = spring({ frame: frame - 150, fps, config: { damping: 10 } });

    // Sub-items pop for the final description
    const item1Pop = spring({ frame: frame - 300, fps, config: { damping: 12 } });
    const item2Pop = spring({ frame: frame - 320, fps, config: { damping: 12 } });
    const item3Pop = spring({ frame: frame - 340, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden" dir="rtl">

            {/* Glowing background grid */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #6b21a8 0%, transparent 40%)',
                    transform: `rotate(${frame * 0.2}deg) scale(1.5)`
                }}
            />

            {/* EXIT BLOCK FOR INTRO TEXT */}
            <AbsoluteFill
                className="justify-start items-center pt-24 px-12 z-10"
                style={{
                    opacity: topTextOpacity,
                    transform: `translateY(${interpolate(topTextExit, [0, 1], [0, -100])}px)`
                }}
            >
                {/* Line 1: Point 2 */}
                <div
                    style={{
                        opacity: t1Opacity,
                        transform: `translateY(${interpolate(t1Slide, [0, 1], [30, 0])}px)`,
                        fontSize: '50px',
                        color: '#a3a3a3',
                    }}
                >
                    النقطة الثانية…
                </div>

                {/* Line 2: Identities aren't fixed */}
                <div
                    style={{
                        opacity: t2Opacity,
                        transform: `translateY(${interpolate(t2Slide, [0, 1], [30, 0])}px)`,
                        fontSize: '70px',
                        color: '#d946ef', // Fuchsia 500
                        fontWeight: 'bold',
                        marginTop: '20px',
                        textShadow: '0 0 30px rgba(217,70,239,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}
                >
                    الهويات ليست <span className="text-white" style={{ transform: `rotate(${frame > 50 && frame < 150 ? idUnstable : 0}deg)`, display: 'inline-block' }}>ثابتة.</span>
                    <Fingerprint
                        size={60}
                        style={{
                            transform: `skewX(${frame > 50 && frame < 150 ? idUnstable : 0}deg)`,
                            opacity: frame > 50 && frame % 4 < 2 ? 0.3 : 1
                        }}
                    />
                </div>

                {/* Line 3: Identity Rotation Graphic */}
                <div
                    style={{
                        opacity: t3Opacity,
                        transform: `translateY(${interpolate(t3Slide, [0, 1], [50, 0])}px)`,
                        marginTop: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px'
                    }}
                >
                    {/* The cool rotation UI */}
                    <div className="relative flex justify-center items-center" style={{ transform: `scale(${rotationPop})` }}>
                        <div className="absolute w-48 h-48 rounded-full border-4 border-dashed border-fuchsia-500/50" style={{ transform: `rotate(${rotationDegrees}deg)` }}></div>
                        <RefreshCw size={100} color="#d946ef" style={{ transform: `rotate(${rotationDegrees}deg)` }} className="absolute" />
                        <UserSquare2 size={120} color="#white" className="z-10" />
                    </div>

                    <div style={{ fontSize: '45px', color: '#e0e0e0', textAlign: 'center', maxWidth: '800px', lineHeight: '1.5' }}>
                        في عالم التحقيقات الرقمية، يُعرف هذا بـ
                        <br />
                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400" dir="ltr" style={{ padding: '10px 0', display: 'inline-block' }}>
                            Identity Rotation
                        </span>
                    </div>
                </div>
            </AbsoluteFill>

            {/* PART 4: Final Breakdown - What does it mean? */}
            <AbsoluteFill
                className="justify-center items-center px-12 z-20 pb-12"
                style={{ opacity: t4Opacity }}
            >
                <div
                    style={{
                        transform: `translateY(${interpolate(t4Slide, [0, 1], [50, 0])}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <div style={{ fontSize: '55px', color: '#ffffff', textAlign: 'center', marginBottom: '80px', maxWidth: '900px', fontWeight: 'bold' }}>
                        أي تغيير الحسابات، الأجهزة، وحتى البنية الرقمية بشكل مستمر.
                    </div>

                    {/* Cycled Nodes Display */}
                    <div className="flex gap-16 justify-center w-full" dir="ltr">

                        {/* Accounts node */}
                        <div style={{ transform: `scale(${item1Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="relative flex justify-center items-center w-36 h-36 rounded-[2.5rem] bg-indigo-900/40 border border-indigo-400 shadow-[0_0_40px_rgba(129,140,248,0.4)]">
                                <User size={70} className="text-indigo-300" />
                                <RefreshCcw size={30} className="absolute -top-4 -right-4 text-white bg-indigo-500 rounded-full p-1" style={{ transform: `rotate(-${frame * 2}deg)` }} />
                            </div>
                            <span className="text-3xl text-indigo-200">الحسابات</span>
                        </div>

                        {/* Devices node */}
                        <div style={{ transform: `scale(${item2Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="relative flex justify-center items-center w-36 h-36 rounded-[2.5rem] bg-emerald-900/40 border border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.4)]">
                                <Smartphone size={70} className="text-emerald-300" />
                                <RefreshCcw size={30} className="absolute -top-4 -right-4 text-white bg-emerald-500 rounded-full p-1" style={{ transform: `rotate(-${frame * 2}deg)` }} />
                            </div>
                            <span className="text-3xl text-emerald-200">الأجهزة</span>
                        </div>

                        {/* Infrastructure node */}
                        <div style={{ transform: `scale(${item3Pop})` }} className="flex flex-col items-center gap-6">
                            <div className="relative flex justify-center items-center w-36 h-36 rounded-[2.5rem] bg-rose-900/40 border border-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.4)]">
                                <Server size={70} className="text-rose-300" />
                                <RefreshCcw size={30} className="absolute -top-4 -right-4 text-white bg-rose-500 rounded-full p-1" style={{ transform: `rotate(-${frame * 2}deg)` }} />
                            </div>
                            <span className="text-3xl text-rose-200">البنية الرقمية</span>
                        </div>

                    </div>
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
