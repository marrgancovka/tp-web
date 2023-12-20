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
   path(r'profile/me/<int:pk>/', views.ProfileViewSet.as_view({'get': 'me'})),
   path(r'profile/', views.ProfileViewSet.as_view({'get': 'list'})),
   
   path(r'moments/', views.MomentsViewSet.as_view({'get': 'list', 'post': 'create'})),
   path(r'moments/<int:pk>/', views.MomentsViewSet.as_view({'get': 'list'})),
   path(r'moments/like/', views.LikeMomentViewSet.as_view({'post': 'create'})), #оформление лайка/дизлайка
   
   path(r'subscriptions/<int:pk>/', views.SubscroptionsViewSet.as_view({'get': "list"})), #возвращает список подписок/подписчиков пользователя рк 
   path(r'subscriptions/', views.SubscroptionsViewSet.as_view({'post': 'create'})), #оформление подписки/отписки
   path(r'subscriptions/count/<int:pk>/', views.SubscroptionsViewSet.as_view({'get': 'count'})), #возвращает количество подписок, подписчиков, моментов
   path(r'subscriptions/<int:pk_me>/<int:pk_user>/', views.SubscroptionsViewSet.as_view({'get': 'is_sub'}))

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)