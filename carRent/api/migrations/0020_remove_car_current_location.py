# Generated by Django 4.0.1 on 2024-11-07 18:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_carbooking'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='car',
            name='current_location',
        ),
    ]