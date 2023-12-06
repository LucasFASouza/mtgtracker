from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from .models import Game
from .serializers import GameSerializer

class GameView(APIView):
    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        print(f"\n\n\nrequest.data: {serializer}\n\n\n")
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
