import React from 'react';
import './login.css';
import SpotifyLogo from '../assets/spotify_logo.svg';

const Login = () => {
  const clientId = '86a9bd94a6b14ed1a3c1819e71a05298';
  const redirectUri = 'http://localhost:3000/callback';
  const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-library-read%20playlist-modify-public%20playlist-modify-private`;

  return (
    <div class="loginPage">
      <h1>Login</h1>
      <img src={SpotifyLogo} alt="Logo do Spotify"/>
      <div class="loginButton">
        <a href={spotifyLoginUrl}>Login with Spotify</a>
      </div>
      <span>
          Por favor, faça o credenciamento com sua conta do Spotify
          Para que possamos gerar sua mood playlist
        </span>
    </div>
  );
};

export default Login;
