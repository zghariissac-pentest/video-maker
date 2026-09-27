import React from 'react';
import { Series } from 'remotion';
import { Month4Hook } from './scenes/Month4Hook';
import { Month4Setup } from './scenes/Month4Setup';
import { Month4Demo } from './scenes/Month4Demo';
import { Month4Conclusion } from './scenes/Month4Conclusion';

export const Month4Video: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={240}>
                <Month4Hook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={240}>
                <Month4Setup />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Month4Demo />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <Month4Conclusion />
            </Series.Sequence>
            {/* Future scenes will be added here */}
        </Series>
    );
};
