import React from 'react';
import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { TorAndTails } from "./TorAndTails/TorAndTails";
import { HackingSkills } from "./HackingSkills/HackingSkills";
import { LinuxBasics } from "./LinuxBasics/LinuxBasics";
import { LinuxBasics2 } from "./LinuxBasics2/LinuxBasics2";
import { LinuxBasics3 } from "./LinuxBasics3/LinuxBasics3";
import { LinuxBasics4 } from "./LinuxBasics4/LinuxBasics4";
import { LinuxBasics5 } from "./LinuxBasics5/LinuxBasics5";
import { LinuxBasicsEp1 } from "./LinuxBasicsEp1/LinuxBasicsEp1";
import { LinuxBasicsEp2 } from "./LinuxBasicsEp2/LinuxBasicsEp2";
import { LinuxBasicsEp3 } from "./LinuxBasicsEp3/LinuxBasicsEp3";
import { LinuxBasicsEp4 } from "./LinuxBasicsEp4/LinuxBasicsEp4";
import { LinuxBasicsEp5 } from "./LinuxBasicsEp5/LinuxBasicsEp5";
import { TorVPNTruth } from "./TorVPNTruth/TorVPNTruth";
import { PrivacyVideo } from "./PrivacyVideo/PrivacyVideo";
import { PhoneAttack } from "./PhoneAttack/PhoneAttack";
import { WhyNotKali } from "./WhyNotKali/WhyNotKali";
import { RubberDucky } from "./RubberDucky/RubberDucky";
import { WindowsHacking } from "./WindowsHacking/WindowsHacking";
import { AntiVirus } from "./AntiVirus/AntiVirus";
import { MalwareTypes } from "./MalwareTypes/MalwareTypes";
import { SessionHijacking } from "./SessionHijacking/SessionHijacking";

import { PCRequirements } from "./PCRequirements/PCRequirements";
import { LeakedVideo } from "./LeakedVideo/LeakedVideo";
import { PhoneSignals } from "./PhoneSignals/PhoneSignals";
import { CloudVideo } from "./CloudVideo/CloudVideo";
import { LocationVideo } from "./LocationVideo/LocationVideo";
import { NmapScan } from "./NmapScan/NmapScan";
import { Fuzzing } from "./Fuzzing/Fuzzing";
import { Ffuf2 } from "./ffuf2/ffuf2";
import { VirtualHostFuzzing } from "./VirtualHostFuzzing/VirtualHostFuzzing";
import { BetterStableDistro } from "./BetterStableDistro/BetterStableDistro";
import { AutomationPentest } from "./AutomationPentest/AutomationPentest";
import { NotetakingVideo } from "./NotetakingVideo/NotetakingVideo";
import { CatVideo } from "./CatVideo/CatVideo";
import { BruteForceVideo } from "./BruteForceVideo/BruteForceVideo";
import { PhoneMachineVideo } from "./PhoneMachineVideo/PhoneMachineVideo";
import { MarcusStoryVideo } from "./MarcusStoryVideo/MarcusStoryVideo";

