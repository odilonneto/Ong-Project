from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ONGSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = ONG
        fields = ['user', 'ong_name', 'custom_url', 'ong_address', 'ong_cnpj', 'ong_phone_number', 'ong_email']
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(username=user_data['username'], password=user_data['password'])
        ong = ONG.objects.create(user=user, ong_name = validated_data['ong_name'], custom_url = validated_data['custom_url'],
                                 ong_address = validated_data['ong_address'], ong_cnpj = validated_data['ong_cnpj'],
                                 ong_phone_number = validated_data['ong_phone_number'], ong_email=validated_data['ong_email'])
        ong.save()
        return ong

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ["ong", "pet_name", "pet_age", "pet_vaccines", "pet_size", "is_pet_neutered",
                  "is_pet_available", "pet_photos"]