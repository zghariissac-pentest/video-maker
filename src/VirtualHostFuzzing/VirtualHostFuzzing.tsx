import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Explanation } from './scenes/Scene2_Explanation';
import { Scene3_VirtualHostFuzzing } from './scenes/Scene3_VirtualHostFuzzing';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';

export const VirtualHostFuzzing: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene2_Explanation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene3_VirtualHostFuzzing />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene4_Conclusion />
        </Series.Sequence>
    </Series>
);
