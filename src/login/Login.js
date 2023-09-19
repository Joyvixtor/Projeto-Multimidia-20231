import React from 'react';

const Login = () => {
  const clientId = '86a9bd94a6b14ed1a3c1819e71a05298';
  const redirectUri = 'http://localhost:3000/callback';
  const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-library-read%20playlist-modify-public%20playlist-modify-private`;

  return (
    <div>
      <h1>Login</h1>
      <a href={spotifyLoginUrl}>Login with Spotify</a>
    </div>
  );
};

export default Login;
