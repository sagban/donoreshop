import json

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
def createCart(request, eventId):
    if request.method == 'GET':
        #a = Cart.objects.all()

        carts = Cart.objects.filter(status = Cart.STATUS.INITIATED, event__id = eventId)
        #return  HttpResponse(carts)
        requiredProducts = CartProductRelation.objects.filter(cart__event__id = eventId, cart__status = Cart.STATUS.INITIATED)
        product_quantities = requiredProducts.values('productDonated__asin').annotate(Sum('quantity'))
        #product_quantities.
        event = Event.objects.filter(id = eventId).first()
        eventCart = EventCart.objects.create(status = EventCart.STATUS.INITIATED, event = event)
        uri = create_button_get_url(list(product_quantities))
        response = {"eventCart":eventCart.id, "product_quantities":list(product_quantities),"uri":uri}

        carts.update(eventCart = eventCart)
        
        return HttpResponse(json.dumps(response))

@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def markCartAsPlaced(request, eventCartId):
    print("mark ")
    if request.method == 'POST':
        #a = Cart.objects.all()
        eventCartData = request.data
        eventcart = EventCart.objects.filter(id = eventCartId)
        eventcart.update(status = EventCart.STATUS.PLACED,total_bill = eventCartData["totalBill"], expexcted_delivery_date = eventCartData["expected_delivery_date"], amazon_order_id = eventCartData["amazon_order_id"],bill = eventCartData["bill"])

        donorCarts = Cart.objects.filter(eventCart__id = eventCartId )
        donorCarts.update(status = Cart.STATUS.PLACED)
        donorCarts.update(bill = eventCartData["bill"])

        return HttpResponse("1")



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



def create_button_get_url(products):
    URI = "https://www.amazon.com/gp/aws/cart/add.html?AWSAccessKeyId=Access+Key+ID&AssociateTag=Associate+Tag"
    for index, product in enumerate(products): URI = "%s&ASIN.%s=%s&Quantity.%s=%s" % (URI,index,product["productDonated__asin"],index,product["quantity__sum"])
    URI = URI + "&add=add"
    return  URI

# @csrf_protect
# @csrf_exempt
# @api_view(['GET', 'POST'])
# def getNgoEvents(request, ngoId):
#     if request.method == 'GET':
#         response = Event.objects.filter(ngo__id=ngoId)
#         response = EventSerializer(response, many=True).data
#         return Response(response)
#         # return format_response(response)
#
#
# def format_response(data):
#     serialized  = serializers.serialize(data)
#     return HttpResponse(
#         serialized,
#         content_type="text/json-comment-filtered"
#     )
