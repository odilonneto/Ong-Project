# Generated by Django 5.1 on 2024-09-02 23:30

import ongs.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ongs', '0007_customeruser_email_customeruser_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='pet_photos',
            field=models.ImageField(upload_to=ongs.models.file_location),
        ),
        migrations.AlterField(
            model_name='pet',
            name='pet_size',
            field=models.CharField(choices=[('P', 'Pequeno'), ('M', 'Medio'), ('G', 'Grande')], max_length=1),
        ),
    ]
