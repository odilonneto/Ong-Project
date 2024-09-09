from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import ONG, CustomerUser


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims based on the user model
        try:
            ong = user.ong
            token['cnpj'] = ong.ong_cnpj
            token['ong_id'] = ong.id
        except ONG.DoesNotExist:
            pass

        try:
            customer_user = user.customeruser
            token['cpf'] = customer_user.user_cpf
            token['user_id'] = customer_user.id
        except CustomerUser.DoesNotExist:
            pass
        print(token)
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user


class ONGSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = ONG
        fields = ['user', 'ong_name', 'custom_url', 'ong_address', 'ong_cnpj', 'ong_phone_number', 'ong_email', 'id']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(username=user_data['username'], password=user_data['password'])
        ong = ONG.objects.create(user=user, ong_name=validated_data['ong_name'],
                                 custom_url=validated_data['custom_url'],
                                 ong_address=validated_data['ong_address'], ong_cnpj=validated_data['ong_cnpj'],
                                 ong_phone_number=validated_data['ong_phone_number'],
                                 ong_email=validated_data['ong_email'])
        ong.save()
        return ong


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ["ong", "id", "pet_name", "pet_age", "pet_vaccines", "pet_size", "is_pet_neutered",
                  "is_pet_available", "pet_photos"]
        read_only_fields = ["ong"]


class CustomerUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = CustomerUser
        fields = ['user', 'name', 'email', 'phone_number', 'gender', 'birth_date', 'user_cpf']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(username=user_data['username'], password=user_data['password'])
        customer_user = CustomerUser.objects.create(user=user, name=validated_data['name'],
                                                    email=validated_data['email'],
                                                    phone_number=validated_data['phone_number'],
                                                    gender=validated_data['gender'],
                                                    birth_date=validated_data['birth_date'],
                                                    user_cpf=validated_data['user_cpf'])
        customer_user.save()
        return customer_user

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['ong_id', 'user_id', 'comment', 'rating']
    def create(self, validated_data):
        user = CustomerUser.objects.get(id=validated_data['user_id'])
        ong = ONG.objects.get(id=validated_data['ong_id'])
        rating = Rating.objects.create(user=user, ong=ong, comment = validated_data['comment'],
                                       rating = validated_data['rating'])
        rating.save()
        return rating
