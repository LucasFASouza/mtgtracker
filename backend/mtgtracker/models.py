from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Tag(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tags")
    tag = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.user} - {self.tag}'
    
class Deck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="decks")
    deck_name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.user} - {self.deck_name}'

class Game(models.Model):
    RESULTS_CHOICES = [
        ('W', 'W'),
        ('L', 'L'),
        ('D', 'D'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games")
    tags = models.ManyToManyField(Tag, blank=True)

    your_deck = models.ManyToManyField(Deck, related_name="games_with")
    opp_deck = models.ManyToManyField(Deck, related_name="games_against")

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        your_victories = self.matches.filter(result='W').count()
        opp_victories = self.matches.filter(result='L').count()

        return f'{self.your_deck.first().deck_name} {your_victories} vs {opp_victories} {self.opp_deck.first().deck_name} at {self.created_at}'
    
class Match(models.Model):
    RESULTS_CHOICES = [
        ('W', 'Win'),
        ('L', 'Lose'),
        ('D', 'Draw'),
    ]

    result = models.CharField(choices=RESULTS_CHOICES, max_length=1)
    mulligans = models.PositiveIntegerField(blank=True, null=True)
    started_play = models.BooleanField(blank=True, null=True)
    is_first_match = models.BooleanField()

    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="matches")

    def __str__(self):
        return f"{self.result} - with {self.mulligans} mulls on the {'play' if self.started_play else 'draw'}"
