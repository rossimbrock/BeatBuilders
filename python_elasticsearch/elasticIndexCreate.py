import pandas as pd
from elasticsearch import Elasticsearch, helpers
import time


# Creating an elasticsearch objeect
es = Elasticsearch("http://elasticsearch:9200")
attempt = 1
max_attempts = 100


# Testing ElasticSearch connection on Docker start up
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

# Initializing the msic dataset
df = pd.read_csv("Initial_Music_Dataset.csv")


# Creating a cluster mapping for data attributes
# Used for ElasticSearch Index construction
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

        # Fill Index
        es.index(index="songs", id=i, document=doc)





