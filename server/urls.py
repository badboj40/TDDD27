from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
# import core.views as core

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.home, name='home'),
    path('account', views.index, name='index'),
    path('login', views.login, name="login"),
    path('movies/search/<str:search_term>', views.search, name='search'),
    path('addWatchlistItem', views.add_watchlist_item, name="add_watchlist_item"),
    path('removeWatchlistItem/<str:movie_id>',
         views.remove_watchlist_item, name="remove_watchlist_item"),
    path('addSeenlistItem', views.add_seenlist_item, name="add_seenlist_item"),
    path('removeSeenlistItem/<str:movie_id>',
         views.remove_seenlist_item, name="remove_seenlist_item"),
    path('getStreamingService/<str:movie_title>/<str:movie_id>',
         views.get_streaming_service, name="get_streaming_service"),

    # path('signout', views.index, name="index"),
]
