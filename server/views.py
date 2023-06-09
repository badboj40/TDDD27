from django.shortcuts import render
from django.middleware.csrf import get_token

from rest_framework.response import Response
from rest_framework.decorators import api_view

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import db

import requests
import math

cred = credentials.Certificate(
    'server/tddd27-gg-firebase-adminsdk-k0gde-8699c126f0.json')

firebaseConfig = {
    'apiKey': "AIzaSyDMsNwx5KzZKx5tdeh0FcT8yY_ckeZMliE",
    'authDomain': "tddd27-gg.firebaseapp.com",
    'projectId': "tddd27-gg",
    'storageBucket': "tddd27-gg.appspot.com",
    'messagingSenderId': "622087775650",
    'appId': "1:622087775650:web:cf7b13d091e47a9511fefb",
    'databaseURL': 'https://tddd27-gg-default-rtdb.europe-west1.firebasedatabase.app/'
}

app = firebase_admin.initialize_app(cred, firebaseConfig)

movie_db_headers = {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "b41f441a44msh205258985fa3fd0p162968jsna501ac32a342",
    "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com"
}

streaming_headers = {
    "X-RapidAPI-Key": "b41f441a44msh205258985fa3fd0p162968jsna501ac32a342",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
}


def index(request):
    website_name = db.reference('Data').child('Name').get()
    context = {
        "website_name": website_name
    }
    return render(request, 'index.html', context)


@api_view(["GET"])
def home(request, page):
    result = {}
    search_page = math.ceil(page/5)
    slice_start = (page-1) % 5 * 10
    slice_end = slice_start + 10

    if search_page == 1:
        url = f"https://moviesminidatabase.p.rapidapi.com/movie/order/byPopularity/"
    else:
        url = f"http://moviesminidatabase.p.rapidapi.com/movie/order/byPopularity/?page={search_page}"


    data = requests.get(url=url, headers=movie_db_headers).json()

    movie_list = data["results"]
    count = data["count"]

    movie_list = movie_list[slice_start:slice_end]

    for movie in movie_list:
        id_search_url = "https://moviesminidatabase.p.rapidapi.com/movie/id/" + \
            movie["imdb_id"] + "/"

        result[movie["imdb_id"]] = requests.get(
            url=id_search_url, headers=movie_db_headers).json()["results"]
    

    return Response({"result": result, "count": count})


@api_view(["GET"])
def browse(request, genre, page):
    result = {}
    search_page = math.ceil(page/5)
    slice_start = (page-1) % 5 * 10
    slice_end = slice_start + 10

    if search_page == 1:
        url = f"https://moviesminidatabase.p.rapidapi.com/movie/byGen/{genre}/"
    else:
        url = f"https://moviesminidatabase.p.rapidapi.com/movie/byGen/{genre}/?page={search_page}"

    data = requests.get(
        url=url, headers=movie_db_headers).json()

    movie_list = data["results"]
    count = data["count"]

    movie_list = movie_list[slice_start:slice_end]

    for movie in movie_list:
        id_search_url = "https://moviesminidatabase.p.rapidapi.com/movie/id/" + \
            movie["imdb_id"] + "/"

        result[movie["imdb_id"]] = requests.get(
            url=id_search_url, headers=movie_db_headers).json()["results"]

    return Response({"result": result, "count": count})


@api_view(["GET"])
def genres(request):
    result = []
    url = "https://moviesminidatabase.p.rapidapi.com/genres/"

    for genre in requests.get(url=url, headers=movie_db_headers).json()["results"]:
        result.append(genre["genre"])

    sorted_genres = sorted(result)

    return Response(sorted_genres)


@api_view(["POST"])
def login(request):
    # Verify the ID token and get the user's information
    id_token = request.data['idToken']
    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    uid = decoded_token['uid']
    email = decoded_token['email']
    displayName = decoded_token['name']

    # Provide uid and add email and displayname to it
    ref = db.reference('Users').child(uid)
    ref.update({'email': email})
    ref.update({'displayName': displayName})

    watchlist = wl if (wl := ref.child('watchlist').get()) else {}
    seenlist = sl if (sl := ref.child('seenlist').get()) else {}
    return Response({'uid': uid, 'watchlist': watchlist, 'seenlist': seenlist}, status=200)


@api_view(["GET"])
def search(request, search_term):
    result = {}

    search_url = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + \
        search_term + "/"

    for movie in requests.get(url=search_url, headers=movie_db_headers).json()["results"]:
        id_search_url = "https://moviesminidatabase.p.rapidapi.com/movie/id/" + \
            movie["imdb_id"] + "/"

        result[movie["imdb_id"]] = requests.get(
            url=id_search_url, headers=movie_db_headers).json()["results"]
    return Response(result)


@api_view(["POST"])
def add_watchlist_item(request):
    id_token = request.META.get('HTTP_AUTHORIZATION')

    if not id_token:
        return Response({'error': "No authentication token."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not request.data.get('movie'):
        return Response({'error': "Movie was not found."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('watchlist')
    ref.update({request.data['movie'][0]: request.data['movie'][1]})

    return Response({'result': "POST"}, status=200)


@api_view(["DELETE"])
def remove_watchlist_item(request, movie_id):
    id_token = request.META.get('HTTP_AUTHORIZATION')

    if not id_token:
        return Response({'error': "No authentication token."}, status=401)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not movie_id:
        return Response({'error': "You don't have this movie in your watchlist."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('watchlist')
    ref.child(movie_id).delete()

    return Response({'result': "DELETE"}, status=200)


@api_view(["POST"])
def add_seenlist_item(request):
    id_token = request.META.get('HTTP_AUTHORIZATION')

    if not id_token:
        return Response({'error': "No authentication token."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not request.data.get('movie'):
        return Response({'error': "Movie was not found."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('seenlist')
    ref.update({request.data['movie'][0]: request.data['movie'][1]})

    return Response({'result': "POST"}, status=200)


@api_view(["DELETE"])
def remove_seenlist_item(request, movie_id):
    id_token = request.META.get('HTTP_AUTHORIZATION')

    if not id_token:
        return Response({'error': "No authentication token."}, status=401)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not movie_id:
        return Response({'error': "You don't have this movie in your watchlist."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('seenlist')
    ref.child(movie_id).delete()

    return Response({'result': "DELETE"}, status=200)


@api_view(["GET"])
def get_streaming_service(request, movie_title, movie_id):
    ref = db.reference('Data').child('streamingServices')
    services = {}

    params = {"title": movie_title,
              "country": "se", "show_type": "movie"}

    url = "https://streaming-availability.p.rapidapi.com/v2/search/title"

    if ref.child(movie_id).get() is not None:
        services = ss if (ss := ref.child(movie_id).get()) else {}
    else:
        for movie in requests.get(url=url, headers=streaming_headers, params=params).json()["result"]:
            # TODO: Sometimes this if-statement is wrong, like Harry Potter I
            # if movie["title"] == movie_title:
            try:
                services = movie["streamingInfo"]["se"]
            except:
                try:
                    services = movie["streamingInfo"]["us"]
                except:
                    pass
            finally:
                movieId = movie["imdbId"]
                ref.update({movieId: services})
                break

    return Response({'title': movie_title, 'services': services}, status=200)


def get_csrf_token(request):
    return get_token(request)
