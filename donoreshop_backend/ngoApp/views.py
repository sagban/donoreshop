import json

import requests
from django.core import serializers
from django.db.models import Sum
from django.http import HttpResponse
# Create your views here.
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from donorApp.models import *
from ngoApp.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST', 'OPTIONS'])
def createEvent(request):
    if request.method == 'POST':
        print(request)
        event = request.data["data"]
        event["ngo"] = Ngo.objects.filter(id=event["ngo"]).first()
        eventObj = Event.create(event)
        eventObj.save()
        for product in event["products"]:
          p = Product.objects.filter(id = product["id"]).first()
          eventPro = EventProduct.objects.create(event = eventObj, product = p, quantity = product["quantity"], remaining_quantity = product["quantity"])
          for rep_product in product["substitute"]:
            p1 = Product.objects.filter(id = rep_product).first()
            EvenProductReplacements.objects.create(replacement_product  = p1,event_product = eventPro)

        return HttpResponse(eventObj.id)

@csrf_exempt
@api_view(['GET', 'POST'])
def getProducts(request, queryString):
  if request.method == 'GET':
    url = "https://amazon-data.p.rapidapi.com/search.php"

    querystring = {"region": "us", "page": "1", "keyword": queryString}

    headers = {
      'x-rapidapi-host': "amazon-data.p.rapidapi.com",
      'x-rapidapi-key': "0bb3e3d122mshdd5d886bd1d569ep116e79jsn91f195fa41a0"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(type(response.text))
    products = json.loads(response.text)

    productList = []

    for product in products:
      print(product)
      productObj = Product.create(product)
      productObj.save()
      product["id"] = productObj.id
      productList.append(product)

    json_format = json.dumps(productList)

    return HttpResponse(json_format)


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
def markOrderAsDelivered(request, eventCartId):
    print("mark ")
    if request.method == 'GET':
        #a = Cart.objects.all()
        eventCartData = request.data
        eventcart = EventCart.objects.filter(id = eventCartId)
        eventcart.update(status = EventCart.STATUS.DELIVERED)

        donorCarts = Cart.objects.filter(eventCart__id = eventCartId )
        donorCarts.update(status = Cart.STATUS.DELIVERED)

        return HttpResponse("1")




#
# @csrf_protect
# @csrf_exempt
# @api_view(['GET', 'POST'])
# def getNgoEvents(request, ngoId):
#     if request.method == 'GET':
#         response = Event.objects.filter(ngo__id=ngoId)
#         format_response(response)


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
        event = Event.objects.filter(id=eventId)
        event_products = event.first().eventProducts.all()
        products = []
        for p in event_products:
          products.append({"quantity": p.quantity,"remaining_quantity":p.remaining_quantity,"name":p.product.name,"id":p.product.id,"asin":p.product.asin,"asin_name":p.product.asin_name,"asin_price":p.product.asin_price,"in_stock":p.product.in_stock,"image_url":p.product.image_url})
        #response = EventSerializer(response, many=True).data
        response = {"event": EventSerializer(event, many=True).data[0], "event_products":products}
        return HttpResponse(json.dumps(response,indent=1))

#
# def format_response(data):
#     serialized  = serializers.serialize(data)
#     return HttpResponse(
#         serialized,
#         content_type="text/json-comment-filtered"
#     )
