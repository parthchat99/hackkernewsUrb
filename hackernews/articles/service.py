# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from .utils import get_article_and_sentiments_from_db_or_hacker_news, \
    get_top_articles_id_from_hacker_news, get_top_articles_from_db
from .views import top_articles as view
from aylienapiclient import textapi
from django.views import View


class TopArticles(View):

    def post(self, request):
        params_dict = dict(request.POST)
        try:
            limit = int(params_dict.get('limit'))
        except:
            limit = 10

        try:
            offset = int(params_dict.get('offset'))
        except:
            offset = 0

        top_article_ids = get_top_articles_id_from_hacker_news()
        resp = get_article_and_sentiments_from_db_or_hacker_news(top_article_ids, limit=limit, offset=offset)
        if resp:
            return JsonResponse({'results': view(resp)})

        return JsonResponse({}, status=503)

    def get(self, request):
        params_dict = dict(request.GET)
        try:
            limit = int(params_dict.get('limit'))
        except:
            limit = 10

        try:
            offset = int(params_dict.get('offset'))
        except:
            offset = 0

        resp = get_top_articles_from_db(limit=limit, offset=offset)
        if resp:
            return JsonResponse({'results': view(resp)})
        return JsonResponse({}, status=503)
