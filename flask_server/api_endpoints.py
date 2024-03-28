from flask import Flask,request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch
from LLama.gemini_generator import generate_response
import traceback
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)

es = Elasticsearch("http://elasticsearch:9200")

# Error handler
@app.errorhandler(Exception)
def handle_exception(e):
    # Pass through HTTP errors
    if isinstance(e, HTTPException):
        return e
    
    # For non-HTTP exceptions, return a JSON response with the error details
    return jsonify(error=str(e), traceback=traceback.format_exc()), 500

user_search_query = ""  

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']
    # print(f"Search query: {search_query}")

    # Genereate Elasticsearch query using Gemini generator
    es_query = generate_response(search_query)
    # print(f"Elasticsearch query: {es_query}") 

    # run query on database, convert hits to list of source documents
    response = es.search(index="songs", body=es_query)
    hits = response['hits']['hits']
    songs_returned = [hit['_source'] for hit in hits]

    # print(f"Songs found: {songs_returned}")


    save_search_query(search_query)
    return jsonify({
        "user_query": search_query,
        "es_query": es_query,
        "songs_returned": songs_returned
    })

def save_search_query(search_query): 
    global user_search_query
    user_search_query = search_query

if __name__ == '__main__':
    app.run()