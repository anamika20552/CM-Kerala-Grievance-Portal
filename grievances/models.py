
from django.db import models
from django.contrib.auth.models import User
from departments.models import Department
import uuid
from datetime import datetime


class Grievance(models.Model):

    # Grievance status choices
    STATUS_CHOICES = [
        ('Submitted', 'Submitted'),
        ('Under Review', 'Under Review'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Reopened', 'Reopened'),
    ]

    # Priority choices
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    # Category choices
    CATEGORY_CHOICES = [
        ('Healthcare', 'Healthcare'),
        ('Education', 'Education'),
        ('Public Infrastructure', 'Public Infrastructure'),
        ('Water Supply', 'Water Supply'),
        ('Electricity', 'Electricity'),
        ('Transportation', 'Transportation'),
        ('Other', 'Other'),
    ]

    # Unique reference number
    reference_id = models.CharField(
        max_length=30,
        unique=True,
        editable=False
    )

    # Citizen who submitted the complaint
    citizen = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='grievances'
    )

    # Complaint details
    district = models.CharField(max_length=100)

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    subject = models.CharField(max_length=200)

    description = models.TextField()

    # Department assignment
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='grievances'
    )

    assigned_officer = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_grievances'
    )

    # Priority and status
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Submitted'
    )

    # AI analysis results
    ai_suggested_department = models.CharField(
        max_length=150,
        blank=True
    )

    ai_suggested_category = models.CharField(
        max_length=100,
        blank=True
    )

    ai_suggested_priority = models.CharField(
        max_length=10,
        blank=True
    )

    ai_summary = models.TextField(blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        if not self.reference_id:
            year = datetime.now().year
            unique_code = uuid.uuid4().hex[:10].upper()

            self.reference_id = f"CMK-{year}-{unique_code}"

        super().save(*args, **kwargs)

    def __str__(self):
        return self.reference_id


class GrievanceHistory(models.Model):

    grievance = models.ForeignKey(
        Grievance,
        on_delete=models.CASCADE,
        related_name='history'
    )

    previous_status = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    new_status = models.CharField(
        max_length=20,
        choices=Grievance.STATUS_CHOICES
    )

    remarks = models.TextField(blank=True)

    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='grievance_updates'
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.grievance.reference_id} - {self.new_status}"

class Attachment(models.Model):
    grievance = models.ForeignKey(
        Grievance,
        on_delete=models.CASCADE,
        related_name="attachments"
    )
    file = models.FileField(upload_to="grievance_attachments/")
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment - {self.grievance.reference_id}"

class DepartmentAssignment(models.Model):

    grievance = models.ForeignKey(
        Grievance,
        on_delete=models.CASCADE,
        related_name='assignments'
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='assignments'
    )

    officer = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='department_assignments'
    )

    assigned_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='assignments_created'
    )

    remarks = models.TextField(blank=True)

    assigned_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.grievance.reference_id} - {self.department.name}"


class ActionTakenReport(models.Model):

    grievance = models.ForeignKey(
        Grievance,
        on_delete=models.CASCADE,
        related_name='action_reports'
    )

    officer = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='submitted_action_reports'
    )

    investigation_details = models.TextField()

    action_taken = models.TextField()

    resolution_details = models.TextField(blank=True)

    supporting_document = models.FileField(
        upload_to='action_reports/',
        blank=True,
        null=True
    )

    is_submitted = models.BooleanField(default=False)

    cmo_reviewed = models.BooleanField(default=False)

    cmo_remarks = models.TextField(blank=True)

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"Action Report - {self.grievance.reference_id}"


class Feedback(models.Model):

    grievance = models.OneToOneField(
        Grievance,
        on_delete=models.CASCADE,
        related_name='feedback'
    )

    citizen = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='submitted_feedback'
    )

    rating = models.PositiveSmallIntegerField()

    comments = models.TextField(blank=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Feedback - {self.grievance.reference_id}"
