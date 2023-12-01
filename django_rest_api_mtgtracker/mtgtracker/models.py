from django.db import models


class Game(models.Model):
    your_deck = models.CharField(max_length=100)
    opp_deck = models.CharField(max_length=100)

    season = models.CharField(max_length=100, blank=True)
    tournament = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)

    started_play = models.BooleanField(blank=True, null=True)

    result_g1 = models.CharField(max_length=1)
    result_g2 = models.CharField(max_length=1)
    result_g3 = models.CharField(max_length=1, blank=True)

    mulligans_g1 = models.PositiveIntegerField(blank=True, null=True)
    mulligans_g2 = models.PositiveIntegerField(blank=True, null=True)
    mulligans_g3 = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.your_deck} vs {self.opp_deck} at {self.created_at}'