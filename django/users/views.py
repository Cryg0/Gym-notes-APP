from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer,ProfileSerializer,UserSerializer
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
        print('worked')
        try:
            refresh_token=request.data['refresh']
            token= RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
           
        except Exception as e:
            
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
    permission_classes=[AllowAny]
   
    def get(self, request):
    
        user = request.user
        profile=Profile.objects.get(user=user.pk)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data)
    
    def put(self,request):
        data=request.data
        print(data)
        user=request.user

        user.first_name=data["first_name"]
        user.save()

        profile=user.profile
       
        profile.picture=data['picture']
        profile.save()
        serializer=UserSerializer(user)
        serializer1=ProfileSerializer(profile)
        return Response((serializer.data,serializer1.data))

       
    
     
       

    

