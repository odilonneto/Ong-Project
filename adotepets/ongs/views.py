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
    permission_classes = [AllowAny]
    def get_queryset(self):
        ong = self.request.ong
        return Pet.objects.filter(ong=ong)


class PetCreate(generics.CreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        ong = self.request.ong
        return Pet.objects.filter(ong=ong)

    def perform_crate(self, serializer):
        if serializer.is_valid():
            serializer.save(ong=self.request.ong)
        else:
            print(serializer.errors)

class PetDelete(generics.DestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        ong = self.request.ong
        return Pet.objects.filter(ong=ong)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ONGRegister(generics.CreateAPIView):
    queryset = ONG.objects.all()
    serializer_class = ONGSerializer
    permission_classes = [AllowAny]



