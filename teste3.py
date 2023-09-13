import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Configure the Spotify API
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
    
    if tracks:
        sp.playlist_add_items(playlist['id'], tracks)
    else:
        print("Nenhuma música encontrada para adicionar à playlist.")

def get_recommendations(genre, params):
    results = sp.recommendations(seed_genres=[genre], **params)
    if "tracks" in results:
        tracks = results["tracks"]
        return tracks
    
    return[]

def main():
    sentiment = input('''Escolha um sentimento: 
                      1. Feliz
                      2. Triste
                      3. Energético
                      4. Calmo
                  ''')

    style = input("Digite o estilo musical: ")
    # Valores padrões
    acousticness = 0.5
    danceability = 0.5
    valence = 0.5
    energy = 0.5

    if sentiment == '1':
        danceability = 0.8
        valence = 0.8
        energy = 0.8
    elif sentiment == '2':
        danceability = 0.3
        valence = 0.2
        energy = 0.3
    elif sentiment == '3':
        danceability = 0.9
        energy = 0.9
    elif sentiment == '4':
        danceability = 0.3
        energy = 0.3

    params = {
        'target_acousticness': acousticness,
        'target_danceability': danceability,
        'target_valence': valence,
        'target_energy': energy
        }
    tracks = get_recommendations(style, params)
    for track in tracks:
        print(track['name'])



if __name__ == '__main__':
    main()
