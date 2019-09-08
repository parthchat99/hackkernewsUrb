import json
import requests
from .models import Articles, ArticlesUser, Sentiment

from aylienapiclient import textapi
def get_top_articles_id_from_hacker_news():
    SOURCE_URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
    resp = requests.get(SOURCE_URL)
    top_article_ids = json.loads(resp._content)
    return top_article_ids


def get_sentiment_of_title(title):
    client = textapi.Client("f51b38de", "0ec719f04ee25478cfc491c3ad12e96c")
    s = client.Sentiment({'text': title})
    return s.get('polarity')


def get_article_and_sentiments_from_db_or_hacker_news(article_id_list, offset=0, limit=10):
    articles = []
    for article_id in article_id_list[offset:(limit + offset)]:
        db_article = Articles.objects.filter(hacker_news_id=article_id).select_related('user').first()
        if db_article:
            articles.append({
                'id': db_article.pk,
                'userName': db_article.user.username,
                'title': db_article.title,
                'url': db_article.url,
                'upVote': db_article.up_vote,
                'sentiment': [x.sentiment for x in db_article.sentiment.all()]
            })

        ARTICLE_SOURCE_URL = 'https://hacker-news.firebaseio.com/v0/item/{}.json'
        resp = requests.get(ARTICLE_SOURCE_URL.format(article_id))
        article_dict = json.loads(resp._content)
        title = article_dict.get('title')
        if title:
            sentiment = get_sentiment_of_title(title)
            article_dict.update({'sentiment': sentiment})
        user = ArticlesUser.objects.filter(username=article_dict.get('by')).first()
        if not user:
            user = ArticlesUser.objects.create(username=article_dict.get('by'))
        sentiment = Sentiment.objects.filter(sentiment=article_dict.get('sentiment')).first()
        if not sentiment:
            sentiment = Sentiment.objects.create(sentiment=article_dict.get('sentiment'))
        article = Articles.objects.create(hacker_news_id=article_id, user=user,
                                          title=article_dict.get('title'), url=article_dict.get('url'),
                                          up_vote=article_dict.get('score'),
                                          )
        sentiment.sentiment_field.add(article)
        articles.append(article_dict)
    return articles


def get_top_articles_from_db(offset=0, limit=10):
    return [{
        'id': db_article.pk,
        'userName': db_article.user.username,
        'title': db_article.title,
        'url': db_article.url,
        'upVote': db_article.up_vote,
        'sentiment': [x.sentiment for x in db_article.sentiment.all()]
    } for db_article in Articles.objects.order_by('up_vote').all()[offset:(offset + limit)]]
