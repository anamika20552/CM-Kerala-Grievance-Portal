
from django.contrib import admin

from .models import (
    Grievance,
    GrievanceHistory,
    Attachment,
    DepartmentAssignment,
     ActionTakenReport,
     Feedback
)


@admin.register(Grievance)
class GrievanceAdmin(admin.ModelAdmin):

    list_display = (
        'reference_id',
        'citizen',
        'district',
        'category',
        'priority',
        'status',
        'created_at'
    )

    list_filter = (
        'district',
        'category',
        'priority',
        'status'
    )

    search_fields = (
        'reference_id',
        'subject',
        'citizen__username'
    )


@admin.register(GrievanceHistory)
class GrievanceHistoryAdmin(admin.ModelAdmin):

    list_display = (
        'grievance',
        'previous_status',
        'new_status',
        'updated_by',
        'timestamp'
    )


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):

    list_display = (
        'grievance',
        'uploaded_by',
        'uploaded_at'
    )


@admin.register(DepartmentAssignment)
class DepartmentAssignmentAdmin(admin.ModelAdmin):

    list_display = (
        'grievance',
        'department',
        'officer',
        'assigned_by',
        'assigned_at',
        'is_active'
    )
@admin.register(ActionTakenReport)
class ActionTakenReportAdmin(admin.ModelAdmin):

    list_display = (
        'grievance',
        'officer',
        'is_submitted',
        'cmo_reviewed',
        'submitted_at'
    )

    list_filter = (
        'is_submitted',
        'cmo_reviewed'
    )


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):

    list_display = (
        'grievance',
        'citizen',
        'rating',
        'created_at'
    )

    list_filter = ('rating',)