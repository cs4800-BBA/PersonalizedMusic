import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import SearchIcon from "./search.svg";
import "./App.css";


const App = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  //const [songs, setSong] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  
  useEffect(() => {
    searchSong("Firework");
  }, []);


// Get Song from Backend
  const searchSong = async (song) => {
    
    const API_URL = "https://personal-music-recommendation.azurewebsites.net/api/recommendation";
    const functionKey = "BiLtlWfdvS4NmIH_Y9_xDnCT1Cs5rOLoLWvenK88PQW8AzFuDX25TA==";
    const response = await fetch(`${API_URL}?code=${functionKey}&limit=10&song=${song}`) ;
    const data = await response.json();
   
   if (Array.isArray(data)) {
    const recommendedTracks = data.map(recommendation => ({
      name: recommendation.name,
      artists: recommendation.artists,
      external_url: recommendation.external_url,
      images: recommendation.images
    }));

    setRecommendedTracks(recommendedTracks);
  };
}


  return (
    <div className="app">
      <h1>Personalized Music Recommender</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
              searchSong(searchTerm);
            }
          }}
          placeholder="Search for songs..."
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchSong(searchTerm)}
        />
      </div>

      <div>
          <div className="container">
            {recommendedTracks.map((track, index) => (
              <SongCard song={track} key={index} />
               ))}


          </div>
    </div>
      
    </div>
  );
};
export default App;