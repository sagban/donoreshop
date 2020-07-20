from django.contrib import admin

#Register your models here.
from ngoApp.models import Ngo, Event, EvenProductReplacements, Product, EventProduct, EventCart

admin.site.register(Ngo)
admin.site.register(Event)
admin.site.register(Product)
admin.site.register(EventProduct)
admin.site.register(EvenProductReplacements)
admin.site.register(EventCart)




