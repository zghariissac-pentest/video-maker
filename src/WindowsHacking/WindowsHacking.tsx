import React from 'react';
import { Series } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';

export const WindowsHacking: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={150}>
                <Scene1 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={1500}>
                <Scene2 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={1650}>
                <Scene3 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={1600}>
                <Scene4 />
            </Series.Sequence>
        </Series>
    );
};
