from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from rest_framework import routers
from app import views
from rest_framework import permissions

router = routers.DefaultRouter()

urlpatterns = [
    
   path('', include(router.urls)),
   path('admin/', admin.site.urls),

   path('auth/', include('djoser.urls')),
   path('auth/', include('djoser.urls.authtoken')),

   path(r'profile/register/', views.ProfileViewSet.as_view({'post': 'create'})),
   path(r'profile/me/<int:pk>/', views.ProfileViewSet.as_view({'get': 'list'})),
   
   path(r'moments/', views.MomentsViewSet.as_view({'get': 'list', 'post': 'create'})),
   path(r'moments/<int:pk>/', views.MomentsViewSet.as_view({'get': 'list'})),
   # path(r'moments/', views.MomentsViewSet.as_view({'post': 'create'})),

   path(r'subscribtions/<int:pk>/', views.SubscroptionsViewSet.as_view({'get': "list"})), #возвращает список подписок/подписчиков пользователя рк 
   path(r'subscriptions/', views.SubscroptionsViewSet.as_view({'post': 'create'})), #оформление подписки/отписки
   path(r'subscriptions/count/<int:pk>/', views.SubscroptionsViewSet.as_view({'get': 'count'})), #возвращает количество подписок, подписчиков, моментов
   


   #  path(r'tags/', views.get_tags_list, name="tag list"),
   #  path(r'tags/<int:pk>/', views.get_tags_by_id, name="tag by id"),
   #  path(r'tags/new/', views.new_tags, name="new tag"),

   #  path(r'comments/<int:pk>', views.get_comment_by_id, name="comment by id"),
   #  path(r'comments/delete/', views.delete_comment, name="delete comment"),
   #  path(r'comments/new/', views.new_comment, name="new comment"),
   #  path(r'comments/from/moment/<int:pk>', views.get_comments_from_moment, name="get comment from moment"),
   #  path(r'comments/from/user', views.get_comments_from_user, name="get comment from user"),

   #  path(r'moment/', views.get_moments_list, name="get_moments_list"),
   #  path(r'moment/new/', views.new_moment, name="new_moment"),
   #  path(r'moment/<int:pk>', views.get_moment_by_id, name="get moment by id"),
   #  path(r'moment/delete/<int:pk>', views.delete_moment, name="delete moment")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)