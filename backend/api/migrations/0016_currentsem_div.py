# Generated by Django 5.1.4 on 2025-03-23 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_remove_currentsem_info_remove_currentsem_leader'),
    ]

    operations = [
        migrations.AddField(
            model_name='currentsem',
            name='div',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
