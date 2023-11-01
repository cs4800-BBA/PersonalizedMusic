import React from 'react';
import "./App.css";

const SongCard = ({ song }) => {
  return (
    <div className="song">
      <h3>{song.name}</h3>
      <span>{song.artists.join(', ')}</span>
      <a href={song.external_url} target="_blank" rel="noopener noreferrer">
        <img src={song.images[0].url} width="100%" height="100%" alt="Track" />
      </a>
    </div>
  );
};

export default SongCard;