import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_MemoryOverview } from './scenes/Scene2_MemoryOverview';
import { Scene3_MemorySecurity } from './scenes/Scene3_MemorySecurity';
import { Scene4_Exploitation } from './scenes/Scene4_Exploitation';

export const LinuxBasicsEp5: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1 : Intro — 10s (0-300 frames) */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2 : Memory Overview & Practical — 30s (300-1200 frames) */}
            <Series.Sequence durationInFrames={30 * FPS}>
                <Scene2_MemoryOverview />
            </Series.Sequence>

            {/* Scene 3 : Memory Security — 20s (1200-1800 frames) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene3_MemorySecurity />
            </Series.Sequence>

            {/* Scene 4 : Exploitation (Buffer Overflow) — 35s (1800-2850 frames) */}
            <Series.Sequence durationInFrames={35 * FPS}>
                <Scene4_Exploitation />
            </Series.Sequence>

            {/* Other scenes can be added here later */}
        </Series>
    );
};
