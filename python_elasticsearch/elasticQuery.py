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

    # Creating an ElasticSearch object using the 9200 localhost
    esObj = Elasticsearch("http://localhost:9200")


    # Building a response query based on the JSON input
    resp = esObj.search(
        index="songs", 
            query={
                "bool":{
                    "must":[
                            {"range": {"acousticness": {"gte": (jsonIn['accousticness']-0.05), "lte": (jsonIn['accousticness']+0.05)}}}
                    ]
                }
           }
    )

    return resp.body
