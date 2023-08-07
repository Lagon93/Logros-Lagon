import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Enlazar los estilos desde el archivo
import Popup from './Popup';

const HomePage = () => {
  const [achievementsData, setAchievementsData] = useState([]); // Agregar el estado de logros diarios
  const [gamesData, setGamesData] = useState([]);

  const [selectedGame, setSelectedGame] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    // Cargar los datos de logros diarios desde achievementsData.json usando fetch
    fetch('/achievementsData.json')
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes procesar o transformar los datos si es necesario
        // Por ejemplo, si los datos del JSON están anidados bajo una clave específica:
        // setAchievementsData(data.achievements);
        setAchievementsData(data);
      })
      .catch((error) => console.error('Error al cargar los datos de logros diarios:', error));

    // Cargar los datos de juegos de la galería desde gamesData.json usando fetch
    fetch('/gamesData.json')
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes procesar o transformar los datos si es necesario
        // Por ejemplo, si los datos del JSON están anidados bajo una clave específica:
        // setGamesData(data.games);
        setGamesData(data);
      })
      .catch((error) => console.error('Error al cargar los datos de juegos de la galería:', error));
  }, []);

  return (
    <div className="page-background">
      <img src="/LOGO2.png" alt="Logo de Logros de Lagon" className="logo" />
      <div className="card">
        <h1>Logros diarios</h1>
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
      

        {/* Nueva sección con la segunda card */}
        <div className="card">
        <h1>Juegos Completados</h1>
        <div className="gallery">
          {gamesData.map((game) => (
            <div key={game.gameName} className="gallery-item">
              <div
                className="game-icon"
                onClick={() => handleGameClick(game.gameName)} // Actualizamos el onClick para llamar a handleGameClick
              >
                <img src={game.imageUrl} alt={game.gameName} width="50" height="50" />
              </div>
              <p>{game.gameName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup para la lista de logros */}
      {isPopupOpen && selectedGame && (
        <Popup game={selectedGame} onClose={handleClosePopup} />
      )}
        </div>
  );
};

export default HomePage;
