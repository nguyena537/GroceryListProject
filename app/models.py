"""
Definition of models.
"""

from django.db import models

# Create your models here.
class ListItem(models.Model):
    itemId = models.IntegerField(primary_key=True, null=False, default=-1, unique=True)
    name = models.CharField(max_length=60, default="")
    unit = models.CharField(max_length=50)
    photoUrl = models.CharField(max_length=50, null=True, unique=False)
    category = models.CharField(max_length=60, null=True)
    quantity = models.IntegerField(null=True, default=1)
    crossedOff = models.BooleanField(null=False, default=False)
    note = models.CharField(null=True, max_length=255)