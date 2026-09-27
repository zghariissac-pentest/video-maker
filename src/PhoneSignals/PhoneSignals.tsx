import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_ProbeRequests } from './scenes/Scene2_ProbeRequests';
import { Scene3_TrackingSafety } from './scenes/Scene3_TrackingSafety';
import { Scene4_Fingerprinting } from './scenes/Scene4_Fingerprinting';




export const PhoneSignals: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: Hook - 10 seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Scene1_Hook />
            </Series.Sequence>

            {/* Scene 2: Probe Requests - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene2_ProbeRequests />
            </Series.Sequence>


            {/* Scene 3: Tracking Safety - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene3_TrackingSafety />
            </Series.Sequence>

            {/* Scene 4: Fingerprinting - 20 seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <Scene4_Fingerprinting />
            </Series.Sequence>
        </Series>

    );
};
