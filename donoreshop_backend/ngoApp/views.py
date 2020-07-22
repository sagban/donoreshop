from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
import requests

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
        return format_response(response)


def getProducts(request):

    url = "https://amazon-data.p.rapidapi.com/search.php"

    querystring = {"region":"us","page":"1","keyword":"stationery"}

    headers = {
        'x-rapidapi-host': "amazon-data.p.rapidapi.com",
        'x-rapidapi-key': "0bb3e3d122mshdd5d886bd1d569ep116e79jsn91f195fa41a0"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(response.text)
    print(request)
    return HttpResponse(response.text)


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def createCart(request,ngoId, eventId):
    if request.method == 'GET':
        #Todo
        response = Event.objects.filter(id=eventId)
        format_response(response)

@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def getNgoEvents(request, ngoId):
    if request.method == 'GET':
        response = Event.objects.filter(ngo__id=ngoId)
        format_response(response)


def format_response(data):
    return HttpResponse(
        serializers.serialize("json", data),
        content_type="text/json-comment-filtered"
    )
