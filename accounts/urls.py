
from django.urls import path
from .views import (
    CitizenRegisterView,
    CitizenLoginView,
    CurrentUserView
)
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="citizen-register"),
    path("login/", CitizenLoginView.as_view(), name="citizen-login"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path("token/refresh/", TokenRefreshView.as_view()),
]
