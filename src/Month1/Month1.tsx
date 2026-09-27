import React from 'react';
import { Series } from 'remotion';
import { Month1Hook } from './scenes/Month1Hook';
import { Month1Demo } from './scenes/Month1Demo';
import { Month1Explanation } from './scenes/Month1Explanation';
import { Month1Conclusion } from './scenes/Month1Conclusion';

export const Month1Video: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={240}>
                <Month1Hook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Month1Demo />
            </Series.Sequence>
            <Series.Sequence durationInFrames={360}>
                <Month1Explanation />
            </Series.Sequence>
            <Series.Sequence durationInFrames={300}>
                <Month1Conclusion />
            </Series.Sequence>
            {/* Future scenes will be added here */}
        </Series>
    );
};
