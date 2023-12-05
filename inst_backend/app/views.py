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
from django.http import Http404

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
    # permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context =  super().get_serializer_context()

        context.update({"request": self.request,"id_me": self.kwargs.get('pk')})
        return context

    def get_queryset(self):
        feed = self.request.query_params.get('feed', False)
        offset = self.request.query_params.get('offset', 0)
        count = self.request.query_params.get('count', 5)        
        if feed:
            print("feed")
            print(offset, count)
            sub_users = Subscriptions.objects.filter(subscriber = str(self.kwargs.get('pk')), is_delete = False).values_list('author')
            my_moments = Moments.objects.filter(author=str(self.kwargs.get('pk')), is_delete=False).order_by('-date_creation')
            moments = Moments.objects.filter(author__in = sub_users, is_delete=False).order_by('-date_creation')

            queryset = moments | my_moments
            queryset = queryset[int(offset):(int(count)+int(offset))]
            print(sub_users)
            print(queryset)
        elif str(self.kwargs.get('pk'))!="None":
            print("my")
            queryset = Moments.objects.filter(author = str(self.kwargs.get('pk')), is_delete = False).order_by('-date_creation')
        else:
            print('all')
            queryset = Moments.objects.filter(is_delete = False).order_by('-date_creation')


        return queryset


