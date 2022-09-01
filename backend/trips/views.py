from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from trips.models import Trip
from trips.serializers import TripSerializer

# Create your views here.
@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def user_trips(request):
    if request.method == 'POST':
        serializer = TripSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
    if request.method == 'GET':
        trips = Trip.objects.filter(user_id = request.user.id)
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def update_trip_by_id(request, pk):
    if request.method == 'PUT':
        trip = Trip.objects.get(pk = pk)
        serializer = TripSerializer(trip, data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)
    if request.method == 'GET':
        trip = Trip.objects.get(pk = pk)
        serializer = TripSerializer(trip)
        return Response(serializer.data)