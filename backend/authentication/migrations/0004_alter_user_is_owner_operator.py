# Generated by Django 4.0.4 on 2022-08-31 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_is_owner_operator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_owner_operator',
            field=models.BooleanField(default=False),
        ),
    ]
