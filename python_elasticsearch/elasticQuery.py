# Constructs a definition that will query the index database from a LLM JSON output


import pandas as pd
from elasticsearch import Elasticsearch, helpers
import json
import sys

# Note: JSON inputs must be strings in the following form
# ' {} '
# where the query values are within the brackets

# the following is an example: 
# '{ "bool": {"must": {"match_phrase": {"artist_name": "taylor swift"}}}}'
# the index and query structure is already referenced below
# all that is needed is the specific query type



# Takes in a json output as string from LLM and outputs the search response body
def elasticQuery(jsonIn):

    # Parsing the JSON
    jsonPar = json.loads(jsonIn)

    # Creating an ElasticSearch object using the 9200 localhost
    esObj = Elasticsearch("http://localhost:9200")


    # Building a response query based on the JSON input
    resp = esObj.search(
        index="songs", 
            query={
                "bool":{
                    "filter":[{
                        "bool":{
                            "should":[{"range": {"acousticness": {"gte": (jsonPar['accousticness']-0.05), "lte": (jsonPar['accousticness']+0.05)}}}]
                            # "should":[{"range": {"danceability": {"gte": (jsonPar['danceability']-0.05), "lte": (jsonPar['danceability']+0.05)}}}]
                            # "should":[{"range": {"energy":{"gte": (jsonPar['energy']-0.05), "lte": (jsonPar['energy']+0.05)}}}],
                            # "should":[{"range": {"instrumentalness": {"gte": (jsonPar['instrumentalness']-0.05), "lte": (jsonPar['instrumentalness']+0.05)}}}],
                            # "should":[{"range": {"loudness": {"gte": (jsonPar['loudness']-0.05), "lte": (jsonPar['loudness']+0.05)}}}],
                            # "should":[{"range": {"valence": {"gte": (jsonPar['valence']-0.05), "lte": (jsonPar['valence']+0.05)}}}]
                        },
                        "bool": {
                            "should":[{"range": {"danceability": {"gte": (jsonPar['danceability']-0.05), "lte": (jsonPar['danceability']+0.05)}}}]
                        }
                    }]
                }
           }
    )
    return resp.body

resp = elasticQuery(sys.argv[1])
print(resp)
 


# '{"accousticness":0.5,"danceability":0.4,"energy":0.6,"instrumentalness":0.7,"loudness":0.12,"valence":0.3}'