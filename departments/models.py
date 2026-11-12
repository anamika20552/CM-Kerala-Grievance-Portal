
from django.db import models


class Department(models.Model):

    name = models.CharField(max_length=150, unique=True)

    department_code = models.CharField(
        max_length=20,
        unique=True
    )

    description = models.TextField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

