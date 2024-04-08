from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path("", views.index, name="index"),
    # ex: /polls/5/
    path("<str:ong_name>/", views.detail, name="detail"),
    # ex: /polls/5/results/
    path("<str:ong_name>/pets/", views.pets_available, name="pets_available"),
    # ex: /polls/5/vote/
    path("<str:ong_name>/pets/<int:pet_id>", views.pet_x, name="pet_x"),
]