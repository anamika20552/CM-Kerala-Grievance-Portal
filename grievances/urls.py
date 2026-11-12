from django.urls import path
from .views import CitizenGrievanceListCreateView

urlpatterns = [
    path("my/", CitizenGrievanceListCreateView.as_view()),
]