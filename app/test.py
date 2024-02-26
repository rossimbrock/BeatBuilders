from flask import Flask,request

app = Flask(__name__)

@app.route('/searchQuery', methods = ['POST'])
def process_search_data(): 
    search_query = request.form.get('search_data')
    print(search_query)
    return search_query