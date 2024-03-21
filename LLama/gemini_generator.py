from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

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
The Spotify database allows searching by Acousticness, Danceability, Energy, Instrumentalness, Liveness, Popularity, Speechiness, Time Signature, and Valence. Use these columns to construct your queries.

Given an input question, create a syntactically correct Elasticsearch query that maps the prompt to the columns of the Spotify database. Unless the user specifies a specific number of examples in their question, limit the query to at most 30 results and only use term instead of match.


"accousticness": Probablilty that the prompt is an acoustic song, [0.0, 1.0].
"danceability": How likely the prompt wants to dance to the music, [0.0, 1.0].
"energy": How energetic the song is, [0.0, 1.0].
"instrumentalness": Predict if the prompted track has no vocals. 0 being completely spoken and 1 being no vocals, [0.0, 1.0].
"liveness": How likely the song is performed live, [0.0, 1.0].
"loudness": How loud the song the prompt is describing is in decibels, [-60,0]db.
"popularity": Percentile of popularity of the prompt, [0.0, 1.0].
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
    return model_output["text"].strip()


def main():
    prompt = input("Enter a prompt:\n")

    json = generate_response(prompt)
    print("Model Output:\n")
    print(json)


if __name__ == "__main__":
    main()