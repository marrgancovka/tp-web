from django.db import models

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


class ProfileManager(models.Manager):
    def get_profiles_by_id(self, id_users):
        return Profiles.objects.filter(id__in = id_users)

class Profiles(models.Model):
    objects = ProfileManager()

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars', default='idefault.jpg', blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}'


class MomentsManager(models.Manager):
    def get_my_moments(self, pk):
        return Moments.objects.filter(author=pk, is_delete = False).order_by('-date_creation')
    def get_all(self):
        return Moments.objects.filter(is_delete = False).order_by('-date_creation')
    def get_subscriptions(self, sub_users):
        return Moments.objects.filter(author__in=sub_users, is_delete = False).order_by('-date_creation')
    def get_count(self, pk):
        return Moments.objects.filter(author = pk).count()

class Moments(models.Model):
    objects = MomentsManager()

    content = models.CharField(max_length=1000, blank=True, null=True)
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='moments')
    date_creation = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField('Tags', blank=True, related_name='tags')
    is_delete = models.BooleanField(default=False)

class CommentsManager(models.Manager):
    def get_all_by_moment(self, pk):
        return Comments.objects.filter(moment_id = pk, is_delete = False)

class Comments(models.Model):
    objects = CommentsManager()
    content = models.CharField(max_length=1000)
    date_creation = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    moment = models.ForeignKey('Moments', on_delete=models.CASCADE)
    is_delete = models.BooleanField(default=False)


class SubscriptionsManager(models.Manager):
    def get_id_subscriptions(self, pk): #id подписок
        return Subscriptions.objects.filter(subscriber = pk, is_delete = False).order_by('-date_subscription').values_list('author') 
    def get_id_subscribers(self, pk): #id подписчиков
        return Subscriptions.objects.filter(author = pk, is_delete = False).order_by('-date_subscription').values_list('subscriber') 
    def get_count_subscriptions(self, pk):
        return Subscriptions.objects.filter(subscriber_id=pk, is_delete=False).count()
    def get_count_subscribers(self, pk):
        return Subscriptions.objects.filter(author_id=pk, is_delete=False).count()
    
class Subscriptions(models.Model):
    objects = SubscriptionsManager()
    author=models.ForeignKey('Profiles', on_delete=models.CASCADE, related_name='author_subscription')
    subscriber = models.ForeignKey('Profiles', on_delete=models.CASCADE, related_name='subscriber_subscription')
    date_subscription = models.DateTimeField(auto_now_add=True)
    is_delete = models.BooleanField(default=False)

class LikesMoment(models.Model):
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    moment = models.ForeignKey('Moments', on_delete=models.CASCADE)
    date_creation = models.DateTimeField(auto_now_add=True)
    is_delete = models.BooleanField(default=False)

class LikesComment(models.Model):
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    comment = models.ForeignKey('Comments', on_delete=models.CASCADE)
    date_creation = models.DateTimeField(auto_now_add=True)
    is_delete = models.BooleanField(default=False)


class Tags(models.Model):
    title = models.CharField(max_length=30, unique=True)
    def __str__(self):
        return f'{self.title}'
    