from django.contrib import admin
from .models import User, Tag, Deck, Game

admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Deck)
admin.site.register(Game)

