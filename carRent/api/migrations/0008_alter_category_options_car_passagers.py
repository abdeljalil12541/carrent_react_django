# Generated by Django 4.0.1 on 2024-10-25 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_category_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['name'], 'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='car',
            name='passagers',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
