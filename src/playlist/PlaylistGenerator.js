import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistGenerator = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('Sad');
  const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      window.location.href = './login/Login.js'
    }
  }, []);

  const handleEmotionChange = (event) => {
    setSelectedEmotion(event.target.value);
  };

  const generatePlaylist = async () => {
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');

      const queryParams = {
        seed_genres: selectedEmotion.toLowerCase(),
        limit: 10,
      };

      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const recommendedTracks = response.data.tracks;

      setGeneratedPlaylist(recommendedTracks);

      const playlistName = 'Sua Playlist';
      const uris = recommendedTracks.map((track) => track.uri);

      const createPlaylistResponse = await axios.post(
        'https://api.spotify.com/v1/me/playlists',
        {
          name: playlistName,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const playlistId = createPlaylistResponse.data.id;

      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Playlist criada com sucesso no Spotify!');
    } catch (error) {
      console.error('Erro ao gerar a playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gerador de Playlist</h1>
      <label>
        Selecione uma emoção:
        <select value={selectedEmotion} onChange={handleEmotionChange}>
          <option value="Sad">Sad</option>
          <option value="Happy">Happy</option>
          {/* add mais opcoes de emocoes */}
        </select>
      </label>
      <button onClick={generatePlaylist}>Gerar Playlist</button>
      {loading && <p>Gerando playlist...</p>}
      {generatedPlaylist.length > 0 && (
        <div>
          <h2>Playlist Gerada</h2>
          <ul>
            {generatedPlaylist.map((track) => (
              <li key={track.id}>
                {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlaylistGenerator;
