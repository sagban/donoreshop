from django.contrib import admin

#Register your models here.
from donoreshop_backend.ngoApp.models import Ngo, Event

admin.site.register(Ngo)
admin.site.register(Event)


