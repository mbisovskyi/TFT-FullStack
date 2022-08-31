from django.db import models
from authentication.models import User
# Create your models here.

class TruckerProfile(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    pay_rate = models.DecimalField(max_digits = 7, decimal_places = 2, blank=True, default=0.00)
    address = models.CharField(max_length = 256, blank=True)