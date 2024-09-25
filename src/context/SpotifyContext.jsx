'use client'

import axios from "axios";
import { createContext, useState, useContext } from "react";

const SpotifyContext = createContext({})

export const SpotifyProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState(
    null
  );
  const [tracksQueue, setTracksQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [query, setQuery] = useState("");
  console.log('current track in context spotify', setCurrentTrack)

  const fetchPlaylists = async () => {
    try {
      const resp = await axios.get("/api/playlists");
      const data = resp.data;
      setPlaylists(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const resp = await axios.get(`/api/search?q=${query}`);
      setSearchResults(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        playlists,
        fetchPlaylists,
        query,
        setQuery,
        searchResults,
        fetchSearchResults,
        currentTrack,
        setCurrentTrack,
        tracksQueue,
        setTracksQueue,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
