# Generated by Django 5.1 on 2024-08-20 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ongs', '0003_alter_ong_custom_url_alter_ong_ong_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ong',
            name='custom_url',
            field=models.CharField(blank=True, default='<django.db.models.fields.CharField>', max_length=20),
        ),
        migrations.AlterField(
            model_name='ong',
            name='ong_phone_number',
            field=models.CharField(max_length=12),
        ),
    ]
