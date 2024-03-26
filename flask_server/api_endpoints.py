from flask import Flask,request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch
from LLama.gemini_generator import generate_response


app = Flask(__name__)
CORS(app)

es = Elasticsearch("http://elasticsearch:9200")

user_search_query = ""  

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']

    # Genereate Elasticsearch query using Gemini generator
    es_query = generate_response(search_query)

    save_search_query(search_query)
    return jsonify({
        "user_query": search_query,
        "es_query": es_query
    })

def save_search_query(search_query): 
    global user_search_query
    user_search_query = search_query

if __name__ == '__main__':
    app.run()