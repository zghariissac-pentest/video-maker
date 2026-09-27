import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_FullScan } from './scenes/Scene2_FullScan';
import { Scene3_ServiceScan } from './scenes/Scene3_ServiceScan';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';

export const NmapScan: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_FullScan />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene3_ServiceScan />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene4_Conclusion />
        </Series.Sequence>
    </Series>
);
