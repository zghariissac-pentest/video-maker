import React from 'react';
import { Series } from 'remotion';
import { Month3Hook } from './scenes/Month3Hook';
import { Month3Setup } from './scenes/Month3Setup';
import { Month3Demo } from './scenes/Month3Demo';
import { Month3Conclusion } from './scenes/Month3Conclusion';
import { Month3Explanation } from './scenes/Month3Explanation';

export const Month3Video: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={240}>
                <Month3Hook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <Month3Setup />
            </Series.Sequence>
            <Series.Sequence durationInFrames={500}>
                <Month3Demo />
            </Series.Sequence>
            <Series.Sequence durationInFrames={280}>
                <Month3Conclusion />
            </Series.Sequence>
            <Series.Sequence durationInFrames={350}>
                <Month3Explanation />
            </Series.Sequence>
            {/* Future scenes will be added here */}
        </Series>
    );
};
