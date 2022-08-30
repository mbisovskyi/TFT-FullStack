from django.db import models

# Create your models here.
class TruckerType(models.Model):
    type = models.CharField(max_length = 36)