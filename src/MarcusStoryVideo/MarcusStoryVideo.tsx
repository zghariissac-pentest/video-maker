import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Bedroom } from './scenes/Scene2_Bedroom';
import { Scene3_WannaCry } from './scenes/Scene3_WannaCry';
import { Scene4_Arrest } from './scenes/Scene4_Arrest';
import { Scene5_Outro } from './scenes/Scene5_Outro';

export const MarcusStoryVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_Bedroom />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene3_WannaCry />
        </Series.Sequence>
        <Series.Sequence durationInFrames={900}>
            <Scene4_Arrest />
        </Series.Sequence>
        <Series.Sequence durationInFrames={800}>
            <Scene5_Outro />
        </Series.Sequence>
    </Series>
);
