from rest_framework.viewsets import ModelViewSet

from todoapp.models import Project, ToDo
from todoapp.serializers import ProjectModelSerializers, ToDoModelSerializers


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializers


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializers
