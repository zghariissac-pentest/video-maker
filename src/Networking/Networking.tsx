import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { NetworkingHook } from './scenes/NetworkingHook';
import { NetworkingTheoryVsPractice } from './scenes/NetworkingTheoryVsPractice';
import { NetworkingMistake } from './scenes/NetworkingMistake';
import { NetworkingSolution } from './scenes/NetworkingSolution';
import { NetworkingPractical } from './scenes/NetworkingPractical';
import { NetworkingOutro } from './scenes/NetworkingOutro';

export const NetworkingVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <Series>
                <Series.Sequence durationInFrames={300}>
                    <NetworkingHook />
                </Series.Sequence>
                <Series.Sequence durationInFrames={500}>
                    <NetworkingTheoryVsPractice />
                </Series.Sequence>
                <Series.Sequence durationInFrames={350}>
                    <NetworkingMistake />
                </Series.Sequence>
                <Series.Sequence durationInFrames={1000}>
                    <NetworkingSolution />
                </Series.Sequence>
                <Series.Sequence durationInFrames={650}>
                    <NetworkingPractical />
                </Series.Sequence>
                <Series.Sequence durationInFrames={300}>
                    <NetworkingOutro />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
