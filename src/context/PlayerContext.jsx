'use client'

import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext({})

export default function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackAudio, setCurrentTrackAudio] =
    useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
      setCurrentTrackAudio(null);
    }
    const tempAudio = new Audio(currentTrack.preview_url);

    const setAudioData = () => {
      setDuration(tempAudio.duration);
      setCurrentTime(tempAudio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = tempAudio.currentTime;
      setCurrentTime(currTime);
      setSlider(
        currTime
          ? Number(((currTime * 100) / tempAudio.duration).toFixed(1))
          : 0
      );
    };

    tempAudio.addEventListener("loadeddata", setAudioData);
    tempAudio.addEventListener("timeupdate", setAudioTime);
    tempAudio.preload = "none";

    setCurrentTrackAudio(tempAudio);
    console.log("audio set");

    return () => {
      pause();
      setCurrentTrackAudio(null);
    };
  }, [currentTrack]);

  useEffect(() => {
    const handlePlay = () => {
      if (currentTrackAudio) {
        play();
      }
    };
    handlePlay();
  }, [currentTrackAudio]);

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const play = () => {
    setIsPlaying(true);
    currentTrackAudio?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  };

  useEffect(() => {
    if (currentTrackAudio && drag) {
      currentTrackAudio.currentTime = Math.round(
        (drag * currentTrackAudio.duration) / 100
      );
    }
  }, [drag]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentTrackAudio,
        setCurrentTrack,
        isPlaying,
        play,
        pause,
        togglePlay,
        duration,
        currentTime,
        slider,
        setSlider,
        drag,
        setDrag,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);