from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth

cred = credentials.Certificate('server/tddd27-gg-firebase-adminsdk-k0gde-8699c126f0.json')
firebase_admin.initialize_app(cred)

def index(request):
    return render(request, 'index.html')


def login(request):
    print("someone tries to login",request)
#   id_token = request.POST.get('idToken')
#   access_token = request.POST.get('accessToken')
#   try:
#     # Verify the ID token and get the user's information
#     decoded_token = auth.verify_id_token(id_token, check_revoked=True)
#     uid = decoded_token['uid']
#     email = decoded_token['email']

#     # Authenticate the user in Django and create a session
#     user = authenticate(request, uid=uid, email=email)
#     print(user)
#     #login(request, user)

#     return HttpResponse(status=200)

#   except auth.InvalidIdTokenError as e:
#     return HttpResponse(status=400, content='Invalid ID token')
