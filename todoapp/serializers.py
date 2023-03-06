from rest_framework import serializers
from todoapp.models import Project, ToDo


class ProjectModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
