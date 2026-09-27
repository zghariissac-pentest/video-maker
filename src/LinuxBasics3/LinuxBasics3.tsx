import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_UserTypes } from './scenes/Scene2_UserTypes';
import { Scene3_PermissionsModel } from './scenes/Scene3_PermissionsModel';
import { Scene4_SecurityExample } from './scenes/Scene4_SecurityExample';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const LinuxBasics3: React.FC = () => {
    const FPS = 30;
    return (
        <Series>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene2_UserTypes />
            </Series.Sequence>
            <Series.Sequence durationInFrames={30 * FPS}>
                <Scene3_PermissionsModel />
            </Series.Sequence>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene4_SecurityExample />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene5_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
