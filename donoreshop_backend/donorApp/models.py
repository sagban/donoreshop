from django.db import models


# Create your models here.
from ngoApp.models import Event, EventCart, Product, EventProduct
from rest_framework import serializers


class Wallet(models.Model):
    @classmethod
    def create(cls):
        walletObj = Wallet()
        return walletObj

    id = models.AutoField(primary_key=True, null=False)
    amount = models.fields.FloatField(default=0)
    amountSpent = models.fields.FloatField(default=0)


class Donor(models.Model):

    @classmethod
    def create(cls, donor):
        donorObj = Donor()
        donorObj.name = donor['name']
        donorObj.age = donor['age']
        donorObj.email = donor['email']
        donorObj.phone = donor['phone']
        donorObj.wallet = donor['wallet']

        return donorObj

    id = models.AutoField(primary_key=True, null=False)
    name = models.fields.TextField(blank=True)
    email = models.fields.EmailField(blank=True)
    phone = models.fields.TextField(blank=True)
    age = models.fields.IntegerField(blank=True, null=True)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)


class DonorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'age',
            'wallet'
        ]
        model = Donor
        depth = 1


class Cart(models.Model):

    class STATUS(models.TextChoices):
        INITIATED = "INITIATED"
        PLACED = "PLACED"
        DELIVERED = "DELIVERED"

    id = models.AutoField(primary_key=True, null=False)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    eventCart = models.ForeignKey(EventCart,null=True, on_delete=models.CASCADE)
    amountDonated = models.fields.FloatField(blank=True)
    amountUsed = models.fields.FloatField(blank=True, null=True)
    status = models.fields.CharField(max_length=20, choices=STATUS.choices)
    bill = models.fields.URLField(null=True)

    @classmethod
    def create(cls, cart):
        cartObj = Cart()
        cartObj.donor = cart["donor"]
        cartObj.event = cart["event"]
        cartObj.amountDonated = cart["amountDonated"]
        cartObj.status = cart["status"]
        return cartObj


class CartProductRelation(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    productDonated = models.ForeignKey(Product, on_delete=models.CASCADE,related_name= "productDonated")
    productRequired = models.ForeignKey(EventProduct, on_delete=models.CASCADE,related_name="productRequired")
    quantity = models.fields.IntegerField(blank=True)
    perProductPrice = models.fields.FloatField(blank=True)

    @classmethod
    def create(cls, relation):
        relationObj = CartProductRelation()
        relationObj.productDonated = relation["productDonated"]
        relationObj.productRequired = relation["productRequired"]
        relationObj.quantity = relation["quantity"]
        relationObj.perProductPrice = relation["perProductPrice"]
        relationObj.cart = relation["cart"]

        return relationObj



