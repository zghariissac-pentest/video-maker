import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_TheProblem } from './scenes/Scene2_TheProblem';
import { Scene3_FilterResults } from './scenes/Scene3_FilterResults';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';

export const Fuzzing: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_TheProblem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene3_FilterResults />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene4_Conclusion />
        </Series.Sequence>
    </Series>
);
