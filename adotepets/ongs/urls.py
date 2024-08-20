from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    # ex: /polls/
    path("pets/delete/<int:pet_id>", views.PetDelete.as_view(), name="pet-delete"),
    path("pets/create", views.PetCreate.as_view(), name="pet-create"),
    path("register/", views.ONGRegister.as_view(), name="ong-create"),
    path("pets/list", views.PetList.as_view(), name="pet-list"),
    path("user", views.UserIsOng.as_view(), name="user-verification"),
]