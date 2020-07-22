from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
import requests

# Create your views here.
from django.views.decorators.csrf import csrf_protect, csrf_exempt

from ngoApp.models import *
from donorApp.models import *
from django.db.models import Sum, F


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
def createCart(request, eventId):
    if request.method == 'GET':
        #a = Cart.objects.all()
        carts = Cart.objects.filter(status = Cart.STATUS.INITIATED, event__id = eventId)
        #return  HttpResponse(carts)
        requiredProducts = CartProductRelation.objects.filter(cart__event__id = eventId, cart__status = Cart.STATUS.INITIATED)
        response = requiredProducts.values('productDonated','productDonated__asin').annotate(Sum('quantity'))
        event = Event.objects.filter(id = eventId).first()
        eventCart = EventCart.objects.create(status = EventCart.STATUS.INITIATED, event = event)

        carts.update(eventCart = eventCart)
        return HttpResponse(response)



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


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def create_button_get_url(request):
    URI = "https://www.amazon.com/gp/aws/cart/add.html?AWSAccessKeyId=Access+Key+ID&AssociateTag=Associate+Tag"
    products = [
        {
            "asin": "B07TYWBSW6",
            "quantity": "3"
        },
        {
            "asin": "B07K8VDB2C",
            "quantity": "5"
        }
    ]

    for index, product in enumerate(products): URI = "%s&ASIN.%s=%s&Quantity.%s=%s" % (URI,index,product["asin"],index,product["quantity"])
    URI = URI + "&add=add"
    print(URI)

@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def getNgoEvents(request, ngoId):
    if request.method == 'GET':
        response = Event.objects.filter(ngo__id=ngoId)
        response = EventSerializer(response, many=True).data
        return Response(response)
        # return format_response(response)


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def getEvent(request, eventId):
    if request.method == 'GET':
        response = Event.objects.filter(id=eventId)
        response = EventSerializer(response, many=True).data

        return Response(response)

#
# def format_response(data):
#     serialized  = serializers.serialize(data)
#     return HttpResponse(
#         serialized,
#         content_type="text/json-comment-filtered"
#     )
