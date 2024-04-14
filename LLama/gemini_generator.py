from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from elasticsearch import Elasticsearch, helpers
import json

GOOGLE_API_KEY="AIzaSyAB1MXhSKFdoCgybzwo5OaykMmxtr_yhMM"

examples = [
    {"question": "I'm looking for a Math Rock song with intricate guitar work.", "query": """
{{
  "size": 10, 
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"valence": {{"gte": 0.6, "lte": 0.8}}}}}},
        {{"range": {{"danceability": {{"gte": 0.6, "lte": 0.8}}}}}},
        {{"range": {{"energy": {{"gte": 0.6, "lte": 0.8}}}}}},
        {{"range": {{"acousticness": {{"gte": 0.1, "lte": 0.3}}}}}},
        {{"range": {{"instrumentalness": {{"gte": 0, "lte": 0.1}}}}}}
      ]
    }}
  }}
}}
"""},  
    {"question": "I’m looking for a song that embodies the warmth and comfort of returning home.", "query": """
{{
  "size": 10,
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"valence": {{"gte": 0.8, "lte": 1.0}}}}}},
        {{"range": {{"energy": {{"gte": 0.6, "lte": 0.8}}}}}},
        {{"range": {{"danceability": {{"gte": 0.7, "lte": 0.9}}}}}},
        {{"range": {{"acousticness": {{"gte": 0.1, "lte": 0.3}}}}}}
      ]
    }}
  }}
}}
"""},  
    {"question": "I’m looking for a song that uses a city's name in its lyrics.", "query": """
{{
  "size": 10,
  "query": {{
    "match": {{
      "lyrics": {{
        "query": "New York Paris London",
        "operator": "or"
      }}
    }}
  }}
}}
"""},  
    {"question": "Find a song that's inspired by a book or a movie.", "query": """
{{
  "size": 10,
  "query": {{
    "bool": {{
      "should": [
        {{"match": {{"lyrics": "Harry Potter"}}}},
        {{"match": {{"lyrics": "Lord of the Rings"}}}}
      ],
      "minimum_should_match": 1
    }}
  }}
}}
"""},  
    {"question": "Find me a track that feels like the first chill of winter.", "query": """
{{
  "size": 10, 
  "query": {{
    "bool": {{
      "must": [
        {{"range": {{"valence": {{"gte": 0.1, "lte": 0.3}}}}}},
        {{"range": {{"danceability": {{"gte": 0.2, "lte": 0.4}}}}}},
        {{"range": {{"energy": {{"gte": 0.9, "lte": 1}}}}}},
        {{"range": {{"acousticness": {{"gte": 0.6, "lte": 0.8}}}}}},
        {{"range": {{"instrumentalness": {{"gte": 0, "lte": 0.1}}}}}}
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
The Spotify database allows searching by artist_name, track_name, lyrics, acousticness, danceability, energy, instrumentalness, and valence (happiness). Use these columns to construct your queries.

Given an input question, create a syntactically correct Elasticsearch query that maps the prompt to the columns of the Spotify database. Unless the user specifies a specific number of examples in their question, limit the query to at most 30 results and only use term instead of match.

"accousticness": Probablilty that the prompt is an acoustic song, [0.0, 1.0].
"danceability": How likely the prompt wants to dance to the music, [0.0, 1.0].
"energy": How energetic the song is, [0.0, 1.0].
"instrumentalness": Predict if the prompted track has no vocals. 0 being completely spoken and 1 being no vocals, [0.0, 1.0].
"liveness": How likely the song is performed live, [0.0, 1.0].
"loudness": How loud the song the prompt is describing is in decibels, [0,1].
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

if __name__ == "__main__":
    main()
