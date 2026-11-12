from django.contrib import admin
from .models import ContactEnquiry


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'email',
        'subject',
        'is_resolved',
        'created_at'
    )

    list_filter = ('is_resolved',)

    search_fields = (
        'name',
        'email',
        'subject'
    )
