from django.db import models
from authentication.models import User
from trucker_types.models import TruckerType

# Create your models here.
class Trucker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.ForeignKey(TruckerType, on_delete = models.CASCADE)
    # first_name = models.CharField(max_length = 36)
    # last_name = models.CharField(max_length = 36)
    # email = models.EmailField(max_length = 64)
    # register_date = models.DateField(auto_now_add = True)
    pay_rate = models.DecimalField(max_digits = 7, decimal_places = 2)