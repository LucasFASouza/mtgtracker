from django.urls import path
from .views import GameView

urlpatterns = [
    path('games/', GameView.as_view()),
]