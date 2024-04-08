from django.http import HttpResponse
from .models import ONG, Pet
from django.http import Http404
from django.shortcuts import render, get_object_or_404, get_list_or_404

def index(request):
    all_ongs_list = ONG.objects.all()
    context = { "all_ongs_list": all_ongs_list }
    return render(request, "ongs/index.html", context)
def detail(request, ong_name):
    ong = get_object_or_404(ONG, ong_name=ong_name)
    return render(request, "ongs/detail.html", {"ong" : ong})


def pets_available(request, ong_name):
    ong = get_object_or_404(ONG, ong_name = ong_name)
    pets = get_list_or_404(Pet, ong_id = ong.id)
    return render(request, "ongs/pets_available.html", {"pets" : pets})


def pet_x(request, ong_name, pet_id):
    pet = get_object_or_404(Pet, id = pet_id)
    return HttpResponse("Está visualizando a página do pet %s." % pet.pet_name)