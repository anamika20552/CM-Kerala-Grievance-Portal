
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class CitizenRegistrationSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    mobile = serializers.CharField(write_only=True)
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["full_name", "email", "mobile", "password"]

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )
        return value.lower()

    def create(self, validated_data):
        full_name = validated_data.pop("full_name").strip()
        mobile = validated_data.pop("mobile")
        password = validated_data.pop("password")

        name_parts = full_name.split(maxsplit=1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""

        email = validated_data["email"]

        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        UserProfile.objects.create(
            user=user,
            role="citizen",
            mobile=mobile
        )

        return user
