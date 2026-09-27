import React from 'react';
import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_ExploitDB } from './scenes/Scene2_ExploitDB';
import { Scene3_HackTheBox } from './scenes/Scene3_HackTheBox';
import { Scene4_Payloads } from './scenes/Scene4_Payloads';
import { Scene5_Outro } from './scenes/Scene5_Outro';

export const HackingWebsitesVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={300}>
            <Scene1_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene2_ExploitDB />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene3_HackTheBox />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
            <Scene4_Payloads />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
            <Scene5_Outro />
        </Series.Sequence>
    </Series>
);
