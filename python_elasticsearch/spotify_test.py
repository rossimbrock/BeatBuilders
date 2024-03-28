import csv
import pandas as pd
from elasticsearch import Elasticsearch, helpers
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

# Load dataset
df = pd.read_csv("Initial_Music_Dataset.csv")

# Define a generator function to prepare songs
def generate_documents(dataframe):
    for i, row in dataframe.iterrows():
        yield {
            "_index": "songs",
            "_id": i,
            "_source": row.to_dict()
        }

# Use the bulk helper to index songs
helpers.bulk(es, generate_documents(df))
# docker run --rm -p 9200:9200 -p 9300:9300 -e "xpack.security.enabled=false" -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.12.0
# Delete index 
# es.indices.delete(index="songs")