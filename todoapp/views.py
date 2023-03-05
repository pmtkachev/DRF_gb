from rest_framework.pagination import PageNumberPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins, status
from todoapp.models import Project, ToDo
from todoapp.serializers import ProjectModelSerializers, ToDoModelSerializers
from .filters import ProjectFilter, ToDoFilter


class ProjectPageNumberPagination(PageNumberPagination):
    page_size = 10


class ToDoPageNumberPagination(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                          mixins.CreateModelMixin, mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializers
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    pagination_class = ToDoPageNumberPagination
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ToDoModelSerializers
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
