import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Extensions } from './scenes/Scene2_Extensions';
import { Scene3_Conclusion } from './scenes/Scene3_Conclusion';

export const Ffuf2: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={450}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_Extensions />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene3_Conclusion />
        </Series.Sequence>
    </Series>
);
