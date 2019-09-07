
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from . import service

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('top-articles/', service.TopArticles.as_view()),
]
