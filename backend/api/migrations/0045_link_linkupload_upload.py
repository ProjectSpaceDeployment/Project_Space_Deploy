# Generated by Django 5.1.4 on 2025-05-29 00:04

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_projectassessment_assessmentmark'),
    ]

    operations = [
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('link_type', models.CharField(max_length=30)),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='links', to='api.sem')),
            ],
        ),
        migrations.CreateModel(
            name='LinkUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to='link_uploads/')),
                ('link', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='link_uploads', to='api.link')),
            ],
        ),
        migrations.CreateModel(
            name='Upload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to=api.models.upload_path)),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='uploads', to='api.sem')),
            ],
        ),
    ]
