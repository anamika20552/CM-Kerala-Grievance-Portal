
from django.urls import path
from .views import (
    CitizenRegisterView,
    CitizenLoginView,
    CurrentUserView
)

urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="citizen-register"),
    path("login/", CitizenLoginView.as_view(), name="citizen-login"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
]
