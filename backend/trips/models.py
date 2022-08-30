from django.db import models
from truckers.models import Trucker
# Create your models here.

class Trip(models.Model):
    trucker = models.ForeignKey(Trucker, on_delete = models.CASCADE)
    place_from = models.CharField(max_length = 64)
    place_to = models.CharField(max_length = 64)
    distance = models.FloatField(max_length = 7)
    income = models.DecimalField(max_digits = 7, decimal_places = 2);
    date_started = models.DateField(auto_now_add = True)
    date_ended = models.DateField(auto_now_add = True)
