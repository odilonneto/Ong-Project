from django.urls import path, include
from .views import *


urlpatterns = [
    path("pets/delete/<int:pk>", PetDelete.as_view(), name="pet-delete"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("pets/", PetCreate.as_view(), name="pet-create"),
    path("register/", ONGRegister.as_view(), name="ong-create"),
    path("login/", CustomTokenObtainPairView.as_view(), name="ong-login"),
    path("pets/list", PetList.as_view(), name="pet-list"),
    path("all_ongs", GetOngs.as_view(), name="get-ongs"),
    path("customer/register", CustomerUserRegister.as_view(), name='register-customer'),
    path("pets/update/<int:pk>", PetUpdate.as_view(), name="pet-update"),
    path("update/<int:pk>", ONGUpdate.as_view(), name="ong-update"),
    path("<int:pk>", ONGRetrieve.as_view(), name="ong-retrieve"),
    path("delete/<int:pk>", ONGDelete.as_view(), name="ong-delete"),
    path('<int:ong_id>/pets', PetListByOngView.as_view(), name='pets-by-ong'),
    path('<int:ong_id>/rating', OngRatingView.as_view(), name='ong-rating'),
    path('ratings/create', CreateRatingView.as_view(), name='create-rating'),
    path('customer/<int:pk>', CustomerUserRetrieve.as_view(), name='retrieve-customer-user'),
    path('customer/delete/<int:pk>', CustomerUserDelete.as_view(), name='delete-customer-user'),
    path('customer/update/<int:pk>', CustomerUserUpdate.as_view(), name='update-customer-user'),
]