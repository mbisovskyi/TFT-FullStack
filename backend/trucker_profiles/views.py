from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from trucker_profiles.models import TruckerProfile
from trucker_profiles.serializers import TruckerProfileSerializer

# Create your views here.

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def get_trucker_profile(request):
    profile = TruckerProfile.objects.get(user_id=request.user.id)
    if request.method == 'GET':
        serializer = TruckerProfileSerializer(profile, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TruckerProfileSerializer(profile, data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)