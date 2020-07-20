from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view


# Create your views here.
from django.views.decorators.csrf import csrf_protect, csrf_exempt

from ngoApp.models import *


def home(request):
    print(request)
    return HttpResponse(request)


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def createEvent(request):
    if request.method == 'POST':
        event = request.data
        event["ngo"] = Ngo.objects.filter(id=event["ngo"]).first()
        eventObj = Event.create(event)

        response = eventObj.save()
        return HttpResponse(response)

@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def getEvent(request, eventId):
    if request.method == 'GET':
        response = Event.objects.filter(id=eventId)
        response = serializers.serialize("json",response)
        # return HttpResponse(response)
        return JsonResponse(response, safe=False)
