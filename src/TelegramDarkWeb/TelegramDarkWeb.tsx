import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TelegramHook } from './scenes/TelegramHook';
import { TelegramScene2 } from './scenes/TelegramScene2';
import { TelegramScene3 } from './scenes/TelegramScene3';
import { TelegramScene4 } from './scenes/TelegramScene4';
import { TelegramScene5 } from './scenes/TelegramScene5';
import { TelegramScene6 } from './scenes/TelegramScene6';
import { TelegramScene7 } from './scenes/TelegramScene7';
import { TelegramScene8 } from './scenes/TelegramScene8';
import { TelegramScene9 } from './scenes/TelegramScene9';
import { TelegramScene10 } from './scenes/TelegramScene10';

export const TelegramDarkWebVideo: React.FC = () => {
    return (
        <AbsoluteFill className="bg-black">
            <Sequence from={0} durationInFrames={200}>
                <TelegramHook />
            </Sequence>
            <Sequence from={200} durationInFrames={400}>
                <TelegramScene2 />
            </Sequence>
            <Sequence from={600} durationInFrames={500}>
                <TelegramScene3 />
            </Sequence>
            <Sequence from={1100} durationInFrames={300}>
                <TelegramScene4 />
            </Sequence>
            <Sequence from={1400} durationInFrames={500}>
                <TelegramScene5 />
            </Sequence>
            <Sequence from={1900} durationInFrames={500}>
                <TelegramScene6 />
            </Sequence>
            <Sequence from={2400} durationInFrames={500}>
                <TelegramScene7 />
            </Sequence>
            <Sequence from={2900} durationInFrames={550}>
                <TelegramScene8 />
            </Sequence>
            <Sequence from={3450} durationInFrames={450}>
                <TelegramScene9 />
            </Sequence>
            <Sequence from={3900} durationInFrames={500}>
                <TelegramScene10 />
            </Sequence>
        </AbsoluteFill>
    );
};
