from app.models import Tags, Comments, Moments, User, Profiles, Subscriptions, LikesMoment
from django.core.exceptions import ObjectDoesNotExist
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

class LikeMomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesMoment
        fields = '__all__'

class MomentsSerializer(serializers.ModelSerializer):
    author_info = ProfileSerializer(source='author', read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    def get_likes_count(self, moment):
        try:
            return LikesMoment.objects.filter(moment=moment, is_delete=False).count()
        except ObjectDoesNotExist:
            return 0
        
    def get_is_liked(self, moment):
        request = self.context.get('request')
        id_me = self.context.get('id_me')
        me = Profiles.objects.get(id = id_me)
        if request:
            try:
                print(request.user)
                LikesMoment.objects.get(moment=moment, author=me, is_delete=False)
                return True
            except ObjectDoesNotExist:
                return False
        return False

    class Meta:
        model = Moments
        fields = ['id', 'content', 'author', 'author_info', 'image', 'date_creation', 'tags', 'likes_count', 'is_liked']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = ['author', 'subscriber']

