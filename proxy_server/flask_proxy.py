
from flask import Flask,request, jsonify
from flask_cors import CORS
import traceback
from werkzeug.exceptions import HTTPException
import requests


app = Flask(__name__)
CORS(app)

# Error handler
@app.errorhandler(Exception)
def handle_exception(e):
    # Pass through HTTP errors
    if isinstance(e, HTTPException):
        return e
    
    # For non-HTTP exceptions, return a JSON response with the error details
    return jsonify(error=str(e), traceback=traceback.format_exc()), 500

user_search_query = ""  

@app.route('/flaskProxy', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']
    save_search_query(search_query)
    return jsonify({
        "user_query": search_query,
    })

def save_search_query(search_query): 
    global user_search_query
    user_search_query = search_query

def query_deezer_api(search_query):
    url = "https://api.deezer.com/search"
    params = {'q': search_query}
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to get data from Deezer API', 'status_code': response.status_code}), response.status_code
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()