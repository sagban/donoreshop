from django.db import models

# Create your models here.

class Ngo(models.Model):
    ngo_id = models.AutoField(primary_key=True, null=False)
    ngo_name = models.fields.TextField()
    ngo_description = models.fields.TextField()