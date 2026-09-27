import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Template } from './scenes/Scene2_Template';
import { Scene3_Tools } from './scenes/Scene3_Tools';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';

export const NotetakingVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={550}>
            <Scene2_Template />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene3_Tools />
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
            <Scene4_Conclusion />
        </Series.Sequence>
    </Series>
);
