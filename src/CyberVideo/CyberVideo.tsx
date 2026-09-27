import React from 'react';
import { Series } from 'remotion';
import { CyberHook } from './scenes/CyberHook';
import { CyberAssumption } from './scenes/CyberAssumption';
import { CyberDevices } from './scenes/CyberDevices';
import { CyberRanking } from './scenes/CyberRanking';
import { CyberRankingSystem } from './scenes/CyberRankingSystem';

export const CyberVideo: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={200}>
                <CyberHook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <CyberAssumption />
            </Series.Sequence>
            <Series.Sequence durationInFrames={280}>
                <CyberDevices />
            </Series.Sequence>
            <Series.Sequence durationInFrames={360}>
                <CyberRanking />
            </Series.Sequence>
            <Series.Sequence durationInFrames={500}>
                <CyberRankingSystem />
            </Series.Sequence>
            {/* Future scenes can be added here */}
        </Series>
    );
};
