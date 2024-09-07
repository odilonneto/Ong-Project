from django.urls import path, include
from . import views
from .views import CustomTokenObtainPairView
from .views import PetListByOngView

urlpatterns = [
    path("pets/delete/<int:pk>", views.PetDelete.as_view(), name="pet-delete"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("pets/", views.PetCreate.as_view(), name="pet-create"),
    path("register/", views.ONGRegister.as_view(), name="ong-create"),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="ong-login"),
    path("pets/list", views.PetList.as_view(), name="pet-list"),
    path("all_ongs", views.GetOngs.as_view(), name="get-ongs"),
    path("customer/register", views.CustomerUserRegister.as_view(), name='register-customer'),
    path("pets/update/<int:pk>", views.PetUpdate.as_view(), name="pet-update"),
    path("update/<int:pk>", views.ONGUpdate.as_view(), name="ong-update"),
    path("<int:pk>", views.ONGRetrieve.as_view(), name="ong-retrieve"),
    path("delete/<int:pk>", views.ONGDelete.as_view(), name="ong-delete"),
    path('ong/<int:ong_id>/', PetListByOngView.as_view(), name='pets-by-ong'),
]