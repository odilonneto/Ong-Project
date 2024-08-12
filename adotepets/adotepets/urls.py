from django.contrib import admin
from django.urls import include, path
from ongs.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("ongs/", include("ongs.urls")),
    path("admin/", admin.site.urls),
    path('', ONGView.as_view(), name="xxx"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls"))]