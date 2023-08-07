import React from 'react';

const Popup = ({ game, onClose }) => {
    console.log("game:", game); 
  return (
    <div className={game && "popup open"} style={{ backgroundColor: game.backgroundColor }}>
      <div className="popup-header">
        <h2>{game.gameName}</h2>
        <button onClick={onClose}>X</button>
      </div>
        {game.availableGameStats.achievements.map((achievement) => (
          <div key={achievement.name} className="achievement">
            <img src={achievement.icon} alt={achievement.displayName} />
            <div>
              <h2>{achievement.displayName}</h2>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default Popup;