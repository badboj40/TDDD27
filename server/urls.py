from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin', admin.site.urls),
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('account', views.index, name='index'),
]
