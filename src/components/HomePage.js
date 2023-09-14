import React, { useState, useEffect } from "react";
import "../styles/styles.css"; // Importa los estilos desde el archivo CSS
import Popup from "./Popup";

// Define el componente HomePage
const HomePage = () => {
  // Define estados utilizando useState para almacenar datos
  const [achievementsData, setAchievementsData] = useState([]); // Datos de logros diarios
  const [gamesData, setGamesData] = useState([]); // Datos de juegos
  const [selectedGame, setSelectedGame] = useState(null); // Juego seleccionado
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para abrir/cerrar un popup
  const [completedGamesCount, setCompletedGamesCount] = useState(0); // Cantidad de juegos completados
  var juegosD = false;
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
    fetch("/gamediarios.json")
      .then((response) => response.json())
      .then((data) => {
        setAchievementsData(data);
      })
      .catch((error) =>
        console.error("Error al cargar los datos de logros diarios:", error)
      );

    // Carga los datos de juegos desde un archivo JSON
    fetch("/games.json")
      .then((response) => response.json())
      .then((data) => {
        // Filtra los juegos con platinum en true
        const platinumGames = data.filter((game) => game.platinum === true);
        setGamesData(platinumGames); // Actualiza gamesData con los juegos filtrados
        setCompletedGamesCount(platinumGames.length); // Actualiza el recuento solo con los juegos filtrados
      })
      .catch((error) =>
        console.error(
          "Error al cargar los datos de juegos de la galería:",
          error
        )
      );
  }, []); // El efecto se ejecuta solo una vez, ya que la dependencia es un arreglo vacío

  const ComparaFecha = (timestamp) => {
    let timestampn = Number.parseInt(timestamp);
    var date = new Date(timestampn * 1000);
    let dateh = new Date().toLocaleDateString("en-EN");

    // Ajusta las fechas para que solo contengan año, mes y día
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateh = new Date(dateh).toLocaleDateString("en-EN");

    console.log("Fecha actual:", date);
    console.log("Fecha actual en España:", dateh);

    if (date.getTime() === new Date(dateh).getTime()) {
      console.log("Las fechas coinciden.");
    } else {
      console.log("Las fechas no coinciden.");
    }

    return date.getTime() === new Date(dateh).getTime();
  };

  // Renderiza el contenido del componente
  return (
    <div className="page-background">
      <div className="logo-background">
        <img src="/LOGO2.png" alt="Logo de Logros de Lagon" className="logo" />
      </div>
      <div className="card">
        <h1 id="diarios">
          <img src="/titulo1.png" alt="Titulo logros diarios"></img>
        </h1>
        <div className="rock-achiev"></div>
        <div className="logrosdiarios">
          {/* Mapea los datos de logros diarios y renderiza cada logro */}
          {achievementsData.map((game) =>
            game.achievements.map((achievement) => {
              if (ComparaFecha(achievement.unlocktime)) {
                juegosD = true;
                return (
                  <div key={achievement.id} className="achievement">
                    <div className="roca-image">
                      <img
                        src={`/rock${getRandomRocaNumber()}.png`}
                        alt="Roca"
                      />
                    </div>
                    <img
                      className="logoj"
                      src={achievement.image}
                      alt={achievement.name}
                    ></img>
                    <div>
                      <h2>{achievement.name}</h2>
                      <p>{achievement.description}</p>
                    </div>
                    <div className="verticalLine">
                      <img className="JuegoI" src={game.image} alt="Juego del logro"></img>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
          {juegosD ? null : (
            <img
              src="/nologros.png"
              alt="Hoy no hay logros"
              className="noLogros"
            />
          )}
        </div>
      </div>

      <div className="card2">
        <h1 className="completed-heading">
          JUEGOS COMPLETADOS : {completedGamesCount}
        </h1>
        <div className="gallery">
          {/* Filtra los juegos con platinum en true y luego mapea */}
          {gamesData
            .filter((game) => game.platinum === true)
            .map((game) => (
              <div key={game.gameName} className="gallery-item">
                <div
                  className="game-icon"
                  onClick={() => handleGameClick(game.id)}
                >
                  <img
                    src={game.image}
                    alt={game.gameName}
                    className="game-icon-img"
                  />
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
