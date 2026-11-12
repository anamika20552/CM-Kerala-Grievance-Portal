
from django.urls import path
from .views import home, CMODashboardStatsView

urlpatterns = [
    path("", home, name="home"),
    path(
        "api/cmo/stats/",
        CMODashboardStatsView.as_view(),
        name="cmo-dashboard-stats"
    ),
]
