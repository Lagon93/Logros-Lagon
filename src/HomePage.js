
import React, { useState, useEffect } from 'react';
import './styles.css'; // Enlazar los estilos desde el archivo

const achievementsData = [
  // Agrega aquí los objetos con los datos de los logros
  {id: 1,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
  {id: 2,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
  {id: 3,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
];

const HomePage = () => {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const handleGameClick = (gameId) => {
    setExpandedGameId((prevExpandedId) => (prevExpandedId === gameId ? null : gameId));
  };

  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    // Cargar los datos desde gamesData.json usando fetch
    fetch('/gamesData.json')
      .then((response) => response.json())
      .then((data) => setGamesData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div className="page-background">
      <img src="/LOGO2.png" alt="Logo de Logros de Lagon" className="logo" />
      <div className="card">
      <h1>Logros diarios</h1> {/* Título dentro de la card */}
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
            <div key={game.id} className="gallery-item">
              <div className="game-icon" onClick={() => handleGameClick(game.id)}>
                <img src={game.iconUrl} alt={game.title} width="50" height="50" />
              </div>
              <p>{game.title}</p>
              {expandedGameId === game.id && (
                <div className="game-achievements">
                  {game.achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement">
                      <img src={achievement.imageUrl} alt={achievement.title} />
                      <div>
                        <h2>{achievement.title}</h2>
                        <p>{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
