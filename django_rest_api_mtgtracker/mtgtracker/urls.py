from django.urls import path 
from mtgtracker import views

# define the urls
urlpatterns = [
    path('games/', views.games),
    path('games/<int:pk>/', views.game_detail),
]