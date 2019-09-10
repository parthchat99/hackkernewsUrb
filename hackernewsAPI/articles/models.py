# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib import admin


class Sentiment(models.Model):
    choice = [
        ('positive', 'POSITIVE'),
        ('negative', 'NEGATIVE'),
        ('neutral', 'NEUTRAL'),
    ]
    sentiment = models.CharField(max_length=128, choices=choice)

    def __unicode__(self):
        return self.sentiment


class ArticlesUser(models.Model):
    username = models.TextField()

    def __unicode__(self):
        return self.username



class Articles(models.Model):
    hacker_news_id = models.IntegerField(blank=True)
    user = models.ForeignKey(ArticlesUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=512)
    url = models.URLField()
    up_vote = models.IntegerField()
    sentiment = models.ManyToManyField(Sentiment ,related_name='sentiment_field')

    def __unicode__(self):
        return self.title


admin.site.register(ArticlesUser)
admin.site.register(Sentiment)
admin.site.register(Articles)
