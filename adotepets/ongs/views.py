from django.http import HttpResponse
from .models import ONG, Pet
from django.http import Http404
from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import ValidationError



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ONGUpdate(generics.UpdateAPIView):
    serializer_class = ONGSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    queryset = ONG.objects.all()


class PetUpdate(generics.UpdateAPIView):
    serializer_class = PetSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get_queryset(self):
        user = self.request.user
        ong = ONG.objects.get(user=user)
        pets = Pet.objects.filter(ong=ong)
        return pets
    
class PetListByOngView(APIView):
    def get(self, request, ong_id, *args, **kwargs):
        try:
            ong = ONG.objects.get(id=ong_id)
            pets = Pet.objects.filter(ong=ong)  # Filtrar pets pela ONG
            serializer = PetSerializer(pets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ONG.DoesNotExist:
            return Response({'error': 'ONG não encontrada'}, status=status.HTTP_404_NOT_FOUND)

class PetList(generics.ListAPIView):
    serializer_class = PetSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get_queryset(self):
        user = self.request.user
        ong = ONG.objects.get(user=user)
        pets = Pet.objects.filter(ong=ong)
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

class ONGRetrieve(generics.RetrieveAPIView):
    queryset = ONG.objects.all()
    serializer_class = ONGSerializer
    permission_classes = [AllowAny]


class ONGDelete(generics.DestroyAPIView):
    serializer_class = ONGSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated]
    queryset = ONG.objects.all()
    def delete(self, request, pk, format=None):
        ong = ONG.objects.get(id=pk)
        user = User.objects.get(id=ong.user_id)
        ong.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OngRatingView(generics.ListAPIView):
    serializer_class = RatingSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        ong_id = self.kwargs['ong_id']
        return Rating.objects.filter(ong_id=ong_id)


class CreateRatingView(generics.CreateAPIView):
    serializer_class = RatingSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print(self.request.data)
        user = self.request.user.id
        ong_id = self.request.data['ong_id']
        rating_already_exists = Rating.objects.filter(user_id=user, ong=ong_id)
        if len(rating_already_exists) > 0:
            print('teste2')
            raise ValidationError({'error': 'Usuário já possui uma avaliação para esta ONG.'})
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
