import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, Video, staticFile } from 'remotion';

export const Scene1: React.FC<{
    image?: string;
    isVideo?: boolean;
    text: string;
    subtitle?: string;
}> = ({ image, isVideo, text, subtitle = "Designed for excellence." }) => {
    const frame = useCurrentFrame();
    const { fps } = { fps: 30 };

    const entrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const textEntrance = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const float = Math.sin(frame / 40) * 15;
    const scale = interpolate(entrance, [0, 1], [0.95, 1]);
    const opacity = interpolate(entrance, [0, 1], [0, 1]);
    const yTranslate = interpolate(entrance, [0, 1], [40, 0]);

    const textY = interpolate(textEntrance, [0, 1], [20, 0]);
    const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

    // Format handling: AI might not provide an image
    const hasMedia = !!image;

    return (
        <AbsoluteFill className="bg-[#FBFBFD] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle at 50% -20%, #E8E8ED 0%, transparent 70%)'
                }}
            />

            <div className="absolute top-12 left-0 w-full px-16 flex justify-between items-center z-20">
                <div className="flex items-center gap-6">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white opacity-20" />
                    </div>
                    <span className="text-black font-semibold text-lg tracking-tight">AI Generated</span>
                </div>
            </div>

            {hasMedia && (
                <div
                    className="relative z-10 w-[80%] h-[60%]"
                    style={{
                        transform: `translateY(${yTranslate + float}px) scale(${scale})`,
                        opacity: opacity,
                    }}
                >
                    <div
                        className="absolute inset-10 rounded-[40px] opacity-25 blur-[60px] bg-black translate-y-20"
                        style={{ transform: 'scale(0.9)' }}
                    />

                    <div className="absolute inset-0 bg-white rounded-[48px] overflow-hidden border border-black/[0.03] shadow-2xl">
                        {isVideo ? (
                            <Video
                                src={staticFile(image!)}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Img
                                src={staticFile(image!)}
                                className="w-full h-full object-cover"
                                style={{
                                    transform: `scale(${interpolate(frame, [0, 90], [1.1, 1.05])})`,
                                }}
                            />
                        )}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)'
                            }}
                        />
                    </div>
                </div>
            )}

            <div
                className={`absolute left-0 w-full text-center z-20 flex flex-col items-center ${hasMedia ? 'bottom-24' : 'bottom-1/2 translate-y-1/2'}`}
                style={{
                    transform: `translateY(${textY}px)`,
                    opacity: textOpacity
                }}
            >
                <h1 className={`${hasMedia ? 'text-7xl ' : 'text-9xl '} font-bold tracking-tight text-[#1D1D1F] mb-4`}>
                    {text}
                </h1>
                {subtitle && (
                    <p className="text-2xl text-[#86868B] font-medium max-w-xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </AbsoluteFill>
    );
};
