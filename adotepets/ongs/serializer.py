from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class ONGSerializer(serializers.ModelSerializer):
    class Meta:
        model = ONG
        fields = ['ong_name', 'ong_address', 'ong_cnpj', 'ong_phone_number', 'ong_email']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ["ong", "pet_name", "pet_age", "pet_vaccines", "pet_size", "is_pet_neutered",
                  "is_pet_available", "pet_photos"]