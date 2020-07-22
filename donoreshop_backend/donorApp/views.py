from django.http import HttpResponse

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework.decorators import api_view
from ngoApp.views import format_response

from donorApp.models import *
from rest_framework.response import Response


def home(request):
    print(request)
    return HttpResponse(request)


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def cart(request):
    if request.method == 'POST':
        cart = request.data
        print(cart)

        if True:

            donorObj = Donor.objects.filter(id=cart["donor"]).first()
            eventObj = Event.objects.filter(id=cart["event"]).first()

            cart["donor"] = donorObj
            cart["event"] = eventObj

            # print(cart)
            cartObj = Cart.create(cart)
            # print(cartObj)
            cartObj.save()

            amountDonated = 0

            # create relations
            for relation in cart["products"]:
                relation["cart"] = cartObj
                relation["productDonated"] = Product.objects.filter(id=int(relation["productDonated"])).first()

                eventObj = EventProduct.objects.filter(product__id=int(relation["productRequired"])).first()
                relation["productRequired"] = eventObj

                print(relation)
                print(eventObj)
                print(cartObj)


                relationObj = CartProductRelation.create(relation)
                relationObj.save()
                amountDonated += relation["quantity"] * relation["perProductPrice"]

                print(eventObj.remaining_quantity)
                eventObj.remaining_quantity = eventObj.remaining_quantity - relation["quantity"]
                eventObj.save()
                print(eventObj.remaining_quantity)

            cartObj.amountDonated = amountDonated
            cartObj.save()

            return HttpResponse(amountDonated)


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def getCart(request, cartId):
    if request.method == 'GET':
        donorCartObj = Cart.objects.filter(id=cartId).first()
        amountToPay = donorCartObj.amountDonated
        return render(request, "amazon.html")


@csrf_protect
@csrf_exempt
@api_view(['GET', 'POST'])
def donate(request):
    if request.method == 'POST':
        print("hey")
    response = "hey"
    return format_response(response)


@csrf_protect
@csrf_exempt
@api_view(['POST'])
def addDonor(request):
    if request.method == 'POST':
        donor = request.data
        walletObj = Wallet.create()
        walletObj.save()
        donor["wallet"] = walletObj
        print(donor)

        donorObj = Donor.create(donor)
        donorObj.save()
        return HttpResponse(donorObj.id)


@csrf_protect
@csrf_exempt
@api_view(['GET'])
def getDonor(request, donorId):
    if request.method == 'GET':
        response = Donor.objects.filter(id=donorId)
        response = DonorSerializer(response, many=True).data
        return Response(response)
