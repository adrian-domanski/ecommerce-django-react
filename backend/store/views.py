from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


def home(request):
    data = {
        "message": "Welcome to the E-commerce API!",
    }
    return JsonResponse(data)


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
