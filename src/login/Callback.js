import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.substr(1));
    const accessToken = params.get('access_token');
    const tokenType = params.get('token_type');
    const expiresIn = params.get('expires_in');

    if (accessToken && tokenType && expiresIn) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('expiresIn', expiresIn);

      // Redireciona para a página de geração de playlist
      navigate('/playlist');
    } else {
      console.log('Erro ao fazer autenticação')
    }
  }, [location, navigate]);

  return (
    <div class='authenticating'>
      <h1>Autenticando...</h1>
    </div>
  );
};

export default Callback;
