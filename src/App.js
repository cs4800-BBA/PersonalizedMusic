import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import SearchIcon from "./search.svg";
import "./App.css";


const App = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [ogSong, setSong] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  
  useEffect(() => {
    searchOgSong("Firework");
    searchSong("Firework");
    
  }, []);


// Get Song Recommendations from Backend
  const searchSong = async (song) => {
    
    const API_URL = "https://personal-music-recommendation.azurewebsites.net/api/recommendation";
    const functionKey = "BiLtlWfdvS4NmIH_Y9_xDnCT1Cs5rOLoLWvenK88PQW8AzFuDX25TA==";
    const response = await fetch(`${API_URL}?code=${functionKey}&limit=11&song=${song}`) ;
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

// Get Original Song from Backend
const searchOgSong = async (song) => {
    
  const API_URL = "https://personal-music-recommendation.azurewebsites.net/api/search";
  const functionKey = "dkS5_6Zm8E-ElF4KzKlwPwZTDm-0_5d2_Q-Re5afhl-yAzFu-Ak5rg==";
  const response = await fetch(`${API_URL}?code=${functionKey}&limit=1&q=${song}`) ;
  const data = await response.json();
 
 if (Array.isArray(data)) {
  const ogSong = data.map(ogSongs => ({
    name: ogSongs.name,
    artists: ogSongs.artists,
    external_url: ogSongs.external_url,
    images: ogSongs.images
  }));

  setSong(ogSong);
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
              searchOgSong(searchTerm);
            }
          }}
          placeholder="Search for songs..."
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {searchSong(searchTerm); searchOgSong(searchTerm);}}
        />
      </div>
      <div>
          <div className="container">
            {ogSong.map((track, index) => (
              <SongCard song={track} key={index} />
               ))}
            {recommendedTracks.map((track, index) => (
              <SongCard song={track} key={index} />
               ))}


          </div>
    </div>
      
    </div>
  );
};
export default App;