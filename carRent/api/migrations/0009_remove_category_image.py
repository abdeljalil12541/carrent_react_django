# Generated by Django 4.0.1 on 2024-10-25 19:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_category_options_car_passagers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='image',
        ),
    ]
