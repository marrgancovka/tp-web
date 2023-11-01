from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Tags, Comments, Profiles, Moments, Subscriptions, LikesComment, LikesMoment
from instagram.serializers import TagsSerializer, CommentsSerializer, MomentsSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def get_tags_list(request, format=None):
    """
    Возвращает список тэгов
    """
    print("get")
    search=request.query_params.get('search', '')
    
    tags = Tags.objects.filter(title__contains=search)
    serialiser = TagsSerializer(tags, many=True)
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
# @permission_classes([IsAuthenticated])
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
# @permission_classes([IsAuthenticated])
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
# @permission_classes([IsAuthenticated])
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
    moment = get_object_or_404(Moments, id=pk)
    """if serializer.is_valid():
    Возвращает информацию о моменте
    """
    serializer = MomentsSerializer(moment)
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