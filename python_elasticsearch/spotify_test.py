
import csv
import pandas as pd
from elasticsearch import Elasticsearch, helpers
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time

es = Elasticsearch("http://elasticsearch:9200")
attempt = 1
max_attempts = 100

print("Waiting for Elasticsearch to become available...")

while attempt <= max_attempts:
    try:
        if es.ping():
            print("Elasticsearch is up and running!")
            break
        else:
            print("Elasticsearch ping unsuccessful, retrying...")
    except Exception as e:
        print(f"Attempt {attempt}: Error connecting to Elasticsearch, retrying in 5 seconds... Error: {e}")

    time.sleep(5)
    attempt += 1
else:
    raise Exception("Elasticsearch failed to start within the expected time.")



# docker run --rm -p 9200:9200 -p 9300:9300 -e "xpack.security.enabled=false" -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.12.0

# print(es.info().body)



# Delete index 
# es.indices.delete(index="songs")
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id="4c0ab737da484e299e251443d295609e", client_secret="a26012b9bcb446afb761cfe7f56021c9"))

df = pd.read_csv("Initial_Music_Dataset.csv")

mappings = {
    "properties" : {
        "artist_name": {"type": "keyword"},
        "track_name": {"type": "keyword"},
        "release_date": {"type": "integer"},
        "genre": {"type": "keyword"},
        "lyrics": {"type": "keyword"},
        "len": {"type": "integer"},
        "dating": {"type": "long"},
        "violence": {"type": "long"},
        "world/life": {"type": "long"},
        "night/time": {"type": "long"},
        "shake_the_audience": {"type": "long"},
        "family/gospel": {"type": "long"},
        "romantic": {"type": "long"},
        "communication": {"type": "long"},
        "obscene": {"type": "long"},
        "music": {"type": "long"},
        "movement/places": {"type": "long"},
        "light/visual_perception": {"type": "long"},
        "family/spirtitual": {"type": "long"},
        "like/girls": {"type": "long"},
        "sadness": {"type": "long"},
        "feelings": {"type": "long"},
        "topic": {"type": "keyword"},
        "age": {"type": "long"},
        "accousticness": {"type": "long"},
        "danceability": {"type": "long"},
        "energy": {"type": "long"},
        "instrumentalness": {"type": "long"},
        "loudness": {"type": "long"},
        "valence": {"type": "long"}
    }
}

# Create index name with mappings
es.indices.create(index = "songs", mappings = mappings)

# Set document up for filling 

for i, row in df.iterrows():
        doc = {
            "artist_name": row["artist_name"],
            "track_name": row["track_name"],
            "release_date": row["release_date"],
            "genre": row["genre"],
            "lyrics": row["lyrics"],
            "len": row["len"],
            "dating": row["dating"],
            "violence": row["violence"],
            "world/life":row["world/life"],
            "night/time": row["night/time"],
            "shake_the_audience": row["shaketheaudience"],
            "family/gospel": row["family/gospel"],
            "romantic": row["romantic"],
            "communication": row["communication"],
            "obscene": row["obscene"],
            "music": row["music"],
            "movement/places": row["movement/places"],
            "light/visual_perception": row["light/visualperceptions"],
            "family/spirtitual": row["family/spiritual"],
            "like/girls": row["like/girls"],
            "sadness": row["sadness"],
            "feelings": row["feelings"],
            "topic": row["topic"],
            "age": row["age"],
            "acousticness": row["acousticness"],
            "danceability": row["danceability"],
            "energy": row["energy"],
            "instrumentalness": row["instrumentalness"],
            "loudness": row["loudness"],
            "valence": row["valence"]                           
        }

        # FILL INDEX
        es.index(index="songs", id=i, document=doc)

# Counting numbers of items in index
es.indices.refresh(index="songs")
print(es.cat.count(index="songs", format="json"))

resp = es.search(
    index="songs",
    query={
            "bool": {
                "must": {
                    "match_phrase": {
                        "track_name": "bad blood"
                    }
                }
            }
    }
)
print()
print(resp.body)
print()

#use response for spotify query
artist_name = resp.body['hits']['hits'][0]['_source']['artist_name']
track_name = resp.body['hits']['hits'][0]['_source']['track_name']
release_date = resp.body['hits']['hits'][0]['_source']['release_date']
genre = resp.body['hits']['hits'][0]['_source']['genre']

query = f"artist:{artist_name} track:{track_name} year:{release_date}"
result = sp.search(q=query, type="track")

track_link = result['tracks']['items'][0]['external_urls']['spotify']
track_id = result['tracks']['items'][0]['id']
preview_url = result['tracks']['items'][0]['preview_url']
track_name = result['tracks']['items'][0]['name']
track_length = result['tracks']['items'][0]['duration_ms']/1000/60

print(track_link)
print(track_id)
print(preview_url)
print(track_name)
print(track_length, " min")


