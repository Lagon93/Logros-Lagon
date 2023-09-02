import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Importa los estilos desde el archivo CSS
import Popup from './Popup';

// Define el componente HomePage
const HomePage = () => {
  // Define estados utilizando useState para almacenar datos
  const [achievementsData, setAchievementsData] = useState([]); // Datos de logros diarios
  const [gamesData, setGamesData] = useState([]); // Datos de juegos
  const [selectedGame, setSelectedGame] = useState(null); // Juego seleccionado
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para abrir/cerrar un popup
  const [completedGamesCount, setCompletedGamesCount] = useState(0); // Cantidad de juegos completados

  // Función para generar un número aleatorio entre 1 y 3
  const getRandomRocaNumber = () => {
    return Math.floor(Math.random() * 3) + 1;
  };

  // Maneja el clic en un juego
  const handleGameClick = (gameId) => {
    const selectedGame = gamesData.find((game) => game.id === gameId);
    setSelectedGame(selectedGame);
    setIsPopupOpen(true);
    console.log("isPopupOpen:", isPopupOpen);
  };

  // Maneja el cierre del popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Efecto secundario que se ejecuta al cargar el componente
  useEffect(() => {
    // Carga los datos de logros diarios desde un archivo JSON
    fetch('/achievementsData.json')
      .then((response) => response.json())
      .then((data) => {
        setAchievementsData(data);
      })
      .catch((error) => console.error('Error al cargar los datos de logros diarios:', error));

    // Carga los datos de juegos desde un archivo JSON
    fetch('/games.json')
      .then((response) => response.json())
      .then((data) => {
        setGamesData(data);
        setCompletedGamesCount(data.length);
      })
      .catch((error) => console.error('Error al cargar los datos de juegos de la galería:', error));
  }, []); // El efecto se ejecuta solo una vez, ya que la dependencia es un arreglo vacío

  // Renderiza el contenido del componente
  return (
    <div className="page-background">
      <div className='logo-background'><img src="/LOGO2.png" alt="Logo de Logros de Lagon" className="logo" /></div>
      <div className="card">
        <h1 id="diarios"><img src="/titulo1.png" alt='Titulo logros diarios'></img></h1><div className='rock-achiev'></div>
        {/* Mapea los datos de logros diarios y renderiza cada logro */}
        {achievementsData.map((achievement) => (
          <div key={achievement.id} className="achievement">
            <div className="roca-image">
              <img src={`/rock${getRandomRocaNumber()}.png`} alt="Roca" />
            </div>
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
          {/* Mapea los datos de juegos y renderiza cada juego */}
          {gamesData.map((game) => (
            <div key={game.gameName} className="gallery-item">
              <div
                className="game-icon"
                onClick={() => handleGameClick(game.id)}
              >
                <img src={game.image} alt={game.gameName} />
              </div>
              <p>{game.gameName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Renderiza un Popup si está abierto */}
      {isPopupOpen && selectedGame && (
        <Popup game={selectedGame} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default HomePage; // Exporta el componente HomePage
