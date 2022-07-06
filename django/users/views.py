from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer,ProfileSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from .models import User,Profile
from rest_framework import generics
from .models import Profile




class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            newuser=serializer.save()

            if newuser:
                
                profile=Profile.objects.create(user=newuser)
                profile.save()

                return Response(status=status.HTTP_201_CREATED)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class BlackListTokenView(APIView):

    permission_classes=[AllowAny]

    def post(self,request):
        try:
            refresh_token=request.data['refresh_token']
            token= RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
    permission_classes=[AllowAny]
   
  

    def get(self, request):
        user = request.user

        profile=Profile.objects.get(user=user.pk)
        serializer = ProfileSerializer(profile)

       
        
        return Response(serializer.data)
