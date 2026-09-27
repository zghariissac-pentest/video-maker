import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_WhatIsProcess } from './scenes/Scene2_WhatIsProcess';
import { Scene3_PracticalExample } from './scenes/Scene3_PracticalExample';
import { Scene4_Permissions } from './scenes/Scene4_Permissions';
import { Scene5_SecurityScenario } from './scenes/Scene5_SecurityScenario';
import { Scene6_ProcessTree } from './scenes/Scene6_ProcessTree';

export const LinuxBasicsEp4: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1 : Intro — 10s (0-300 frames) */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2 : What is a Process? — 20s (300-900 frames) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene2_WhatIsProcess />
            </Series.Sequence>

            {/* Scene 3 : Practical Example — 20s (900-1500 frames) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene3_PracticalExample />
            </Series.Sequence>

            {/* Scene 4 : Process Permissions — 10s (1500-1800 frames) */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene4_Permissions />
            </Series.Sequence>

            {/* Scene 5 : Security Scenario — 20s (1800-2400 frames) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene5_SecurityScenario />
            </Series.Sequence>

            {/* Scene 6 : Process Tree & Pentest — 20s (2400-3000 frames) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene6_ProcessTree />
            </Series.Sequence>
        </Series>
    );
};