import { IoTSecurity } from "./IoTSecurity/IoTSecurity";
import { QubesOSVideo } from "./QubesOSVideo/QubesOSVideo";
import { WindowsSecurityVideo } from "./WindowsSecurityVideo/WindowsSecurityVideo";
import { ProtocolEp2Video } from "./ProtocolEp2/ProtocolEp2";
import { HackingWebsitesVideo } from "./HackingWebsitesVideo/HackingWebsitesVideo";
import { Protocol3Video } from './Protocol3/Protocol3';
import { TryVideo } from './Try/Try';
import { BurpSuiteVideo } from './BurpSuite/BurpSuite';
import { WebBasicsDevVideo } from './WebBasicsDev/WebBasicsDev';
import { Month1Video } from './Month1/Month1';
import { Month2Video } from './Month2/Month2';
import { Month3Video } from './Month3/Month3';
import { Month4Video } from './Month4/Month4';
import { Privacy1Video } from './Privacy1/Privacy1';
import { MetadataVideo } from './Metadata/Metadata';
import { CyberVideo } from './CyberVideo/CyberVideo';
import { TelegramDarkWebVideo } from './TelegramDarkWeb/TelegramDarkWeb';
import { CourseVideo } from './Course/Course';
import { NotCourseVideo } from './NotCourse/NotCourse';
import { NetworkingVideo } from './Networking/Networking';
import { Bac } from './Bac/Bac';
import { BacMen } from './BacMen/BacMen';
import { HowIStarted } from './HowIStarted/HowIStarted';
import { MyOpinion1 } from './MyOpinion1/MyOpinion1';
import { Opsec1 } from './Opsec1/Opsec1';
import { DeepWeb } from './DeepWeb/DeepWeb';
import { Nopc } from './Nopc/Nopc';
import { RatingDistros } from './RatingDistros/RatingDistros';
import { Kalimain } from './Kalimain/Kalimain';
import { KaliSketch } from './KaliSketch/KaliSketch';
import { Kalisucks } from './Kalisucks/Kalisucks';
import { Aw } from './Aw/Aw';
import { BestV2 } from './BestV2/BestV2';
import { WhyLinuxOverWindows } from './WhyLinuxOverWindows/WhyLinuxOverWindows';
import { WhyLinux } from './WhyLinux/WhyLinux';

import { ProFXDemo } from './profx/ProFXDemo';
import { TestClip } from './profx/TestClip';
import { Frame } from './Frame/Frame';
import { TemplateKit } from './kit/TemplateKit';
import { TransitionsKit } from './kit/TransitionsKit';
import { CaptionsKit } from './kit/CaptionsKit';
import { AudiogramKit } from './kit/AudiogramKit';
import { ShapesKit } from './kit/ShapesKit';
import { LayoutKit } from './kit/LayoutKit';
import { MediaKit } from './kit/MediaKit';
import { LinuxSuper } from './LinuxSuper/LinuxSuper';
import { Check } from './Check/Check';
import { Vpn } from './Vpn/Vpn';
import { Dontpay } from './Dontpay/Dontpay';
import { Fbi } from './Fbi/Fbi';
import { IP } from './IP/IP';
import { Rdp } from './Rdp/Rdp';
import { Aura } from './Aura/Aura';
import { Farm } from './Farm/Farm';
import { Coding } from './Coding/Coding';
import { Android } from './Android/Android';
import { Ai } from './Ai/Ai';
import { Ctf } from './Ctf/Ctf';
import { Vs } from './Vs/Vs';
import { Books } from './Books/Books';
import { Mix } from './Mix/Mix';
import { Yourcomputer } from './Yourcomputer/Yourcomputer';
import { Certsvsreality } from './Certsvsreality/Certsvsreality';
import { SeriousSituation } from './SeriousSituation/SeriousSituation';
import { WebApp1 } from './WebApp1/WebApp1';
import { WebApp2 } from './WebApp2/WebApp2';
import { Ssrf } from './Ssrf/Ssrf';
import { Tired } from './Tired/Tired';



