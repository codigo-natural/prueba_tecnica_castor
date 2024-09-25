'use client'

import { usePlayer } from "@/context/PlayerContext";
import AdditionalControllers from "./AdditionalControllers";
import PlayerTrackInfo from "./PlayerTrackInfo";
import MainControllers from "./MainControllers";

export default function PreviewPlayer() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <footer
      className={`sticky bottom-0 grid grid-cols-12 gap-12 items-center justify-between px-5 border-[#272727] bg-player ${currentTrack ? "py-3 border-t" : "py-0 border-0"
        }`}
    >
      <PlayerTrackInfo currentTrack={currentTrack} />
      <MainControllers />
      <AdditionalControllers />
    </footer>
  );
}