from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from trips.models import Trip

from trips.serializers import TripSerializer

# Create your views here.
@api_view(['POST', 'PUT', 'GET'])
@permission_classes([IsAuthenticated])
def user_trips(request):
    if request.method == 'POST':
        serializer = TripSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)