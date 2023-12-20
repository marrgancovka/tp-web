from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Tags, Comments, Profiles, Moments, Subscriptions, LikesMoment, User
from instagram.serializers import TagsSerializer, CommentsSerializer, MomentsSerializer, ProfileSerializer, SubscriptionSerializer, LikeMomentSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from django.db.models import Q
from django.db import transaction
from django.http import Http404
import re
from django.core.exceptions import ObjectDoesNotExist


class ProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet для профиля
    """
    serializer_class = ProfileSerializer
    def create(self, request):
        id_user = request.data.get('id_user')
        user = User.objects.filter(id=id_user).first()
        print(user)
        print(user.username)
        new_profile = Profiles.objects.create(user_id = id_user)
        serializer = ProfileSerializer(new_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def me(self, request, *args, **kwargs):
        user = self.request.query_params.get('user', False)
        id = kwargs.get('pk')
        if user:
            user = Profiles.objects.get(user_id = id)
        else:
            user = Profiles.objects.get(id = id)  
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search!='':
            queryset = Profiles.objects.filter(Q(user__username__icontains=search))
        else:
            raise Http404  
        return queryset


class MomentsViewSet(viewsets.ModelViewSet):
    """
    ViewSet для моментов
    """
    serializer_class = MomentsSerializer

    def get_serializer_context(self):
        context =  super().get_serializer_context()
        context.update({"request": self.request,"id_me": self.kwargs.get('pk')})
        return context

    def get_queryset(self):
        feed = self.request.query_params.get('feed', False)
        offset = self.request.query_params.get('offset', 0)
        count = self.request.query_params.get('count', 5)    
        pk = str(self.kwargs.get('pk'))    
        if feed:
            print("feed")
            sub_users = Subscriptions.objects.get_id_subscriptions(pk)
            my_moments = Moments.objects.get_my_moments(pk)
            moments = Moments.objects.get_subscriptions(sub_users)
            queryset = moments | my_moments
            queryset = queryset[int(offset):(int(count)+int(offset))]
        elif str(self.kwargs.get('pk'))!="None":
            print("my")
            queryset = Moments.objects.get_my_moments(pk)
        else:
            print('all')
            queryset = Moments.objects.get_all()
        return queryset
    
    def create(self, request, *args, **kwargs):
        author_id = request.data.get('author')
        content = request.data.get('content')
        image = request.data.get('image')

        hashtags = re.findall(r'#\w+', content)
        content_without_hashtags = re.sub(r'#\w+', '', content)
        print(content_without_hashtags)
        with transaction.atomic():
            new_moment = Moments.objects.create(author_id=author_id, content=content_without_hashtags, image=image)
            for tag_text in hashtags:
                try:
                    tag = Tags.objects.get(title=tag_text[1:])
                except ObjectDoesNotExist:
                    tag = Tags.objects.create(title=tag_text[1:])
                new_moment.tags.add(tag)
            serializer_context = {"request": request, "id_me": author_id}
            serializer = MomentsSerializer(new_moment, context = serializer_context)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        


class SubscroptionsViewSet(viewsets.ModelViewSet):
    """
    ViewSet для подписок
    """
    serializer_class = ProfileSerializer
    def get_queryset(self):
        subs = self.request.query_params.get('subs', False) #подписки, пользователь подписан на них
        pk = str(self.kwargs.get('pk'))
        if subs=='true': 
            print("subs")
            sub_users = Subscriptions.objects.get_id_subscriptions(pk)
        else:
            sub_users = Subscriptions.objects.get_id_subscribers(pk)
        queruset = Profiles.objects.get_profiles_by_id(sub_users) 
        return queruset
    
    def create(self, request):
        author_id = request.data.get('author_id')
        subscriber_id = request.data.get('subscriber_id')

        sub_exist = Subscriptions.objects.filter(author_id=author_id, subscriber_id=subscriber_id).exists()
        if sub_exist:
            print("exists")  
            existing_subscription = Subscriptions.objects.get(author_id=author_id, subscriber_id=subscriber_id)
            if existing_subscription.is_delete:
                existing_subscription.is_delete = False
            else: 
                existing_subscription.is_delete = True
            existing_subscription.save()
            serializer = SubscriptionSerializer(existing_subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("else")
            subscription = Subscriptions.objects.create(author_id=author_id, subscriber_id=subscriber_id)
            serializer = SubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    def count(self, request, pk=None):
        subscriber_count = Subscriptions.objects.get_count_subscribers(pk)
        subscriptions_count = Subscriptions.objects.get_count_subscriptions(pk)
        moments_count = Moments.objects.get_count(pk)
        return Response({'subscribers_count': subscriber_count, 'subscriptions_count': subscriptions_count, 'moments_count': moments_count}, status=status.HTTP_200_OK)

    def is_sub(self, request, *args, **kwargs):
        id_me = kwargs.get('pk_me')
        id_user = kwargs.get('pk_user') #автор на кого я подписана
        existing_subscription = Subscriptions.objects.filter(author = id_user, subscriber = id_me, is_delete = False).exists()
        if existing_subscription:
            return Response({'is_sub': True}, status=status.HTTP_200_OK)
        return Response({'is_sub': False}, status=status.HTTP_200_OK)

class LikeMomentViewSet(viewsets.ModelViewSet):
    """
    ViewSet для лайков под моментами
    """
    serializer_class = LikeMomentSerializer
    def create(self, request):
        author_id = request.data.get('author_id')
        moment_id = request.data.get('moment_id')

        exists_like = LikesMoment.objects.filter(author_id = author_id, moment_id = moment_id).exists()
        if exists_like:
            print("exists")
            like = LikesMoment.objects.get(author_id=author_id, moment_id=moment_id)
            if like.is_delete:
                like.is_delete = False
            else:
                like.is_delete = True
            like.save()
            serializer = LikeMomentSerializer(like)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("else")
            like = LikesMoment.objects.create(author_id=author_id, moment_id=moment_id)
            serializer = LikeMomentSerializer(like)
            return Response(serializer.data, status=status.HTTP_201_CREATED)



class CommentsViewSet(viewsets.ModelViewSet):
    """
    ViewSet для комментариев
    """
    serializer_class = CommentsSerializer
    def create(self, request):
        author_id = request.data.get('author_id')
        moment_id = request.data.get('moment_id')
        content = request.data.get('content')

        comment = Comments.objects.create(author_id = author_id, moment_id = moment_id, content = content)
        serializer = CommentsSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def get_queryset(self):
        id = self.kwargs.get('id')
        return Comments.objects.get_all_by_moment(id)