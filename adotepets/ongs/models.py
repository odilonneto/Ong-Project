from django.core.exceptions import ValidationError
from django.db import models
from  django.core.validators import EmailValidator


invalid_characters = ['!', '@', '#', '$', '%', '¨¨', '(', ')', '=', '+', '/', '?', ',', ':', ';', '"', '[', ']', '.']
def validate_valid_name(name):
    if len(name) < 8:
        raise ValidationError('%s is not a valid name' % name)
    for letter in name:
        if letter.isnumeric() or letter in invalid_characters:
            raise ValidationError('%s is not a valid name' % name)


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


class ONG(models.Model):
    ong_name = models.CharField(max_length=40, validators=[validate_valid_name])
    ong_address = models.CharField(max_length=200, validators=[validate_address])
    ong_cnpj = models.CharField(blank=True, validators=[validate_cnpj])
    ong_phone_number = models.IntegerField()
    ong_email = models.CharField(validators=[email_validator])
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