# video-maker

![video-maker cover](cover.png)

> **New here? Recommended:** if you don't know how to use this project, just use [opencode](https://opencode.ai) prompts: describe the video you want (hook text, pictures, scenes, animations) in plain words and let it build the Remotion composition for you. No Remotion knowledge needed.

Remotion (React + TypeScript) project for producing **vertical 1080×1920 cybersecurity explainer videos**: Arabic/Darija hooks, black-studio style, per-word caption springs, icon/diagram motion scenes. Renders go straight into a DaVinci Resolve timeline.

~118 compositions live in `src/Root.tsx` (hooks, CTF/pwn walkthroughs, VPN/lab comparisons, Linux-distro explainers, PC-buying guides…).

## Stack

- [Remotion 4](https://www.remotion.dev/) + React 19 + TypeScript
- Tailwind v4, lucide-react icons, Google/Cairo fonts
- Output: 1080×1920 @ 30fps → H.264 mp4, then ProRes `.mov` for DaVinci Resolve

## How to use

**1. Install**

```console
npm install
```

**2. Preview in the studio**

```console
npm run dev
```

Pick any composition from the sidebar (e.g. `Vs`, `Ctf`, `Books`, `Mix`, `Yourcomputer`).

**3. Add a new video**

1. Create `src/<Name>/<Name>.tsx` exporting a `React.FC` (see `src/Fbi/Fbi.tsx` for the minimal pattern: black `AbsoluteFill` + spring image + fade caption).
2. Register it in `src/Root.tsx`:
   ```tsx
   import { MyVideo } from './MyVideo/MyVideo';
   <Composition id="MyVideo" component={MyVideo} durationInFrames={150} fps={30} width={1080} height={1920} />
   ```
3. Drop images/logos in `public/` and load them with `staticFile("file.png")`.

**4. Render (lightweight, won't freeze the PC)**

Render through a single-composition entry file so Remotion doesn't bundle all 118 comps (see `src/vs-entry.tsx` as an example):

```console
NODE_OPTIONS=--max-old-space-size=4096 npx remotion render src/<name>-entry.tsx <CompositionId> out/<name>.mp4 --concurrency=1 --overwrite
```

**5. Convert for DaVinci Resolve (ProRes, PCM audio)**

```console
ffmpeg -y -i out/<name>.mp4 -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le -c:a pcm_s16le -movflags +faststart out/<name>_DaVinci.mov
```

Import the `.mov` straight into the Media Pool with no transcoding needed. On DaVinci Resolve **Free (Linux)**, use DNxHR instead:

```console
ffmpeg -y -i out/<name>.mp4 -c:v dnxhd -profile:v dnxhr_hq -pix_fmt yuv422p -c:a pcm_s16le out/<name>_DaVinci_DNxHR.mov
```

## Project layout

```
src/
  Root.tsx            # registers every composition
  *-entry.tsx         # single-comp entry files for light renders
  <VideoName>/        # one folder per video (scenes + components)
public/               # images, logos, bg loops referenced via staticFile()
out/                  # renders (git-ignored)
scripts/              # helpers (asset push, frame export, upload server)
```

## Notes

- `out/`, `node_modules/` and local `.mp4`/`.mov` files are git-ignored. Renders are reproduced from source, not committed.
- Fonts: Cairo/Changa (Arabic) + JetBrains Mono (latin/terminal). RTL text uses `dir="rtl"` wrappers.
