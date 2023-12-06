# Generated by Django 5.0 on 2023-12-06 16:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mtgtracker', '0005_remove_game_tags_tag_games'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='opp_deck',
        ),
        migrations.RemoveField(
            model_name='game',
            name='your_deck',
        ),
        migrations.AddField(
            model_name='game',
            name='opp_deck',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='games_against', to='mtgtracker.deck'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='game',
            name='your_deck',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='games_with', to='mtgtracker.deck'),
            preserve_default=False,
        ),
    ]