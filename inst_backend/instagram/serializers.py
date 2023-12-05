from app.models import Tags, Comments, Moments, User, Profiles, Subscriptions

from rest_framework import serializers

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ["id", "title"]

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "content", "date_creation", "author", "moment"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='user', read_only=True)
    class Meta:
        model = Profiles
        fields = ['id', 'user_info', 'avatar']

class MomentsSerializer(serializers.ModelSerializer):
    author_info = ProfileSerializer(source='author', read_only=True)
    class Meta:
        model = Moments
        fields = ['id', 'content', 'author', 'author_info', 'image', 'date_creation', 'tags']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = ['author', 'subscriber']