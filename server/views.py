from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token

from rest_framework.response import Response
from rest_framework.decorators import api_view

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import db

import requests

cred = credentials.Certificate(
    'server/tddd27-gg-firebase-adminsdk-k0gde-8699c126f0.json')
# authe = auth
app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tddd27-gg-default-rtdb.europe-west1.firebasedatabase.app/'
})

firebaseConfig = {
    'apiKey': "AIzaSyDMsNwx5KzZKx5tdeh0FcT8yY_ckeZMliE",
    'authDomain': "tddd27-gg.firebaseapp.com",
    'projectId': "tddd27-gg",
    'storageBucket': "tddd27-gg.appspot.com",
    'messagingSenderId': "622087775650",
    'appId': "1:622087775650:web:cf7b13d091e47a9511fefb",
}

headers = {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "b41f441a44msh205258985fa3fd0p162968jsna501ac32a342",
    "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com"
}


def index(request):
    website_name = db.reference('Data').child('Name').get()
    context = {
        "website_name": website_name
    }
    return render(request, 'index.html', context)


@api_view(["POST"])
def login(request):
    # Verify the ID token and get the user's information
    id_token = request.data['idToken']
    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    # print("decoded", decoded_token)
    uid = decoded_token['uid']
    email = decoded_token['email']
    displayName = decoded_token['name']

    # Provide uid and add email and displayname to it
    ref = db.reference('Users').child(uid)
    ref.update({'email': email})
    ref.update({'displayName': displayName})

    watchlist = wl if (wl:=ref.child('watchlist').get()) else {}
    seenlist = sl if (sl:=ref.child('seenlist').get()) else {}
    print("watchlist:\n", watchlist)
    print("seenlist:\n", seenlist)
    return Response({'uid': uid, 'watchlist': watchlist, 'seenlist': seenlist}, status=200)


@api_view(["GET"])
def search(request, search_term):
    result = {}
    # search_query = request.data['q']
    ref = db.reference('Data')
    ref.update({'searchQuery': search_term})

    search_url = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + \
        search_term + "/"

    for movie in requests.get(url=search_url, headers=headers).json()["results"]:
        id_search_url = "https://moviesminidatabase.p.rapidapi.com/movie/id/" + \
            movie["imdb_id"] + "/"

        result[movie["imdb_id"]] = requests.get(url=id_search_url, headers=headers).json()["results"]
    return Response(result)


@api_view(["POST"])
def movies(request):
    pass


@api_view(["POST"])
def add_watchlist_item(request):
    id_token = request.data['idToken']
    if not id_token:
        return Response({'error': "No authentication token."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not request.data.get('movie'):
        return Response({'error': "Movie was not found."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('watchlist')
    print(request.data['movie'])
    ref.update({request.data['movie']['imdb_id']: request.data['movie']})


    return Response({'result': "POST"}, status=200)


@api_view(["DELETE"])
def remove_watchlist_item(request, movie_id):

    # id_token = request.headers.get("Authentication")
    id_token = request.META.get('HTTP_AUTHORIZATION')
    # print(id_token)

    if not id_token:
        return Response({'error': "No authentication token."}, status=401)

    if not movie_id:
        return Response({'error': "You don't have this movie in your watchlist."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    ref = db.reference('Users').child(decoded_token['uid']).child('watchlist')
    ref.child(movie_id).delete()

    return Response({'result': "DELETE"}, status=200)

@api_view(["POST"])
def add_seenlist_item(request):
    id_token = request.data['idToken']
    if not id_token:
        return Response({'error': "No authentication token."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    if not request.data.get('movie'):
        return Response({'error': "Movie was not found."}, status=404)

    ref = db.reference('Users').child(decoded_token['uid']).child('seenlist')
    print(request.data['movie'])
    ref.update({request.data['movie']['imdb_id']: request.data['movie']})


    return Response({'result': "POST"}, status=200)


@api_view(["DELETE"])
def remove_seenlist_item(request, movie_id):

    # id_token = request.headers.get("Authentication")
    id_token = request.META.get('HTTP_AUTHORIZATION')
    # print(id_token)

    if not id_token:
        return Response({'error': "No authentication token."}, status=401)

    if not movie_id:
        return Response({'error': "You don't have this movie in your watchlist."}, status=404)

    decoded_token = auth.verify_id_token(id_token, check_revoked=True)

    ref = db.reference('Users').child(decoded_token['uid']).child('seenlist')
    ref.child(movie_id).delete()

    return Response({'result': "DELETE"}, status=200)


# @api_view(["GET"])
# def is_in_watchlist(request, movie_id):
#     # TODO: Break out authentication part to separate function (do not place the function in this file)
#     id_token = request.META.get('HTTP_AUTHORIZATION')
#     #print(id_token)

#     if not id_token:
#         return Response({'error': "No authentication token."}, status=401)

#     if not movie_id:
#         return Response({'error': "You don't have this movie in your watchlist."}, status=404)

#     decoded_token = auth.verify_id_token(id_token, check_revoked=True)

#     if not db.reference('Users').child(decoded_token['uid']).child('watchlist').get(movie_id):
#         return Response({'result': False}, status=200)

#     return Response({'result': True}, status=200)


def get_csrf_token(request):
    return get_token(request)
