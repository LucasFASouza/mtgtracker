from rest_framework import routers,serializers,viewsets
from .models import Game

class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = [
            'your_deck',
            'opp_deck',
            'season',
            'tournament',
            'notes',
            'started_play',
            'result_g1',
            'result_g2',
            'result_g3',
            'mulligans_g1',
            'mulligans_g2',
            'mulligans_g3',
            'created_at',
        ]