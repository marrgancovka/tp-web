from django.db import models

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


# class ProfileManager(models.Manager):
#     def get_user_by_username(self, username):
#         try:
#             user = User.objects.get(username=username)
#         except ObjectDoesNotExist:
#             user = None

#         return user

class Profiles(models.Model):
    # objects = ProfileManager()

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars', default='image/avatars/default.jpg', blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}'

class Moments(models.Model):
    content = models.CharField(max_length=1000, blank=True, null=True)
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='moments')
    date_creation = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField('Tags', blank=True, related_name='tags')
    is_delete = models.BooleanField(default=False)

class Comments(models.Model):
    content = models.CharField(max_length=1000)
    date_creation = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('Profiles', on_delete=models.CASCADE)
    moment = models.ForeignKey('Moments', on_delete=models.CASCADE)
    is_delete = models.BooleanField(default=False)

class Subscriptions(models.Model):
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
    