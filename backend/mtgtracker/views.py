from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 

from .models import Game, User
from .serializers import GameSerializer, UserSerializer

class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)

        return Response(serializer.data)
    
    def put(self, request, username):
        user = User.objects.get(username=username)
        serializer = UserSerializer(user, data=request.data)

        if request.user.id != user.id:
            return Response(status=403)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)
    
    def delete(self, request, username):
        user = User.objects.get(username=username)
        user.delete()

        return Response(status=204)

class GameView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        games = Game.objects.filter(user=request.user.id)
        serializer = GameSerializer(games, many=True)

        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id
        serializer = GameSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class GameDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        game = Game.objects.get(pk=pk)

        if request.user.id != game.user.id:
            return Response(status=403)
        
        serializer = GameSerializer(game)

        return Response(serializer.data)

    def put(self, request, pk):
        request.data['user'] = request.user.id

        game = Game.objects.get(pk=pk)

        if request.user.id != game.user.id:
            return Response(status=403)
        
        serializer = GameSerializer(game, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        game = Game.objects.get(pk=pk)

        if request.user.id != game.user.id:
            return Response(status=403)
        
        game.delete()

        return Response(status=204)