from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    # ex: /polls/
    path("pets/delete/<int:pet_id>", views.PetDelete.as_view(), name="pet-delete"),
    path("pets/", views.PetListCreate.as_view(), name="pet-create"),
    path("", views.ONGListCreate.as_view(), name="ong-create"),
]