import pdb

from django.core.exceptions import ValidationError
from django.db import models
from  django.core.validators import EmailValidator
from django.contrib.auth.models import User
from datetime import datetime
from django.core.validators import MinValueValidator, MaxValueValidator

invalid_characters = ['!', '@', '#', '$', '%', '¨¨', '(', ')', '=', '+', '/', '?', ',', ':', ';', '"', '[', ']', '.']

def validate_address(address):
    for letter in address:
        if letter in invalid_characters:
            raise ValidationError('%s is not a valid address' % address)

def find_last_cnpj_numbers(cnpj):
    sum = 0
    if len(cnpj) == 12:
        multiplier = 5
    else:
        multiplier = 6
    for number in cnpj:
        number = int(number)
        if multiplier == 1:
            multiplier = 9
        sum += number * multiplier
        multiplier -= 1
    rest = sum % 11
    if rest < 2:
        return '0'
    else:
        return str(11 - rest)

def validate_cnpj(cnpj):
    for number in cnpj:
        if not number.isnumeric():
            raise ValidationError('%s is not a valid CNPJ.' % cnpj)
    if len(cnpj) != 14 and len(cnpj) != 0:
        raise ValidationError('%s is not a valid CNPJ.' % cnpj)
    first_digit = find_last_cnpj_numbers(cnpj[:-2])
    second_digit = find_last_cnpj_numbers(cnpj[:-1])
    if first_digit != cnpj[-2] or second_digit != cnpj[-1]:
        raise ValidationError('%s is not a valid CNPJ.' % cnpj)

def validate_phone_number(phone_number):
    if "+" in phone_number:
        raise ValidationError('%s is not a valid Phone Number' % phone_number)
    phone_string_number = str(phone_number)
    if len(phone_string_number) < 10 or len(phone_string_number) > 11:
        raise ValidationError('%s is not a valid Phone Number' % phone_number)

def email_validator(email):
    if not "@" in email:
        raise ValidationError('%s is not a valid email.' % email)
    email = email.split('@')
    local_part = email[0]
    domain_part = email[1]
    if not (local_part[0] == '.' or local_part[-1] == '.'):
        raise ValidationError('%s is not a valid email.' % email)
    for char in domain_part:
        if char in invalid_characters:
            raise ValidationError('%s is not a valid email.' % email)
    if domain_part.count('.') != 1:
        raise ValidationError('%s is not a valid email.' % email)


class CustomerUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    genders = (("M", "Man"), ("W", "Woman"), ("O", "Other"))
    birth_date = models.DateField()
    gender = models.CharField(max_length=1, choices=genders)
    user_cpf = models.CharField(max_length=20)

class ONG(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ong_name = models.CharField(max_length=40, unique=True)
    custom_url = models.CharField(max_length=20, default=str(ong_name).replace(' ', ''), unique=True)
    ong_address = models.CharField(max_length=200, validators=[validate_address])
    ong_cnpj = models.CharField(blank=True, validators=[validate_cnpj], unique=True)
    ong_phone_number = models.CharField(max_length=12)
    ong_email = models.CharField(validators=[EmailValidator])
    class Meta:
        permissions = [("pet_creation", "can create pets")]
    def __str__(self):
        return f'ONG: {self.ong_name}'


def file_location(instance, filename, **kwargs):
    file_path = f"static/images/{instance.pet_name}-{str(datetime.now())}{filename}"
    return file_path


class Pet(models.Model):
    ong = models.ForeignKey(ONG, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=200)
    pet_age = models.IntegerField()
    pet_vaccines = models.CharField(max_length=400)
    size_choices = (('P', 'Pequeno'), ('M', 'Medio'), ('G','Grande'))
    pet_size = models.CharField(max_length=1, choices=size_choices)
    is_pet_neutered = models.BooleanField()
    is_pet_available = models.BooleanField(default=True)
    pet_photos = models.ImageField(upload_to=file_location)

    def __str__(self):
        return f'PET: {self.pet_name} URL: {self.pet_photos}'

class Rating(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE)
    ong = models.ForeignKey(ONG, on_delete=models.CASCADE)
    comment = models.CharField(max_length=300)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])