import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_WhatIsProcess } from './scenes/Scene2_WhatIsProcess';
import { Scene3_Commands } from './scenes/Scene3_Commands';
import { Scene4_SecurityRisk } from './scenes/SecurityRisk';
import { Scene5_ParentChild } from './scenes/Scene5_ParentChild';
import { Scene6_Conclusion } from './scenes/Scene6_Conclusion';

export const LinuxBasics4: React.FC = () => {
    const FPS = 30;
    return (
        <Series>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene2_WhatIsProcess />
            </Series.Sequence>
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene3_Commands />
            </Series.Sequence>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene4_SecurityRisk />
            </Series.Sequence>
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene5_ParentChild />
            </Series.Sequence>
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene6_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
