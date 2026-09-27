import React from 'react';
import { Series } from 'remotion';
import { Scene1_DesignPhilosophy } from './scenes/Scene1_DesignPhilosophy';
import { Scene2_Architecture } from './scenes/Scene2_Architecture';
import { Scene3_Security } from './scenes/Scene3_Security';
import { Scene4_Filesystem } from './scenes/Scene4_Filesystem';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const LinuxBasics: React.FC = () => {
    const FPS = 30;
    return (
        <Series>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene1_DesignPhilosophy />
            </Series.Sequence>
            <Series.Sequence durationInFrames={25 * FPS}>
                <Scene2_Architecture />
            </Series.Sequence>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene3_Security />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene4_Filesystem />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene5_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
