import React from 'react';
import { Series } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';

export const RubberDucky: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={300}>
                <Scene1 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene2 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene3 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene4 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene5 />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene6 />
            </Series.Sequence>
        </Series>
    );
};
