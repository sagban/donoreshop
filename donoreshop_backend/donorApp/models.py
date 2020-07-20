from django.db import models


# Create your models here.
from ngoApp.models import Event, EventCart, Product, EventProduct



class Wallet(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    amount = models.fields.FloatField(blank=True)
    amountSpent = models.fields.FloatField(blank=True)


class Donor(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField(blank=True)
    email = models.fields.EmailField(blank=True)
    phone = models.fields.TextField(blank=True)
    age = models.fields.IntegerField(blank=True, null=True)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)


class Cart(models.Model):

    class STATUS(models.TextChoices):
        INITIATED = "INITIATED"
        PLACED = "PLACED"
        DELIVERED = "DELIVERED"

    id = models.AutoField(primary_key=True, null=False)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    eventCart = models.ForeignKey(EventCart,on_delete=models.CASCADE)
    amountDonated = models.fields.FloatField(blank=True)
    amountUsed = models.fields.FloatField(blank=True)
    status = models.fields.CharField(max_length=20, choices=STATUS.choices)


class CartProductRelation(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    productDonated = models.ForeignKey(Product, on_delete=models.CASCADE,related_name= "productDonated")
    productRequired = models.ForeignKey(EventProduct, on_delete=models.CASCADE,related_name="productRequired")
    quantity = models.fields.IntegerField(blank=True)
    perProductPrice = models.fields.FloatField(blank=True)



