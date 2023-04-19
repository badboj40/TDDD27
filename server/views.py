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

cred = credentials.Certificate('server/tddd27-gg-firebase-adminsdk-k0gde-8699c126f0.json')
#authe = auth
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tddd27-gg-default-rtdb.europe-west1.firebasedatabase.app/'
})

firebaseConfig = {
  'apiKey': "AIzaSyDMsNwx5KzZKx5tdeh0FcT8yY_ckeZMliE",
  'authDomain': "tddd27-gg.firebaseapp.com",
  'projectId': "tddd27-gg",
  'storageBucket': "tddd27-gg.appspot.com",
  'messagingSenderId': "622087775650",
  'appId': "1:622087775650:web:cf7b13d091e47a9511fefb",
};

def index(request):
    website_name = db.reference('Data').child('Name').get()
    context = {
        "website_name":website_name
    }
    return render(request, 'index.html', context)

@api_view(["POST"])
def login(request):
    id_token = request.data['idToken']
    access_token = request.data['accessToken']
    uid = request.data['uid']
    email = request.data['email']

    # Verify the ID token and get the user's information (Doesn't seem to work with Firebase_admin because of time)
    #decoded_token = auth.verify_id_token(id_token, check_revoked=True)
    #uid = decoded_token['uid']
    #email = decoded_token['email']

    # Testing out Firebase Realtime Database, updating uid and email from null to the correct id
    ref = db.reference('Data')
    ref.update({'uid': uid})

    ref = db.reference('Data')
    ref.update({'email': email})


    # Authenticate the user in Django and create a session
    user = authenticate(request, uid=uid, email=email)
    #login(request, user)

    return Response({'result':id_token}, status=200)

@api_view(["POST"])
def search(request):
    search_query = request.POST.get('q', None)
    print(search_query)

def movies(request):
    pass

def get_csrf_token(request):
    return get_token(request)
