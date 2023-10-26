import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import SearchIcon from "./search.svg";
import "./App.css";

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSong] = useState([]);
  
  
  useEffect(() => {
    searchSong("Firework");
  }, []);


 /*Get Song from Backend */
  const searchSong = async (song) => {
    const API_URL = "https://personal-music-recommendation.azurewebsites.net/api/recommendation";
    const functionKey = "BiLtlWfdvS4NmIH_Y9_xDnCT1Cs5rOLoLWvenK88PQW8AzFuDX25TA==";

    /*const response = await fetch(`${API_URL}?code=${functionKey}&song=${song}`) ;
    const data = await response.json();
    setSong(data.Search); */
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
          onClick={() => searchSong(searchTerm)}
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
          <h2>"No Songs Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;