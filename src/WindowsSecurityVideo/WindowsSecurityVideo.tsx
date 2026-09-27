import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_SMB } from './scenes/Scene2_SMB';
import { Scene3_Risk } from './scenes/Scene3_Risk';
import { Scene4_Testing } from './scenes/Scene4_Testing';
import { Scene5_Tools } from './scenes/Scene5_Tools';

export const WindowsSecurityVideo: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={150}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Scene2_SMB />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Scene3_Risk />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <Scene4_Testing />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <Scene5_Tools />
            </Series.Sequence>
            {/* Add more scenes here as we build them */}
        </Series>
    );
};
