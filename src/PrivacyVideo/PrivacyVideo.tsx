import { Series } from 'remotion';
import { IntroScene } from './scenes/IntroScene';
import { VPNRisksScene } from './scenes/VPNRisksScene';
import { TorOnionScene } from './scenes/TorOnionScene';
import { DeAnonymizationScene } from './scenes/DeAnonymizationScene';
import { ConclusionScene } from './scenes/ConclusionScene';

export const PrivacyVideo: React.FC = () => {
    return (
        <Series>
            {/* Scene 1: 10 Seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <IntroScene />
            </Series.Sequence>

            {/* Scene 2: 20 Seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <VPNRisksScene />
            </Series.Sequence>

            {/* Scene 3: 30 Seconds (900 frames) */}
            <Series.Sequence durationInFrames={900}>
                <TorOnionScene />
            </Series.Sequence>

            {/* Scene 4: 20 Seconds (600 frames) */}
            <Series.Sequence durationInFrames={600}>
                <DeAnonymizationScene />
            </Series.Sequence>

            {/* Scene 5: 10 Seconds (300 frames) */}
            <Series.Sequence durationInFrames={300}>
                <ConclusionScene />
            </Series.Sequence>
        </Series>
    );
};
