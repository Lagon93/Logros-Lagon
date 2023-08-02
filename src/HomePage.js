import React from 'react';
import './styles.css'; // Enlazar los estilos desde el archivo

const achievementsData = [
  // Agrega aquí los objetos con los datos de los logros
  {id: 1,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
  {id: 2,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
  {id: 3,title: 'Primer lugar en el torneo',description: 'Gané el primer lugar en el torneo de League of Legends con mi equipo.',imageUrl: 'https://www.vandalimg.com/psn/plata.png',},
];

// Datos de los juegos completados con sus iconos
const completedGamesData = [
    { id: 1, title: 'League of Legends', iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/6/68/Main_Logo.png' },
    { id: 2, title: 'Minecraft', iconUrl: 'https://example.com/minecraft-icon.png' },
    // Agrega más juegos completados con sus respectivos iconos aquí
  ];

const HomePage = () => {
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
        <table>

          <tbody>
            {completedGamesData.map((game) => (
              <tr key={game.id}>
                                <td>
                  <img src={game.iconUrl} alt={game.title} width="50" height="50" />
                </td>
                <td>{game.title}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
