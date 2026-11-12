
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.exceptions import PermissionDenied

from .models import Grievance
from .serializers import GrievanceSerializer


class CitizenGrievanceListCreateView(generics.ListCreateAPIView):

    serializer_class = GrievanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser
    ]

    def get_queryset(self):
        return Grievance.objects.filter(
            citizen=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):

        if not hasattr(self.request.user, "profile"):
            raise PermissionDenied("User profile not found.")

        if self.request.user.profile.role != "citizen":
            raise PermissionDenied(
                "Only citizens can submit grievances."
            )

        serializer.save()

