import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./playlistgenerator.css"

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

    setGeneratedPlaylist([]);

    try {
      const accessToken = localStorage.getItem('accessToken');

      let seed_genres = '';
      let limit = 10;

      let confirmedEmotion = selectedEmotion;
  
    if (selectedEmotion === 'Sad') {
      // Pergunta para confirmar se a pessoa quer continuar triste
      const confirmSad = window.confirm('Você quer continuar triste?');

      if (!confirmSad) {
        // Se a pessoa não quer continuar triste, mude para 'Happy'
        setSelectedEmotion('Happy');
        confirmedEmotion = 'Happy'
        seed_genres = 'pop,dance'; // Gêneros para 'Happy'
      } else {
        seed_genres = 'acoustic,chill,piano'; // Gêneros para 'Sad'
      }
    } else if (selectedEmotion === 'Happy') {
      seed_genres = 'pop,dance';
    } else if (selectedEmotion === 'Excited') {
      seed_genres = 'electronic,dance,upbeat';
    }
      else if (selectedEmotion === 'Chill'){
      seed_genres = 'alternative, acoustic chill, jazz pop, lo-fi chill';
    }
  
      const queryParams = {
        seed_genres,
        limit,
      };
  
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const recommendedTracks = response.data.tracks;
  
      setGeneratedPlaylist(recommendedTracks);

      const playlistName = confirmedEmotion + ' Playlist';
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
    <div class='playlistGenerator'>
      <h1>Gerador de Playlist</h1>
      <div class="selectEmotionText">
        <span>Selecione sua emoção abaixo:</span>
      </div>
      <div class='selectEmotionInput'>
        <label>
          <select value={selectedEmotion} onChange={handleEmotionChange}>
            <option value="Sad">Sad</option>
            <option value="Happy">Happy</option>
            <option value="Excited">Excited</option>
            <option value="Chill">Chill</option>
            {/* add mais opcoes de emocoes */}
          </select>
        </label>
      </div>
      <button onClick={generatePlaylist}>Gerar Playlist</button>
      {loading && <p>Gerando playlist...</p>}
      {generatedPlaylist.length > 0 && (
        <div class="playlistList">
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
