from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework import routers
from app import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),

    path(r'tags/', views.get_tags_list, name="tag list"),
    path(r'tags/<int:pk>', views.get_tags_by_id, name="tag by id"),
    path(r'tags/new/', views.new_tags, name="new tag"),

    path(r'comments/<int:pk>', views.get_comment_by_id, name="comment by id"),
    path(r'comments/delete/', views.delete_comment, name="delete comment"),
    path(r'comments/new/', views.new_comment, name="new comment"),
    path(r'comments/from/moment/<int:pk>', views.get_comments_from_moment, name="get comment from moment"),
    path(r'comments/from/user', views.get_comments_from_user, name="get comment from user"),

    path(r'moments/', views.get_moments_list, name="get moments list"),
    path(r'moments/new/', views.new_moment, name="new moment"),
    path(r'moments/<int:pk>', views.get_moment_by_id, name="get moment by id"),
    path(r'moments/delete/<int:pk>', views.delete_moment, name="delete moment")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)