from django.urls import path
from .views import RegisterAPIView, UserProfile,LoginAPIView,RefreshAPIView,UserAPIView,LogoutAPIView

app_name = 'users'

urlpatterns = [
    path('register/',RegisterAPIView.as_view(),name='create_user'),
    path('profile/',UserProfile.as_view(),name='user-profile'),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('refresh/', RefreshAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view())
   
]