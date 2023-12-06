from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 

from .models import Game
from .serializers import GameSerializer, UserSerializer

class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

class GameView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)

        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id

        serializer = GameSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
