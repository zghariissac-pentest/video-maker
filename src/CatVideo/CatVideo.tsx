import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_NoSpace } from './scenes/Scene2_NoSpace';
import { Scene3_WithSpace } from './scenes/Scene3_WithSpace';
import { Scene4_Hyphen } from './scenes/Scene4_Hyphen';

export const CatVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={450}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={500}>
            <Scene2_NoSpace />
        </Series.Sequence>
        <Series.Sequence durationInFrames={900}>
            <Scene3_WithSpace />
        </Series.Sequence>
        <Series.Sequence durationInFrames={500}>
            <Scene4_Hyphen />
        </Series.Sequence>
    </Series>
);
