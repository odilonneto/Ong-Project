from rest_framework import serializers
from .models import *

class ONGSerializer(serializers.ModelSerializer):
    class Meta:
        model = ONG
        fields = ['ong_name', 'ong_address', 'ong_cnpj', 'ong_phone_number', 'ong_email']
