# Generated by Django 4.2.6 on 2023-11-01 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_tags_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profiles',
            name='nickname',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
