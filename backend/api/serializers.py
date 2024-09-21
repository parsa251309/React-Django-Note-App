from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {
            "password":{"write_only":True}
        }

    def create(self,data):
        user = User.objects.create_user(**data)
        return user 

class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Note
        fields = ["id","title","content","created_at","author"]
