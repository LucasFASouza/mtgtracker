from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import GameView, UserView

urlpatterns = [
    path('token/', obtain_auth_token, name='api_token_auth'),
    path('users/', UserView.as_view()),
    path('games/', GameView.as_view()),
]