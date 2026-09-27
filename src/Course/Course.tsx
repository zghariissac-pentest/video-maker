import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { CourseHook } from './scenes/CourseHook';

export const CourseVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <Series>
                <Series.Sequence durationInFrames={300}>
                    <CourseHook />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
