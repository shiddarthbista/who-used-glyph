import React from "react";
import './Card.css'

function Card({ heroID, username, minute, second ,team }) {
    // Function to calculate the image URL based on heroID
    const getImageUrl = (heroID) => {
        try {
          const images = require.context('../heroes', true);
          return images(`./${heroID}.png`);
        } catch (error) {
          console.error(`Failed to import hero image for ID: ${heroID}`);
          return null; // Return a default image or handle missing images
        }
      };

    const cardStyle = {
        backgroundColor: team === 2 ? 'rgb(102, 187, 106)' : team === 3 ? 'rgb(255, 76, 76)' : 'transparent'
      };
  
    return (
      <div className="card" style={cardStyle}>
        <img src={getImageUrl(heroID)} alt={`Hero ${heroID}`} />
        <div className="card-content">
          <h3>{username}</h3>
          <p>Glyph timing: <b>{minute}:{second}</b></p>
        </div>
      </div>
    );
  }

export default Card;