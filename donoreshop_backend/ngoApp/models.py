from django.db import models

# Create your models here.




class Ngo(models.Model):

    class NGO_TYPES(models.TextChoices):
        EDUCATION = "EDUCATION"
        HEALTH = "HEALTH"
        HUMAN_SERVICE = "HUMAN_SERVICE"
        GENERAL = "GENERAL"


    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    description = models.fields.TextField()
    type = models.fields.CharField(max_length= 20, choices= NGO_TYPES.choices,default= NGO_TYPES.GENERAL)
    size = models.fields.IntegerField()


class Event(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    description = models.fields.TextField()
    size = models.fields.IntegerField()
    ngo = models.fields.ForeignKey(Ngo, on_delete=models.CASCADE)
    target_date = models.fields.DateField()
    creation_date = models.fields.DateField()

class Product(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    amazon_url = models.fields.URLField()
    amzon_product_id = models.fields.TextField(null=False)

class EventProduct(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    event = models.fields.ForeignKey(Event, on_delete=models.CASCADE)
    product = models.fields.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.fields.IntegerField()
    remaining_quantity = models.fields.IntegerField()


class EventCart(models.Model):

    class STATUS(models.TextChoices):
        INITIATED = "INITIATED"
        PLACED = "PLACED"
        DELIVERED = "DELIVERED"


    id = models.AutoField(primary_key=True, null=False)
    status = models.fields.CharField(max_length= 20, choices= STATUS.choices)
    event = event = models.fields.ForeignKey(Event, on_delete=models.CASCADE)
    total_bill = models.fields.FloatField()
    expexcted_delivery_date = models.fields.DateField()
    amazon_order_id = models.fields.TextField()
    bill = models.fields.URLField()

