import datetime

from django.db import models
# Create your models here.

from datetime import datetime


# class NgoManager(models.Manager):
#     def get_by_natural_key(self, name, description):
#         return self.get(name=name, description=description)
from rest_framework import serializers



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


class NgoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Ngo
        depth = 1
        fields = [
            'id',
            'name',
            'description'
        ]


class Event(models.Model):

    @classmethod
    def create(cls, event):
        eventObj = Event()
        eventObj.name = event['name']
        eventObj.description = event['description']
        eventObj.size = event['size']
        eventObj.ngo = event['ngo']
        eventObj.target_date = datetime.strptime(event['target_date'], "%Y-%m-%d").date()

        return eventObj

    def natural_key(self):
        return (self.id)

    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    description = models.fields.TextField()
    size = models.fields.IntegerField()
    ngo = models.ForeignKey(Ngo, related_name="ngo", on_delete=models.CASCADE)
    target_date = models.fields.DateField(default=datetime.now, blank=True)
    creation_date = models.fields.DateField(default=datetime.now, blank=True)
    image = models.fields.URLField(null=True, default="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdYNZmQOxOoowAKZbOYTjxAU5d_pA52JxWgg&usqp=CAU")

class EventSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        fields = [
            'id',
            'name',
            'description',
            # 'ngo'
        ]
        model = Event
        depth = 1


class Product(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField()
    asin = models.fields.TextField(null=False)
    asin_name = models.fields.TextField(null=True)
    asin_currency = models.fields.TextField(default="USD")
    asin_price = models.fields.TextField(default=0)
    in_stock = models.fields.BooleanField(null=True)
    is_prime = models.fields.BooleanField(null=True)
    image_url = models.fields.URLField(null=True)
    rating = models.fields.FloatField(null=True)
    total_review = models.fields.IntegerField(null=True)

    @classmethod
    def create(cls, product):
        productObj = Product()
        productObj.name = product['asin_name']
        productObj.asin = product['asin']
        productObj.asin_name = product['asin_name']
        productObj.asin_currency = product['asin_currency']
        productObj.asin_price = product['asin_price']
        productObj.in_stock = product['in_stock']
        productObj.is_prime = product['is_prime']
        productObj.image_url = product['image_url']
        productObj.rating = product['rating']
        productObj.total_review = product['total_review']

        return productObj


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
    expexcted_delivery_date = models.fields.DateField(default=datetime.now, blank=True,null= True)
    amazon_order_id = models.fields.TextField(null = True)
    bill = models.fields.URLField(null = True)

