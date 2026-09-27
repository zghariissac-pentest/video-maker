import React from 'react';
import { Series } from 'remotion';
import { Month2Hook } from './scenes/Month2Hook';
import { Month2Setup } from './scenes/Month2Setup';
import { Month2Demo } from './scenes/Month2Demo';
import { Month2Conclusion } from './scenes/Month2Conclusion';
import { Month2Outro } from './scenes/Month2Outro';

export const Month2Video: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={240}>
                <Month2Hook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={240}>
                <Month2Setup />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Month2Demo />
            </Series.Sequence>
            <Series.Sequence durationInFrames={240}>
                <Month2Conclusion />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <Month2Outro />
            </Series.Sequence>
            {/* Future scenes will be added here */}
        </Series>
    );
};
