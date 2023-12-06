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
    your_deck = DeckSerializer(many=False, read_only=True)
    opp_deck = DeckSerializer(many=False, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'tags', 'your_deck', 'opp_deck', 'notes', 'created_at', 'matches', 'user']

    def post(self, validated_data):
        tags_data = validated_data.pop('tags')
        your_deck_data = validated_data.pop('your_deck')
        opp_deck_data = validated_data.pop('opp_deck')
        matches_data = validated_data.pop('matches')

        game = Game.objects.create(**validated_data)

        for tag_data in tags_data:
            tag = Tag.objects.get_or_create(**tag_data)[0]
            game.tags.add(tag)

        your_deck = Deck.objects.get_or_create(**your_deck_data)[0]
        game.your_deck.add(your_deck)

        opp_deck = Deck.objects.get_or_create(**opp_deck_data)[0]
        game.opp_deck.add(opp_deck)

        for match_data in matches_data:
            Match.objects.create(game=game, **match_data)

        return game
        