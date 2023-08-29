import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Configuração das credenciais
SPOTIPY_CLIENT_ID = '60b9403312d44eebb08b38ff1423f343'
SPOTIPY_CLIENT_SECRET = 'd2aae9524d224e829f66076cf3719f35'
SPOTIPY_REDIRECT_URI = 'https://localhost/3000'

# Autenticação via OAuth
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                                               client_secret=SPOTIPY_CLIENT_SECRET,
                                               redirect_uri=SPOTIPY_REDIRECT_URI,
                                               scope='user-library-read playlist-modify-public'))

def create_playlist(name, description, tracks):
    user = sp.current_user()
    playlist = sp.user_playlist_create(user['id'], name, public=True, description=description)
    
    sp.playlist_add_items(playlist['id'], tracks)

def search_tracks(genre):
    results = sp.search(q=f'genre:"{genre}"', type='track', limit=25)
    tracks = []
    for track in results['tracks']['items']:
        tracks.append(track['uri'])
    return tracks

def main():
    sentiment = input("Digite o sentimento: ")
    style = input("Digite o estilo musical: ")

    # Processamento adicional para determinar o estilo musical e gerar a playlist

    tracks = search_tracks(style)  # Substitua pelo processo de determinar o estilo musical

    playlist_name = f"{style.capitalize()} Playlist"
    playlist_description = f"Playlist para quando você está se sentindo {sentiment} e gosta de {style}."

    create_playlist(playlist_name, playlist_description, tracks)
    print(f"A playlist '{playlist_name}' foi criada com sucesso!")

if __name__ == '__main__':
    main()
