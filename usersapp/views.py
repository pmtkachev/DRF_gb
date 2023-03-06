from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
