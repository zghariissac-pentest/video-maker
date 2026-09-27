import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CyberBackground, HUD } from '../../HackingSkills/components/HackingTheme';
import { User, Users, Globe } from 'lucide-react';

export const Scene3_PermissionsModel: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill className="bg-[#050505]">
            <CyberBackground />
            <HUD title="ACCESS PERMISSIONS CONTROL" />

            <div className="z-20 flex flex-col items-center justify-center h-full px-10 text-center" dir="rtl">
                <h2 className="text-4xl font-mono text-green-500 mb-16 underline underline-offset-8">نظام الصلاحيات</h2>

                <div className="grid grid-cols-3 gap-12 w-full max-w-5xl mb-16">
                    <LevelCard icon={<User className="w-10 h-10 text-green-500" />} label="Owner" delay={20} frame={frame} />
                    <LevelCard icon={<Users className="w-10 h-10 text-green-500" />} label="Group" delay={40} frame={frame} />
                    <LevelCard icon={<Globe className="w-10 h-10 text-green-500" />} label="Others" delay={60} frame={frame} />
                </div>

                <div className="bg-[#111] border border-green-500/20 p-10 rounded-2xl w-full max-w-5xl text-center">
                    <div className="text-4xl font-mono text-green-500 font-bold mb-6 italic animate-pulse">ls -l file.txt</div>
                    <div className="flex justify-center gap-4 text-3xl font-mono text-green-500 font-bold shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                        <span className="p-4 border border-green-500/10 rounded-xl">-rwxr-x---</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const LevelCard: React.FC<{ icon: React.ReactNode; label: string; delay: number; frame: number }> = ({ icon, label, delay, frame }) => {
    const s = interpolate(frame, [delay, delay + 15], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div className="flex flex-col items-center bg-green-500/5 border border-green-500/20 p-8 rounded-2xl backdrop-blur-sm" style={{ opacity, transform: `scale(${s})` }}>
            <div className="p-4 bg-green-500/10 rounded-xl mb-4 border border-green-500/10">{icon}</div>
            <div className="text-2xl font-mono text-green-500 uppercase">{label}</div>
        </div>
    );
};
