from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from trucker_profiles.models import TruckerProfile
from trucker_profiles.serializers import TruckerProfileSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_trucker_profile(request):
    profile = TruckerProfile.objects.get(user_id=request.user.id)
    serializer = TruckerProfileSerializer(profile, many=False)
    return Response(serializer.data)