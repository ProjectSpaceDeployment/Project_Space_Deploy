# Generated by Django 5.1.4 on 2025-05-29 18:54

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_rename_upload_resource'),
    ]

    operations = [
        migrations.AddField(
            model_name='linkupload',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='project', to='api.project'),
        ),
        migrations.AlterField(
            model_name='linkupload',
            name='file',
            field=models.FileField(upload_to=api.models.upload_link_path),
        ),
    ]
