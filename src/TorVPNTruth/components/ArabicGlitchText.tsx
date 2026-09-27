import React from 'react';
import { useCurrentFrame, random } from 'remotion';

export const ArabicGlitchText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
    const frame = useCurrentFrame();
    const progress = Math.max(0, frame - delay);

    if (progress <= 0) return null;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
    const scrambled = text.split('').map((char, i) => {
        if (progress > i * 1.5 + 5) return char;
        if (progress > i * 1.5) return chars[Math.floor(random(frame + i) * chars.length)];
        return "";
    }).join('');

    return (
        <div className={className} dir="rtl" style={{ fontFamily: 'Changa, sans-serif' }}>
            {scrambled}
            {progress < text.length * 1.5 + 5 && (
                <span className="inline-block w-[0.5em] h-[1em] bg-green-500 animate-pulse mr-1" />
            )}
        </div>
    );
};
