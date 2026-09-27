import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Mechanism } from './scenes/Scene2_Mechanism';
import { Scene3_Vulnerability } from './scenes/Scene3_Vulnerability';
import { Scene4_Methods } from './scenes/Scene4_Methods';
import { Scene5_Impact } from './scenes/Scene5_Impact';

// Total: 2950 frames = 98.33 seconds @ 30fps
export const SessionHijacking: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
            <Scene2_Mechanism />
        </Series.Sequence>
        <Series.Sequence durationInFrames={550}>
            <Scene3_Vulnerability />
        </Series.Sequence>
        <Series.Sequence durationInFrames={900}>
            <Scene4_Methods />
        </Series.Sequence>
        <Series.Sequence durationInFrames={800}>
            <Scene5_Impact />
        </Series.Sequence>
    </Series>
);
