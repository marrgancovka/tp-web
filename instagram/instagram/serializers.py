from app.models import Tags, Comments, Moments

from rest_framework import serializers

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ["id", "title"]

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "content", "date_creation", "author", "moment"]

class MomentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moments
        fields = ["id", "content", "date_creation", "author", "image", "tags", "is_delete"]