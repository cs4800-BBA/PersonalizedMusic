import React, { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import "./App.css";

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  
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
          onClick={() => setSearchTerm(e.target.value)} // Change this
        />
      </div>
        <div className="empty">
          <h2>No songs found</h2>
        </div>
    </div>
  );
};
export default App;