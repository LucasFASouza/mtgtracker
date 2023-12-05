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
    
    def games_played_with(self):
        return sum([game.games_played() for game in self.games.all() if self in game.your_deck.all()])
    
    def games_won_with(self):
        return sum([game.games_won() for game in self.games.all() if self in game.your_deck.all()])
    
    def games_played_against(self):
        return sum([game.games_played() for game in self.games.all() if self in game.opp_deck.all()])
    
    def games_won_against(self):
        return sum([game.games_won() for game in self.games.all() if self in game.opp_deck.all()])

class Game(models.Model):
    RESULTS_CHOICES = [
        ('W', 'W'),
        ('L', 'L'),
        ('D', 'D'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games")
    tags = models.ManyToManyField(Tag, blank=True)

    your_deck = models.ManyToManyField(Deck, related_name="your_deck")
    opp_deck = models.ManyToManyField(Deck, related_name="opp_deck")

    notes = models.TextField(blank=True)

    started_play = models.BooleanField(blank=True, null=True)

    result_g1 = models.CharField(choices=RESULTS_CHOICES, max_length=1)
    result_g2 = models.CharField(choices=RESULTS_CHOICES, max_length=1)
    result_g3 = models.CharField(choices=RESULTS_CHOICES, max_length=1, blank=True)

    mulligans_g1 = models.PositiveIntegerField(blank=True, null=True)
    mulligans_g2 = models.PositiveIntegerField(blank=True, null=True)
    mulligans_g3 = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.your_deck} vs {self.opp_deck} at {self.created_at}'
    
    def games_played(self):
        return 3 if self.result_g3 else 2
    
    def games_won(self):
        return len([result for result in [self.result_g1, self.result_g2, self.result_g3] if result == 'W'])