class SubscroptionsViewSet(viewsets.ModelViewSet):
    """
    ViewSet для подписок
    """
    serializer_class = ProfileSerializer
    def get_queryset(self):
        
        subs = self.request.query_params.get('subs', False) #подписки, пользователь подписан на них
        if subs: 
            print("subs")
            sub_users = Subscriptions.objects.filter(subscriber_id = str(self.kwargs.get('pk')), is_delete = False).order_by('-date_subscription').values_list('author')
            queruset = Profiles.objects.filter(id__in = sub_users)
        else:
            sub_users = Subscriptions.objects.filter(author_id = str(self.kwargs.get('pk')), is_delete = False).order_by('-date_subscription').values_list('subscriber')
            queruset = Profiles.objects.filter(id__in = sub_users)
            
        return queruset
    
    def create(self, request):
        author_id = request.data.get('author_id')
        subscriber_id = request.data.get('subscriber_id')

        author_profile = Profiles.objects.get(id=author_id)
        subscriber_profile = Profiles.objects.get(id=subscriber_id)

        sub_exist = Subscriptions.objects.filter(author=author_profile, subscriber=subscriber_profile).exists()
        print(sub_exist)
        if sub_exist:
            print("exists")  
            existing_subscription = Subscriptions.objects.get(author=author_profile, subscriber=subscriber_profile)
            if existing_subscription.is_delete:
                existing_subscription.is_delete = False
            else: 
                existing_subscription.is_delete = True
            existing_subscription.save()
            serializer = SubscriptionSerializer(existing_subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("else")
            subscription = Subscriptions.objects.create(author=author_profile, subscriber=subscriber_profile)
            serializer = SubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    def count(self, request, pk=None):
        user = Profiles.objects.get(pk=pk)
        subscriber_count = Subscriptions.objects.filter(author=user, is_delete=False).count()
        subscriptions_count = Subscriptions.objects.filter(subscriber=user, is_delete=False).count()
        moments_count = Moments.objects.filter(author = pk).count()
        return Response({'subscribers_count': subscriber_count, 'subscriptions_count': subscriptions_count, 'moments_count': moments_count}, status=status.HTTP_200_OK)

    def is_sub(self, request, *args, **kwargs):
        id_me = kwargs.get('pk_me')
        id_user = kwargs.get('pk_user')
        author_profile = Profiles.objects.get(id=id_user)
        sub_profile = Profiles.objects.get(id=id_me)
        existing_subscription = Subscriptions.objects.filter(author = author_profile, subscriber = sub_profile, is_delete = False).exists()
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

        author = Profiles.objects.get(id = author_id)
        moment = Moments.objects.get(id=moment_id)

        exists_like = LikesMoment.objects.filter(author = author, moment = moment).exists()
        print(exists_like)
        if exists_like:
            print("exists")
            like = LikesMoment.objects.get(author=author, moment=moment)
            if like.is_delete:
                like.is_delete = False
            else:
                like.is_delete = True
            like.save()
            serializer = LikeMomentSerializer(like)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("else")
            like = LikesMoment.objects.create(author=author, moment=moment)
            serializer = LikeMomentSerializer(like)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_tags_list(request, format=None):
    """
    Возвращает список тэгов
    """
    print("get")
    search=request.query_params.get('search', '')
    
    tags = Tags.objects.filter(title__contains=search)
    serialiser = TagsSerializer(tags, many=True)
    permission_classes = (IsAuthenticated)
    return Response(serialiser.data)

@api_view(['POST'])
def  new_tags(request, format=None):
    """
    Добавляет новый тег
    """
    print('post')
    serializer = TagsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_tags_by_id(request, pk, format=None):
    tag = get_object_or_404(Tags, id=pk)
    """
    Возвращает информацию о тэге
    """
    serializer = TagsSerializer(tag)
    return Response(serializer.data)




@api_view(['POST'])
def new_comment(request, pk, format=None):
    """
    Создает новый комментарий
    """
    try:
        user = request.user
        moment = Moments.objects.get(id=pk)
        comment = Comments(content=request.data.get('content'), author=Profiles.objects.get(user=user), moment=moment)
        comment.save()
        serializer = CommentsSerializer(comment)
        return Response(serializer.data, status=201)
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_comments_from_moment(request,pk, format=None):
    """
    Возвращает список комментариев под моментом
    """
    print("get")
    comments = Comments.objects.filter(moment = pk)
    serialiser = CommentsSerializer(comments, many=True)
    return Response(serialiser.data)

@api_view(['GET'])
def get_comments_from_user(request, format=None):
    """
    Возвращает список комментариев под моментами пользователя
    """
    print("get")
    user = request.user
    print(user.id)
    profile = Profiles.objects.get(user=user)
    comments = Comments.objects.filter(moment__author=profile)
    serialiser = CommentsSerializer(comments, many=True)
    return Response(serialiser.data)

@api_view(['DELETE'])
def delete_comment(request, pk, format=None):
    """
    Удаляет комментарий
    """
    try:
        user = request.user
        comment = Comments.objects.get(id=pk)
        if comment.author.user == user or comment.moment.author.user == user:
            comment.delete()
            return Response({'message': 'Комментарий удален'}, status=204)
        else:
            return Response({'error': 'Вы не можете удалить комментарий'}, status=403)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_comment_by_id(request,  pk, format=None):
    try:
        comment = Comments.objects.get(id=pk)
        serializer = CommentsSerializer(comment)
        return Response(serializer.data)
    except Comments.DoesNotExist:
        return Response({'error': 'Комментарий не найден'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    




@api_view(['GET'])
def get_moments_list(request, format=None):
    """
    Возвращает список моментов
    """
    moments = Moments.objects.filter(is_delete=False)
    serialiser = MomentsSerializer(moments, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
def  new_moment(request, format=None):
    """
    Добавляет новый момент
    """
    print('post')
    serializer = MomentsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_moment_by_id(request, pk, format=None):
    moments =  moments = Moments.objects.filter(is_delete=False, author_id=pk)
    """
    Возвращает информацию о моменте
    """
    serializer = MomentsSerializer(moments, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_moment(request, pk, format=None):
    moment = get_object_or_404(Moments, id=pk)
    """
    Удаляет момент
    """
    moment = get_object_or_404(Moments, id=pk)
    moment.is_delete = True
    moment.save()

    serializer = MomentsSerializer(moment)
    return Response(serializer.data)