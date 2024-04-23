from django.contrib import admin
from django.urls import include, path
from ongs.views import *


urlpatterns = [
    path("ongs/", include("ongs.urls")),
    path("admin/", admin.site.urls),
    path('', ONGView.as_view(), name="xxx")]