import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import SearchIcon from "./search.svg";
import "./App.css";
const API_URL = "https://personal-music-recommendation.azurewebsites.net/api";
const App = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSong] = useState([]);
  
  
  useEffect(() => {
    searchSong("Firework");
  }, []);

  const searchSong = async (song) => {
    const response = await fetch(`${API_URL}recommendation?code=dkS5_6Zm8E-ElF4KzKlwPwZTDm-0_5d2_Q-Re5afhl-yAzFu-Ak5rg==&song=${song}`);
    const data = await response.json();
    setSong(data.Search);
  };
  return (
    <div className="app">
      <h1>Personalized Music Recommender</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for songs"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchSongs(searchTerm)}
        />
      </div>
      {songs?.length > 0 ? (
        <div className="container">
          {songs.map((songs) => (
            <SongCard songs={songs} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No songs found</h2>
        </div>
      )}
    </div>
  );
};
export default App;