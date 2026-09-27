import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Difference } from './scenes/Scene2_Difference';
import { Scene3_MainDirs } from './scenes/Scene3_MainDirs';
import { Scene4_EverythingIsFile } from './scenes/Scene4_EverythingIsFile';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const LinuxBasics2: React.FC = () => {
    const FPS = 30;
    return (
        <Series>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene2_Difference />
            </Series.Sequence>
            <Series.Sequence durationInFrames={30 * FPS}>
                <Scene3_MainDirs />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene4_EverythingIsFile />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene5_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
