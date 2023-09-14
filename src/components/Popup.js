import React from "react";

const Popup = ({ game, onClose }) => {
  console.log("game:", game);
  return (
    <div
      className={game && "popup open"}
      style={{ backgroundColor: game.backgroundColor }}
    >
      <div className="popup-header">
        <h2>{game.gameName}</h2>
        <button onClick={onClose}>
          <img src="/x.png" alt="X"></img>
        </button>
      </div>
      {game.achievements.map((achievement) => (
        <div key={achievement.name} className="achievement">
          <img src={achievement.image} alt={achievement.name} />
          <div>
            <h2>{achievement.name}</h2>
            <p>{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Popup;
