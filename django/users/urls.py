from django.urls import path
from .views import BlackListTokenView, UserCreate,UserProfile

app_name = 'users'

urlpatterns = [
    path('register/',UserCreate.as_view(),name='create_user'),
    path('logout/blacklist/',BlackListTokenView.as_view(),name='blacklist'),
    path('profile/',UserProfile.as_view(),name='user-profile'),
   
]