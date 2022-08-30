from django.db import models
from trips.models import Trip
# Create your models here.

class Cost(models.Model):
    trip = models.ForeignKey(Trip, on_delete = models.CASCADE)
    title = models.CharField(max_length = 128)
    amount = models.DecimalField(max_digits = 7, decimal_places = 2)