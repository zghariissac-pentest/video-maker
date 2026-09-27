import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_CoreConcept } from './scenes/Scene2_CoreConcept';
import { Scene3_ToolsVsSkill } from './scenes/Scene3_ToolsVsSkill';
import { Scene4_FalseCompetence } from './scenes/Scene4_FalseCompetence';
import { Scene5_Conclusion } from './scenes/Scene5_Conclusion';

export const WhyNotKali: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={300}>
                <Scene1_Intro />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Scene2_CoreConcept />
            </Series.Sequence>
            <Series.Sequence durationInFrames={540}>
                <Scene3_ToolsVsSkill />
            </Series.Sequence>
            <Series.Sequence durationInFrames={540}>
                <Scene4_FalseCompetence />
            </Series.Sequence>
            <Series.Sequence durationInFrames={600}>
                <Scene5_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
