from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from costs.models import Cost
from costs.serializers import CostSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_costs(request):
    if request.method == 'POST':
        serializer = CostSerializer(data = request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save(trip_id = request.data['trip_id'])
            return Response(serializer.data, status = status.HTTP_201_CREATED)      


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_trip_costs(request, pk):
    if request.method == 'GET':
        costs = Cost.objects.filter(trip_id = pk)
        serializer = CostSerializer(costs, many = True)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_trip_cost_details(request, cost_id):
    costs = Cost.objects.filter(trip_id = request.data['trip_id'])
    cost = costs.get(pk = cost_id)
    if request.method == 'PUT':
        serializer = CostSerializer(cost, data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_trip_cost_by_id(request, cost_id, trip_id):
    costs = Cost.objects.filter(trip_id = trip_id)
    cost = costs.get(pk = cost_id)
    if request.method == 'GET':
        serializer = CostSerializer(cost)
        return Response(serializer.data)