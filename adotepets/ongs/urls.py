from django.urls import path, include
from . import views
from .views import CustomTokenObtainPairView

urlpatterns = [
    # ex: /polls/
    path("pets/delete/<int:pet_id>", views.PetDelete.as_view(), name="pet-delete"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("pets/", views.PetCreate.as_view(), name="pet-create"),
    path("register/", views.ONGRegister.as_view(), name="ong-create"),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="ong-login"),
    path("pets/list", views.PetList.as_view(), name="pet-list"),
]