import datetime
from django.db import models
from usersapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    url_rep = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=256)
    date = models.DateTimeField(default=datetime.datetime.now)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
