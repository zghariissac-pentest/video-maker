import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1 } from './Scene1';
import scenesData from './scenes.json';

// Make sure to define props if you pass them from Root.tsx in the future
export const Template: React.FC = () => {
    // Basic timing logic: each scene gets 150 frames.
    // The AI can modify this logic inside prompt.md manually if needed.
    const DURATION_PER_SCENE = 150;

    return (
        <AbsoluteFill className="bg-white text-black font-sans">
            {scenesData.map((scene, index) => {
                const isVideo = scene.image?.endsWith('.mp4');
                return (
                    <Sequence
                        key={index}
                        from={index * DURATION_PER_SCENE}
                        durationInFrames={DURATION_PER_SCENE}
                    >
                        <Scene1
                            text={scene.text}
                            subtitle={scene.subtitle}
                            image={scene.image}
                            isVideo={isVideo}
                        />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
