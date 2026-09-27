import React from 'react';
import { Series } from 'remotion';
import { MetadataHook } from './scenes/MetadataHook';
import { MetadataExplanation } from './scenes/MetadataExplanation';
import { MetadataTerminal } from './scenes/MetadataTerminal';
import { MetadataSocial } from './scenes/MetadataSocial';
import { MetadataVisualAnalysis } from './scenes/MetadataVisualAnalysis';
import { MetadataGeolocation } from './scenes/MetadataGeolocation';
import { MetadataFingerprint } from './scenes/MetadataFingerprint';
import { MetadataOutro } from './scenes/MetadataOutro';

export const MetadataVideo: React.FC = () => {
    return (
        <Series>
            {/* Hook: 5s */}
            <Series.Sequence durationInFrames={150}>
                <MetadataHook />
            </Series.Sequence>

            {/* Explanation: 15s */}
            <Series.Sequence durationInFrames={450}>
                <MetadataExplanation />
            </Series.Sequence>

            {/* Terminal Demo: 7s */}
            <Series.Sequence durationInFrames={210}>
                <MetadataTerminal />
            </Series.Sequence>

            {/* Social Media Scrubbing: 10s */}
            <Series.Sequence durationInFrames={300}>
                <MetadataSocial />
            </Series.Sequence>

            {/* Visual Content Analysis: 10s */}
            <Series.Sequence durationInFrames={300}>
                <MetadataVisualAnalysis />
            </Series.Sequence>

            {/* Geolocation: 10s */}
            <Series.Sequence durationInFrames={300}>
                <MetadataGeolocation />
            </Series.Sequence>

            {/* Sensor Fingerprint: 10s */}
            <Series.Sequence durationInFrames={300}>
                <MetadataFingerprint />
            </Series.Sequence>

            {/* Outro: 5s */}
            <Series.Sequence durationInFrames={150}>
                <MetadataOutro />
            </Series.Sequence>
        </Series>
    );
};
