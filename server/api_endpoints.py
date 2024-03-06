from flask import Flask,request
from flask_cors import CORS
import sys
sys.path.append("app/LLama")
from LLama import llama_generator
sys.path.append("app/python_elasticsearch")
from python_elasticsearch import elasticQuery, esToSpotify


app = Flask(__name__)
CORS(app)

user_search_query = ""  

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']
    save_search_query(search_query)
    return search_query

# Runs the LLM Grammaer, elasticQuery, and converts to a spotify json response
def run_llm_esearch(search_query):

    jsonInput = llama_generator.generate_response(search_query, '/Users/jasonburghart87/Downloads/dolphin-2.2.1-mistral-7b.Q4_K_M.gguf', grammar_path="./grammars/grammar.gbnf")
    responseBody = elasticQuery.elasticQuery(jsonInput)
    spotify_json = esToSpotify.es_to_spotify(responseBody)

    return spotify_json

def save_search_query(search_query): 
    global user_search_query;
    user_search_query = search_query

# if __name__ == '__main__':
#     app.run()



resp = run_llm_esearch("Make me feel like honey")
print(resp)
