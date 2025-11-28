

from dataclasses import fields
from rest_framework import serializers
from .models import *










class ServiceSerialize(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ['id', 'name']

class ServiceListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='name')
    class Meta:
        model = Service
        fields = ['id', 'label']



class GradeSerialize(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = ['id', 'grade_name']

class GradeListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='grade_name')
    class Meta:
        model = Grade
        fields = ['id', 'label']



class PersonnelSerialize(serializers.ModelSerializer):
    service = ServiceSerialize()
    grade = GradeSerialize()

    class Meta:
        model = Personnel
        fields = ['id', 'full_name', 'service', 'grade']

