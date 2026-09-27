import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Context } from './scenes/Scene2_Context';
import { Scene3_Hardware } from './scenes/Scene3_Hardware';
import { Scene4_Storage } from './scenes/Scene4_Storage';
import { Scene5_Wireless } from './scenes/Scene5_Wireless';

// Total frames: 300 (S1) + 450 (S2) + 1200 (S3) + 600 (S4) + 600 (S5) = 3150 (105s)
export const PCRequirements: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={300}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Scene2_Context />
            </Series.Sequence>
            <Series.Sequence durationInFrames={1200}>
                <Scene3_Hardware />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <Scene4_Storage />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <Scene5_Wireless />
            </Series.Sequence>
        </Series>
    );
};
