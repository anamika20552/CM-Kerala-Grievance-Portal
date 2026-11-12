
from django.shortcuts import render
from django.utils import timezone
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from grievances.models import Grievance


# Public website homepage
def home(request):
    return render(request, 'public/home.html')


# CMO Dashboard Statistics API
class CMODashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Only CMO administrators can access this dashboard
        if not hasattr(request.user, "profile") or request.user.profile.role != "cmo":
            return Response(
                {"error": "Only CMO administrators can access this dashboard."},
                status=403
            )

        total = Grievance.objects.count()

        pending = Grievance.objects.filter(
            status__in=["Submitted", "Under Review", "In Progress", "Reopened"]
        ).count()

        resolved = Grievance.objects.filter(
            status="Resolved"
        ).count()

        deadline = timezone.now() - timedelta(days=7)

        overdue = Grievance.objects.filter(
            created_at__lt=deadline
        ).exclude(status="Resolved").count()

        recent_grievances = Grievance.objects.order_by(
            "-created_at"
        )[:10]

        recent_data = []

        for grievance in recent_grievances:
            recent_data.append({
                "id": grievance.id,
                "reference_id": grievance.reference_id,
                "subject": grievance.subject,
                "district": grievance.district,
                "category": grievance.category,
                "status": grievance.status,
                "priority": grievance.priority,
                "created_at": grievance.created_at,
                "department": (
                    grievance.department.name
                    if grievance.department else "Not Assigned"
                )
            })

        return Response({
            "total_grievances": total,
            "pending_grievances": pending,
            "resolved_grievances": resolved,
            "overdue_grievances": overdue,
            "recent_grievances": recent_data
        })

