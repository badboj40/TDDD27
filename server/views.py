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
    id_token = request.data['idToken']
    decoded_token = auth.verify_id_token(id_token, check_revoked=True)
    uid = request.data['uid']
    email = request.data['email']
    display_name = request.data['displayName']

    # Verify the ID token and get the user's information (Doesn't seem to work with Firebase_admin because of time)

    print("decoded", decoded_token)
    # uid = decoded_token['uid']
    # email = decoded_token['email']

    # Provide uid and add email and displayname to it
    ref = db.reference(uid)
    ref.update({'email': email})
    ref.update({'displayName': display_name})

    # Authenticate the user in Django and create a session
    user = authenticate(request, uid=uid, email=email)
    # login(request, user)

    return Response({'result': uid}, status=200)


@api_view(["GET"])
def search(request, search_term):
    result = []
    # search_query = request.data['q']
    ref = db.reference('Data')
    ref.update({'searchQuery': search_term})

    search_url = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + \
        search_term + "/"

    for movie in requests.get(url=search_url, headers=headers).json()["results"]:
        id_search_url = "https://moviesminidatabase.p.rapidapi.com/movie/id/" + \
            movie["imdb_id"] + "/"
        result.append(requests.get(url=id_search_url, headers=headers).json())
    return Response(result)


@api_view(["POST"])
def movies(request):
    pass


@api_view(["POST", "DELETE"])
def update_watchlist(request):
    #ref = db.reference(uid)
    if request.method == "POST":
        return Response({'result': "POST"}, status=200)
    elif request.method == "DELETE":
        return Response({'result': "DELETE"}, status=200)


def get_csrf_token(request):
    return get_token(request)
