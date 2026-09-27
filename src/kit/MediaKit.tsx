import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CYBER, FONT } from "../profx/Theme";

// Showcase for: Img/Video (with staticFile), Gif, Lottie — all common in remotion templates
// Drop files into /public and reference via staticFile("myfile.gif")

export const MediaKit: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 60], [0.92, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: CYBER.bg0, padding: 40, gap: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: "0.2em", color: CYBER.cyan }}>MEDIA · GIF · LOTTIE · VIDEO</div>
      <div style={{ fontFamily: FONT.display, fontSize: 56, fontWeight: 800, color: CYBER.white, lineHeight: 1 }}>drop any asset · <span style={{ color: CYBER.magenta }}>remotion handles it</span></div>

      <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
        {/* Static image demo */}
        <div style={{ flex: 1, height: 520, borderRadius: 22, overflow: "hidden", border: `1px solid ${CYBER.cyan}33`, background: "rgba(255,255,255,0.04)", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.16em", color: CYBER.muted, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>IMG · staticFile()</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 14, transform: `scale(${scale})` }}>
            {/* Replace "placeholder.jpg" with any file in /public */}
            <div style={{ width: "100%", height: "100%", borderRadius: 14, background: `linear-gradient(135deg, ${CYBER.cyan}22, ${CYBER.magenta}22)`, border: `2px dashed ${CYBER.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, color: CYBER.muted, fontSize: 14, textAlign: "center", padding: 18 }}>
              put image in /public<br />
              &lt;Img src={"{staticFile('photo.jpg')}"} /&gt;
            </div>
          </div>
        </div>

        <div style={{ flex: 1, height: 520, borderRadius: 22, overflow: "hidden", border: `1px solid ${CYBER.magenta}33`, background: "rgba(255,255,255,0.04)", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.16em", color: CYBER.muted, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>GIF · VIDEO · LOTTIE</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: 14, justifyContent: "center" }}>
            <div style={{ height: 148, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: 13, color: CYBER.muted, textAlign: "center", padding: 12 }}>
              &lt;Gif src={`"{staticFile('anim.gif')}"`} /&gt;<br />
              <span style={{ opacity: 0.6 }}>auto-decoded, frame-accurate</span>
            </div>
            <div style={{ height: 148, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: 13, color: CYBER.muted, textAlign: "center", padding: 12 }}>
              &lt;Video src={`"{staticFile('clip.mp4')}"`} /&gt;<br />
              <span style={{ opacity: 0.6 }}>seekable, no re-encode</span>
            </div>
            <div style={{ height: 148, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: 13, color: CYBER.muted, textAlign: "center", padding: 12 }}>
              &lt;Lottie animationData={`"{data}"`} /&gt;<br />
              <span style={{ opacity: 0.6 }}>vector, scalable, controllable</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: FONT.mono, fontSize: 13, color: CYBER.dim, lineHeight: 1.5 }}>
        All assets are pre-bundled and cached. Use <span style={{ color: CYBER.cyan }}>staticFile()</span> so Remotion rewrites paths for Lambda / Player / Studio.
      </div>
    </AbsoluteFill>
  );
};

// Example real usage (uncomment when you have files in /public):
// <Img src={staticFile("photo.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// <Video src={staticFile("clip.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// <Gif src={staticFile("anim.gif")} width={400} height={300} fit="contain" playbackRate={1} />
// <Lottie animationData={myJson} loop style={{ width: 300, height: 300 }} />
