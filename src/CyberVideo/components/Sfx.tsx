import React from 'react';
import { Audio, staticFile, useVideoConfig } from 'remotion';

/**
 * Tiny helper: plays a static WAV once at a given frame offset.
 * `startFrom` = which frame (relative to current scene) to start playback.
 * `volume`    = 0–1 (default 0.45 — subtle, not intrusive).
 */
export const Sfx: React.FC<{
    file: 'whoosh' | 'beep' | 'glitch' | 'impact' | 'scan' | 'tick' | 'shuffle';
    startFrom: number;    // frame offset within the scene
    volume?: number;
}> = ({ file, startFrom, volume = 0.45 }) => {
    const { fps } = useVideoConfig();

    return (
        <Audio
            src={staticFile(`assets/cyber/sfx/${file}.wav`)}
            startFrom={0}
            endAt={Math.ceil(fps * 1.5)}   // max 1.5s per clip
            volume={(frame) =>
                frame < startFrom ? 0 : volume
            }
        />
    );
};
