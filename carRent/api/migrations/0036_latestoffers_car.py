# Generated by Django 4.0.1 on 2024-11-12 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_latestoffers_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='latestoffers',
            name='car',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.car'),
        ),
    ]
