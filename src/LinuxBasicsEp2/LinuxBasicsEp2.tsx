import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Basics } from './scenes/Scene2_Basics';
import { Scene3_Folders } from './scenes/Scene3_Folders';
import { Scene4_EverythingIsFile } from './scenes/Scene4_EverythingIsFile';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const LinuxBasicsEp2: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1 : Intro — 10s */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2 : 1 — الفكرة الأساسية | 20s */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene2_Basics />
            </Series.Sequence>

            {/* Scene 3 : 2 — لماذا هذا التنظيم مهم؟ | 35s */}
            <Series.Sequence durationInFrames={35 * FPS}>
                <Scene3_Folders />
            </Series.Sequence>

            {/* Scene 4 : Everything is a File | 15s */}
            <Series.Sequence durationInFrames={15 * FPS}>
                <Scene4_EverythingIsFile />
            </Series.Sequence>

            {/* Scene 5 : Conclusion | 10s */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene5_Conclusion />
            </Series.Sequence>

            {/* Other scenes can be added here later */}
        </Series>
    );
};
