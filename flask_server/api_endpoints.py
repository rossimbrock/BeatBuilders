from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_search_query = ""  

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']
    save_search_query(search_query)
    return search_query

def save_search_query(search_query): 
    global user_search_query;
    user_search_query = search_query

if __name__ == '__main__':
    app.run()