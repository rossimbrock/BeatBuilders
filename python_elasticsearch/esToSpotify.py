import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json

class SpotifyMethods: 

    #This function takes an Elasticsearch query output and queries the Spotify API to return track information
    def es_to_spotify(esResult):
        
        # API access
        client_id = ""
        client_secret = ""

        #Create Spotify object
        sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

        #Use elements from response for Spotify query
        es_artist_name = esResult['hits']['hits'][0]['_source']['artist_name']
        es_track_name = esResult['hits']['hits'][0]['_source']['track_name']
        es_release_date = esResult['hits']['hits'][0]['_source']['release_date']

        #Query Spotify for track information
        query = f"artist:{es_artist_name} track:{es_track_name} year:{es_release_date}"
        result = sp.search(q=query, type="track")

        #Get track information from Spotify query output
        sp_track_name = result['tracks']['items'][0]['name']
        sp_track_link = result['tracks']['items'][0]['external_urls']['spotify']
        sp_track_id = result['tracks']['items'][0]['id']
        sp_preview_url = result['tracks']['items'][0]['preview_url']
        sp_track_length = result['tracks']['items'][0]['duration_ms']
        sp_artist_name = result['tracks']['items'][0]['artists'][0]['name']
        sp_album_name = result['tracks']['items'][0]['album']['name']
        sp_album_cover = result['tracks']['items'][0]['album']['images'][0]['url']
        
        #Convert info to JSON
        spotify_dict = {
            "track_name": sp_track_name,
            "track_link": sp_track_link,
            "track_id": sp_track_id,
            "track_preview": sp_preview_url,
            "track_length_ms": sp_track_length,
            "artist_name": sp_artist_name,
            "album_name": sp_album_name,
            "album_cover": sp_album_cover
        }

        spotify_json = json.dumps(spotify_dict)
        print(spotify_json)

        return