import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Motivation } from './scenes/Scene2_Motivation';
import { Scene3_WhyCyber } from './scenes/Scene3_WhyCyber';
import { Scene4_Certifications } from './scenes/Scene4_Certifications';

export const Bac: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene2_Motivation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={550}>
            <Scene3_WhyCyber />
        </Series.Sequence>
        <Series.Sequence durationInFrames={500}>
            <Scene4_Certifications />
        </Series.Sequence>
    </Series>
);
