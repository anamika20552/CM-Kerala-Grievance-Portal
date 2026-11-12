
from django.urls import path
from .views import (
    CitizenGrievanceListCreateView,
    GrievanceHistoryView,
)

urlpatterns = [
    path(
        "my/",
        CitizenGrievanceListCreateView.as_view(),
        name="citizen-grievances"
    ),
    path(
        "history/<str:reference_id>/",
        GrievanceHistoryView.as_view(),
        name="grievance-history"
    ),
]

