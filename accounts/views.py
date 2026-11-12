
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CitizenRegistrationSerializer


class CitizenRegisterView(generics.CreateAPIView):
    serializer_class = CitizenRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            {
                "message": "Citizen registered successfully.",
                "user": {
                    "id": user.id,
                    "name": user.get_full_name(),
                    "email": user.email,
                    "role": user.profile.role
                }
            },
            status=201
        )


class CitizenLoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "name": user.get_full_name(),
            "email": user.email,
            "role": user.profile.role,
            "mobile": user.profile.mobile
        })

