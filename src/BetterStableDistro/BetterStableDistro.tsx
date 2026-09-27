import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_AwesomeHacking } from './scenes/Scene2_AwesomeHacking';
import { Scene3_Conclusion } from './scenes/Scene3_Conclusion';

export const BetterStableDistro: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={450}>
            <Scene1_Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_AwesomeHacking />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
            <Scene3_Conclusion />
        </Series.Sequence>
    </Series>
);
