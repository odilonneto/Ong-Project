# Generated by Django 5.1 on 2024-09-03 00:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ongs', '0012_alter_pet_ong'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='ong',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ongs.ong'),
        ),
    ]
