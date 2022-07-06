
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from app_api.views import MyTokenObtainPairView


from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls',namespace='app')),
    path('api/',include('app_api.urls',namespace='app_api')),
    path('api-auth',include('rest_framework.urls',namespace='rest_framework')),
    path('api/token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('api/user/',include('users.urls',namespace='users'))
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
