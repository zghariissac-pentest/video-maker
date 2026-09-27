import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Misconfiguration } from './scenes/Scene2_Misconfiguration';
import { Scene3_Exploitation } from './scenes/Scene3_Exploitation';



export const CloudVideo: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: Hook - 10 seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Scene1_Hook />
            </Series.Sequence>

            {/* Scene 2: Misconfiguration - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene2_Misconfiguration />
            </Series.Sequence>

            {/* Scene 3: Exploitation - 24 seconds (720 frames) */}
            <Series.Sequence durationInFrames={720}>
                <Scene3_Exploitation />
            </Series.Sequence>
        </Series>

    );
};
