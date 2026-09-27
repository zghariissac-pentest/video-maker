import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Philosophy } from './scenes/Scene2_Philosophy';
import { Scene3_Architecture } from './scenes/Scene3_Architecture';
import { Scene4_Security } from './scenes/Scene4_Security';
import { Scene5_Filesystem } from './scenes/Scene5_Filesystem';
import { Scene6_Conclusion } from './scenes/Scene6_Conclusion';

export const LinuxBasicsEp1: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1 : Intro — 10s */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2 : 1 Design Philosophy | 20s */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene2_Philosophy />
            </Series.Sequence>

            {/* Scene 3 : 2 System Architecture & Control | 25s */}
            <Series.Sequence durationInFrames={25 * FPS}>
                <Scene3_Architecture />
            </Series.Sequence>

            {/* Scene 4 : 3 Security Model | 10s */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene4_Security />
            </Series.Sequence>

            {/* Scene 5 : 4 Filesystem Philosophy | 15s */}
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene5_Filesystem />
            </Series.Sequence>

            {/* Scene 6 : Conclusion | 15s */}
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene6_Conclusion />
            </Series.Sequence>

            {/* Other scenes can be added here later */}
        </Series>
    );
};
