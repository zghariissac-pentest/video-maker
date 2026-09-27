import React from 'react';
import { Series } from 'remotion';
import { Privacy1Hook } from './scenes/Privacy1Hook';
import { Privacy1DeepAudit } from './scenes/Privacy1DeepAudit';
import { Privacy1Request } from './scenes/Privacy1Request';
import { Privacy1Isolation } from './scenes/Privacy1Isolation';
import { Privacy1TheMistake } from './scenes/Privacy1TheMistake';
import { Privacy1Linking } from './scenes/Privacy1Linking';
import { Privacy1Overlap } from './scenes/Privacy1Overlap';
import { Privacy1RealInsight } from './scenes/Privacy1RealInsight';

export const Privacy1Video: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: Hook - (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Privacy1Hook />
            </Series.Sequence>

            {/* Scene 2: Request Hook - (120 frames) */}
            <Series.Sequence durationInFrames={120}>
                <Privacy1Request />
            </Series.Sequence>

            {/* Scene 3: Deep Audit - (330 frames) */}
            <Series.Sequence durationInFrames={330}>
                <Privacy1DeepAudit />
            </Series.Sequence>

            {/* Scene 4: Isolation Confirmation - (120 frames) */}
            <Series.Sequence durationInFrames={120}>
                <Privacy1Isolation />
            </Series.Sequence>

            {/* Scene 5: THE MISTAKE - (240 frames) */}
            <Series.Sequence durationInFrames={240}>
                <Privacy1TheMistake />
            </Series.Sequence>

            {/* Scene 6: THE LINKING - (240 frames) */}
            <Series.Sequence durationInFrames={240}>
                <Privacy1Linking />
            </Series.Sequence>

            {/* Scene 7: THE OVERLAP - (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <Privacy1Overlap />
            </Series.Sequence>

            {/* Scene 8: REAL INSIGHT - (330 frames) */}
            <Series.Sequence durationInFrames={330}>
                <Privacy1RealInsight />
            </Series.Sequence>
        </Series>
    );
};
