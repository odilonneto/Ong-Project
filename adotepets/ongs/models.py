from django.db import models


class ONG(models.Model):
    ong_name = models.CharField(max_length=200)
    ong_address = models.CharField(max_length=400)
    ong_cnpj = models.IntegerField()
    ong_phone_number = models.IntegerField()
    ong_email = models.CharField(max_length=200)
    def __str__(self):
        return f'ONG: {self.ong_name}'


class Pet(models.Model):
    ong = models.ForeignKey(ONG, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=200)
    pet_age = models.IntegerField()
    pet_vaccines = models.CharField(max_length=400)
    pet_size = models.CharField(max_length=1)
    is_pet_neutered = models.BooleanField()
    is_pet_available = models.BooleanField(default=True)
    pet_photos = models.ImageField(upload_to = 'images/')
    def __str__(self):
        return f'Pet: {self.pet_name}'