export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* TemplateKit — showcase of all remotion.dev/templates features */}
      <Composition id="TemplateKit" component={TemplateKit} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="TransitionsKit" component={TransitionsKit} durationInFrames={400} fps={30} width={1080} height={1920} />
      <Composition id="CaptionsKit" component={CaptionsKit} durationInFrames={150} fps={30} width={1080} height={1920} />
      <Composition id="AudiogramKit" component={AudiogramKit} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="ShapesKit" component={ShapesKit} durationInFrames={120} fps={30} width={1080} height={1920} />
      <Composition id="LayoutKit" component={LayoutKit} durationInFrames={120} fps={30} width={1080} height={1920} />
      <Composition id="MediaKit" component={MediaKit} durationInFrames={120} fps={30} width={1080} height={1920} />
      <Composition id="Ai" component={Ai} durationInFrames={150} fps={30} width={1080} height={1920} />
      <Composition id="Ctf" component={Ctf} durationInFrames={810} fps={30} width={1080} height={1920} />
      <Composition id="ctf" component={Ctf} durationInFrames={810} fps={30} width={1080} height={1920} />
      <Composition id="Vs" component={Vs} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="vs" component={Vs} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="Books" component={Books} durationInFrames={1040} fps={30} width={1080} height={1920} />
      <Composition id="books" component={Books} durationInFrames={1040} fps={30} width={1080} height={1920} />
      <Composition id="Mix" component={Mix} durationInFrames={1540} fps={30} width={1080} height={1920} />
      <Composition id="mix" component={Mix} durationInFrames={1540} fps={30} width={1080} height={1920} />
      <Composition id="Yourcomputer" component={Yourcomputer} durationInFrames={1590} fps={30} width={1080} height={1920} />
      <Composition id="yourcomputer" component={Yourcomputer} durationInFrames={1590} fps={30} width={1080} height={1920} />
      <Composition id="Certsvsreality" component={Certsvsreality} durationInFrames={1050} fps={30} width={1080} height={1920} />
      <Composition id="certsvsreality" component={Certsvsreality} durationInFrames={1050} fps={30} width={1080} height={1920} />
      <Composition id="SeriousSituation" component={SeriousSituation} durationInFrames={800} fps={30} width={1080} height={1920} />
      <Composition id="serioussituation" component={SeriousSituation} durationInFrames={800} fps={30} width={1080} height={1920} />
      <Composition id="WebApp1" component={WebApp1} durationInFrames={1260} fps={30} width={1080} height={1920} />
      <Composition id="webapp1" component={WebApp1} durationInFrames={1260} fps={30} width={1080} height={1920} />
      <Composition id="WebApp2" component={WebApp2} durationInFrames={1560} fps={30} width={1080} height={1920} />
      <Composition id="webapp2" component={WebApp2} durationInFrames={1560} fps={30} width={1080} height={1920} />
      <Composition id="Tired" component={Tired} durationInFrames={1010} fps={30} width={1080} height={1920} />
      <Composition id="tired" component={Tired} durationInFrames={1010} fps={30} width={1080} height={1920} />
      <Composition id="Ssrf" component={Ssrf} durationInFrames={1920} fps={30} width={1080} height={1920} />
      <Composition id="ssrf" component={Ssrf} durationInFrames={1920} fps={30} width={1080} height={1920} />
      <Composition id="Aura" component={Aura} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="Farm" component={Farm} durationInFrames={960} fps={30} width={1080} height={1920} />
      <Composition id="Coding" component={Coding} durationInFrames={1680} fps={30} width={1080} height={1920} />
      <Composition id="Android" component={Android} durationInFrames={1200} fps={30} width={1080} height={1920} />
      <Composition id="Rdp" component={Rdp} durationInFrames={760} fps={30} width={1080} height={1920} />
      <Composition id="IP" component={IP} durationInFrames={1290} fps={30} width={1080} height={1920} />
      <Composition id="Fbi" component={Fbi} durationInFrames={150} fps={30} width={1080} height={1920} />
      <Composition id="Dontpay" component={Dontpay} durationInFrames={1060} fps={30} width={1080} height={1920} />
      <Composition id="Vpn" component={Vpn} durationInFrames={1080} fps={30} width={1080} height={1920} />
      <Composition id="Check" component={Check} durationInFrames={460} fps={30} width={1080} height={1920} />
      <Composition id="LinuxSuper" component={LinuxSuper} durationInFrames={740} fps={30} width={1080} height={1920} />
      <Composition id="Frame" component={Frame} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="ProFXDemo" component={ProFXDemo} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="TestClip" component={TestClip} durationInFrames={455} fps={30} width={1080} height={1920} />
      <Composition id="Month1" component={Month1Video} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="Month2" component={Month2Video} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="Month3" component={Month3Video} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="Month4" component={Month4Video} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="BurpSuite" component={BurpSuiteVideo} durationInFrames={2730} fps={30} width={1080} height={1920} />
      <Composition id="WebBasicsDev" component={WebBasicsDevVideo} durationInFrames={1750} fps={30} width={1080} height={1920} />
      <Composition id="Privacy1" component={Privacy1Video} durationInFrames={2050} fps={30} width={1080} height={1920} />
      <Composition id="Metadata" component={MetadataVideo} durationInFrames={2160} fps={30} width={1080} height={1920} />
      <Composition id="Cyber" component={CyberVideo} durationInFrames={2900} fps={30} width={1080} height={1920} />
      <Composition id="TelegramDarkWeb" component={TelegramDarkWebVideo} durationInFrames={4400} fps={30} width={1080} height={1920} />
      <Composition id="Course" component={CourseVideo} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="NotCourse" component={NotCourseVideo} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="Networking" component={NetworkingVideo} durationInFrames={3100} fps={30} width={1080} height={1920} />
      <Composition id="Bac" component={Bac} durationInFrames={1800} fps={30} width={1080} height={1920} />
      <Composition id="bac-men" component={BacMen} durationInFrames={564} fps={30} width={1080} height={1920} />
      <Composition id="howistarted" component={HowIStarted} durationInFrames={1010} fps={30} width={1080} height={1920} />
      <Composition id="myopinion1" component={MyOpinion1} durationInFrames={1380} fps={30} width={1080} height={1920} />
      <Composition id="opsec1" component={Opsec1} durationInFrames={1660} fps={30} width={1080} height={1920} />
      <Composition id="deepweb" component={DeepWeb} durationInFrames={1800} fps={30} width={1080} height={1920} />
      <Composition id="nopc" component={Nopc} durationInFrames={2550} fps={30} width={1080} height={1920} />
      <Composition id="ratingdistros" component={RatingDistros} durationInFrames={1185} fps={30} width={1080} height={1920} />
      <Composition id="kalimain" component={Kalimain} durationInFrames={1380} fps={30} width={1080} height={1920} />
      <Composition id="kalisketch" component={KaliSketch} durationInFrames={1200} fps={30} width={1080} height={1920} />
      <Composition id="kalisucks" component={Kalisucks} durationInFrames={840} fps={30} width={1080} height={1920} />
      <Composition id="aw" component={Aw} durationInFrames={630} fps={30} width={1080} height={1920} />
      <Composition id="bestv2" component={BestV2} durationInFrames={390} fps={30} width={1080} height={1920} />
      <Composition id="whylinuxoverwindows" component={WhyLinuxOverWindows} durationInFrames={150} fps={30} width={1080} height={1920} />
      <Composition id="whylinux" component={WhyLinux} durationInFrames={210} fps={30} width={1080} height={1920} />





      <Composition
        id="Protocol3-Final"

        component={Protocol3Video}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />


      <Composition
        id="Try-Experiments"
        component={TryVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition id="IoTSecurity" component={IoTSecurity} durationInFrames={2650} fps={30} width={1080} height={1920} />
      <Composition id="PCRequirements" component={PCRequirements} durationInFrames={3150} fps={30} width={1080} height={1920} />
      <Composition id="WhyNotKali" component={WhyNotKali} durationInFrames={2430} fps={30} width={1080} height={1920} />
      <Composition id="HelloWorld" component={HelloWorld} durationInFrames={150} fps={30} width={1920} height={1080} schema={myCompSchema} defaultProps={{ titleText: "Welcome to Remotion", titleColor: "#000000", logoColor1: "#91EAE4", logoColor2: "#86A8E7" }} />
      <Composition id="OnlyLogo" component={Logo} durationInFrames={150} fps={30} width={1920} height={1080} schema={myCompSchema2} defaultProps={{ logoColor1: "#91dAE2" as const, logoColor2: "#86A8E7" as const }} />
      <Composition id="TorAndTails" component={TorAndTails} durationInFrames={4800} fps={30} width={1080} height={1920} />
      <Composition id="HackingSkills" component={HackingSkills} durationInFrames={4800} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasics" component={LinuxBasics} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasics2" component={LinuxBasics2} durationInFrames={2400} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasics3" component={LinuxBasics3} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasics4" component={LinuxBasics4} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasics5" component={LinuxBasics5} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasicsEp1" component={LinuxBasicsEp1} durationInFrames={2850} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasicsEp2" component={LinuxBasicsEp2} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasicsEp3" component={LinuxBasicsEp3} durationInFrames={2820} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasicsEp4" component={LinuxBasicsEp4} durationInFrames={3000} fps={30} width={1080} height={1920} />
      <Composition id="LinuxBasicsEp5" component={LinuxBasicsEp5} durationInFrames={2850} fps={30} width={1080} height={1920} />
      <Composition id="TorVPNTruth" component={TorVPNTruth} durationInFrames={3900} fps={30} width={1080} height={1920} />
      <Composition id="PrivacyVideo" component={PrivacyVideo} durationInFrames={2700} fps={30} width={1080} height={1920} />
      <Composition id="PhoneAttack" component={PhoneAttack} durationInFrames={4500} fps={30} width={1080} height={1920} />
      <Composition id="RubberDucky" component={RubberDucky} durationInFrames={4800} fps={30} width={1080} height={1920} />
      <Composition id="WindowsHacking" component={WindowsHacking} durationInFrames={4900} fps={30} width={1080} height={1920} />
      <Composition id="AntiVirus" component={AntiVirus} durationInFrames={2650} fps={30} width={1080} height={1920} />
      <Composition id="MalwareTypes" component={MalwareTypes} durationInFrames={3600} fps={30} width={1080} height={1920} />
      <Composition id="SessionHijacking" component={SessionHijacking} durationInFrames={2950} fps={30} width={1080} height={1920} />
      <Composition id="LeakedVideo" component={LeakedVideo} durationInFrames={2790} fps={30} width={1080} height={1920} />
      <Composition id="PhoneSignals" component={PhoneSignals} durationInFrames={2100} fps={30} width={1080} height={1920} />
      <Composition id="CloudVideo" component={CloudVideo} durationInFrames={1620} fps={30} width={1080} height={1920} />
      <Composition id="LocationVideo" component={LocationVideo} durationInFrames={1650} fps={30} width={1080} height={1920} />
      <Composition id="NmapScan" component={NmapScan} durationInFrames={1950} fps={30} width={1080} height={1920} />
      <Composition id="Fuzzing" component={Fuzzing} durationInFrames={1950} fps={30} width={1080} height={1920} />
      <Composition id="Ffuf2" component={Ffuf2} durationInFrames={1500} fps={30} width={1080} height={1920} />
      <Composition id="VirtualHostFuzzing" component={VirtualHostFuzzing} durationInFrames={1950} fps={30} width={1080} height={1920} />
      <Composition id="BetterStableDistro" component={BetterStableDistro} durationInFrames={1350} fps={30} width={1080} height={1920} />
      <Composition id="AutomationPentest" component={AutomationPentest} durationInFrames={1410} fps={30} width={1080} height={1920} />
      <Composition id="NotetakingVideo" component={NotetakingVideo} durationInFrames={1700} fps={30} width={1080} height={1920} />
      <Composition id="CatVideo" component={CatVideo} durationInFrames={2350} fps={30} width={1080} height={1920} />
      <Composition id="BruteForce" component={BruteForceVideo} durationInFrames={2900} fps={30} width={1080} height={1920} />
      <Composition id="PhoneMachine" component={PhoneMachineVideo} durationInFrames={2153} fps={30} width={1080} height={1920} />
      <Composition id="MarcusStory" component={MarcusStoryVideo} durationInFrames={3200} fps={30} width={1080} height={1920} />
      <Composition id="QubesOS" component={QubesOSVideo} durationInFrames={2500} fps={30} width={1080} height={1920} />
      <Composition id="WindowsSecurity" component={WindowsSecurityVideo} durationInFrames={2250} fps={30} width={1080} height={1920} />
      <Composition id="ProtocolEp2" component={ProtocolEp2Video} durationInFrames={1390} fps={30} width={1080} height={1920} />
      <Composition id="HackingWebsites" component={HackingWebsitesVideo} durationInFrames={2250} fps={30} width={1080} height={1920} />





    </>
  );
};
