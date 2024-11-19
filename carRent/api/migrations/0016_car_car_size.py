# Generated by Django 4.0.1 on 2024-10-30 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_car_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='car_size',
            field=models.CharField(choices=[('PETITE', 'Petite Voiture'), ('MOYENNE', 'Voiture Moyenne'), ('GRANDE', 'Grande Voiture'), ('SUV', 'SUV/4x4'), ('LUXE', 'Voiture de Luxe')], max_length=20, null=True),
        ),
    ]
