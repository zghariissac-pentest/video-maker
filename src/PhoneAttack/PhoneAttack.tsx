import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_SS7 } from './scenes/Scene2_SS7';
import { Scene3_SimSwap } from './scenes/Scene3_SimSwap';
import { Scene4_Baseband } from './scenes/Scene4_Baseband';
import { Scene5_Defense } from './scenes/Scene5_Defense';

export const PhoneAttack: React.FC = () => {
    const FPS = 30;

    return (
        <Series>
            {/* Scene 1: Introduction (10 Seconds) */}
            <Series.Sequence durationInFrames={10 * FPS}>
                <Scene1_Intro />
            </Series.Sequence>

            {/* Scene 2: SS7 Infrastructure (25 Seconds) */}
            <Series.Sequence durationInFrames={25 * FPS}>
                <Scene2_SS7 />
            </Series.Sequence>

            {/* Scene 3: SIM Swapping (25 Seconds) */}
            <Series.Sequence durationInFrames={25 * FPS}>
                <Scene3_SimSwap />
            </Series.Sequence>

            {/* Scene 4: Baseband & Zero-Click (25 Seconds) */}
            <Series.Sequence durationInFrames={25 * FPS}>
                <Scene4_Baseband />
            </Series.Sequence>

            {/* Scene 5: Defense & Conclusion (20 Seconds) */}
            <Series.Sequence durationInFrames={20 * FPS}>
                <Scene5_Defense />
            </Series.Sequence>
        </Series>
    );
};
