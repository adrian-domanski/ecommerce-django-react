from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Product
from .serializers import ProductSerializer


def home(request):
    data = {
        "message": "Welcome to the E-commerce API!",
    }
    return JsonResponse(data)


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)
