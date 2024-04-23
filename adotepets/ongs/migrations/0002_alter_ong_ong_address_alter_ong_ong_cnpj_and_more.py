# Generated by Django 5.0.3 on 2024-04-16 17:14

import ongs.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ongs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ong',
            name='ong_address',
            field=models.CharField(max_length=200, validators=[ongs.models.validate_address]),
        ),
        migrations.AlterField(
            model_name='ong',
            name='ong_cnpj',
            field=models.CharField(blank=True, validators=[ongs.models.validate_cnpj]),
        ),
        migrations.AlterField(
            model_name='ong',
            name='ong_email',
            field=models.CharField(validators=[ongs.models.email_validator]),
        ),
        migrations.AlterField(
            model_name='ong',
            name='ong_name',
            field=models.CharField(max_length=40, validators=[ongs.models.validate_valid_name]),
        ),
    ]