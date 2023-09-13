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

def get_feeling_genre_songs(feeling, genre):
    # Construct a refined query to search for tracks that match both mood and genre
    query = f"mood:{feeling} genre:{genre}"

    # Perform a search for tracks based on the refined query
    results = sp.search(q=query, type="track", limit=50)

    # Check if there are any tracks in the search results
    if "tracks" in results:
        tracks = results["tracks"]["items"]

        # Extract the track URIs
        filtered_tracks = [track["uri"] for track in tracks]

        # If there are no matching tracks, return an empty list
        if not filtered_tracks:
            return []

        return filtered_tracks
    else:
        # If no tracks are found, return an empty list
        return []

# Function to get the fifty most popular songs from the specified genre
def get_popular_songs_by_genre(genre):
    # Perform a search for the fifty most popular songs of the specified genre
    results = sp.search(q=f"genre:{genre}", type="track", limit=50)

    # Check if there are any tracks in the search results
    if "tracks" in results:
        tracks = results["tracks"]["items"]

        # Extract the track URIs
        popular_tracks = [track["uri"] for track in tracks]

        return popular_tracks

    return []

def main():
    sentiment = input("Digite o sentimento: ")
    style = input("Digite o estilo musical: ")

    tracks = get_feeling_genre_songs(sentiment, style)

    if not tracks:
        print("Nenhuma música encontrada para o sentimento e estilo musical fornecidos.")
        print("Criando uma playlist com as 50 músicas mais populares do gênero...")
        tracks = get_popular_songs_by_genre(style)

    if not tracks:
        print(f"Nenhuma música encontrada para o gênero {style}.")
        return

    playlist_name = f"{style.capitalize()} Playlist"
    playlist_description = f"Playlist para quando você está se sentindo {sentiment} e gosta de {style}."

    create_playlist(playlist_name, playlist_description, tracks)
    print(f"A playlist '{playlist_name}' foi criada com sucesso!")

if __name__ == '__main__':
    main()
