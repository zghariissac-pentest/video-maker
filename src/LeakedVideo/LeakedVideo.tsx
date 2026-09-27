import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_DataBreaches } from './scenes/Scene2_DataBreaches';
import { Scene3_Mechanism } from './scenes/Scene3_Mechanism';
import { Scene4_Solution } from './scenes/Scene4_Solution';




export const LeakedVideo: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: Hook - 10 seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Scene1_Hook />
            </Series.Sequence>

            {/* Scene 2: Data Breaches - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene2_DataBreaches />
            </Series.Sequence>


            {/* Scene 3: Mechanism - 28 seconds (840 frames) */}
            <Series.Sequence durationInFrames={840}>
                <Scene3_Mechanism />
            </Series.Sequence>

            {/* Scene 4: Solution - 35 seconds (1050 frames) */}
            <Series.Sequence durationInFrames={1050}>
                <Scene4_Solution />
            </Series.Sequence>
        </Series>
    );
};
