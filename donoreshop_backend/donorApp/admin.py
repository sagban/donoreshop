from django.contrib import admin

# Register your models here.
from donorApp.models import Donor, CartProductRelation, Cart, Wallet

admin.site.register(Wallet)
admin.site.register(Donor)
admin.site.register(Cart)
admin.site.register(CartProductRelation)
