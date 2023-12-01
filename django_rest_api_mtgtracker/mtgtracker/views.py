from django.shortcuts import render

from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .serializers import GameSerializer
from .models import Game

@csrf_exempt
def games(request):
    '''
    List all game snippets
    '''
    if(request.method == 'GET'):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)

        return JsonResponse(serializer.data,safe=False)
    
    elif(request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = GameSerializer(data=data)

        if(serializer.is_valid()):
            serializer.save()

            return JsonResponse(serializer.data, status=201)
        
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def game_detail(request, pk):
    try:
        task = Game.objects.get(pk=pk)
    except:
        return HttpResponse(status=404)
    
    if(request.method == 'PUT'):
        data = JSONParser().parse(request)  
        serializer = GameSerializer(task, data=data)

        if(serializer.is_valid()):  
            serializer.save() 

            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    elif(request.method == 'DELETE'):
        task.delete() 

        return HttpResponse(status=204) 