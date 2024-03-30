---
title: Django Rest Framework - My Findings
tag: my-findings, django
---

# {{ $frontmatter.title }}

## 📚 Cheatsheet

### Views

<br>

#### `api_view` decorator

```py
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request

from product.models import Product
from product.serializers import ProductSerializer

@api_view(["GET"])
def index(request: Request):
    instance = Product.objects.first() # ℹ️ Your own query
    data = ProductSerializer(instance).data if instance else {}

    return Response(data)
```

#### Generic Views

```py
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListCreateAPIView, UpdateAPIView, DestroyAPIView

from .models import Product
from .serializers import ProductSerializer

# 🚨 This is create only view. More better approach will be using `ProductListCreateAPIView` as it can list & create on same API endpoint
# urlpatterns: [path("", ProductCreateAPIView.as_view())]
class ProductCreateAPIView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # ℹ️ You can override this method to add custom logic before saving
    # Example: Adding the user who created the product or sending a django signal
    # def perform_create(self ,serializer: ProductSerializer):
    #     serializer.save(user=self.request.user)
    #     # You can also Send django signal

# urlpatterns: [path("<int:pk>/", ProductDetailAPIView.as_view())]
class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# urlpatterns: [path("", ProductListCreateAPIView.as_view())]
class ProductListCreateAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # ℹ️ As this is similar to create view, you can also override `perform_create` method

class ProductUpdateAPIView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # def perform_update(self, serializer: ProductSerializer): ...

class ProductDeleteAPIView(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # def perform_destroy(self, instance: Product): ...
```

<!-- ## ✨ Tips -->