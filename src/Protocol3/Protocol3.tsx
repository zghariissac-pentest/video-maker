import React from 'react';
import { Sequence } from 'remotion';
import { IntroScene } from './scenes/IntroScene';

export const Protocol3Video: React.FC = () => {
    return (
        <Sequence durationInFrames={180}>
            <IntroScene />
        </Sequence>
    );
};
