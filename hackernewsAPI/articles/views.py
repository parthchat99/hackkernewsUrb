
def top_articles(articles):
    return [{
        'id':article.get('id'),
        'userName': article.get('by'),
        'title': article.get('title'),
        'url': article.get('url'),
        'upVote': article.get('score'),
        'sentiment': article.get('sentiment'),
    } for article in articles]

