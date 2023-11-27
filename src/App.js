import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import FindGenres from "./FindGenres";
import SearchIcon from "./search.svg";
import "./App.css";



const App = () => {

  
  const genres =   ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", 
  "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", 
  "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", 
  "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", 
  "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", 
  "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", 
  "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", 
  "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", 
  "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance",
   "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", 
   "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];


  const [searchTerm, setSearchTerm] = useState("");
  const [ogSong, setSong] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isGenre, setIsGenre] = useState([]);
  
  
  useEffect(() => {
    searchSong("hello");
    searchOgSong("hello");
  }, );

  const handleSelectedGenresChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
    searchSong(searchTerm, selectedGenres); // Call searchSong with the updated selected genres
  };
  

  // Get Song Recommendations from Backend
  const searchSong = async (song, selectedGenres = []) => {
    if(searchTerm.length < 1 && song !== "hello"){
      setIsGenre(true);
    }else{
      setIsGenre(false);
    }
    const API_URL = "https://personal-music-recommendation.azurewebsites.net/api/recommendation";
    const functionKey = "BiLtlWfdvS4NmIH_Y9_xDnCT1Cs5rOLoLWvenK88PQW8AzFuDX25TA==";
    
    const genresQueryParam = selectedGenres.length > 0 ? `&genre=${selectedGenres.join(',')}` : '';
  
    const response = await fetch(`${API_URL}?code=${functionKey}&limit=11&song=${song}${genresQueryParam}`);
    const data = await response.json();
  
    if (Array.isArray(data)) {
      const recommendedTracks = data.map(recommendation => ({
        name: recommendation.name,
        artists: recommendation.artists,
        external_url: recommendation.external_url,
        images: recommendation.images
      }));
  
      setRecommendedTracks(recommendedTracks);
    } else {
      console.log("Invalid Song Entry");
    }
  };
  
  

  // Get Original Song from Backend
  const searchOgSong = async (song) => {
    setSelectedGenres(<FindGenres selectedGenres/>)
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

  // Song Search bar
  <div className="app">
      <h1>Personalized Music Recommender</h1>
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              searchSong(searchTerm, selectedGenres);
              searchOgSong(searchTerm);
            }}}
        placeholder="Get recommendation by song .  .  ."
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => {
              searchSong(searchTerm, selectedGenres);
              searchOgSong(searchTerm);
              
            }}
      />
    </div>
    <FindGenres
    suggestions={genres}
    selectedGenres={selectedGenres}
    setSelectedGenres={handleSelectedGenresChange}
    onSelectedGenresChange={handleSelectedGenresChange}
  />
      
    <div>
      <div className="container">
        {ogSong.map((track, index) => (
          (!isGenre) && <SongCard song={track} key={index} />
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