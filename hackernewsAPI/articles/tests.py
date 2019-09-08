import requests
from django.shortcuts import render
# from .models import News
from aylienapiclient import textapi
import json


# Create your views here.
def index():
    url = 'https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty'

    urlTop = "https://hacker-news.firebaseio.com/v0/topstories.json"
    resp = requests.get(urlTop)
    top_articles_id = json.loads(resp._content)

    resp = requests.get(url.format(top_articles_id[0]))
    # from title show setiment
    # store them
