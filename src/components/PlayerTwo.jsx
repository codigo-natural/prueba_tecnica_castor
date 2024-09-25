'use client'

import { useSpotify } from "@/context/SpotifyContext";
import { useEffect, useState } from "react";
import PlayerTrackInfo from "./PlayerTrackInfo";
import AdditionalControllers from "./AdditionalControllers";

export default function PlayerTwo() {
  const { currentTrack } = useSpotify();

  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying((prev) => !prev);
  };

  useEffect(() => {
    // if (currentTrack) {
    setAudio(new Audio(currentTrack?.preview_url));
    // }
  }, [currentTrack?.preview_url]);

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setPlaying(false));
    }
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  });

  return (
    <footer
      className={`sticky bottom-0 grid grid-cols-12 items-center justify-between px-5 border-[#272727] bg-player ${currentTrack ? "py-3 border-t" : "py-0 border-0"
        }`}
    >
      {currentTrack && (
        <>
          <PlayerTrackInfo currentTrack={currentTrack} />
          <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
          {JSON.stringify(audio, null, 4)}
          {/* <MainControllers previewUrl={currentTrack.preview_url} /> */}
          <AdditionalControllers />
        </>
      )}
    </footer>
  );
}
