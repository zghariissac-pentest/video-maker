import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Vulnerability } from './scenes/Scene2_Vulnerability';
import { Scene3_Arch } from './scenes/Scene3_Arch';
import { Scene4_Layers } from './scenes/Scene4_Layers';
import { Scene5_Heavy } from './scenes/Scene5_Heavy';
import { Scene6_Outro } from './scenes/Scene6_Outro';

export const QubesOSVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
            <Scene2_Vulnerability />
        </Series.Sequence>
        <Series.Sequence durationInFrames={800}>
            <Scene3_Arch />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
            <Scene4_Layers />
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
            <Scene5_Heavy />
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
            <Scene6_Outro />
        </Series.Sequence>
    </Series>
);
