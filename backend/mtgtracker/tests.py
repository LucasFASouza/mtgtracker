from django.test import TestCase

from .models import User, Game, Deck, Match, Tag

# TODO: Implementar testes de verdade

class GameModelTests(TestCase):
    def test_create_user(self):
        request = self.client.post('/api/users/', {
            "username": "testuser",
            "password": "testpassword",
            "email": ""
        })

        self.assertEqual(request.status_code, 201)
        self.assertEqual(User.objects.count(), 1)

    def test_get_token(self):
        request = self.client.post('/api/users/', {
            "username": "testuser",
            "password": "testpassword",
            "email": ""
        })

        self.assertEqual(request.status_code, 201)

        request = self.client.post('/api/token/', {
            "username": "testuser",
            "password": "testpassword",
        })

        self.assertEqual(request.status_code, 200)
        self.assertIsNotNone(request.data['token'])

    def test_create_game(self):
        request = self.client.post('/api/users/',{
            "username": "testuser",
            "password": "testpassword",
            "email": ""
        })

        self.assertEqual(request.status_code, 201)

        request = self.client.post('/api/token/', {
            "username": "testuser",
            "password": "testpassword",
        })

        self.assertEqual(request.status_code, 200)

        token = request.data['token']

        request = self.client.post('/api/games/', {
            "tags": [
                {
                    "tag": "test tag"
                }
            ],
            "your_deck": {
                "deck_name": "Your Deck"
            },
            "opp_deck": {
                "deck_name": "Deck Against"
            },
            "notes": "test notes",
            "matches": [
                {
                    "result": "L",
                    "mulligans": 0,
                    "started_play": True,
                    "is_first_match": True
                },
                {
                    "result": "D",
                    "mulligans": 1,
                    "started_play": True,
                    "is_first_match": False
                },
                {
                    "result": "W",
                    "mulligans": 1,
                    "started_play": True,
                    "is_first_match": False
                }
            ]
        },
        headers={'Authorization': f'Token {token}',
                 'Content-Type': 'application/json'})

        self.assertEqual(request.status_code, 201)

        game = Game.objects.get(pk=1)

        self.assertEqual(game.tags.count(), 1)
        self.assertEqual(game.your_deck.deck_name, "Your Deck")
        self.assertEqual(game.opp_deck.deck_name, "Deck Against")
        self.assertEqual(game.notes, "test notes")
        self.assertEqual(game.matches.count(), 3)

        self.assertEqual(game.matches.filter(result='W').count(), 1)
        self.assertEqual(game.matches.filter(result='L').count(), 1)
        self.assertEqual(game.matches.filter(result='D').count(), 1)

        self.assertEqual(game.matches.filter(mulligans=0).count(), 1)
        self.assertEqual(game.matches.filter(mulligans=1).count(), 2)

        self.assertEqual(game.matches.filter(started_play=True).count(), 3)
        self.assertEqual(game.matches.filter(started_play=False).count(), 0)

        decks = Deck.objects.all()

        self.assertEqual(decks.count(), 2)
    