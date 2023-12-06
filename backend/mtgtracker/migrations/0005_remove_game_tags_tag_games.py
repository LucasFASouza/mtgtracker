# Generated by Django 5.0 on 2023-12-06 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mtgtracker', '0004_match_is_first_match'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='tags',
        ),
        migrations.AddField(
            model_name='tag',
            name='games',
            field=models.ManyToManyField(blank=True, related_name='tags', to='mtgtracker.game'),
        ),
    ]
