from rest_framework import serializers
from .models import Cost

class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = ['id', 'title', 'amount', 'date_added', 'trip', 'trip_id', 'user_id']
        depth = 1
    
    trip_id = serializers.IntegerField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)
    # date_added = serializers.DateField(write_only=True)