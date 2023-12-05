from django.urls import path
from . import views

urlpatterns = [
    path('games/new/', views.create_a_new_game, name='create_a_new_game'),
    path('games/', views.get_all_games, name='get_all_games'),
    path('games/<int:game_id>/', views.get_game_by_id, name='get_game_by_id'),
    path('games/patch/<int:game_id>/', views.update_game_by_id, name='update_game_by_id'),
    path('games/delete/<int:game_id>/', views.delete_game_by_id, name='delete_game_by_id'),
]