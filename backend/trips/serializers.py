from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'date_started', 'date_ended', 'distance', 'place_from', 'place_to', 'income', 'is_active', 'user_id']
        depth = 1