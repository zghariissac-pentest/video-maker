import React from 'react';
import { Series } from 'remotion';
import { BurpScene1 } from './scenes/BurpScene1';
import { BurpScene2_Misconception } from './scenes/BurpScene2_Misconception';
import { BurpScene3_Diagram } from './scenes/BurpScene3_Diagram';
import { BurpScene4_Resolution } from './scenes/BurpScene4_Resolution';
import { BurpScene5_BasicConcept } from './scenes/BurpScene5_BasicConcept';
import { BurpScene6_Intercept } from './scenes/BurpScene6_Intercept';
import { BurpScene7_Importance } from './scenes/BurpScene7_Importance';

export const BurpSuiteVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={150}>
            <BurpScene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
            <BurpScene2_Misconception />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>
            <BurpScene3_Diagram />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
            <BurpScene4_Resolution />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <BurpScene5_BasicConcept />
        </Series.Sequence>
        <Series.Sequence durationInFrames={750}>
            <BurpScene6_Intercept />
        </Series.Sequence>
        <Series.Sequence durationInFrames={750}>
            <BurpScene7_Importance />
        </Series.Sequence>
    </Series>
);



