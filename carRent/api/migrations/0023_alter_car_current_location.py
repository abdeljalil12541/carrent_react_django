# Generated by Django 4.0.1 on 2024-11-07 19:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_remove_car_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='current_location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cars', to='api.pickupfeature'),
        ),
    ]