
from rest_framework import serializers
from django.db import transaction
from .models import Grievance, Attachment, GrievanceHistory


class GrievanceSerializer(serializers.ModelSerializer):

    attachment = serializers.FileField(
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Grievance
        fields = [
            "id",
            "reference_id",
            "district",
            "category",
            "subject",
            "description",
            "attachment",
            "status",
            "priority",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "reference_id",
            "status",
            "priority",
            "created_at",
        ]

    def validate_attachment(self, value):
        if value:
            allowed_types = [
                "image/jpeg",
                "image/png",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]

            if value.content_type not in allowed_types:
                raise serializers.ValidationError(
                    "Only JPG, PNG, PDF, DOC and DOCX files are allowed."
                )

            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError(
                    "File size must not exceed 5 MB."
                )

        return value

    @transaction.atomic
    def create(self, validated_data):

        attachment_file = validated_data.pop("attachment", None)

        request = self.context["request"]

        grievance = Grievance.objects.create(
            citizen=request.user,
            **validated_data
        )

        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status="",
            new_status="Submitted",
            remarks="Grievance submitted by citizen.",
            updated_by=request.user
        )

        if attachment_file:
            Attachment.objects.create(
                grievance=grievance,
                file=attachment_file,
                uploaded_by=request.user
            )

        return grievance
