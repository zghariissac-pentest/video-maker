import React from 'react';
import { Series } from 'remotion';
import { IntroScene } from './scenes/IntroScene';
import { Scene2_LDAP } from './scenes/Scene2_LDAP';
import { Scene3_Nmap } from './scenes/Scene3_Nmap';
import { Scene4_LDAPSearch } from './scenes/Scene4_LDAPSearch';
import { Scene5_Focus } from './scenes/Scene5_Focus';
import { Scene6_Tools } from './scenes/Scene6_Tools';

export const ProtocolEp2Video: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={180}>
                <IntroScene />
            </Series.Sequence>
            <Series.Sequence durationInFrames={200}>
                <Scene2_LDAP />
            </Series.Sequence>
            <Series.Sequence durationInFrames={230}>
                <Scene3_Nmap />
            </Series.Sequence>
            <Series.Sequence durationInFrames={270}>
                <Scene4_LDAPSearch />
            </Series.Sequence>
            <Series.Sequence durationInFrames={250}>
                <Scene5_Focus />
            </Series.Sequence>
            <Series.Sequence durationInFrames={260}>
                <Scene6_Tools />
            </Series.Sequence>
        </Series>
    );
};
