from rest_framework import serializers
from .models import ListItem

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ('itemId', 'name', 'unit', 'photoUrl', 'category', 'quantity', 'crossedOff', 'note')


