import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Enlazar los estilos desde el archivo
import Popup from './Popup';


const HomePage = () => {
  const [achievementsData, setAchievementsData] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [completedGamesCount, setCompletedGamesCount] = useState(0);

  const handleGameClick = (gameName) => {
    const selectedGame = gamesData.find((game) => game.gameName === gameName);
    setSelectedGame(selectedGame);
    setIsPopupOpen(true);
    console.log("isPopupOpen:", isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    fetch('/achievementsData.json')
      .then((response) => response.json())
      .then((data) => {
        setAchievementsData(data);
      })
      .catch((error) => console.error('Error al cargar los datos de logros diarios:', error));

    fetch('/gamesData.json')
      .then((response) => response.json())
      .then((data) => {
        setGamesData(data);
        setCompletedGamesCount(data.length);
      })
      .catch((error) => console.error('Error al cargar los datos de juegos de la galería:', error));
  }, []);

  return (
    <div className="page-background">
      <img src="/LOGO2.png" alt="Logo de Logros de Lagon" className="logo" />
      <div className="card">
        <h1 id="diarios">LOGROS DIARIOS</h1>
        {achievementsData.map((achievement) => (
          <div key={achievement.id} className="achievement">
            <img src={achievement.imageUrl} alt={achievement.title} />
            <div>
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card2">
        <h1 className="completed-heading">JUEGOS COMPLETADOS : {completedGamesCount}</h1>
        <div className="gallery">
          {gamesData.map((game) => (
            <div key={game.gameName} className="gallery-item">
              <div
                className="game-icon"
                onClick={() => handleGameClick(game.gameName)}
              >
                <img src={game.imageUrl} alt={game.gameName} />
              </div>
              <p>{game.gameName}</p>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && selectedGame && (
        <Popup game={selectedGame} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default HomePage;
