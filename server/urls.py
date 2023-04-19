from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
#import core.views as core

urlpatterns = [
    path('', views.index, name='index'),
    #path('account', views.index, name='index'),
    path('login', views.login, name="login"),
    #path('movies', views.movies, name='movies'),
    #path('movies/search/', views.search, name='search'),
    #path('watchlist', views.index, name='index'),
    #path('signout', views.index, name="index"),
]

#TODO: A urlpatterns += catch all?
#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
