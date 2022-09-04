from django.db import models
from trips.models import Trip
from authentication.models import User
# Create your models here.

class Cost(models.Model):
    trip = models.ForeignKey(Trip, on_delete = models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length = 128)
    amount = models.DecimalField(max_digits = 7, decimal_places = 2)
    date_added = models.DateField(auto_now_add = True)