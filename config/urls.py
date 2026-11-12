from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # React authentication APIs
    path("api/accounts/", include("accounts.urls")),

    # Main website
    path("", include("dashboards.urls")),
]