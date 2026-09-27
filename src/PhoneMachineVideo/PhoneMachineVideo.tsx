import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Conclusion } from './scenes/Scene2_Conclusion';
import { Scene3_NetHunter } from './scenes/Scene3_NetHunter';
import { Scene4_Technical } from './scenes/Scene4_Technical';
import { Scene5_Requirements } from './scenes/Scene5_Requirements';
import { Scene6_Outro } from './scenes/Scene6_Outro';

export const PhoneMachineVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={103}>
            <Scene1_Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
            <Scene2_Conclusion />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
            <Scene3_NetHunter />
        </Series.Sequence>
        <Series.Sequence durationInFrames={700}>
            <Scene4_Technical />
        </Series.Sequence>
        <Series.Sequence durationInFrames={350}>
            <Scene5_Requirements />
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
            <Scene6_Outro />
        </Series.Sequence>
    </Series>
);
