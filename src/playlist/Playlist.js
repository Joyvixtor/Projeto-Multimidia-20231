import React from 'react';

const Playlist = ({ generatedPlaylist }) => {
  return (
    <div>
      <h1>Sua Playlist</h1>
      {generatedPlaylist.length > 0 ? (
        <div>
          <h2>Playlist Gerada</h2>
          <ul>
            {generatedPlaylist.map((track, index) => (
              <li key={index}>
                {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Nenhuma playlist gerada ainda. Por favor, vá para a página de geração de playlist.</p>
      )}
    </div>
  );
};

export default Playlist;
