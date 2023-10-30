import React from 'react';

const SongCard = ({ movie: { name, artists, external_url, image_url } }) => {
  return (
    <div className="song" key={name}>
      <div>
        <p>{external_url}</p>
      </div>

      <div>
        <img src={image_url !== "N/A" ? image_url : "https://via.placeholder.com/400"} alt={name} />
      </div>

      <div>
        <h3>{image_url}</h3>
      </div>
    </div>
  );
}

export default SongCard;