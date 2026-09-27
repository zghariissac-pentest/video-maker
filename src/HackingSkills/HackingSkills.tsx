import React from 'react';
import { Series } from 'remotion';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Interface } from './scenes/Scene2_Interface';
import { Scene3_Nmap } from './scenes/Scene3_Nmap';
import { Scene4_NmapLogic } from './scenes/Scene4_NmapLogic';
import { Scene5_Firewall } from './scenes/Scene5_Firewall';
import { Scene6_Metasploit } from './scenes/Scene6_Metasploit';
import { Scene7_ExploitMitigation } from './scenes/Scene7_ExploitMitigation';
import { Scene8_Conclusion } from './scenes/Scene8_Conclusion';
import { Scene9_DeepUnderstanding } from './scenes/Scene9_DeepUnderstanding';

export const HackingSkills: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={200}>
        <Scene1_Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene2_Interface />
      </Series.Sequence>
      <Series.Sequence durationInFrames={250}>
        <Scene3_Nmap />
      </Series.Sequence>
      <Series.Sequence durationInFrames={350}>
        <Scene4_NmapLogic />
      </Series.Sequence>
      <Series.Sequence durationInFrames={350}>
        <Scene5_Firewall />
      </Series.Sequence>
      <Series.Sequence durationInFrames={250}>
        <Scene6_Metasploit />
      </Series.Sequence>
      <Series.Sequence durationInFrames={450}>
        <Scene7_ExploitMitigation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <Scene8_Conclusion />
      </Series.Sequence>
      <Series.Sequence durationInFrames={500}>
        <Scene9_DeepUnderstanding />
      </Series.Sequence>
    </Series>
  );
};
