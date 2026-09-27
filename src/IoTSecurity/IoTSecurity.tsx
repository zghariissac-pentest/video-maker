import { Series } from 'remotion';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Examination } from './scenes/Scene2_Examination';
import { Scene3_Analysis } from './scenes/Scene3_Analysis';
import { Scene4_Conclusion } from './scenes/Scene4_Conclusion';

export const IoTSecurity: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={300}>
                <Scene1_Hook />
            </Series.Sequence>
            <Series.Sequence durationInFrames={900}>
                <Scene2_Examination />
            </Series.Sequence>
            <Series.Sequence durationInFrames={1000}>
                <Scene3_Analysis />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <Scene4_Conclusion />
            </Series.Sequence>
        </Series>
    );
};
