from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.exceptions import PermissionDenied

from .models import Grievance,GrievanceHistory
from .serializers import GrievanceSerializer
from .serializers import GrievanceHistorySerializer


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


class GrievanceHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, reference_id):
        try:
            grievance = Grievance.objects.get(
                reference_id=reference_id,
                citizen=request.user
            )
        except Grievance.DoesNotExist:
            return Response(
                {"error": "Grievance not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        history = grievance.history.all()
        serializer = GrievanceHistorySerializer(history, many=True)

        return Response(serializer.data)
