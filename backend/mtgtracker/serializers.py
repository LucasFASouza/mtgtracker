from rest_framework import serializers

from .models import Game, Match, Deck, Tag, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tag', 'user']

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'deck_name', 'user']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'result', 'mulligans', 'started_play', 'is_first_match']

class GameSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    your_deck = DeckSerializer(many=False)
    opp_deck = DeckSerializer(many=False)
    matches = MatchSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'tags', 'your_deck', 'opp_deck', 'notes', 'created_at', 'matches', 'user']

    def create(self, validated_data):        
        tags_data = validated_data.pop('tags', [])
        your_deck_data = validated_data.pop('your_deck')
        opp_deck_data = validated_data.pop('opp_deck')
        matches_data = validated_data.pop('matches')

        game = Game.objects.create(**validated_data)

        user = validated_data['user']

        for tag_data in tags_data:
            tag_data['user'] = user
            print(f"\n\n\n\n\n\ntag_data: {tag_data}\n\n\n\n\n")
            tag = Tag.objects.get_or_create(**tag_data)[0]
            game.tags.add(tag)

        your_deck_data['user'] = user
        your_deck = Deck.objects.get_or_create(**your_deck_data)[0]
        your_deck.games_with.add(game)

        opp_deck_data['user'] = user
        opp_deck = Deck.objects.get_or_create(**opp_deck_data)[0]
        opp_deck.games_against.add(game)

        for match_data in matches_data:
            Match.objects.create(game=game, **match_data)

        return game
        