from logging import raiseExceptions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from trucker_profiles.models import TruckerProfile
from trucker_profiles.serializers import TruckerProfileSerializer

# Create your views here.

@api_view(['GET', 'PUT', 'POST'])
@permission_classes([IsAuthenticated])
def get_trucker_profile(request):
    if request.method == 'GET':
        profile = TruckerProfile.objects.get(user_id=request.user.id)
        serializer = TruckerProfileSerializer(profile, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        profile = TruckerProfile.objects.get(user_id=request.user.id)
        serializer = TruckerProfileSerializer(profile, data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TruckerProfileSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save(user = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)