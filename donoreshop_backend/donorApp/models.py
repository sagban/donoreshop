from django.db import models


# Create your models here.


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
    id = models.AutoField(primary_key=True, null=False)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    # event = models.ForeignKey(Event)
    # eventCart = models.ForeignKey(EventCart)
    amountDonated = models.fields.FloatField(blank=True)
    amountUsed = models.fields.FloatField(blank=True)


class CartProductRelation(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    # productDonated = models.ForeignKey(Product, on_delete=models.CASCADE)
    # productRequired = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.fields.IntegerField(blank=True)
    perProduct = models.fields.FloatField(blank=True)



