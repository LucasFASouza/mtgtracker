from rest_framework import serializers

from .models import Game, Match, Deck, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tag']

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'deck_name']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'result', 'mulligans', 'started_play', 'is_first_match']

class GameSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    your_deck = DeckSerializer(many=True, read_only=True)
    opp_deck = DeckSerializer(many=True, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'tags', 'your_deck', 'opp_deck', 'notes', 'created_at', 'matches']