import React from 'react';
import { Sequence } from 'remotion';
import { TryScene1 } from './scenes/TryScene1';
import { TryScene2 } from './scenes/TryScene2';
import { TryScene3 } from './scenes/TryScene3';
import { TryScene4 } from './scenes/TryScene4';

export const TryVideo: React.FC = () => {
    return (
        <>
            <Sequence durationInFrames={150}>
                <TryScene1 />
            </Sequence>
            <Sequence from={150} durationInFrames={150}>
                <TryScene2 />
            </Sequence>
            <Sequence from={300} durationInFrames={150}>
                <TryScene3 />
            </Sequence>
            <Sequence from={450} durationInFrames={150}>
                <TryScene4 />
            </Sequence>
        </>
    );
};
