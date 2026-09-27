import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CyberBackground, HUD, GlitchText } from '../../HackingSkills/components/HackingTheme';
import { Crown, User, Bot, Skull, TrendingUp } from 'lucide-react';

const UserCard: React.FC<{ icon: any, label: string, desc: string, delay: number, color: string }> = ({ icon: Icon, label, desc, delay, color }) => {
    const frame = useCurrentFrame();
    const show = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });

    return (
        <div
            className={`flex items-start gap-6 bg-${color}-950/20 border border-${color}-500/30 p-6 rounded-3xl w-full text-right backdrop-blur-md`}
            style={{
                opacity: show,
                transform: `translateX(${(1 - show) * 40}px)`
            }}
            dir="rtl"
        >
            <div className={`p-5 rounded-2xl bg-${color}-500/20 shadow-[0_0_20px_rgba(var(--${color}-rgb),0.2)]`}>
                <Icon className={`w-10 h-10 text-${color}-400`} />
            </div>
            <div>
                <h3 className={`text-2xl font-black text-${color}-400 mb-1`}>{label}</h3>
                <p className="text-lg opacity-80 leading-snug">{desc}</p>
            </div>
        </div>
    );
};

export const Scene2_UserTypes: React.FC = () => {
    const frame = useCurrentFrame();
    const FPS = 30;

    // Animations
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Part 1: Types (0-10s) - frames 0-300
    const typesOpacity = interpolate(frame, [0, 10, 280, 300], [0, 1, 1, 0]);

    // Part 2: Attacker Example (10-20s) - frames 300-600
    const attackerOpacity = interpolate(frame, [300, 310], [0, 1], { extrapolateRight: 'clamp' });
    const exampleSlide = spring({ frame: frame - 320, fps: FPS, config: { damping: 15 } });

    return (
        <AbsoluteFill className="text-white font-sans overflow-hidden bg-black">
            <CyberBackground />
            <HUD title="SYSTEM_SECURITY: USER_HIERARCHY" />

            <div
                className="z-20 flex flex-col items-center justify-start h-full px-12 pt-40 text-center"
                dir="rtl"
                style={{ opacity }}
            >
                {/* Section Title */}
                <div className="mb-12">
                    <GlitchText
                        text="1— أنواع المستخدمين"
                        className="text-4xl font-mono text-green-500/50 mb-4 tracking-tighter"
                    />
                </div>

                {/* PART 1: THE REVEAL */}
                <div style={{ opacity: typesOpacity, position: 'absolute', top: '30%', width: '100%', padding: '0 3rem' }}>
                    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                        <UserCard
                            icon={Crown}
                            label="1️⃣ Root User"
                            desc="وهو الـ Superuser الذي يملك صلاحية كاملة على كل ملف في النظام."
                            delay={20}
                            color="red"
                        />
                        <UserCard
                            icon={User}
                            label="2️⃣ Standard Users"
                            desc="مستخدمين عاديين (أنت مثلاً) بصلاحيات محدودة على ملفاتهم فقط."
                            delay={100}
                            color="blue"
                        />
                        <UserCard
                            icon={Bot}
                            label="3️⃣ System Users"
                            desc="حسابات تستخدمها التطبيقات (الخدمات) مثل nginx أو mysql لتعمل بأمان."
                            delay={180}
                            color="purple"
                        />
                    </div>
                </div>

                {/* PART 2: ATTACKER SCENARIO */}
                <div style={{ opacity: attackerOpacity, position: 'absolute', top: '30%', width: '100%', padding: '0 4rem' }}>
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <div className="flex items-center gap-6 mb-12" style={{ transform: `translateY(${(1 - exampleSlide) * 50}px)` }}>
                            <div className="bg-red-500/20 p-6 rounded-full border-2 border-red-500">
                                <Skull className="w-16 h-16 text-red-500" />
                            </div>
                            <div className="text-right">
                                <h3 className="text-3xl font-black text-red-500 mb-2 underline decoration-red-900 underline-offset-8">🔎 سيناريو اختراق:</h3>
                                <p className="text-2xl font-bold leading-relaxed max-w-xl">
                                    إذا اخترق مهاجم حساب user عادي، فهو لا يملك النظام كاملاً...
                                </p>
                            </div>
                        </div>

                        {/* The Teaser */}
                        <div
                            className="mt-10 flex flex-col items-center gap-8 w-full"
                            style={{
                                opacity: interpolate(frame, [450, 480], [0, 1]),
                                transform: `translateY(${(1 - spring({ frame: frame - 450, fps: FPS })) * 30}px)`
                            }}
                        >
                            <div className="h-1 bg-red-500/20 w-full rounded-full" />
                            <p className="text-2xl font-light italic">إلا إذا استطاع رفع صلاحياته...</p>

                            <div className="bg-green-500 text-black px-12 py-6 rounded-2xl flex items-center gap-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                <TrendingUp className="w-12 h-12" />
                                <GlitchText text="Privilege Escalation" className="text-4xl font-black" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
