from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("ongs/", include("ongs.urls")),
    path("admin/", admin.site.urls),
]