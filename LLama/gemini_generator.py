from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from elasticsearch import Elasticsearch, helpers
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json

GOOGLE_API_KEY="AIzaSyAB1MXhSKFdoCgybzwo5OaykMmxtr_yhMM"

examples = [
    {"question": "I want a song that makes me feel like I'm walking through the forest at midnight", "query": """
{{
  "size": 30,
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"acousticness": {{"gte": 0.5}}}}}},
        {{"range": {{"energy": {{"lte": 0.3}}}}}},
        {{"range": {{"instrumentalness": {{"gte": 0.7}}}}}}
      ]
    }}
  }}
}}
"""},  
    {"question": "I want a song that sounds like a rainy day.", "query": """
{{
  "size": 30,
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"acousticness": {{"gte": 0.5}}}}}},
        {{"range": {{"energy": {{"lte": 0.3}}}}}},
        {{"range": {{"instrumentalness": {{"gte": 0.7}}}}}}
      ]
    }}
  }}
}}
"""},  
    {"question": "Give me a track that's perfect for a road trip under the stars.", "query": """
{{
  "size": 30,
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"energy": {{"gte": 0.5}}}}}},
        {{"range": {{"valence": {{"gte": 0.5}}}}}},
        {{"range": {{"danceability": {{"gte": 0.5}}}}}}
      ]
    }}
  }}
}}
"""},
    {"question": "I need a powerful motivational speech", "query": """
{{
  "size": 30,
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"speechiness": {{"gte": 0.66}}}}}}
      ]
    }}
  }}
}}
"""} 
]

example_template = """
Question: {question}
ESQuery: {query}
"""

example_prompt = PromptTemplate(
    input_variables=["question", "query"],
    template=example_template
)

prefix="""
The Spotify database allows searching by Acousticness, Artist Name, Danceability, Energy, Instrumentalness, Liveness, Popularity, Speechiness, Time Signature, and Valence. Use these columns to construct your queries.

Given an input question, create a syntactically correct Elasticsearch query that maps the prompt to the columns of the Spotify database. Unless the user specifies a specific number of examples in their question, limit the query to at most 30 results and only use term instead of match.


"accousticness": Probablilty that the prompt is an acoustic song, [0.0, 1.0].
"artist_name": The name of the artist singing a song. This should be in all lowercase.
"danceability": How likely the prompt wants to dance to the music, [0.0, 1.0].
"energy": How energetic the song is, [0.0, 1.0].
"instrumentalness": Predict if the prompted track has no vocals. 0 being completely spoken and 1 being no vocals, [0.0, 1.0].
"liveness": How likely the song is performed live, [0.0, 1.0].
"loudness": How loud the song the prompt is describing is in decibels, [-60,0]db.
"speechiness": How much talking should be in the song described from the prompt. <0.33 tracks that are non-speech like, [0.33- 0.66: contains music and speech, >0.66: made entirely of spoken words].
"time_signature": The estimated time signature of the prompt, [3, 7](indicating time signatures of "3/4", to "7/4").
"valence": How happy or sad the song sounds, [0.0, 1.0].



Only query for the few relevant columns given the question. The query should be a valid JSON object.
"""

few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix=prefix,
    suffix="Question: {question}\nESQuery:",
    input_variables=["question"],
    example_separator="\n\n",
)

# initialize gemini
llm=ChatGoogleGenerativeAI(model="gemini-1.0-pro", google_api_key=GOOGLE_API_KEY)

# create gemini query generator chain
query_chain = LLMChain(llm=llm, prompt=few_shot_prompt)

def generate_response(prompt):
    model_output = query_chain.invoke(prompt)

    # Convert output to JSON
    # return json.loads(model_output["text"].strip())
    query_dict = json.loads(model_output["text"].strip())
    return query_dict

    # send one row from the database, send a query that doesn't work
    
#This function takes an Elasticsearch query output and queries the Spotify API to return track information
def es_to_spotify(esResult):
    print(esResult)

    #API access
    client_id = "d89adefdd65649179d78f7f8be8f54ba"
    client_secret = "7daa071f5b7a4d7894ec8155123b451b"

    #Create Spotify object
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))


    #Use elements from response for Spotify query
    es_artist_name = esResult['artist_name']
    es_track_name = esResult['track_name']
    es_release_date = esResult['release_date']

    #Query Spotify for track information
    query = f"artist:{es_artist_name} track:{es_track_name} year:{es_release_date}"
    result = sp.search(q=query, type="track")
    print(result)


    if len(result['tracks']['items']) != 0:
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
      print(spotify_dict)

      spotify_json = json.dumps(spotify_dict)

      #print(spotify_json)
      return spotify_json
    else:
        return json.dumps({})

def main():
    es = Elasticsearch("http://localhost:9200")

    prompt = input("Enter a prompt:\n")
    query_dict = generate_response(prompt)
    print("Model Output:\n")
    # print(json_string)
    print(query_dict)

    response = es.search(index="songs", body=query_dict)
    # Extract the hits from the Elasticsearch response
    hits = response['hits']['hits']
    # Convert hits to a list of source documents (assuming you want the _source field)
    songs_returned = [hit['_source'] for hit in hits]

    print(songs_returned)

    spotify_output = [es_to_spotify(song) for song in songs_returned]

    print(spotify_output)


if __name__ == "__main__":
    main()
