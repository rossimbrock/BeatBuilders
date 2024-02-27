from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    data = request.get_json()
    search_query = data['search_data']
    print(search_query)
    return search_query

if __name__ == '__main__':
    app.run()