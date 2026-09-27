import React from 'react';
import { Series } from 'remotion';
import { WebBasicsHook } from './scenes/WebBasicsHook';
import { WebBasicsVulnerability } from './scenes/WebBasicsVulnerability';
import { WebBasicsFoundation } from './scenes/WebBasicsFoundation';
import { WebBasicsSecurity_HTTPS } from './scenes/WebBasicsSecurity_HTTPS';
import { WebBasicsSecurity_InputValidation } from './scenes/WebBasicsSecurity_InputValidation';
import { WebBasicsSecurity_CSP } from './scenes/WebBasicsSecurity_CSP';
import { WebBasicsSecurity_Monitoring } from './scenes/WebBasicsSecurity_Monitoring';
import { WebBasicsSecurity_RateLimitingUpdates } from './scenes/WebBasicsSecurity_RateLimitingUpdates';
import { WebBasicsOutro } from './scenes/WebBasicsOutro';

export const WebBasicsDevVideo: React.FC = () => (
    <Series>
        <Series.Sequence durationInFrames={150}>
            <WebBasicsHook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
            <WebBasicsVulnerability />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
            <WebBasicsFoundation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
            <WebBasicsSecurity_HTTPS />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>
            <WebBasicsSecurity_InputValidation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={220}>
            <WebBasicsSecurity_CSP />
        </Series.Sequence>
        <Series.Sequence durationInFrames={230}>
            <WebBasicsSecurity_Monitoring />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
            <WebBasicsSecurity_RateLimitingUpdates />
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
            <WebBasicsOutro />
        </Series.Sequence>
    </Series>
);
