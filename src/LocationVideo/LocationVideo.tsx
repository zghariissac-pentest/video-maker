import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_DataExposure } from './scenes/Scene2_DataExposure';
import { Scene3_Techniques } from './scenes/Scene3_Techniques';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';




export const LocationVideo: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: Hook - 10 seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Scene1_Hook />
            </Series.Sequence>

            {/* Scene 2: Data Exposure - 15 seconds (450 frames) */}
            <Series.Sequence durationInFrames={450}>
                <Scene2_DataExposure />
            </Series.Sequence>

            {/* Scene 3: Techniques - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene3_Techniques />
            </Series.Sequence>
            {/* Scene 4: Conclusion - 10 seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Scene4_Conclusion />
            </Series.Sequence>
        </Series>


    );
};
