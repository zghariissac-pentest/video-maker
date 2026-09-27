import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_IdentifyLogic } from './scenes/Scene2_IdentifyLogic';
import { Scene3_ObserveBehavior } from './scenes/Scene3_ObserveBehavior';
import { Scene4_TestLogic } from './scenes/Scene4_TestLogic';
import { Scene5_Ending } from './scenes/Scene5_Ending';

export const BruteForceVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={450}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={750}>
            <Scene2_IdentifyLogic />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene3_ObserveBehavior />
        </Series.Sequence>
        <Series.Sequence durationInFrames={650}>
            <Scene4_TestLogic />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene5_Ending />
        </Series.Sequence>
    </Series>
);
