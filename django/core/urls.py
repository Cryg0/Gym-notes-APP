
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls',namespace='app')),
    path('api/',include('app_api.urls',namespace='app_api')),
    path('api-auth',include('rest_framework.urls',namespace='rest_framework')),
    path('api/user/',include('users.urls',namespace='users'))
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
