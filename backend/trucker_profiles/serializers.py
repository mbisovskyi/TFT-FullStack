from rest_framework import serializers
from .models import TruckerProfile

class TruckerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckerProfile
        fields = ['id', 'pay_rate', 'address', 'user_id']
        depth = 1