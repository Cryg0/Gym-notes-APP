from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer,UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from .models import User,Profile
from rest_framework import generics
from .models import Profile
from rest_framework.exceptions import APIException, AuthenticationFailed
from .authentication import create_access_token, create_refresh_token, decode_refresh_token
from django.utils.decorators import method_decorator
from core.middleware.UserMiddleware import UserMiddleware


class RegisterAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self,request):
        if User.objects.filter(email=request.data['email']):
            raise APIException('User with this email exists!')
        if User.objects.filter(username=request.data['username']):
            raise APIException('User with this username exists!')

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
      
        user = User.objects.filter(email=request.data['email']).first()

        if not user:
            raise APIException('User not found!')

        if not user.check_password(request.data['password']):
            raise APIException('Wrong password!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()

        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True,samesite="none",secure=True)
        response.data = {
            'token': access_token,
            'user':{"username":user.username,
                    'user_id':user.id}
           
        }

        return response


@method_decorator(UserMiddleware, name='dispatch')
class UserAPIView(APIView):
    def get(self, request,user):
        if user:
            return Response(UserSerializer(user).data)

        raise AuthenticationFailed('unauthenticated')


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class LogoutAPIView(APIView):
    def post(self, request):
        response = Response()
        refresh_token = request.COOKIES.get('refreshToken')
        print(refresh_token)
        token= RefreshToken(refresh_token)
        token.blacklist()
        response.delete_cookie("refreshToken")
        response.data = {
            'message': 'success'
        }
        Response(status=status.HTTP_200_OK)



# class BlackListTokenView(APIView):

#     permission_classes=[AllowAny]

#     def post(self,request):
#         try:
#             refresh_token=request.data['refresh']
#             token= RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_200_OK)
           
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

@method_decorator(UserMiddleware, name='dispatch')
class UserProfile(APIView):
    permission_classes=[AllowAny]
   
    def get(self,request,user):
        
        profile=Profile.objects.get(user=user.pk)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data)
    
    def put(self,request,user):
        data=request.data
        user.first_name=data["first_name"]
        user.save()

        profile=user.profile
        profile.weight=data['weight']
        profile.height=data['height']
       
        profile.picture=data['picture']
        profile.save()
        
        return Response({"message":"success"})

       
    
     
       

    

