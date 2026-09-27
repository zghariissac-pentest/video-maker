import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Types } from './scenes/Scene2_Types';
import { Scene3_Practical } from './scenes/Scene3_Practical';
import { Scene4_Security } from './scenes/Scene4_Security';
import { Scene5_Overflow } from './scenes/Scene5_Overflow';
import { Scene6_Concepts } from './scenes/Scene6_Concepts';
import { Scene7_Conclusion } from './scenes/Scene7_Conclusion';

export const LinuxBasics5: React.FC = () => {
    const FPS = 30;
    return (
        <Series>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene2_Types />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene3_Practical />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene4_Security />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene5_Overflow />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene6_Concepts />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene7_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
