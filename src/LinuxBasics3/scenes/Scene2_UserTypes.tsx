import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { Crown, User, Cpu } from 'lucide-react';

export const Scene2_UserTypes: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="USER IDENTITY CLASSIFICATION" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-4xl font-mono text-green-500 mb-16 underline underline-offset-8">أنواع المستخدمين</h2>

                <div className="grid grid-cols-1 gap-12 w-full max-w-4xl">
                    <UserRow icon={<Crown className="w-10 h-10 text-green-500" />} title="Root User" desc="Superuser - صلاحية كاملة" delay={20} frame={frame} />
                    <UserRow icon={<User className="w-10 h-10 text-green-500" />} title="Standard Users" desc="حسابات المستخدمين العاديين" delay={40} frame={frame} />
                    <UserRow icon={<Cpu className="w-10 h-10 text-green-500" />} title="System Users" desc="حسابات مخصصة للخدمات" delay={60} frame={frame} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

const UserRow: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay: number; frame: number }> = ({ icon, title, desc, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const x = interpolate(frame, [delay, delay + 15], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div className="flex items-center gap-10 bg-green-500/5 border border-green-500/20 p-8 rounded-2xl backdrop-blur-sm" style={{ opacity, transform: `translateX(${x}px)` }}>
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">{icon}</div>
            <div className="text-right">
                <div className="text-3xl font-mono text-green-500 uppercase mb-2">{title}</div>
                <div className="text-2xl text-white/70">{desc}</div>
            </div>
        </div>
    );
};
