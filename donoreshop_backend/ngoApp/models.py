import datetime

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

    @classmethod
    def create(cls, event):
        eventObj = Event()
        eventObj.name = event['name']
        eventObj.description = event['description']
        eventObj.size = event['size']
        eventObj.ngo = event['ngo']

        return eventObj


    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    description = models.fields.TextField()
    size = models.fields.IntegerField()
    ngo = models.ForeignKey(Ngo, on_delete=models.CASCADE)
    target_date = models.fields.DateField(default=datetime.datetime.now, blank=True)
    creation_date = models.fields.DateField(default=datetime.datetime.now, blank=True)


class Product(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    asin = models.fields.TextField()
    # url = models.fields.TextField(null=False)



class EventProduct(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.fields.IntegerField()
    remaining_quantity = models.fields.IntegerField()

class EvenProductReplacements(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    replacement_product = models.ForeignKey(Product, on_delete=models.CASCADE)
    event_product = models.ForeignKey(EventProduct, on_delete=models.CASCADE)


class EventCart(models.Model):

    class STATUS(models.TextChoices):
        INITIATED = "INITIATED"
        PLACED = "PLACED"
        DELIVERED = "DELIVERED"


    id = models.AutoField(primary_key=True, null=False)
    status = models.fields.CharField(max_length= 20, choices= STATUS.choices)
    event = event = models.ForeignKey(Event, on_delete=models.CASCADE)
    total_bill = models.fields.FloatField(null=True)
    expexcted_delivery_date = models.fields.DateField(default=datetime.datetime.now, blank=True,null= True)
    amazon_order_id = models.fields.TextField(null = True)
    bill = models.fields.URLField(null = True)

