# Generated by Django 4.2.6 on 2023-11-01 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_profiles_nickname'),
    ]

    operations = [
        migrations.AddField(
            model_name='moments',
            name='is_delete',
            field=models.BooleanField(default=False),
        ),
    ]
