from django.http import HttpResponse
from .models import ONG, Pet
from django.http import Http404
from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PetList(generics.ListAPIView):
    serializer_class = PetSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get_queryset(self):
        user = self.request.user
        ong = ONG.objects.get(user=user)
        pets = Pet.objects.filter(ong=ong)
        print(pets)
        return pets


class PetCreate(generics.CreateAPIView):
    serializer_class = PetSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        print(self.request.data)
        if serializer.is_valid():
            ong_id = ONG.objects.get(user=self.request.user).id
            serializer.save(ong_id=ong_id)
            print(serializer.errors)
        print(serializer.errors)

class PetDelete(generics.DestroyAPIView):
    serializer_class = PetSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        ong_id = ONG.objects.get(user=self.request.user).id
        return Pet.objects.filter(ong_id=ong_id)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ONGRegister(generics.CreateAPIView):
    queryset = ONG.objects.all()
    serializer_class = ONGSerializer
    permission_classes = [AllowAny]

class GetOngs(generics.ListAPIView):
    queryset = ONG.objects.all()
    serializer_class = ONGSerializer
    permission_classes = [AllowAny]

class CustomerUserRegister(generics.CreateAPIView):
    queryset = CustomerUser.objects.all()
    serializer_class = CustomerUserSerializer
    permission_classes = [AllowAny]


