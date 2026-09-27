import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_UserTypes } from './scenes/Scene2_UserTypes';
import { Scene3_Permissions } from './scenes/Scene3_Permissions';
import { Scene4_SecurityExample } from './scenes/Scene4_SecurityExample';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const LinuxBasicsEp3: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1 : Intro — 14s */}
            <Series.Sequence durationInFrames={14 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2 : 1— أنواع المستخدمين | 20s */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene2_UserTypes />
            </Series.Sequence>

            {/* Scene 3 : 2 — نظام الصلاحيات | 30s */}
            <Series.Sequence durationInFrames={30 * FPS}>
                <Scene3_Permissions />
            </Series.Sequence>

            {/* Scene 4 : 3 — مثال أمني حقيقي | 20s */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene4_SecurityExample />
            </Series.Sequence>

            {/* Scene 5 : Conclusion — 10s */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene5_Conclusion />
            </Series.Sequence>

            {/* Other scenes can be added here later */}
        </Series>
    );
};
